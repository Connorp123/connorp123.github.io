import { createWalker } from "../../classes/Walker.js";
import { createGalleryCanvas, setupFullscreenButton } from "./helpers/gallery-page-helper.js";

export const attraction = (p) => {
    let canvas;
    let walkers          = [];
    let redraw           = true;
    let recording        = false;
    let frame            = 0;
    let RECORDING_LENGTH = 30 * 5;
    const Walker         = createWalker({p});

    p.setup = () => {
        canvas = createGalleryCanvas(p);
        setupFullscreenButton(p);
        p.frameRate(60);

        walkers.push(new Walker(p.mouseX, p.mouseY, 20));
        walkers.push(new Walker(p.mouseX, p.mouseY, 20));
        walkers.push(new Walker(p.mouseX, p.mouseY, 20));
        walkers.push(new Walker(p.mouseX, p.mouseY, 20));
        p.fill(255);
    };

    p.draw = () => {
        if (redraw) p.background(0);

        // Shows the walker
        for (let i = 0; i < walkers.length; ++i) {
            walkers[i].update();
            walkers[i].display();
        }

        if (recording) {
            p.saveCanvas("img" + frame, "png");
            frame++;
            if (frame >= RECORDING_LENGTH) {
                recording = false;
            }
        }
    };

    p.touchStarted = () => {
        walkers.push(new Walker(p.mouseX, p.mouseY, 20));
    };

    p.keyPressed = () => {
        if (p.key === "p" || p.key === "P") {
            alert(
                "Controls:\n"
                + "F to place a ball\n"
                + "C to clear all balls\n"
                + "B to turn off background re-draw\n"
                + "S to screenshot\n"
            );
        } else if (p.key === "c" || p.key === "C") {
            walkers = [];
        } else if (p.key === "b" || p.key === "B") {
            redraw = !redraw;
        } else if (p.key === "s" || p.key === "S") {
            recording = true;
        }
    };
};
