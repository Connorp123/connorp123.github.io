// Comments are Univers ASCII art

import {createGui} from "../../helpers/gui-helpers.js";
import {Box} from "./Box.js";

export const sketch = (p) => {

    let canvas;
    let state   = {
        debug: false,
        width: 10
    };
    const boxes = [];

    let gui = createGui({showControls: false});

    gui.onChange(() => {
        boxes.length = 0;
        createBoxes_Staggered();
    });
    gui.add(state, "width", 10, 500, 10);

    const createBoxes_Uniform = () => {
        for (let y = 0; y < p.height + state.width * 2; y += state.yGap) {
            for (let x = 0; x < p.width + state.width * 3; x += state.xGap) {
                boxes.push(new Box({p, state, x, y}));
            }
        }
    };

    const createBoxes_Staggered  = () => {

        const width  = state.width;
        const height = width * 2;

        const leftEdge  = 0 - width;
        const topEdge   = 0 - height;
        const rightEdge = p.width + width;
        const botEdge   = (p.height + height) * 2;


        let x = 0;
        let y = 0;
        while (y <= botEdge) {

            let innerX = x;
            let innerY = y;


            // x = 0;

            while (
                innerX <= rightEdge && innerX >= leftEdge &&
                innerY <= botEdge && innerY >= topEdge) {

                boxes.push(new Box({p, state, x: innerX, y: innerY}));

                innerX += width;
                innerY -= height / 2;

            }

            y += height * 2; // Move y down by `state.width * 2 * 2`
        }

    };
    const createBoxes_RandomDiff = () => {
        for (let y = 0; y < p.height + state.width * 2; y += state.yGap) {
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
            const y = (p.height + state.width * 2) * p.random();
            boxes.push(new Box({p, state, x, y}));
        }
    };

    p.setup = () => {
        canvas = createInstanceCanvas(p);
        // createBoxes_RandomPosition();
        // createBoxes_Uniform();
        // createBoxes_RandomDiff();
        createBoxes_Staggered();
    };


    p.draw = () => {
        // redrawBackground(p);
        p.background(125);
        boxes.forEach(box => box.draw());
    };
};