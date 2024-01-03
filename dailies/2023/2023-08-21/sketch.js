// Comments are Univers ASCII art

import { createGui } from "../../../helpers/gui-helpers.js";

export const sketch = (p) => {

    let canvas;
    let state = {
        debug:  false,
        width:  20,
        height: 80
    };
    let gui   = createGui({state});


    const colors = {
        light: p.color(255, 255, 255),
        dark:  p.color(20, 20, 20),
        green: p.color(165, 255, 154)
    };


    const drawBox = (baseX, baseY) => {
        p.beginShape(p.QUADS);

        const width  = state.width;
        const height = state.height;

        p.fill(colors.green);
        p.vertex(baseX, baseY); // top left
        p.vertex(baseX + width, baseY); // top right
        p.vertex(baseX + width, baseY + height); // bot right
        p.vertex(baseX, baseY + height); // bot left

        p.fill(colors.light);
        p.vertex(baseX, baseY); // bot left
        p.vertex(baseX + width, baseY); // bot right
        p.vertex(baseX - 10, baseY - 40);   // top right
        p.vertex(baseX - 30, baseY - 40);   // top left

        p.fill(colors.dark);
        p.vertex(baseX - 30, baseY - 40); // top left of white
        p.vertex(baseX, baseY); // bot left of white
        p.vertex(baseX, baseY + 80);   // bot left of green
        p.vertex(baseX - 30, baseY + 30);   // x of white top left, y o

        p.endShape();
    };

    const drawBoxes = () => {
        p.stroke(colors.dark);
        for (let y = 0; y < p.height; y += 80) {
            for (let x = 0; x < p.width; x += 50) {
                drawBox(x, y);
            }
        }
    };


    p.setup = () => {
        canvas = createInstanceCanvas(p);
    };


    p.draw = () => {
        redrawBackground(p);
        drawBoxes();
    };
};