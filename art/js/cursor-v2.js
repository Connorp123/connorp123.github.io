import { createGalleryCanvas, setupFullscreenButton } from "../../helpers/gallery-page-helper.js";

export const cursor_v2 = (p) => {

    let walkers    = [];
    let redraw     = true;
    let numWalkers = 10;
    let canvas;

    p.setup = () => {
        canvas = createGalleryCanvas(p);
        setupFullscreenButton(p);
        for (let i = 0; i < numWalkers; i++) {
            walkers.push(new Walker(p.mouseX, p.mouseY));
            console.log("hi");
        }
    };

    p.draw = () => {
        if (redraw) p.background(0);
        // Shows the walker
        for (let i = 0; i < walkers.length; ++i) {
            walkers[i].update();
            walkers[i].display();
        }
    };

    function Walker(x, y) {

        // Initializes the walker to the middle of the screen
        this.pos = p.createVector(x, y);

        // Initializes the velocity
        this.vel    = p.createVector(20, 20);
        this.acc    = p.createVector(0, 0);
        this.r      = p.randomGaussian(5, 1);                     // Radius
        this.maxVel = p.randomGaussian(15, 2);
        this.maxAcc = p.randomGaussian(2, 0.5);
        this.R      = p.random(0, 255);
        this.G      = p.random(0, 255);
        this.B      = p.random(0, 255);

        // Makes it walk randomly around the screen
        this.update = function () {

            // Gets the mouse position
            let mouse = p.createVector(p.mouseX, p.mouseY);

            // Points the acceleration towards the mouse
            this.acc = p5.Vector.sub(mouse, this.pos);

            // Controls the max size of the acceleration
            this.acc.limit(this.maxAcc);

            // Acceleration changes velocity
            this.vel.add(this.acc);
            this.vel.limit(this.maxVel);

            // Velocity changes position
            this.pos.add(this.vel);
        };

        // Draws the walker
        this.display = function () {
            p.fill(this.R, this.G, this.B);
            p.ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
        };
    }
};
