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
  let circles = [];
  let SIZE    = 80;
  let RADIUS  = 40;
  let GIF_SEC = 5;

  let T_STEP = 1 / (GIF_SEC * 60);

  let SPEED_STEP = 0.0003;
  let COLORS = [
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
    canvas = p.createCanvas(800, 800);
    p.noStroke();

    let o = 0;
    let n = 0;
    for (let y = 0 - RADIUS; y < p.height + RADIUS; y += RADIUS) {
      for (let x = 0 - RADIUS; x < p.width + RADIUS; x += RADIUS) {
        o += SPEED_STEP;
        n += 1;
        circles.push(new Circle({
          x    : x,
          y    : y,
          speed: o,
          _color: COLORS[n % COLORS.length]
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
      p.saveGif(getGifName(), GIF_SEC);
    }
  };

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

    constructor({x, y, speed, _color}) {
      this.center = [x, y];
      this.pos    = [x, y];
      this.speed  = speed || 0;
      this.d      = SIZE;
      this.t      = 0;
      this.color  = _color ?
        p.color(_color) :
        p.color(p.random(0,255), p.random(0,255), p.random(0,255));
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