import { createGui } from "../../helpers/gui-helpers.js";
import { getGifName } from "../../helpers/modules/display-helpers-modules.js";

const createClass = ({p}) => {
    return class MyClass {
        constructor({x, y}) {
            this.pos = [x, y];
        }

        update({x, y}) {
            this.pos = [x, y];
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
    const NUM_INSTANCES = 1;
    let classInstances  = [];


    p.setup = () => {
        canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        p.frameRate(144);
        for (let i = 0; i < NUM_INSTANCES; i++) {
            classInstances.push(new MyClass({x: p.mouseX, y: p.mouseY}));
        }
    };

    p.draw = () => {
        if (state.redrawBackground) p.background(0);
        classInstances.forEach(classInstance => {
            classInstance.update({x: p.mouseX, y: p.mouseY});
            classInstance.draw();
        });
    };

    p.keyPressed = () => {
        const key = p.key.toLowerCase();
        if (key === "s") p.save(`${getGifName()}.png`);
    };
};