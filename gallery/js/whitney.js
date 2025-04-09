// Inspired by John Whitney - Matrix (1971) and also a post by IG: @perryeyal about @zach.lieberman's course named "Recreating the Past"
// https://www.youtube.com/watch?v=XGe9QuJWOIg


import { createGalleryCanvas } from "../../helpers/gallery-page-helper.js";

export const whitney = (p) => {
    let telescopes = [];
    let redraw     = true;
    let fading     = false;
    let canvas;

    p.setup = () => {
        canvas = createGalleryCanvas(p);
        canvas.mouseClicked(drawTelescope);
        p.frameRate(5);
        p.background(0);
    };

    p.draw = () => {
        if (redraw) {
            p.background(0, 100);
        }

        for (let i = 0; i < telescopes.length; i++) {
            telescopes[i].update();
            telescopes[i].display();
        }

        // Kill the old shapes
        if (p.frameCount % 150 === 0) {
            telescopes = [];
        }
    };

    const drawTelescope = () => {
        // Draw the shapes with increasing brightness
        telescopes.push(new Telescope(p.mouseX, p.mouseY, p));

        // Start a fading timer
        fading = true;
    };
};

const SPACING     = 20;
const GROWTH_RATE = 2;
const MAX_SHAPES  = 10;

class Telescope {

    constructor(x, y, p) {
        this.p   = p;
        this.pos = this.p.createVector(x, y);

        this.isIncreasing  = this.p.random() > 0.5;
        this.isApproaching = this.p.random() > 0.5;
        this.quadrant      = p.int(this.p.random(0, 4) + 1);

        this.R = this.p.random(0, 255);
        this.G = this.p.random(0, 255);
        this.B = this.p.random(0, 255);

        this.height = this.isIncreasing ? 1 : MAX_SHAPES * GROWTH_RATE;
        this.width  = this.isIncreasing ? 1 : MAX_SHAPES * GROWTH_RATE;
        this.age    = 0;

        this.shape = p.int(p.random(0, 3) + 1);
    }

    update = () => {
        if (!this.isDead()) {
            // Grow or shrink
            if (this.isIncreasing) {
                this.height += GROWTH_RATE;
                this.width += GROWTH_RATE;
            } else {
                this.height -= GROWTH_RATE;
                this.width -= GROWTH_RATE;
            }

            // Move
            if (this.quadrant === 1) {
                this.pos.x += SPACING;
                this.pos.y -= SPACING;
            } else if (this.quadrant === 2) {
                this.pos.x -= SPACING;
                this.pos.y -= SPACING;
            } else if (this.quadrant === 3) {
                this.pos.x += SPACING;
                this.pos.y -= SPACING;
            } else if (this.quadrant === 4) {
                this.pos.x += SPACING;
                this.pos.y += SPACING;
            }

            // Kill old
            this.age++;
        }
    };

    display = () => {
        if (!this.isDead()) {
            this.p.noFill();

            if (this.isApproaching) {
                this.p.strokeWeight(this.age);
            } else {
                this.p.strokeWeight(MAX_SHAPES - this.age);
            }
            this.p.stroke(this.R, this.G, this.B);

            if (this.shape === 1) {
                this.p.square(this.pos.x, this.pos.y, this.height * SPACING);
            } else if (this.shape === 2) {
                this.p.circle(this.pos.x, this.pos.y, this.height * SPACING);
            } else {
                this.p.triangle(this.pos.x, this.pos.y,
                    this.pos.x + (10 * this.width), this.pos.y + (30 * this.height),
                    this.pos.x - (10 * this.width), this.pos.y + (30 * this.height));
            }
        }
    };

    isDead = () => {
        return this.age >= MAX_SHAPES;
    };
}
