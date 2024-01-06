// Genuary day 3 - Vera Molnar inspo
const createMolnarSquare = ({p}) => {
    return class MolnarSquare {
        constructor({size, x,y, hue}) {
            this.pos = [x, y];
            this.size = size;
            this.color = [hue, 360 * (3/4), 360];
            this.fill = [p.abs(hue - 180), 360, 360];
        }

        update() {
        }

        getRandomDrawProps(maxSizeChange) {
            const s = p.round(p.random(0, maxSizeChange));
            return {
                sizeDecrement: s,
                posMove: s / 2,
                strokeWeight: p.round(p.map(p.random(), 0, 1, 1, 5)),
                colorChange: p.round(p.map(p.random(), 0, 1, -5, 5)),
            }
        }

        getNormalDrawProps(maxSizeChange) {
            return {
                sizeDecrement: maxSizeChange,
                posMove: maxSizeChange / 2,
                strokeWeight: 1,
                colorChange: 0,
            }
        }

        draw() {
            let size = this.size;
            let pos = [...this.pos];

            p.fill(...this.fill);
            p.stroke(...this.color);

            const maxSizeChange = 5;
            let drawProps;

            while(size > 0) {
                p.square(pos[0], pos[1], size);

                if(p.random() < 0.5) {
                    drawProps = this.getRandomDrawProps(maxSizeChange);
                } else {
                    drawProps = this.getNormalDrawProps(maxSizeChange);
                }

                p.stroke(this.color[0] += drawProps.colorChange, this.color[1], this.color[2]);
                size -= drawProps.sizeDecrement;
                p.strokeWeight(drawProps.strokeWeight);
                pos = [pos[0] + drawProps.posMove, pos[1] + drawProps.posMove];
            }
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
    const MolnarSquare = createMolnarSquare({p});

    // Global vars
    let classInstances = [];

    const size = 50;
    const locations = [];
    let background;

    p.setup = () => {
        canvas = p.createCanvas(600, 600);
        p.frameRate(144);
        p.colorMode(p.HSB, 360);

        const hue = p.random(0,360);
        background = p.abs(hue - 180);

        for (let l = 0; l * size < 600; l++) {
            locations.push(l * size);
        }

        for(let i = 0; i < locations.length; i++) {
            for (let j = 0; j < locations.length; j++) {
                classInstances.push(new MolnarSquare({size, x:locations[i], y: locations[j], hue}));
            }
        }
    };

    p.draw = () => {
        if (state.redrawBackground) p.background(0, 0, 0);
        classInstances.forEach(classInstance => {
            classInstance.update();
            classInstance.draw();
        })
        p.noLoop();
    };

    p.keyPressed = () => {
        if (p.key === "S" || p.key === "s") p.save(`${getGifName()}.png`);
    };
};