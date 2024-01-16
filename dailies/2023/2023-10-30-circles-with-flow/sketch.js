import { getGifName } from "../../../helpers/daily-helpers.js";
import { createGui } from "../../../helpers/gui-helpers.js";
import { createFlowField } from "../../../classes/module/FlowFieldClass.js";

const smallerCanvasDimension = (p) => {
    return Math.min(p.width, p.height);
};

const createBigCircle = ({p}) => {
    return class BigCircle {
        constructor({x, y}) {
            this.pos  = p.createVector(x || p.random() * p.width, y || p.random() * p.height);
            this.acc  = p.createVector(0, 0);
            this.vel  = p.createVector(0, 0);
            this.size = p.floor(smallerCanvasDimension(p) * (1 / 3));
            this.r    = p.ceil(this.size / 2);
            this.rgb  = [p.random() * 255, p.random() * 255, p.random() * 255];

            this.maxVel = 1;
            this.maxAcc = 0.01;
        }

        update() {
            this.vel.add(this.acc);
            this.vel.limit(this.maxVel);
            this.pos.add(this.vel);

            this.acc.set();

            this.checkBounds();
        }

        checkBounds() {
            if (this.pos.x < -this.r) this.pos.x = p.width + this.r;
            if (this.pos.y < -this.r) this.pos.y = p.height + this.r;
            if (this.pos.x > p.width + this.r) this.pos.x = -this.r;
            if (this.pos.y > p.height + this.r) this.pos.y = -this.r;
        }

        draw() {
            p.fill(...this.rgb);
            p.stroke(0);
            p.circle(this.pos.x, this.pos.y, this.size);
        }

        // ---

        follow(flow) {
            const desired = flow.lookup(this.pos);
            desired.mult(this.maxVel);
            const steer = desired.sub(this.vel).limit(this.maxAcc);
            this.addForce({vec: steer});
        }

        addForce({vec, x, y}) {
            if (!vec) {
                vec = p.createVector(x, y);
            }
            this.acc.add(vec);
        };

    };
};


export const sketch = (p) => {

    // Basics
    let canvas;
    let state = {
        debug:            false,
        redrawBackground: false
    };
    let gui   = createGui({state});

    // Class creators
    const BigCircle = createBigCircle({p});
    const FlowField = createFlowField({p});

    // Global vars
    let circles = [];
    let flowField;

    p.setup = () => {
        canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        p.frameRate(144);
        p.background(0);

        for (let i = 0; i < 20; i++) {
            circles.push(new BigCircle({}));
        }

        flowField = new FlowField(30);
    };

    p.draw = () => {
        if (state.redrawBackground) p.background(0);

        circles.forEach(circle => {
            circle.follow(flowField);
            circle.update();
            circle.draw();
        });
        if (state.debug) flowField.display();
    };

    p.keyPressed = () => {
        if (p.key === "S" || p.key === "s") p.save(`${getGifName()}.png`);
    };
};