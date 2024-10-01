import { createGui } from "../../../helpers/gui-helpers.js";

export const sketch = (p) => {

    let state = {
        frameRate: 1,
        scale:     3.5
    };
    let gui   = createGui({
        state: state,
        name:  "daily"
    });

    p.setup = () => {
        createSvgCanvas(p, 275 * state.scale, 280 * state.scale);
        p.stroke(255, 0, 0);
    };

    p.draw = () => {
        p.clear();
        redrawBackground(p);
        state.frameRate = p.frameRate();
    };

    p.keyPressed = () => {
        if (p.key === "S" || p.key === "s") p.save(`${getGifName()}.svg`);
    };
};