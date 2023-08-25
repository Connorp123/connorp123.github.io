// Comments are Univers ASCII art

import { createGui } from "../../helpers/gui-helpers.js";


class Box {

    constructor({p, state, x, y}) {
        this.p      = p;
        this.state  = state;
        this.x      = x;
        this.y      = y;
        this.colors = {
            light: p.color(255, 255, 255),
            dark:  p.color(20, 20, 20),
            green: p.color(165, 255, 154)
        };
    }

    draw() {
        this.p.push();

        this.p.translate(this.x, this.y);
        this.p.beginShape(this.p.QUADS);
        this.p.stroke(this.colors.dark);


        const width  = this.state.width;
        const height = this.state.height;

        // this.p.noFill();

        this.p.fill(this.colors.green);
        this.p.vertex(0, 0); // top left
        this.p.vertex(width, 0); // top right
        this.p.vertex(width, height); // bot right
        this.p.vertex(0, height); // bot left

        this.p.fill(this.colors.light);
        this.p.vertex(0, 0); // bot left
        this.p.vertex(width, 0); // bot right
        this.p.vertex(0 - this.p.int(width / 2), 0 - this.p.int(height / 2));   // top right
        this.p.vertex(0 - this.p.int(width * 1.5), 0 - this.p.int(height / 2));   // top left

        this.p.fill(this.colors.dark);
        this.p.vertex(0 - this.p.int(width * 1.5), 0 - this.p.int(height / 2)); // top left of white
        this.p.vertex(0, 0); // bot left of white
        this.p.vertex(0, height);   // bot left of green
        this.p.vertex(0 - this.p.int(width * 1.5), this.p.int((1 / 2) * height));   // x of white top left, y o

        this.p.endShape();

        this.p.pop();
    }
}

export const sketch = (p) => {

    let canvas;
    let state   = {
        debug:  false,
        width:  40,
        height: 80,
        xGap:   100,
        yGap:   80
    };
    let gui     = createGui({state});
    const boxes = [];

    const createBoxes_Uniform = () => {
        for (let y = 0; y < p.height + state.height; y += state.yGap) {
            for (let x = 0; x < p.width + state.width * 3; x += state.xGap) {
                boxes.push(new Box({p, state, x, y}));
            }
        }
    };

    const createBoxes_RandomDiff = () => {
        for (let y = 0; y < p.height + state.height; y += state.yGap) {
            for (let x = 0; x < p.width + state.width * 3; x += state.xGap) {
                const randomX = x + p.map(p.random(), 0, 1, -10, 10);
                const randomY = y + p.map(p.random(), 0, 1, -10, 10);
                boxes.push(new Box({p, state, x: randomX, y: randomY}));
            }
        }
    };

    const createBoxes_RandomPosition = () => {
        for (let i = 0; i < 1000; i++) {
            const x = p.map(p.random(), 0, 1, 0, p.width + state.width);
            const y = (p.height + state.height) * p.random();
            boxes.push(new Box({p, state, x, y}));
        }
    };

    p.setup = () => {
        canvas = createInstanceCanvas(p);
        // createBoxes_RandomPosition();
        createBoxes_Uniform();
        // createBoxes_RandomDiff();
    };


    p.draw = () => {
        // redrawBackground(p);
        p.background(125);
        boxes.forEach(box => box.draw());
    };
};