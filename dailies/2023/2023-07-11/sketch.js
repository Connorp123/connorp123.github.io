// Comments are Univers ASCII art

const LINE_SPACING   = 5;
const LINE_LENGTH    = 10;
const LINE_THICKNESS = 1;
const WIDTH_RATIO    = 1;
const VIDEO_WIDTH    = 150.0;
const VIDEO_HEIGHT   = 150.0;

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
        frameRate:   1,
        videoWidth:  VIDEO_WIDTH,
        videoHeight: VIDEO_HEIGHT,
        threshold:   false,
        posterize:   false,
        blur:        false
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
                width:  state.videoWidth,
                height: state.videoHeight
            }
        };

        capture = p.createCapture(constraints);
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
        redrawBackground(p);
        if (!capture.loadedmetadata) return;
        capture.loadPixels();
        p.stroke(255);
        let chunkSizeX  = 1;
        let chunkSizeY  = 1;
        let scaleFactor = p.width / state.videoWidth; // The scale factor between the video and canvas sizes
        let y           = 0; // Starting y-coordinate
        for (let j = 0; j < state.videoHeight; j += chunkSizeY) { // increment j by chunkSizeY
            let x             = 0; // Starting x-coordinate
            let sumBrightness = 0;
            while (x < state.videoWidth) {
                // Calculate the average brightness of the chunk
                sumBrightness = 0;
                for (let k = j; k < j + chunkSizeY && k < state.videoHeight; k++) { // loop over y-coordinates in chunk
                    for (let i = x; i < x + chunkSizeX && i < state.videoWidth; i++) { // loop over x-coordinates in chunk
                        let index      = (i + k * state.videoWidth) * 4;
                        let r          = capture.pixels[index];
                        let g          = capture.pixels[index + 1];
                        let b          = capture.pixels[index + 2];
                        let brightness = (r + g + b) / 3;
                        sumBrightness += brightness;
                    }
                }
                let avgBrightness = sumBrightness / (chunkSizeX * chunkSizeY); // calculate the average over the chunk

                let lineLength = p.map(avgBrightness, 0, 255, 0, chunkSizeX) * scaleFactor; // map the brightness to line length and scale
                let startX     = (x * scaleFactor) + ((chunkSizeX * scaleFactor - lineLength) / 2); // center the line and scale

                p.strokeWeight(1); // Set the weight of the stroke
                p.line(startX, y, startX + lineLength, y); // Draw a horizontal line

                x += chunkSizeX; // Move to the next chunk
            }
            let lineSpacing = p.map(sumBrightness / (state.videoWidth), 0, 255, 40, 1) / scaleFactor;
            y += lineSpacing * chunkSizeY; // Adjust the next y-coordinate according to line spacing multiplied by chunkSizeY
        }
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