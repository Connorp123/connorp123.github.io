// Comments are Univers ASCII art

import { createGui } from "../../../helpers/gui-helpers.js";
import { Box } from "./Box.js";

export const sketch = (p) => {

    let canvas;
    let state   = {
        debug:   false,
        width:   20,
        color1:  true,
        color2:  true,
        outline: true
    };
    const boxes = [];

    let gui = createGui({state, showControls: true});

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
        canvas = p.createCanvas(297 * 3, 400 * 3, p.SVG);
        createBoxes_Staggered();
    };


    p.draw = () => {
        // redrawBackground(p);
        p.background(255);
        boxes.forEach(box => box.draw());
        // p.clear();
    };

    p.keyPressed = () => {
        if (p.key === "S" || p.key === "s") p.save(`${getGifName()}.svg`);
    };
};