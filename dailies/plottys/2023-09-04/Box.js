export class Box {

    constructor({p, state, x, y}) {
        this.p      = p;
        this.state  = state;
        this.x      = x;
        this.y      = y;
        this.colors = {
            light: p.color(255, 0, 0),
            dark:  p.color(0, 0, 255),
            green: p.color(0, 255, 0)
        };
    }

    drawOutline() {

        if (!this.state.outline) return;

        const width  = this.state.width;
        const height = width * 2;

        this.p.push();
        this.p.translate(this.x, this.y);
        this.p.beginShape(this.p.QUADS);
        this.p.stroke(this.colors.light);
        this.p.noFill();

        // FRONT
        this.p.vertex(0, 0); // top left
        this.p.vertex(width, 0); // top right
        this.p.vertex(width, height); // bot right
        this.p.vertex(0, height); // bot left

        // TOP
        this.p.vertex(0, 0); // bot left
        this.p.vertex(width, 0); // bot right
        this.p.vertex(0, 0 - (height / 2));   // top right
        this.p.vertex(0 - width, 0 - (height / 2));   // top left

        // LEFT
        this.p.vertex(0, 0);  // top right
        this.p.vertex(0 - width, 0 - (height / 2)); // top left
        this.p.vertex(0 - width, 0); // bot left
        this.p.vertex(0, (height / 2)); // bot right

        this.p.endShape();

        this.p.pop();
    }

    draw() {


        const width  = this.state.width;
        const height = width * 2;

        const spacing = 5;

        this.p.push();

        this.p.translate(this.x, this.y);
        this.p.beginShape(this.p.QUADS);

        // FRONT

        if (this.state.color1) {
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
        }

        // LEFT
        if (this.state.color2) {

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
        }

        this.p.pop();

        this.drawOutline();
    }
}