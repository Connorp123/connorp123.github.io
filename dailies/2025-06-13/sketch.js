import { getGifName } from "../../helpers/display-helpers-modules.js";
import { createGui } from "../../helpers/gui-helpers.js";

const DISTANCE = 40;
const MAX_SIZE = 30;
const SPEED    = 0.3;

let state = {
    debug:            false,
    redrawBackground: true
};

const createPoint = ({p}) => {
    return class MyClass {
        constructor({x, y, t}) {
            this.pos  = [x, y];
            this.t    = t || 0;
            this.size = 0;
        }

        update() {
            this.t += SPEED;
            const cycleTime = p.sin(this.t / p.TWO_PI);
            this.size       = cycleTime * MAX_SIZE;
            this.pos[0]     = this.pos[0] + cycleTime;
            this.pos[1]     = this.pos[1] + cycleTime;
        }

        draw() {
            p.fill(151, 147, 213);
            p.ellipse(...this.pos, this.size);
        }
    };
};


export const sketch = (p) => {

    // Basics
    let canvas;

    let gui = createGui({state});

    // Class creators
    const Point = createPoint({p});

    // Global vars
    let classInstances = [];

    p.setup = () => {
        canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        p.frameRate(144);
        let totalCount = 0;
        for (let i = 0; i < (p.width / DISTANCE); i++) {
            for (let j = 0; j < (p.height / DISTANCE + MAX_SIZE); j++) {
                classInstances.push(new Point({x: i * DISTANCE, y: j * DISTANCE, t: i}));
                totalCount++;
            }
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
