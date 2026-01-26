const VIDEO_WIDTH  = 150.0;
const VIDEO_HEIGHT = 150.0;

import { createGui } from "../../../helpers/gui-helpers.js";

export const sketch = (p) => {

    let state = {
        // frameRate:   1,
        videoWidth:  VIDEO_WIDTH,
        videoHeight: VIDEO_HEIGHT,
        spacing:     5,
        angle:       90,
        redraw:      redrawLines
    };
    let gui   = createGui({
        state: state,
        name:  "daily"
    });

    let canvas;

    p.setup = () => {
        // canvas  = p.createCanvas(p.windowWidth < 1000 ? p.windowWidth : 1000, p.windowHeight);
        // canvas = createSquareCanvas(p);
        canvas = createA3SvgCanvas(p, 3);
        redrawLines();
    };

    p.draw = () => {
        // redrawBackground(p);
        // state.frameRate = p.round(p.frameRate());
    };

    p.keyPressed = () => {
        if (p.key === "S" || p.key === "s") p.save(`${getGifName()}.svg`);
    };

    function redrawLines() {
        redrawBackground(p);
        p.stroke(255);
        p.noFill();


        for (let i = 0; i < p.width; i += state.spacing) {
            let offset = p.random(-2, 2);
            p.line(i + offset, 0, i + offset, p.height);
        }

        p.push();
        p.translate(p.width / 2, p.height / 2);
        p.rotate(p.PI / state.angle);
        for (let i = -p.width; i < p.width; i += state.spacing) {
            let offset = p.random(-2, 2);
            p.line(i + offset, -p.height, i + offset, p.height);
        }
        p.pop();
    }
};
