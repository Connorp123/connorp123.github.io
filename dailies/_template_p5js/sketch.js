import { createSimplePhysicsObject } from "../../classes/SimplePhysicsObject";
import { createGui } from "../../helpers/gui-helpers.js";
import { getGifName } from "../../helpers/daily-helpers.js";

export const sketch = (p) => {

    // Basics
    let canvas;
    let state = {
        debug:            false,
        redrawBackground: true
    };
    let gui   = createGui({state});

    // Class creators
    const SimplePhysicsObject = createSimplePhysicsObject({p});

    // Global vars
    let classInstance;

    p.setup = () => {
        canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        p.frameRate(144);
        classInstance = new SimplePhysicsObject({});
    };

    p.draw = () => {
        if (state.redrawBackground) p.background(0);
        classInstance.update();
        classInstance.draw();
    };

    p.keyPressed = () => {
        if (p.key === "S" || p.key === "s") p.save(`${getGifName()}.png`);
    };
};