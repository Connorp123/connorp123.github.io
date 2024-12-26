import { getGifName, getReelCanvas } from "../../helpers/modules/display-helpers-modules.js";

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
        redrawBackground: true,
        frameRate:        0
    };
    // let gui   = createGui({state});

    // Class creators
    const Dot = createDot({p});

    // Global vars
    const X_SPACING = 10;
    const Y_SPACING = 3;
    const DOT_SIZE  = 2;


    const frameRate       = 10;
    const desiredBpm      = 120;
    const goalFrameRate   = 60;
    const secondsPerColor = goalFrameRate / desiredBpm;
    const framesPerColor  = goalFrameRate * secondsPerColor;

    let dots     = [];
    let dotColor;
    let numXDots = 0;
    let numYDots = 0;

    p.setup = () => {
        canvas   = getReelCanvas(p, 1);
        dotColor = p.color(255, 255, 255);

        p.frameRate(frameRate);
        p.stroke(255);
        p.fill(dotColor);

        recreateDots();
    };

    p.draw = () => {
        if (state.redrawBackground) p.background(0);

        if (p.frameCount % 126 === 0) {
            incrementDots();
            recreateDots();
        }

        state.frameRate = p.frameRate();
        dots.forEach(classInstance => {
            classInstance.update();
            classInstance.draw();
        });
    };

    p.keyPressed = () => {
        const key = p.key.toLowerCase();
        if (key === "s") p.save(`${getGifName()}.png`);
    };

    p.mousePressed = () => {
        // changeColor();
        incrementDots();
        recreateDots();
    };

    // const changeColor = () => {
    //     dotColor = p.color(p.random(0, 255), p.random(0, 255), p.random(0, 255));
    //     p.fill(dotColor);
    // };

    const incrementDots = () => {
        const MAX_X_DOTS = p.width / X_SPACING / 2;
        const MAX_Y_DOTS = p.height / Y_SPACING / 2;

        if (numYDots === 0) {
            numYDots = 5;
            return;
        }

        if (numYDots < MAX_Y_DOTS) {
            numYDots *= 2;
            return;
        }

        numYDots = MAX_Y_DOTS;

        if (numXDots === 0) {
            numXDots = 1;
            return;
        }

        if (numXDots < MAX_X_DOTS) {
            numXDots *= 2;
            return;
        }

        numXDots = MAX_X_DOTS;
    };

    const recreateDots = () => {

        dots = [];

        const midX = p.width / 2;
        const minX = midX - (X_SPACING * numXDots);
        const maxX = midX + (X_SPACING * numXDots);

        const midY = p.height / 2;
        const minY = midY - (Y_SPACING * numYDots);
        const maxY = midY + (Y_SPACING * numYDots);

        for (let x = minX; x <= maxX; x += X_SPACING) {
            for (let y = minY; y <= maxY; y += Y_SPACING) {
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
};