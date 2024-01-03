import { createGui } from "../../helpers/gui-helpers.js";

// Prompt:
// No palettes.
// Generative colors, procedural colors, emergent colors.

const createClass = ({p}) => {
    return class MyClass {
        constructor(x, y, color) {
            this.pos   = [x, y];
            this.vel   = [0, 0];
            this.acc   = [0, 0];
            this.color = color;
        }

        update() {

            this.vel[0] += this.acc[0];
            this.vel[1] += this.acc[1];


            this.pos[0] += this.vel[0];
            this.pos[1] += this.vel[1];

            this.acc[1] += 0.01;

        }

        draw() {
            p.fill(this.color, 100, 100);
            p.ellipse(...this.pos, 100);
        }
    };
};

export const sketch = (p) => {

    // Basics
    let canvas;
    let state = {
        debug:            false,
        redrawBackground: false,
        tick:             0
    };
    let gui   = createGui({state});

    // Class creators
    const MyClass = createClass({p});

    // Global vars
    let classInstances = [];
    let color          = 0;

    p.setup = () => {
        canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB);
        p.frameRate(144);
        p.background(0);
    };

    p.draw = () => {
        if (state.redrawBackground) p.background(0);

        state.tick += 1;
        color = p.map(p.sin(state.tick * 0.01), -1, 1, 0, 255);

        if (p.mouseIsPressed) {
            classInstances.push(new MyClass(p.mouseX, p.mouseY, color));
        }

        classInstances.forEach(classInstance => {
            classInstance.update();
            classInstance.draw();
        });

        if (classInstances.length > 200) classInstances.slice(1);
    };
};