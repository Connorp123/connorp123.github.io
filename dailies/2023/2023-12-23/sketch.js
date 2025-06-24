import { getGifName } from "../../../helpers/daily-helpers.js";
import { createGui } from "../../../helpers/gui-helpers.js";

export const createSquare = ({p}) => {

    return class Square {
        constructor({x, y, step}) {
            this.pos       = [x, y];
            this.t         = 0;
            this.direction = 1;
            this.step      = step;
        }

        reverseDirection() {
            this.direction > 0 ? this.direction = -1 : this.direction = 1;
        }

        update() {
            this.t += this.step * this.direction;
            if (this.t > 20 || this.t < 0) {
                this.reverseDirection();
            }
        }

        display() {
            const size = this.t;
            p.fill(
                p.map(size, 0, 20, 100, 0),
                100,
                100
            );
            p.stroke(0);
            p.square(...this.pos, this.t);
        }

    };

};

export const sketch = (p) => {

    // Basics
    let canvas;
    let state = {
        debug:            false,
        redrawBackground: true,
        padding:          40,
        spacing:          30
    };
    let gui   = createGui({
        state,
        onChange: () => p.setup()
    });

    // Class creators
    const Square = createSquare({p});

    // Global vars
    let squares;

    p.setup = () => {
        canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        p.frameRate(144);
        p.rectMode(p.CENTER, p.CENTER);
        p.colorMode(p.HSB, 100);

        const SPACING = state.spacing;

        squares = [];
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 20; j++) {
                squares.push(new Square({
                    x:    40 + i * SPACING,
                    y:    40 + j * SPACING,
                    step: p.map(i + j, 0, 38, 0.1, 0.5)
                }));
            }
        }
    };

    p.draw = () => {
        if (state.redrawBackground) p.background(0);
        squares.forEach(square => {
            square.update();
            square.display();
        });
    };

    p.keyPressed = () => {
        if (p.key === "S" || p.key === "s") p.save(`${getGifName()}.png`);
    };
};
