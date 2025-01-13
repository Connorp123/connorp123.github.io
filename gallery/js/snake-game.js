import { createGalleryCanvas } from "../../helpers/gallery-page-helper.js";

export const snake_game = (p) => {
    // Snake
    let s;
    let canvas;
    let bgColor;
    let food;
    let rightBorderWidth;
    let bottomBorderHeight;
    let gameOver;
    let best = 0;

    const draw_scale = 10;
    const fps        = 10;

    p.setup = () => {
        // Canvas setup
        canvas = createGalleryCanvas(p);
        p.frameRate(fps);
        calcBorderValues();

        // Snake setup
        setupGame();
    };

    p.draw = () => {
        // Draw board
        p.background(bgColor.r, bgColor.g, bgColor.b);

        // Check for death
        if (s.die()) {
            endGame();
        }

        // Update snake
        s.update();
        s.display();

        // Update food
        food.display();
        if (food.eat(s.pos)) {
            s.grow();
        }
    };

    p.keyPressed = () => {
        if (gameOver) {
            setupGame();
        } else {
            if (p.keyCode === p.UP_ARROW) {
                s.moveUp();
            } else if (p.keyCode === p.DOWN_ARROW) {
                s.moveDown();
            } else if (p.keyCode === p.RIGHT_ARROW) {
                s.moveRight();
            } else if (p.keyCode === p.LEFT_ARROW) {
                s.moveLeft();
            }
        }
    };

    p.touchStarted = () => {
        if (gameOver) {
            setupGame();
        }
        // Middle third
        else if (p.mouseX > p.width / 3 && p.mouseX < (2 * p.width) / 3) {
            // Top third
            if (p.mouseY < p.height / 3) {
                s.moveUp();
            }
            // Bottom third
            else if (p.mouseY > (p.height * 2) / 3) {
                s.moveDown();
            }
        }
        // Outer 2 thirds
        else {
            if (p.mouseX < p.width / 3) {
                s.moveLeft();
            } else if (p.mouseX > (p.width * 2) / 3) {
                s.moveRight();
            }
        }
    };

    function calcBorderValues() {
        rightBorderWidth = p.width;
        while (rightBorderWidth > draw_scale) {
            rightBorderWidth -= draw_scale;
        }
        bottomBorderHeight = p.height;
        while (bottomBorderHeight > draw_scale) {
            bottomBorderHeight -= draw_scale;
        }
    }

    function setupGame() {
        // Game variables
        s        = new Snake(p, draw_scale);
        food     = new SnakeFood(p, draw_scale);
        gameOver = false;

        // Game styles
        bgColor = {
            r: 170,
            g: 215,
            b: 81
        };
        p.stroke(0);
    }

    function endGame() {
        // Set gameOver
        gameOver = true;
        best     = p.max(s.total - 1, best);

        bgColor = {
            r: 255,
            g: 0,
            b: 0
        };
        p.noStroke();

        // Show score
        p.fill(255);
        p.textSize(40);
        let x = p.width / 2;
        let y = p.height / 2;
        p.textAlign(p.CENTER, p.CENTER);
        p.text("GAME OVER", x, y - 40);
        p.text(`SCORE: ${s.total - 1}`, x, y);
        if (best > 0)
            p.text(`BEST: ${best}`, x, y + 40);
    }
};

class Snake {
    constructor(p, scale) {
        this.p      = p;
        this.pos    = p.createVector(0, 0);
        this.xSpeed = 1;
        this.ySpeed = 0;
        this.color  = {
            r: 70,
            g: 115,
            b: 233
        };
        this.scale  = scale;
        this.total  = 1;
        this.tail   = [];
        this.isDead = false;
    }

    dir(x, y) {
        this.xSpeed = x;
        this.ySpeed = y;
    }

    moveUp() {
        this.dir(0, -1);
    }

    moveDown() {
        this.dir(0, 1);
    }

    moveLeft() {
        this.dir(-1, 0);
    }

    moveRight() {
        this.dir(1, 0);
    }

    setScale(scale) {
        this.scale = scale;
    }

    update() {
        // Shift the tail over
        this.shiftTail();

        // Update based on speed
        this.pos.x += this.xSpeed * this.scale;
        this.pos.y += this.ySpeed * this.scale;
    }

    display() {
        if (!this.isDead) {
            this.p.fill(this.color.r, this.color.g, this.color.b);
            for (let i = 0; i < this.tail.length; i++) {
                this.p.rect(this.tail[i].x, this.tail[i].y, this.scale, this.scale);
            }
        }
    }

    shiftTail() {
        if (this.total === this.tail.length) {
            for (let i = 0; i < this.tail.length - 1; i++) {
                this.tail[i] = this.tail[i + 1];
            }
        }
        this.tail[this.total - 1] = this.p.createVector(this.pos.x, this.pos.y);
    }

    grow() {
        this.total++;
    }

    deleteSnake() {
        this.isDead = true;
    }

    die() {
        // Check for tail intersection
        for (let i = 0; i < this.tail.length; i++) {
            let tailPos = this.tail[i];
            let d       = this.p.dist(this.pos.x, this.pos.y, tailPos.x, tailPos.y);
            if (d < 1) {
                this.deleteSnake();
                return true;
            }
        }

        // Check for edge intersection
        if (this.pos.x + this.scale > this.p.width
            || this.pos.x < 0
            || this.pos.y + this.scale > this.p.height
            || this.pos.y < 0) {
            this.deleteSnake();
            return true;
        }

        return false;
    }
}

class SnakeFood {
    constructor(p, scale) {
        this.p     = p;
        this.scale = scale;
        this.color = {
            r: 255,
            g: 0,
            b: 0
        };
        this.pickLocation();
    }

    pickLocation() {
        let rows = this.p.floor(this.p.height / this.scale);
        let cols = this.p.floor(this.p.width / this.scale);
        this.pos = this.p.createVector(
            this.p.floor(this.p.random(cols)),
            this.p.floor(this.p.random(rows))
        );
        this.pos.mult(this.scale);
    }

    eat(snakePos) {
        if (this.p.dist(this.pos.x, this.pos.y, snakePos.x, snakePos.y) < 1) {
            this.pickLocation();
            return true;
        } else {
            return false;
        }
    }

    display() {
        this.p.fill(this.color.r, this.color.g, this.color.b);
        this.p.rect(this.pos.x, this.pos.y, this.scale, this.scale);
    }
}
