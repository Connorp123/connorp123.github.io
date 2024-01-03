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
  let SIZE    = 10;
  let RADIUS  = 40;
  let t       = 0;
  let GIF_SEC = 5;
  // let TSTEP   = p.TWO_PI / (60 * GIF_SEC);

  let SPEED_STEP = 0.0003;

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

    let o = SPEED_STEP;
    for (let y = 0 - RADIUS; y < p.height + RADIUS; y += RADIUS) {
      for (let x = 0 - RADIUS; x < p.width + RADIUS; x += RADIUS) {
        o += SPEED_STEP;
        circles.push(new Circle({
          x    : x,
          y    : y,
          speed: o,
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

    t += 1;

    if (t === 5) {
      sleep(2000);
    }
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

    constructor({x, y, speed}) {
      this.center = [x, y];
      this.pos    = [x, y];
      this.speed  = speed || 0;
      this.d      = SIZE;
      this.t      = 0;
      this.color  = [
        0,
        182,
        250
      ];
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
      p.fill(this.color[0], this.color[1], this.color[2]);
      p.circle(this.pos[0], this.pos[1], this.d);
    }

    render() {
      this.update();
      this.display();
    }
  }
};