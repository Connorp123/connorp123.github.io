import { createGalleryCanvas, setupFullscreenButton } from "../../helpers/gallery-page-helper.js";

export const rapid_bubbles = (p) => {
    let canvas;
    let redraw = false;
    let radius = 1;
    let x = 0;
    let y = 0;
    let R, G, B;
    let forgiveness = 20;
    let SPACING = 10;
    let b = 12;

    p.setup = () => {
        canvas = createGalleryCanvas(p);
        setupFullscreenButton(p);
        p.frameRate(45);
        p.background(0);
        p.noFill();
        p.strokeWeight(1);
    };

    p.draw = () => {
        if (redraw) {
            p.background(0);
        }

        if (p.mouseIsPressed) {
            // If the mouse is in the same spot
            if (p.abs(x - p.mouseX) <= forgiveness && p.abs(y - p.mouseY) <= forgiveness) {
                radius += SPACING;
            } else {
                radius = p.int(p.random(4, 6) + 1);
                x = p.mouseX;
                y = p.mouseY;
                R = p.random(0, 255);
                G = p.random(0, 255);
                B = p.random(0, 255);
            }
            drawCircle(radius);
        }
    };

    const drawCircle = () => {
        p.stroke(R, G, B);
        p.circle(p.mouseX, p.mouseY, radius);
    };


    p.keyPressed = () => {
        if (p.key === "b" || p.key === "B") {
            redraw = !redraw;
        }
    };
};
