// Comments are Univers ASCII art

class ConnectTheDots {
    constructor(p, img) {
        this.p                 = p;
        this.img               = img;
        this.dots              = [];
        this.lines             = [];
        this.startDotIndex     = null;
        this.endDotIndex       = null;
        this.distanceThreshold = 25;
    }

    // Create random dots
    createDots(n = 25) {
        this.dots = [];
        for (let i = 0; i < n; i++) {
            this.dots.push({
                x: Math.floor(this.p.random(0, this.img.width)),
                y: Math.floor(this.p.random(0, this.img.height))
            });
        }
    }

    click(pos) {

        // Find the first close dot and make sure it's valid (+/- 1 index)
        let closeDotIndex = this.isCloseToDot(pos);
        if (!closeDotIndex) {
            return;
        }

        // Click 1
        if (!this.startDotIndex) {
            if (this.isOkDotToClick(closeDotIndex)) {
                this.startDotIndex = closeDotIndex;
            }
        }

        // Click 2
        else if (!this.endDotIndex) {
            if (this.isOkDotToClick(closeDotIndex)) {
                this.endDotIndex = closeDotIndex;
                this.addLine();
            }
            this.resetSelectedDots();
        }
        else {
            console.log("Oops ??");
        }
    }

    resetSelectedDots() {
        this.startDotIndex = null;
        this.endDotIndex   = null;
        console.log("resetting");
    }

    isCloseToDot(pos) {
        return this.dots.findIndex(dot => Math.abs(this.p.dist(pos.x, pos.y, dot.x, dot.y)) < this.distanceThreshold);
    }

    isOkDotToClick(dotIndex) {
        if (!dotIndex) {
            return false;
        }
        console.log(dotIndex);
        if (!this.startDotIndex) {
            return true;
        } else if (!this.endDotIndex) {
            return (dotIndex !== this.startDotIndex && Math.abs(this.startDotIndex - dotIndex) === 1);
        }
        return false;
    }

    addLine() {
        // Draw a line from dot 1 to dot 2
        this.lines.push({
            x1: this.dots[this.startDotIndex].x,
            y1: this.dots[this.startDotIndex].y,
            x2: this.dots[this.endDotIndex].x,
            y2: this.dots[this.endDotIndex].y
        });
    }

    drawDots() {
        this.p.fill(255);
        this.dots.forEach(({x, y}, i) => {
            this.p.push();
            this.p.translate(x, y);
            this.p.circle(0, 0, 5);
            this.p.text(`${i}`, 0, 0);
            this.p.pop();
        });

        this.p.fill(0, 0, 255);
        if (this.startDotIndex) {
            let {x, y} = this.dots[this.startDotIndex];
            this.p.circle(x, y, 5);
        }
        if (this.endDotIndex) {
            let {x, y} = this.dots[this.endDotIndex];
            this.p.circle(x, y, 5);
        }
    }

    drawLines() {
        this.p.fill(255);
        this.lines.forEach(({x1, x2, y1, y2}) => {
            this.p.line(x1, y1, x2, y2);
        });
    }
}

export const sketch = (p) => {

    /***
     *
     *      ,ad8888ba,    ,ad8888ba,    888b      88   ad88888ba  888888888888    db         888b      88  888888888888  ad88888ba
     *     d8"'    `"8b  d8"'    `"8b   8888b     88  d8"     "8b      88        d88b        8888b     88       88      d8"     "8b
     *    d8'           d8'        `8b  88 `8b    88  Y8,              88       d8'`8b       88 `8b    88       88      Y8,
     *    88            88          88  88  `8b   88  `Y8aaaaa,        88      d8'  `8b      88  `8b   88       88      `Y8aaaaa,
     *    88            88          88  88   `8b  88    `"""""8b,      88     d8YaaaaY8b     88   `8b  88       88        `"""""8b,
     *    Y8,           Y8,        ,8P  88    `8b 88          `8b      88    d8""""""""8b    88    `8b 88       88              `8b
     *     Y8a.    .a8P  Y8a.    .a8P   88     `8888  Y8a     a8P      88   d8'        `8b   88     `8888       88      Y8a     a8P
     *      `"Y8888Y"'    `"Y8888Y"'    88      `888   "Y88888P"       88  d8'          `8b  88      `888       88       "Y88888P"
     *
     *
     */
    let canvas;

    let img;
    let debug = true;
    let game;

    p.preload = () => {
        img = p.loadImage("../../resources/rainier.jpg");
    };

    /***
     *
     *     ad88888ba   88888888888  888888888888  88        88  88888888ba
     *    d8"     "8b  88                88       88        88  88      "8b
     *    Y8,          88                88       88        88  88      ,8P
     *    `Y8aaaaa,    88aaaaa           88       88        88  88aaaaaa8P'
     *      `"""""8b,  88"""""           88       88        88  88""""""'
     *            `8b  88                88       88        88  88
     *    Y8a     a8P  88                88       Y8a.    .a8P  88
     *     "Y88888P"   88888888888       88        `"Y8888Y"'   88
     *
     *
     */
    p.setup = () => {
        canvas = createInstanceCanvas(p);
        game   = new ConnectTheDots(p, img);
        game.createDots();
    };


    /***
     *
     *    88888888ba   88888888888  888b      88  88888888ba,    88888888888  88888888ba
     *    88      "8b  88           8888b     88  88      `"8b   88           88      "8b
     *    88      ,8P  88           88 `8b    88  88        `8b  88           88      ,8P
     *    88aaaaaa8P'  88aaaaa      88  `8b   88  88         88  88aaaaa      88aaaaaa8P'
     *    88""""88'    88"""""      88   `8b  88  88         88  88"""""      88""""88'
     *    88    `8b    88           88    `8b 88  88         8P  88           88    `8b
     *    88     `8b   88           88     `8888  88      .a8P   88           88     `8b
     *    88      `8b  88888888888  88      `888  88888888Y"'    88888888888  88      `8b
     *
     *
     */
    p.draw = () => {
        redrawBackground(p);
        if (debug) {
            p.image(img, 0, 0);
        }
        game.drawDots();
        game.drawLines();
    };

    p.mousePressed = () => {
        if (game) {
            game.click(p.createVector(p.mouseX, p.mouseY));
        }
    };
};