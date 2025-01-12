import { getFullscreenCanvas, getGifName } from "../../helpers/display-helpers-modules.js";
import { createGui } from "../../helpers/gui-helpers.js";

const smallerCanvasDimension = (p) => {
    return Math.min(p.width, p.height);
};

const createSimplePhysicsObject = ({p}) => {
    return class SimplePhysicsObject {
        constructor({
                        x,
                        y,
                        radius,
                        beforeUpdate,
                        displayFunction,
                        startAcc,
                        startVel,
                        maxVel,
                        maxAcc,
                        boundaries
                    }) {

            // Physics
            this.pos    = p.createVector(x || p.random() * p.width, y || p.random() * p.height);
            this.acc    = startAcc || p.createVector(0, 0);
            this.vel    = startVel || p.createVector(0, 0);
            this.maxVel = maxVel || 1;
            this.maxAcc = maxAcc || 0.01;

            this.size = Math.floor(radius * 2) || Math.floor(smallerCanvasDimension(p) * (1 / 3));
            this.r    = radius || Math.ceil(this.size / 2);

            // Default draw
            this.rgb = [p.random() * 255, p.random() * 255, p.random() * 255];

            if (boundaries?.length === 4) {
                this.boundaries = boundaries;
            }

            // Overrides
            this.beforeUpdate    = beforeUpdate;
            this.displayFunction = displayFunction;
        }

        update() {
            if (this.beforeUpdate) this.beforeUpdate(this);
            this.vel.add(this.acc);
            this.vel.limit(this.maxVel);
            this.pos.add(this.vel);
            //
            this.acc.set();

            // this.checkBounds();
        }

        checkBounds() {
            if (this.pos.x < -this.r) this.pos.x = p.width + this.r;
            if (this.pos.y < -this.r) this.pos.y = p.height + this.r;
            if (this.pos.x > p.width + this.r) this.pos.x = -this.r;
            if (this.pos.y > p.height + this.r) this.pos.y = -this.r;
        }

        bounce() {
            console.log(this.pos.y);
            if (this.pos.x < this.boundaries[0] + this.r) this.vel.mult(-1, 1);
            if (this.pos.x > this.boundaries[2] - this.r) this.vel.mult(-1, 1);

            if (this.pos.y < this.boundaries[1] + this.r) this.vel.mult(1, -1);
            if (this.pos.y > this.boundaries[3] - this.r) this.vel.mult(1, -1);
        }

        display() {
            if (this.displayFunction) this.displayFunction(this);
            else {
                p.fill(...this.rgb);
                p.noStroke();
                p.circle(this.pos.x, this.pos.y, this.size);
            }
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
            this.acc.add(vec).limit(this.maxAcc);
        };

    };
};

export const sketch = (p) => {

    // Basics
    let canvas;
    let state = {
        debug:            false,
        redrawBackground: true,
        frameRate:        0
    };
    let gui   = createGui({state});

    // Class creators
    const Ball = createSimplePhysicsObject({p});

    let balls      = [];
    const BOX_SIZE = 400;


    p.setup = () => {
        canvas = getFullscreenCanvas(p);
        p.stroke(255);
        p.rectMode(p.CENTER);

        for (let i = 0; i < 100; i++) {
            balls.push(new Ball({
                x:          p.width / 2,
                y:          p.height / 2,
                boundaries: [
                    p.width / 2 - BOX_SIZE / 2,
                    p.height / 2 - BOX_SIZE / 2,
                    p.width / 2 + BOX_SIZE / 2,
                    p.height / 2 + BOX_SIZE / 2
                ],
                radius:     20,
                // startVel:   p.createVector(5, 5),
                startVel: p.createVector(p.random(-20, 20), p.random(-20, 20)),
                maxVel:   100
            }));
        }

    };

    p.draw = () => {
        if (state.redrawBackground) p.background(0);
        balls.forEach(classInstance => {

            classInstance.update();
            classInstance.bounce();
            // classInstance.checkBounds();
            classInstance.display();
        });

        p.stroke(255);
        p.strokeWeight(1);
        p.noFill();
        p.square(p.width / 2, p.height / 2, BOX_SIZE);
        // p.line(p.width / 2, 0, p.width / 2, p.height);
        // p.line(0, p.height / 2, p.width, p.height / 2);
    };

    p.keyPressed = () => {
        const key = p.key.toLowerCase();
        if (key === "s") p.save(`${getGifName()}.png`);
    };

    p.mousePressed = () => {
    };

};