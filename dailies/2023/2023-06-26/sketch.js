// Comments are Univers ASCII art

const LINE_SPACING   = 5;
const LINE_LENGTH    = 10;
const LINE_THICKNESS = 1;
const WIDTH_RATIO    = 1;
const VIDEO_WIDTH    = 150.0;
const VIDEO_HEIGHT   = 100.0;

import { RandomLine } from "./RandomLine.js";
import { createGui } from "../../../helpers/gui-helpers.js";

export const sketch = (p) => {

    /***
     *
     *      ,ad8888ba,    ,ad8888ba,    888b      88   ad88888ba  888888888888    db         888b      88  888888888888  ad88888ba
     *     d8"'    `"8b  d8"'    `"8b   8888b     88  d8"     "8b      88        d88b        8888b     88       88      d8"     "8b
     *    d8'           d8'        `8b  88 `8b    88  Y8,              88       d8'`8b       88 `8b    88       88      Y8,
     *    88            88          88  88  `8b   88  `Y8aaaaa,        88      d8'  `8b      88  `8b   88       88      `Y8aaaaa,
     *    88            88          88  88   `8b  88    `"""""8b,      88     d8YaaaaY8b     88   `8b  88       88        `"""""8b,
     *    Y8,           Y8,        ,8P  88    `8b 88          `8b      88    d8""""""""8b    88    `8b 88       88              `8b
     *     Y8a.    .a8P  Y8a.    .a8P   88     `8888  Y8a     a8P      88   d8'        `8b   88     `8888       88      Y8a     a8P
     *      `"Y8888Y"'    `"Y8888Y"'    88      `888   "Y88888P"       88  d8'          `8b  88      `888       88       "Y88888P"
     *
     *
     */
    let canvas;
    let capture;
    let threshold = 0.5;
    let lines     = [];

    let state = {
        frameRate:     1,
        lineSpacing:   LINE_SPACING,
        lineLength:    LINE_LENGTH,
        lineThickness: LINE_THICKNESS,
        widthRatio:    WIDTH_RATIO,
        videoWidth:    VIDEO_WIDTH,
        videoHeight:   VIDEO_HEIGHT,
        threshold:     false,
        posterize:     false,
        blur:          false
    };
    let gui   = createGui({state, name: "daily"});

    /***
     *
     *     ad88888ba   88888888888  888888888888  88        88  88888888ba
     *    d8"     "8b  88                88       88        88  88      "8b
     *    Y8,          88                88       88        88  88      ,8P
     *    `Y8aaaaa,    88aaaaa           88       88        88  88aaaaaa8P'
     *      `"""""8b,  88"""""           88       88        88  88""""""'
     // *            `8b  88                88       88        88  88
     *    Y8a     a8P  88                88       Y8a.    .a8P  88
     *     "Y88888P"   88888888888       88        `"Y8888Y"'   88
     *
     *
     */
    p.setup = () => {
        canvas = createInstanceCanvas(p);

        let constraints = {
            video: {
                width:     state.videoWidth,
                height:    state.videoHeight,
                frameRate: 2.0
            }
        };

        capture = p.createCapture(constraints, () => {
        });

        // Create lines
        p.pixelDensity(1);
        p.strokeWeight(state.lineThickness);
        for (let i = 0; i < state.videoWidth; i++) {
            const row = [];
            for (let j = 0; j < state.videoHeight; j++) {
                // Assuming pixel density is 1
                const pixelIndex = (i + j * state.videoWidth) * 4;
                row.push(new RandomLine({
                    p,
                    pixelIndex,
                    lineLength: state.lineLength,
                    x:          i * state.lineSpacing,
                    y:          j * state.lineSpacing
                }));
            }
            lines.push(row);
        }
    };


    /***
     *
     *    88888888ba   88888888888  888b      88  88888888ba,    88888888888  88888888ba
     *    88      "8b  88           8888b     88  88      `"8b   88           88      "8b
     *    88      ,8P  88           88 `8b    88  88        `8b  88           88      ,8P
     *    88aaaaaa8P'  88aaaaa      88  `8b   88  88         88  88aaaaa      88aaaaaa8P'
     *    88""""88'    88"""""      88   `8b  88  88         88  88"""""      88""""88'
     *    88    `8b    88           88    `8b 88  88         8P  88           88    `8b
     *    88     `8b   88           88     `8888  88      .a8P   88           88     `8b
     *    88      `8b  88888888888  88      `888  88888888Y"'    88888888888  88      `8b
     // *
     *
     */
    p.draw = () => {
        // redrawBackground(p);
        if (!capture.loadedmetadata) return;
        capture.loadPixels();
        lines.forEach(row => {
            row.forEach(line => {
                let i = line.index;
                p.stroke(capture.pixels[i], capture.pixels[i + 1], capture.pixels[i + 2]);
                line.display();
            });
        });
        state.frameRate = p.frameRate();
        if (state.threshold) {
            p.filter(p.THRESHOLD, threshold);
        }
        if (state.posterize) {
            p.filter(p.POSTERIZE, 2);
        }
        if (state.blur) {
            p.filter(p.BLUR, 2);
        }
    };

    p.keyPressed = () => {
        if (p.key === "S" || p.key === "s") p.saveCanvas(canvas, "threshold-pic", "png");
    };
};