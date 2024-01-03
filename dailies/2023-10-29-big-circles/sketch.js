import {getGifName} from "../../helpers/daily-helpers.js";
import {createGui} from "../../helpers/gui-helpers.js";

const smallerCanvasDimension = (p) => {
    return Math.min(p.width, p.height);
};

const createBigCircle = ({p}) => {
    return class BigCircle {
        constructor({x, y}) {
            this.pos  = p.createVector(x, y);
            this.acc  = p.createVector(0, 0);
            this.vel  = p.createVector(0, 0);
            this.size = p.floor(smallerCanvasDimension(p) * (2 / 3));
        }

        update() {
            this.vel.add(this.acc);
            this.vel.limit(1);
            this.pos.add(this.vel);

            // this.acc.set(); // set to 0
            this.vel.set();
        }

        draw() {
            p.fill(255);
            p.stroke(0);
            p.circle(this.pos.x, this.pos.y, this.size);
        }

        // ---

        addForce({vec, x, y}) {
            if (!vec) {
                vec = p.createVector(x, y);
            }

            this.acc.add(vec.sub(this.pos));
        };

    };
};

export const sketch = (p) => {

    // Basics
    let canvas;
    let state = {
        debug: false
        // redrawBackground: false
    };
    let gui   = createGui({state});

    // Class creators
    const BigCircle = createBigCircle({p});

    // Global vars
    let circles = [];

    p.setup = () => {
        canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        p.frameRate(144);
        p.background(0);


        circles.push(new BigCircle({x: 100, y: 100}));

    };

    p.draw = () => {
        if (state.redrawBackground) p.background(0);

        circles.forEach(circle => {
            circle.addForce({
                x: p.mouseX,
                y: p.mouseY
            });
            circle.update();
            circle.draw();
        });
    };

    p.keyPressed = () => {
        if (p.key === "S" || p.key === "s") p.save(`${getGifName()}.png`);
    };
};