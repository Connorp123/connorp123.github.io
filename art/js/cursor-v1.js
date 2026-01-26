/***
 *
 *     ad88888ba   88      a8P   88888888888  888888888888  ,ad8888ba,   88        88
 *    d8"     "8b  88    ,88'    88                88      d8"'    `"8b  88        88
 *    Y8,          88  ,88"      88                88     d8'            88        88
 *    `Y8aaaaa,    88,d88'       88aaaaa           88     88             88aaaaaaaa88
 *      `"""""8b,  8888"88,      88"""""           88     88             88""""""""88
 *            `8b  88P   Y8b     88                88     Y8,            88        88
 *    Y8a     a8P  88     "88,   88                88      Y8a.    .a8P  88        88
 *     "Y88888P"   88       Y8b  88888888888       88       `"Y8888Y"'   88        88
 *
 *
 */
export const cursor_v1 = (p) => {
    let canvas;
    const fps = 100;
    let cursor;

    p.setup = () => {
        canvas = createGalleryCanvas(p);
        setupFullscreenButton(p);
        p.frameRate(fps);
        cursor = new Cursor(p);
    };

    p.draw = () => {
        p.background(0);
        cursor.update();
        cursor.display();
    };
};

/***
 *
 *      ,ad8888ba,   88        88  88888888ba    ad88888ba     ,ad8888ba,    88888888ba
 *     d8"'    `"8b  88        88  88      "8b  d8"     "8b   d8"'    `"8b   88      "8b
 *    d8'            88        88  88      ,8P  Y8,          d8'        `8b  88      ,8P
 *    88             88        88  88aaaaaa8P'  `Y8aaaaa,    88          88  88aaaaaa8P'
 *    88             88        88  88""""88'      `"""""8b,  88          88  88""""88'
 *    Y8,            88        88  88    `8b            `8b  Y8,        ,8P  88    `8b
 *     Y8a.    .a8P  Y8a.    .a8P  88     `8b   Y8a     a8P   Y8a.    .a8P   88     `8b
 *      `"Y8888Y"'    `"Y8888Y"'   88      `8b   "Y88888P"     `"Y8888Y"'    88      `8b
 *
 *
 */
class Cursor {
    constructor(p) {
        // For all cursors
        this.history     = [];
        this.length      = 40;
        this.widthMean   = 10;
        this.widthStdDev = 3;
        this.t           = 0;
        this.tStep       = 0.01;
        this.p           = p;

        // For this cursor
        this.newCursor();
    }

    newCursor(pos = [this.p.mouseX, this.p.mouseY]) {

        // Generate new cursor
        this.color = [
            this.p.noise(this.t) * 255,
            this.p.noise(this.t + 5) * 255,
            this.p.noise(this.t + 10) * 255
        ];
        this.width = this.p.randomGaussian(this.widthMean, this.widthStdDev);
        this.pos   = pos;

        // Check history length
        if (this.history.length >= this.length) {
            this.history.splice(0, this.history.length - this.length + 1);
        }

        // Save the cursor
        this.history.push({
            color: this.color,
            width: this.width,
            pos:   this.pos
        });
    }

    // Create a new cursor and update the time
    update(pos) {
        this.newCursor(pos);
        this.t += this.tStep;
    }

    // Display the cursor
    display() {
        this.p.stroke(0);
        this.p.strokeWeight(0);

        // Draw each cursor in the history
        for (let i = 0; i < this.history.length - 10; i++) {
            let cursor = this.history[i];
            this.p.fill(cursor.color[0], cursor.color[1], cursor.color[2]);
            this.p.circle(cursor.pos[0], cursor.pos[1], cursor.width);
        }
    }
}

/***
 *
 *    88        88    ,ad8888ba,    88b           d88  88888888888
 *    88        88   d8"'    `"8b   888b         d888  88
 *    88        88  d8'        `8b  88`8b       d8'88  88
 *    88aaaaaaaa88  88          88  88 `8b     d8' 88  88aaaaa
 *    88""""""""88  88          88  88  `8b   d8'  88  88"""""
 *    88        88  Y8,        ,8P  88   `8b d8'   88  88
 *    88        88   Y8a.    .a8P   88    `888'    88  88
 *    88        88    `"Y8888Y"'    88     `8'     88  88888888888
 *
 *
 */

import { RandomWalker } from "/classes/RandomWalker.js";
import { createGalleryCanvas, setupFullscreenButton } from "./helpers/gallery-page-helper.js";

export const home_cursor_v1 = (p) => {
    const FPS = 100;
    let canvas;
    let cursor;
    let mouse;

    p.setup = () => {
        canvas = createInstanceCanvas(p);
        p.frameRate(FPS);
        cursor = new Cursor(p);
        mouse  = new RandomWalker(p, {});
    };

    p.draw = () => {
        redrawBackground(p);
        cursor.update(mouse.getNextPos());
        cursor.display();
    };
};


