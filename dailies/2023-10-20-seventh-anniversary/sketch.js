const createSevenClass = ({p}) => {
    return class Seven {
        constructor() {
            this.pos = [p.random(0, p.width), p.random(0, p.height)];
            this.rot = p.random(0, p.TWO_PI);
        }

        draw() {
            p.stroke(255);
            p.fill(255);
            p.strokeWeight(1);
            p.textSize(55);
            p.textAlign(p.CENTER);


            p.push();
            p.translate(...this.pos);
            p.rotate(this.rot);
            p.text("7", ...this.pos);
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
            p.stroke(255, 50, 50);
            p.fill(255, 50, 50);
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

    p.setup = () => {
        canvas = createInstanceCanvas(p);

        for (let i = 0; i < 100; i++) {
            symbols.push(new Seven());
            symbols.push(new Heart());
            symbols.push(new Seven());
        }
    };

    p.draw = () => {
        redrawBackground(p);

        symbols.forEach(symbol => {
            symbol.draw();
        });
    };
};