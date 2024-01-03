// Comments are Univers ASCII art

import { createGui } from "../../../helpers/gui-helpers.js";
import { Box } from "./Box.js";

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

    const createBoxes_Staggered = () => {

        const width      = state.width;
        const height     = width * 2;
        const halfHeight = height / 2;

        const rightEdge = p.width + width;
        const botEdge   = p.height + halfHeight;

        let xStart = 4;

        for (let yIndex = -1; yIndex <= (botEdge / halfHeight) * 2; yIndex += 1) {

            xStart = (xStart - 1) % 4;

            for (let xIndex = xStart; xIndex <= (rightEdge / width); xIndex += 4) {

                boxes.push(new Box({
                        p,
                        state,
                        x: xIndex * width,
                        y: yIndex * halfHeight
                    }
                ));
            }

        }
    };

    p.setup = () => {
        canvas = createInstanceCanvas(p);
        createBoxes_Staggered();
    };


    p.draw = () => {
        // redrawBackground(p);
        p.background(125);
        boxes.forEach(box => box.draw());
    };
};