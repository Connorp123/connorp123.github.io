// Comments are Univers ASCII art

const SP = 20;
const LN = 5;
const TH = 5;

class RandomLine {
    constructor({p, x, y}) {
        this.p      = p;
        this.x      = p.floor(x);
        this.y      = p.floor(y);
        this.theta  = p.random(0, p.TWO_PI);
        this.length = LN;
        this.dx = p.cos(this.theta) * this.length;
        this.dy = p.sin(this.theta) * this.length;
    }

    display({refImage}={}) {

        if(refImage) {
            let color = refImage.get(this.x, this.y);
            this.p.stroke(color[0], color[1], color[2]);
            // this.p.stroke(this.p.brightness(color) / 100 * 255);
        }

        this.p.push();
        this.p.translate(this.x, this.y);
        this.p.line(0,0, this.dx, this.dy);
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
    let threshold = 0.5;
    let debug     = false;
    let lines     = [];
    let lineSeparation = SP;

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
        capture.hide();
        p.pixelDensity(1);

        // Create lines
        p.strokeWeight(TH);
        for (let x = 0; x < p.width; x += lineSeparation) {
            for (let y = 0; y < p.height; y += lineSeparation) {
                lines.push(new RandomLine({p, x, y}));
            }
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

        if (debug) {
            p.image(capture, 0, 0, p.width, p.width * capture.height / capture.width);
        }

        lines.forEach(line => {
            line.display({refImage: capture});
        });
        console.log('frameRate', p.frameRate());
        // p.filter(p.THRESHOLD, threshold);
    };

    p.mouseClicked = () => debug = !debug;

    p.mouseWheel = (event) => {
        if (event.deltaY < 0) {
            threshold += 0.01;
        } else if (threshold > 0) {
            threshold -= 0.01;
        }
        console.log("threshold", threshold);
    };

    p.keyPressed = () => {
        if (p.key === "S" || p.key === "s") {
            p.saveCanvas(canvas, "threshold-pic", "png");
        }
    };
};