import { createSimplePhysicsObject } from "../../classes/module/SimplePhysicsObject.js";
import { createGui } from "../../helpers/gui-helpers.js";
import { getGifName, getReelCanvas } from "../../helpers/modules/display-helpers-modules.js";


export const sketch = (p) => {

    // Basics
    let canvas;
    let state = {
        debug:            false,
        redrawBackground: false
    };
    let gui   = createGui({state});

    // Class creators
    const Ball = createSimplePhysicsObject({p});

    // Global vars
    const NUM_INSTANCES = 50;
    let balls           = [];

    const palette = [
        [155, 93, 229],
        [241, 91, 181],
        [254, 228, 64],
        [0, 187, 249],
        [0, 245, 212]
    ];


    p.setup = () => {
        canvas = getReelCanvas(p, 1);
        p.frameRate(144);
        p.background(0);
        p.noFill();
        for (let i = 0; i < NUM_INSTANCES; i++) {
            balls.push(new Ball({
                x:               p.mouseX,
                y:               p.mouseY,
                color:           palette[i % palette.length],
                maxVel:          1.5,
                maxAcc:          0.02,
                displayFunction: (obj) => {
                    p.stroke(...obj.rgb);
                    p.circle(obj.pos.x, obj.pos.y, obj.r);
                }
            }));
        }
    };

    p.draw = () => {
        if (state.redrawBackground) p.background(0);
        balls.forEach(classInstance => {
            classInstance.attractTo({destinationX: p.mouseX, destinationY: p.mouseY});
            classInstance.update();
            classInstance.display();
        });
    };

    p.keyPressed = () => {
        const key = p.key.toLowerCase();
        if (key === "s") p.save(`${getGifName()}.png`);
    };
};