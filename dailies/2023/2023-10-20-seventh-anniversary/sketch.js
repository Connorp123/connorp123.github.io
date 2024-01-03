const createSevenClass = ({p}) => {
    return class Seven {
        constructor() {
            this.pos = [p.random(0, p.width), p.random(0, p.height)];
            this.rot = p.random(0, p.TWO_PI);
        }

        draw() {
            p.stroke(0, 0, 255);
            p.fill(0, 0, 255);
            p.strokeWeight(1);
            p.textSize(55);
            p.textAlign(p.CENTER);


            p.push();
            p.translate(...this.pos);
            p.rotate(this.rot);
            p.text("7", 0, 0);
            p.pop();
        }
    };
};

const createHeartClass = ({p}) => {
    return class Heart {
        constructor() {
            this.pos = [p.random(0, p.width), p.random(0, p.height)];
            this.rot = p.random(0, p.TWO_PI);
            this.str = p.random(0, 1) < 0.5 ? "♥︎" : "♥";
        }

        draw() {
            p.stroke(255, 0, 0);
            p.fill(255, 0, 0);
            p.strokeWeight(1);
            p.textSize(40);
            p.textAlign(p.CENTER);


            p.push();
            p.translate(...this.pos);
            p.rotate(this.rot);
            p.text(this.str, 0, 0);
            p.pop();
        }
    };
};


export const sketch = (p) => {

    const Seven = createSevenClass({p});
    const Heart = createHeartClass({p});

    let canvas;
    let symbols = [];

    // max-width: 282 - 7 = 275
    // max-height: 420

    p.setup = () => {
        // canvas = createInstanceCanvas(p);
        let m  = 2;
        // canvas = createSvgCanvas(p, 275 * m, 420 * m);
        canvas = p.createCanvas(275 * m, 420 * m, p.SVG);

        for (let i = 0; i < 100; i++) {
            symbols.push(new Seven());
            symbols.push(new Heart());
        }

        symbols.forEach(symbol => {
            symbol.draw();
        });

        p.stroke(0, 255, 0);
        p.fill(0, 255, 0);
        p.textSize(72);
        p.text("Happy\nAnniversary", p.width / 2, p.height / 2 - 36);
    };

    p.draw = () => {
        // redrawBackground(p);


    };

    p.keyPressed = () => {
        if (p.key === "S" || p.key === "s") p.save(`${getGifName()}.svg`);
    };
};