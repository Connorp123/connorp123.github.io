// Comments are Univers ASCII art

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
    let circles    = [];
    let SIZE       = 60;
    let RADIUS     = 30;
    let GIF_SEC    = 6;
    let FRAME_RATE = 30;
    let T_START    = 0;

    let SPEED_STEP = 0.0003;
    let COLORS     = [
        '#043448',
        '#1D7964',
        '#DFD79E',
        '#E59644',
        '#F94740',
    ]

    /***
     *
     *     ad88888ba   88888888888  888888888888  88        88  88888888ba
     *    d8"     "8b  88                88       88        88  88      "8b
     *    Y8,          88                88       88        88  88      ,8P
     *    `Y8aaaaa,    88aaaaa           88       88        88  88aaaaaa8P'
     *      `"""""8b,  88"""""           88       88        88  88""""""'
     *            `8b  88                88       88        88  88
     *    Y8a     a8P  88                88       Y8a.    .a8P  88
     *     "Y88888P"   88888888888       88        `"Y8888Y"'   88
     *
     *
     */
    p.setup = () => {
        canvas = p.createCanvas(450, 800);
        p.noStroke();
        p.frameRate(FRAME_RATE);

        let o = SPEED_STEP;
        let c = 0;
        for (let y = 0 - RADIUS; y < p.height + RADIUS; y += RADIUS) {
            for (let x = 0 - RADIUS; x < p.width + RADIUS; x += RADIUS) {
                o += SPEED_STEP;
                c += 1;
                circles.push(new Circle({
                    _x:     x,
                    _y:     y,
                    _t:     T_START,
                    _speed: o,
                    _color: COLORS[c % COLORS.length]
                }));
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
     *
     *
     */


    function sleep(milliseconds) {
        const date      = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }

    p.draw = () => {
        redrawBackground(p);

        if (p.frameCount === 1) {
            sleep(2000);
        }

        circles.forEach(circle => {
            circle.render();
        });
    };

    /***
     *
     *    88      a8P   88888888888  8b        d8  88888888ba   88888888ba   88888888888  ad88888ba    ad88888ba   88888888888  88888888ba,
     *    88    ,88'    88            Y8,    ,8P   88      "8b  88      "8b  88          d8"     "8b  d8"     "8b  88           88      `"8b
     *    88  ,88"      88             Y8,  ,8P    88      ,8P  88      ,8P  88          Y8,          Y8,          88           88        `8b
     *    88,d88'       88aaaaa         "8aa8"     88aaaaaa8P'  88aaaaaa8P'  88aaaaa     `Y8aaaaa,    `Y8aaaaa,    88aaaaa      88         88
     *    8888"88,      88"""""          `88'      88""""""'    88""""88'    88"""""       `"""""8b,    `"""""8b,  88"""""      88         88
     *    88P   Y8b     88                88       88           88    `8b    88                  `8b          `8b  88           88         8P
     *    88     "88,   88                88       88           88     `8b   88          Y8a     a8P  Y8a     a8P  88           88      .a8P
     *    88       Y8b  88888888888       88       88           88      `8b  88888888888  "Y88888P"    "Y88888P"   88888888888  88888888Y"'
     *
     *
     */


    p.keyPressed = () => {
        let key = p.key.toUpperCase();
        if (key === "S") {
            console.log(`Start frame: ${p.frameCount}`);
            p.saveGif(getGifName(), GIF_SEC);
        }
    };

    p.mouseClicked = () => {
        p.saveGif(getGifName(), GIF_SEC);
    }

    /***
     *
     *      ,ad8888ba,   88  88888888ba     ,ad8888ba,   88           88888888888
     *     d8"'    `"8b  88  88      "8b   d8"'    `"8b  88           88
     *    d8'            88  88      ,8P  d8'            88           88
     *    88             88  88aaaaaa8P'  88             88           88aaaaa
     *    88             88  88""""88'    88             88           88"""""
     *    Y8,            88  88    `8b    Y8,            88           88
     *     Y8a.    .a8P  88  88     `8b    Y8a.    .a8P  88           88
     *      `"Y8888Y"'   88  88      `8b    `"Y8888Y"'   88888888888  88888888888
     *
     *
     */
    class Circle {

        constructor({_x, _y, _speed, _t, _color}) {
            this.center = [_x, _y];
            this.pos    = [_x, _y];
            this.speed  = _speed || 0;
            this.d      = SIZE;
            this.t      = _t;
            this.color  = p.color(_color);
        }

        update() {
            // Move in circle based on offset
            this.t += this.speed;

            this.pos = [
                this.center[0] + (p.cos(this.t) * RADIUS),
                this.center[1] + (p.sin(this.t) * RADIUS),
            ];
        }

        display() {
            p.fill(this.color);
            p.circle(this.pos[0], this.pos[1], this.d);
        }

        render() {
            this.update();
            this.display();
        }
    }
};