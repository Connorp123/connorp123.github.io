import { getGifName } from "../../helpers/modules/display-helpers-modules.js";
import { createMoirePatternNoise } from "./MoirePattern.js";

export const sketch = (p) => {

    // Basics
    let canvas;
    let state = {
        debug:            false,
        redrawBackground: true,
        width:            p.width * 0.8,
        height:           p.height * 0.8,
        lineCount:        272,
        noiseScale:       0.01,
        amplitude:        23
    };
    // let gui   = createGui({state, onChange});

    // Class creators
    const MoirePattern = createMoirePatternNoise({p});

    // Global vars
    const NUM_INSTANCES = 1;
    let pattern;


    p.setup = () => {
        canvas = p.createCanvas(p.windowWidth, p.windowHeight, p.SVG);
        p.frameRate(144);
        state.width     = p.width * 0.8;
        state.height    = p.height * 0.8;
        state.lineColor = p.color(255, 50, 100);
        pattern         = new MoirePattern(state);
    };

    p.draw = () => {
        if (state.redrawBackground) p.background(0);
        pattern.display();
    };

    p.keyPressed = () => {
        const key = p.key.toLowerCase();
        if (key === "s") p.save(`${getGifName()}.svg`);
    };

    function onChange() {
        pattern = new MoirePattern(state);
    }
};