import { createGui } from "../../../helpers/gui-helpers.js";


class Trail {
    constructor({p, color}) {
        this.p      = p;
        this.length = 0;
        this.d      = 1;
        this.color  = color;
    }

    display() {
        const p = this.p;

        p.strokeWeight(1);
        p.stroke(this.color);
        p.circle(p.mouseX, p.mouseY, this.d);
    }
}

export const sketch = (p) => {

    let state = {};
    let gui   = createGui({
        state: state,
        name:  "daily"
    });


    let d        = 1;
    let canvas;
    const trails = [];

    p.setup = () => {
        canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        trails.push(new Trail({p, color: new p.Color(255, 0, 0)}));
    };

    p.draw = () => {
        redrawBackground(p);
        p.circle(p.mouseX, p.mouseY, d++);


        if (p.mouseIsPressed()) {
            for (const trailsKey in trails) {
                trailsKey.draw();
            }
        }

    };

    p.keyPressed = () => {
        if (p.key === "S" || p.key === "s") p.save(`${getGifName()}.svg`);
    };


};