import { createGui } from "../../helpers/gui-helpers.js";

const createRecursiveClass = ({p}) => {
    return class Recursive {
        constructor({child, w, h, rot, color}) {
            this.pos   = [p.mouseX, p.mouseY];
            this.child = child;
            this.w     = w;
            this.h     = h;
            this.rot   = rot;
            this.color = [...color];
        }

        update() {
            this.pos = [p.mouseX, p.mouseY];
            this.child?.update();
        }

        draw() {

            p.push();

            p.translate(...this.pos);
            p.rotate(this.rot);
            p.stroke(...this.color);
            p.quad(
                0, 0,
                this.w, 0,
                this.w, this.h,
                0, this.h
            );


            p.pop();

            this.child?.draw();
        }
    };
};

export const sketch = (p) => {

    // Basics
    let canvas;
    let state = {
        debug:            false,
        redrawBackground: true
    };
    let gui   = createGui({state});

    // Class creators
    const Recursive = createRecursiveClass({p});

    // Global vars
    let classInstance;
    let recursiveInstances = [];

    p.setup = () => {
        canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        p.frameRate(144);
        p.angleMode(p.DEGREES);
        createRecursives();
    };

    p.draw = () => {
        if (state.redrawBackground) p.background(0);
        p.fill(0);
        p.stroke(255);
        recursiveInstances.forEach(instance => {
            instance.update();
            instance.draw();
        });
    };

    function createRecursives() {

        let w     = 500;
        let h     = 500;
        let rot   = 0;
        let color = [0, 0, 200];

        let prevClass = null;

        while (w > 0 && h > 0) {

            let tempClass = new Recursive({
                child: prevClass != null ? prevClass : null,
                w,
                h,
                rot,
                color
            });
            recursiveInstances.push(tempClass);

            prevClass = tempClass;
            w -= 5;
            h -= 5;
            color     = [color[0], color[1], color[2] + 1];
        }


    }
};