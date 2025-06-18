import { createGalleryCanvas, setupFullscreenButton } from "../../helpers/gallery-page-helper.js";

export const random_number_visualizer = (p) => {
    let num_dots = 1000000;
    let dots     = [];
    let numDots  = 0;
    let myCanvas;

    p.setup = () => {
        myCanvas = createGalleryCanvas(p);
        setupFullscreenButton(p);
        p.noStroke();
        p.textSize(100);
        p.textAlign(p.RIGHT, p.TOP);
        setScale(25);

        // Create the dots
        for (let i = 0; i < p.sqrt(num_dots); i++) {
            for (let j = 0; j < p.sqrt(num_dots); j++) {
                dots.push(new Dot(i * scale[0], j * scale[1]));
            }
        }
    };
    //------------------------------------------------------------------------------------------------

    p.draw = () => {
        numDots = 0;
        setWorldBorder(p);
        p.background(0);
        dots.forEach(dot => {
            dot.display();
        });
        showNumDots();
    };
    //------------------------------------------------------------------------------------------------

    let showNumDots = () => {
        p.strokeWeight(8);
        p.stroke(0);
        p.fill(255);
        p.text(`${numDots} dots`, p.width, 0);
        p.noStroke();
    };

    //------------------------------------------------------------------------------------------------

    p.mouseWheel   = (e) => {
        if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
            return onMouseWheel(p, e);
        } else {
            return true;
        }
    };
    //
    p.touchStarted = () => {
        if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
            return onTouchStarted(p);
        } else {
            return true;
        }
    };
    p.touchMoved   = () => {
        if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
            return onTouchMoved(p);
        } else {
            return true;
        }
    };

    //------------------------------------------------------------------------------------------------

    class Dot {

        constructor(x, y) {
            this.pos = screenToWorld([x, y]);
            this.rgb = [p.random(0, 255), p.random(0, 255), p.random(0, 255)];
        }

        display = () => {
            if (isInScreen(this.pos, scale[0])) {
                let screenPos = worldToScreen(this.pos);
                numDots += 1;
                p.fill(this.rgb[0], this.rgb[1], this.rgb[2]);
                p.circle(screenPos[0], screenPos[1], scale[0]);
            }
        };
    }
};
