export class Box {

    constructor({p, state, x, y}) {
        this.p      = p;
        this.state  = state;
        this.x      = x;
        this.y      = y;
        this.colors = {
            light: p.color(255, 255, 255),
            dark:  p.color(20, 20, 20),
            green: p.color(165, 255, 154)
        };
    }

    draw() {


        const width  = this.state.width;
        const height = width * 2;

        const spacing = 5;

        this.p.push();

        this.p.translate(this.x, this.y);
        this.p.beginShape(this.p.QUADS);
        this.p.stroke(this.colors.dark);
        // this.p.noFill();


        // FRONT


        this.p.stroke(this.colors.dark);


        this.p.stroke(this.colors.green);
        let y = 0;
        this.p.beginShape();
        while (y <= height) {

            if (y % (spacing * 2) === 0) {
                this.p.vertex(0, y);
                this.p.vertex(width, y);
            } else {
                this.p.vertex(width, y);
                this.p.vertex(0, y);
            }

            y += spacing;
        }
        this.p.endShape();

        // TOP
        this.p.stroke(this.colors.dark);

        this.p.fill(this.colors.light);

        // LEFT
        this.p.stroke(this.colors.dark);

        let x1 = 0 - width;
        let y1 = 0 - (height / 2);

        let x2 = 0;
        let y2 = 0;

        this.p.beginShape();

        while (y1 < 0) {

            if (y1 % (spacing * 2) === 0) {
                this.p.vertex(x1, y1);
                this.p.vertex(x2, y2);
            } else {
                this.p.vertex(x2, y2);
                this.p.vertex(x1, y1);
            }

            y1 += spacing;
            y2 += spacing;
        }

        this.p.endShape();

        this.p.pop();
    }
}