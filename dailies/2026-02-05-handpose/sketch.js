import { getGifName } from "../../helpers/display-helpers-modules.js";
import { createGui } from "../../helpers/gui-helpers.js";

export const sketch = (p) => {

    // Basics
    let canvas;
    let state = {
        debug:            false,
        redrawBackground: false,
        dist:             0,
        clearCanvas:      () => p.background(0)
    };
    let gui   = createGui({state});

    // Global vars
    let handPose;
    let video;
    let hands  = [];
    let loaded = false;
    let t      = 0;

    let canvasHeight = 1024;
    let canvasWidth  = 576;
    let cameraHeight = 324;

    const gotHands = (results) => {
        hands = results;
    };

    const clearCanvas = () => {
        p.background(0);
    };

    p.setup = async () => {
        // canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas = p.createCanvas(canvasWidth, canvasHeight);
        p.frameRate(144);
        p.background(0);

        video = p.createCapture(p.VIDEO);
        // video.size(p.windowWidth, p.windowHeight);
        video.size(canvasWidth, cameraHeight);
        video.hide();

        handPose = await ml5.handPose({
            maxHands: 1,
            flipped:  true
        });
        handPose.detectStart(video, gotHands);
        loaded = true;

        p.colorMode(p.HSB, 100);
    };

    p.draw = () => {
        if (state.redrawBackground) p.background(0);

        p.push();
        p.translate(canvasWidth, 0);
        p.scale(-1, 1);
        p.image(video, 0, canvasHeight - cameraHeight, canvasWidth, cameraHeight);
        p.filter(p.GRAY);
        p.pop();

        t += 1;

        let hand          = hands?.at(0);
        let handKeypoints = hand?.keypoints;
        if (handKeypoints) {

            const thumbTip       = handKeypoints[4];
            const indexFingerTip = handKeypoints[8];

            const pos1 = p.createVector(thumbTip.x, thumbTip.y);
            const pos2 = p.createVector(indexFingerTip.x, indexFingerTip.y);
            state.dist = p5.Vector.dist(pos1, pos2);

            if (state.dist < 30) {
                p.noStroke();
                p.fill(t % 100, 100, 100);
                p.circle((pos1.x + pos2.x) / 2, (pos1.y + pos2.y) / 2, 50);
            }
        }
    };

    p.keyPressed = () => {
        const key = p.key.toLowerCase();
        if (key === "s") p.save(`${getGifName()}.png`);
    };
};
