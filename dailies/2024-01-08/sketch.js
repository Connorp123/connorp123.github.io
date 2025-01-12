import { createSimplePhysicsObject } from "../../classes/module/SimplePhysicsObject.js";
import { getGifName } from "../../helpers/display-helpers-modules.js";


// Genuary 8 Prompt -- chaotic systems

const createSun = ({p}) => {
    return class Sun {
        constructor({x, y, r}) {
            this.pos = p.createVector(x, y);
            this.r   = r;
        }

        update() {
        }

        display() {
            p.fill(0);
            p.ellipse(this.pos.x, this.pos.y, this.r);
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
    const Sun = createSun({p});

    const Planet = createSimplePhysicsObject({p});

    // Global vars
    const NUM_INSTANCES = 200;
    let planets         = [];
    let sun;

    p.setup = () => {
        canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        p.frameRate(60);
        p.background(0);
        sun = new Sun({
            x: p.width / 2,
            y: p.height / 2,
            r: 400
        });

        for (let i = 0; i < NUM_INSTANCES; i++) {
            planets.push(new Planet({
                radius:       50,
                beforeUpdate: (planet) => attractToSun(planet, p),
                startVel:     p.createVector(p.random(-200, 200), p.random(-200, 200)),
                maxAcc:       p.random(1, 5),
                maxVel:       p.random(10, 50)
            }));
        }
    };

    p.draw = () => {


        if (state.redrawBackground) p.background(0);

        sun.display();

        planets.forEach(classInstance => {
            classInstance.update();
            classInstance.display();
        });

    };

    p.keyPressed = () => {
        const key = p.key.toLowerCase();
        if (key === "s") p.save(`${getGifName()}.png`);
    };

    function attractToSun(planet, p) {
        planet.addForce({vec: p5.Vector.sub(sun.pos, planet.pos)});
    }
};