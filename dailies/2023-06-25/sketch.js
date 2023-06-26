// Comments are Univers ASCII art

const LINE_SPACING   = 5;
const LINE_LENGTH    = 10;
const LINE_THICKNESS = 2;
const CAMERA_SCALE   = 3.5;

class RandomLine {
    constructor({p, pixelIndex, x, y}) {
        this.p      = p;
        this.x      = p.floor(x);
        this.y      = p.floor(y);
        this.theta  = p.random(0, p.TWO_PI);
        this.length = LINE_LENGTH;
        this.dx     = p.cos(this.theta) * this.length;
        this.dy     = p.sin(this.theta) * this.length;
        this.index  = pixelIndex;
    }

    display() {
        this.p.push();
        this.p.translate(this.x, this.y);
        this.p.line(0, 0, this.dx, this.dy);
        this.p.pop();
    }

}

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
    let threshold      = 0.5;
    let debug          = false;
    let lines          = [];
    let lineSeparation = LINE_SPACING;

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
        canvas  = createInstanceCanvas(p);
        capture = p.createCapture(p.VIDEO);

        if (p.width > p.height) {
            capture.size(p.width / LINE_SPACING / 2, p.AUTO);
        } else {
            capture.size(p.AUTO, p.height / LINE_SPACING / 2);
        }

        // capture.size(16 * Math.pow(2, CAMERA_SCALE), 9 * Math.pow(2, CAMERA_SCALE));
        // capture.size(p.width / 4, p.height / 4);
        capture.hide();
        p.pixelDensity(1);

        // Create lines
        p.strokeWeight(LINE_THICKNESS);
        for (let i = 0; i < capture.width; i++) {
            const row = [];
            for (let j = 0; j < capture.height; j++) {
                // Assuming pixel density is 1
                const pixelIndex = (i + j * capture.width) * 4;
                row.push(new RandomLine({p, pixelIndex, x: i * lineSeparation, y: j * lineSeparation}));
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
        redrawBackground(p);
        capture.loadPixels();
        lines.forEach(row => {
            row.forEach(line => {
                let i = line.index;
                if (!debug) {
                    p.stroke(capture.pixels[i], capture.pixels[i + 1], capture.pixels[i + 2]);
                } else {
                    let brightness = (capture.pixels[i] + capture.pixels[i + 1] + capture.pixels[i + 2]) / 3;
                    p.stroke(brightness);
                }
                line.display();
            });
        });
        console.log("frameRate", p.frameRate());
        // p.filter(p.THRESHOLD, threshold);
        // p.filter(p.POSTERIZE, 20);
    };

    p.mouseClicked = () => debug = !debug;

    p.mouseWheel = (event) => {
        if (event.deltaY < 0) threshold += 0.01;
        else if (threshold > 0) threshold -= 0.01;
        console.log("threshold", threshold);
    };

    p.keyPressed = () => {
        if (p.key === "S" || p.key === "s") p.saveCanvas(canvas, "threshold-pic", "png");
    };
};