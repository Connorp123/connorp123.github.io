export default class Cell {
    constructor({p, colors, x, y, size, power}) {
        this.p      = p;
        this.base   = 2;
        this.power  = power < 0 ? 0 : p.random() >= 0.5 ? 1 : 2;
        this.size   = size || 100;
        this.colors = colors;
        this.pos    = [x || 0, y || 0];

        if (this.power) {
            console.log(this.pos);
        }
    }

    value() {
        return this.p.pow(this.base, this.power);
    }

    display() {
        const p = this.p;

        // Cell
        p.push();
        p.strokeWeight(1);
        p.translate(...this.pos);
        p.stroke(0);
        p.fill(this.colors[this.power]);
        p.square(0, 0, this.size);
        p.pop();

        // Label
        p.push();
        p.translate(this.size / 2, this.size / 2);
        if (this.power !== 0) {
            p.textAlign(p.CENTER, p.CENTER);
            p.fill(0);
            p.textSize(40);
            p.text(this.value(), ...this.pos);
        }
        p.pop();
    }
}
