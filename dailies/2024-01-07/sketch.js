import { getGifName } from "../../helpers/modules/display-helpers-modules.js";

const createLoadingIcon = ({p}) => {
    class LoadingDot {
        constructor({centerX, centerY, centerR, angle, r = 20, color, state}) {
            this.centerPos = [centerX, centerY];
            this.centerR   = centerR;
            this.angle     = angle;
            this.r         = r;
            this.color     = [color, 100, 100];

            this.tick      = 0;
            this.offset    = 0;
            this.direction = 1;
            this.started   = false;
            this.state     = state || {};
        }

        start() {
            this.started = true;
        }

        update() {

            if (this.started) {

                if (this.offset > this.r * 8) {
                    this.direction = -1 * this.direction;
                }

                if (this.offset < 0) {
                    this.offset    = 0;
                    this.direction = 1;
                    this.started   = false;
                } else {
                    this.offset += this.direction * (this.state.speed || 2);
                }


            }
        }

        display() {
            p.noStroke();
            p.fill(...this.color);

            p.push();
            p.translate(...this.centerPos);
            p.rotate(this.angle);

            const distFromCenter = (this.centerR / 2) + this.offset;
            p.ellipse(distFromCenter, 0, this.r);

            p.pop();
        }
    }

    return class LoadingIcon {
        constructor({x, y, r = 400, state}) {
            this.pos            = [x, y];
            this.r              = r;
            this.state          = state || {};
            this.dots           = [];
            this.tick           = 0;
            this.nextDotToStart = 0;

            for (let angle = 0; angle < p.TWO_PI; angle += p.PI / 32) {
                const color = p.map(angle, 0, p.TWO_PI, 0, 360);
                this.dots.push(new LoadingDot({
                    centerX: this.pos[0],
                    centerY: this.pos[1],
                    centerR: this.r,
                    r:       25,
                    angle,
                    color,
                    state
                }));
            }
        }

        update() {
            this.tick += 1;
            if (this.tick >= this.state.interval) {
                this.tick = 0;
                this.dots[this.nextDotToStart].start();
                this.nextDotToStart = (this.nextDotToStart + 1) % this.dots.length;
            }

            this.dots.forEach(dot => dot.update());
        }

        display() {

            if (this.state.debug) {
                p.fill(0);
                p.stroke(255);
                p.ellipse(...this.pos, this.r);
            }

            this.dots.forEach(dot => dot.display());
        }
    };
};

export const sketch = (p) => {

    // Basics
    let canvas;
    let state = {
        debug:            false,
        redrawBackground: true,
        speed:            5,
        interval:         1
    };
    // let gui   = createGui({state});

    // Class creators
    const LoadingIcon = createLoadingIcon({p});

    // Global vars
    const NUM_INSTANCES = 8;
    let classInstances  = [];


    p.setup = () => {
        canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        p.frameRate(60);
        p.colorMode(p.HSB);
        for (let i = 1; i <= NUM_INSTANCES; i++) {
            // classInstances.push(new LoadingIcon({
            //     x:     p.width * (i / NUM_INSTANCES),
            //     y:     p.height * (i / NUM_INSTANCES),
            //     r:     200,
            //     state: state
            // }));

            classInstances.push(new LoadingIcon({
                x:     p.width * (i / NUM_INSTANCES),
                y:     p.height / 2,
                r:     200,
                state: state
            }));

            classInstances.push(new LoadingIcon({
                x:     p.width / 2,
                y:     p.height * (i / NUM_INSTANCES),
                r:     200,
                state: state
            }));
        }
    };

    p.draw = () => {
        if (state.redrawBackground) p.background(0);
        classInstances.forEach(classInstance => {
            classInstance.update({x: p.mouseX, y: p.mouseY});
            classInstance.display();
        });
    };

    p.keyPressed = () => {
        const key = p.key.toLowerCase();
        if (key === "s") p.save(`${getGifName()}.png`);
    };
};