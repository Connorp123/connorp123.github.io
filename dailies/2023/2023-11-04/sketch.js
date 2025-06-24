import { createFlowField } from "../../../classes/FlowFieldClass.js";
import { createSimplePhysicsObject } from "../../../classes/SimplePhysicsObject.js";
import { getGifName } from "../../../helpers/daily-helpers.js";

const createNoiseLookup = ({p}) => {
    return class NoiseLookup {
        constructor({width, height, min, max, seed, step = 0.01}) {
            // p.noiseSeed(seed || 1);
            this.w   = width;
            this.h   = height;
            this.min = min;
            this.max = max;

            this.noiseValues = [];

            for (let row = 0; row < height; row++) {
                let nextCol = [];

                for (let col = 0; col < width; col++) {
                    nextCol.push(p.noise(row * step, col * step));
                }

                this.noiseValues.push(nextCol);
            }

            console.log(this.noiseValues);
        }

        lookup({x, y}) {
            x = p.floor(x);
            y = p.floor(y);
            if (y < 0 || y >= this.noiseValues.length || x < 0 || x >= this.noiseValues[y].length) {
                return -1;
            }

            return p.floor(p.map(this.noiseValues[y][x], 0, 1, this.min, this.max));
        }
    };
};

export const sketch = (p) => {

    // Basics
    let canvas;
    let state = {
        debug:            false,
        redrawBackground: false
    };
    // let gui   = createGui({state});

    // Class creators
    const BigCircle  = createSimplePhysicsObject({p});
    const FlowField  = createFlowField({p});
    const NoiseField = createNoiseLookup({p});

    // Global vars
    let circles = [];
    let flowField;
    let noiseField;

    p.setup = () => {
        canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        p.frameRate(144);
        p.background(0);
        p.colorMode(p.HSB, 360, 100, 100);

        noiseField = new NoiseField({
            width:  p.width,
            height: p.height,
            min:    0,
            max:    360,
            step:   0.005,
            seed:   p.random() * 1000
        });

        for (let i = 0; i < 100; i++) {
            circles.push(new BigCircle({
                displayFunction: (ref) => {
                    const lookupVal = noiseField.lookup({
                        x: ref.pos.x,
                        y: ref.pos.y
                    });
                    if (lookupVal >= 0) {
                        ref.color = [lookupVal, 100, 100];
                    }
                    p.stroke(...ref.color);
                    p.noFill();
                    // p.fill(...ref.color);
                    p.circle(ref.pos.x, ref.pos.y, 400);
                }
            }));
        }

        flowField = new FlowField(30);
    };

    p.draw = () => {
        if (state.redrawBackground) p.background(0);

        circles.forEach(circle => {
            circle.follow(flowField);
            circle.update();
            circle.display();
        });

        if (state.debug) flowField.display();
    };

    p.keyPressed = () => {
        if (p.key === "N" || p.key === "n") flowField = new FlowField(30);
        if (p.key === "S" || p.key === "s") p.save(`${getGifName()}.png`);
    };
};
