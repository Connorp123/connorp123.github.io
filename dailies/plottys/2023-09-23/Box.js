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

    drawInside() {
        const width  = this.state.width;
        const height = width * 2;

        const spacing     = 4;
        const halfSpacing = spacing / 2;

        this.p.push();

        this.p.translate(this.x, this.y);

        // FRONT

        if (this.state.color1) {
            this.p.stroke(this.colors.green);
            let y = 0;
            while (y <= height) {

                if (y % (spacing * 2) === 0) {

                    this.p.line(halfSpacing, y, width - halfSpacing, y);
                    if (y + spacing <= height) {
                        this.p.arc(width - halfSpacing, y + halfSpacing, spacing, spacing, -this.p.HALF_PI, this.p.HALF_PI, this.p.OPEN);
                    }

                } else {

                    this.p.line(width - halfSpacing, y, halfSpacing, y);
                    if (y + spacing <= height) {
                        this.p.arc(halfSpacing, y + halfSpacing, spacing, spacing, this.p.HALF_PI, -this.p.HALF_PI, this.p.OPEN);
                    }

                }

                y += spacing;
            }
        }

        // LEFT
        if (this.state.color2) {

            this.p.stroke(this.colors.dark);

            const x1 = 0 - width;
            let y1   = 0 - (height / 2);

            const x2 = 0;
            let y2   = 0;


            let count = 0;

            while (y1 < 0) {

                if (count % 2 === 0) {

                    this.p.line(x1, y1, x2, y2);
                    // this.p.arc(x1 + halfSpacing, y1 + halfSpacing, spacing, spacing, 0, this.p.PI * 2, this.p.OPEN);
                    // this.p.arc(x2, y2, spacing, spacing, this.p.HALF_PI + (this.p.HALF_PI / 2), -(this.p.HALF_PI / 2), this.p.OPEN);

                } else {
                    this.p.line(x2, y2, x1, y1);
                    // this.p.arc(x1 + halfSpacing, y1 + halfSpacing, spacing, spacing, this.p.HALF_PI / 2, -(this.p.HALF_PI / 2), this.p.OPEN);

                }

                y1 += spacing;
                y2 += spacing;
                count++;
            }

        }

        this.p.pop();
    }

    draw() {
        this.drawInside();
        this.drawOutline();
    }
}