import { createGui } from "../../helpers/gui-helpers.js";

const createClass = ({p}) => {
    return class MyClass {
        constructor() {
            this.pos = [p.mouseX, p.mouseY];
        }

        update() {
            this.pos = [p.mouseX, p.mouseY];
        }

        draw() {
            p.ellipse(...this.pos, 100);
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
    const MyClass = createClass({p});

    // Global vars
    let classInstance;

    p.setup = () => {
        canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        p.frameRate(144);
        classInstance = new MyClass();
    };

    p.draw = () => {
        if (state.redrawBackground) p.background(0);
        classInstance.update();
        classInstance.draw();
    };
};