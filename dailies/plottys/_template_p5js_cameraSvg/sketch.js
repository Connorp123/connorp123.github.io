const VIDEO_WIDTH  = 150.0;
const VIDEO_HEIGHT = 150.0;

import { createGui } from "../../../helpers/gui-helpers.js";
import CameraStuff, { createVideoCapture } from "../../../classes/module/CameraStuff.js";

export const sketch = (p) => {

    let state = {
        frameRate:   1,
        videoWidth:  VIDEO_WIDTH,
        videoHeight: VIDEO_HEIGHT
    };
    let gui   = createGui({
        state: state,
        name:  "daily"
    });

    let canvas;
    let capture;
    let camera;

    p.setup = () => {
        // canvas  = p.createCanvas(p.windowWidth < 1000 ? p.windowWidth : 1000, p.windowHeight);
        canvas  = createSquareCanvas(p);
        capture = createVideoCapture(p);
        capture.hide();
        camera = new CameraStuff({
            p:       p,
            capture: capture,
            vWidth:  state.videoWidth,
            vHeight: state.videoHeight,
            xChunk:  1,
            yChunk:  1
        });
    };

    p.draw = () => {
        redrawBackground(p);
        state.frameRate = p.frameRate();
        camera.drawHorizontalLines();
    };

    p.keyPressed = () => {
        if (p.key === "S" || p.key === "s") p.save(`${getGifName()}.svg`);
    };
};