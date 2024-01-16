import { getGifName } from "../../helpers/modules/display-helpers-modules.js";

// Day 13 - wobbly sin

const createSinWave = ({p}) => {
    return class SinWave {
        constructor({
                        x,
                        yMin = p.height - 600,
                        yMax = 600,
                        t = 0,
                        tScale = 5,
                        xScale = 2,
                        size = 100,
                        a = 5,
                        a1 = 1,
                        a2 = 2,
                        b = -1,
                        b1 = 1,
                        b2 = 1,
                        c = 5,
                        c1 = 1,
                        c2 = 1
                    }) {
            this.x = x;

            this.aScales = [a, a1, a2];
            this.bScales = [b, b1, b2];
            this.cScales = [c, c1, c2];

            this.yMin = yMin;
            this.yMax = yMax;

            this.t = t;

            this.size  = size;
            this.color = p.random(0, 360);
        }

        sinVal(n = 0) {
            return p.sin((this.x * this.aScales[n]) + (this.t * this.bScales[n]) + this.cScales[n]);
        }

        update() {
            this.t += 0.01;
        }

        draw() {

            let funcValue = this.sinVal(0);

            let y = p.map(funcValue, -1, 1, this.yMin, this.yMax);
            p.fill(this.color, 360, 360);
            p.stroke(this.color, 360, 360);
            p.ellipse(this.x, y, this.size);
        }
    };
};

export const sketch = (p) => {

    // Basics
    let canvas;
    let state = {
        debug:            false,
        redrawBackground: true,
        size:             2,
        a:                5,
        a1:               1,
        a2:               4,
        b:                3,
        b1:               5,
        b2:               1,
        c:                0,
        c1:               0,
        c2:               0
    };
    // let gui   = createGui({state, onChange: () => onChange()});

    // Class creators
    const SinWave = createSinWave({p});

    // Global vars
    let classInstances = [];


    function onChange() {
        classInstances = [];
        for (let x = 0; x < p.width; x += state.size) {
            classInstances.push(new SinWave({
                x,
                ...state
            }));
        }
    }


    p.setup = () => {
        canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        p.frameRate(144);
        p.colorMode(p.HSB, 360);
        onChange();
    };

    p.draw = () => {
        if (state.redrawBackground) p.background(0);
        classInstances.forEach(classInstance => {
            classInstance.update();
            classInstance.draw();
        });
    };

    p.keyPressed = () => {
        const key = p.key.toLowerCase();
        if (key === "s") p.save(`${getGifName()}.png`);
    };
};