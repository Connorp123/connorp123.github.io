import { getGifName } from "../../helpers/display-helpers-modules.js";

const MAX_OFFSET = 20;

const createDot = ({p}) => {
    return class Dot {
        constructor({baseX, baseY, time, size}) {
            this.pos   = [baseX, baseY];
            this.baseX = baseX;
            this.baseY = baseY;
            this.size  = size;
            this.t     = time;
        }

        update() {
            const xoff  = p.sin(this.t / 20) * MAX_OFFSET;
            this.pos[0] = this.baseX + xoff;
            this.t      = this.t + 1 % 100;
        }

        draw() {
            p.ellipse(...this.pos, this.size);
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
    // let gui   = createGui({state});

    // Class creators
    const Dot = createDot({p});

    // Global vars
    const X_SPACING = 10;
    const Y_SPACING = 3;
    const DOT_SIZE  = 2;

    let dots = [];


    p.setup = () => {
        canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        p.frameRate(144);
        p.noStroke();
        p.fill(255);

        for (let x = 0; x <= p.width; x += X_SPACING) {
            for (let y = 0; y < p.height; y += Y_SPACING) {
                const xoff = p.sin(y / 20) * MAX_OFFSET;
                dots.push(new Dot({
                    baseX: x + xoff,
                    baseY: y,
                    time:  y + x,
                    size:  DOT_SIZE
                }));
            }
        }
    };

    p.draw = () => {
        if (state.redrawBackground) p.background(0);
        dots.forEach(classInstance => {
            classInstance.update();
            classInstance.draw();
        });
    };

    p.keyPressed = () => {
        const key = p.key.toLowerCase();
        if (key === "s") p.save(`${getGifName()}.png`);
    };
};