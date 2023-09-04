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

        const spacing = 1;

        this.p.push();

        this.p.translate(this.x, this.y);
        this.p.beginShape(this.p.QUADS);
        this.p.stroke(this.colors.dark);
        this.p.noFill();


        // FRONT


        this.p.stroke(this.colors.dark);
        this.p.vertex(0, 0); // top left
        this.p.vertex(width, 0); // top right
        this.p.vertex(width, height); // bot right
        this.p.vertex(0, height); // bot left

        this.p.stroke(this.colors.green);
        for (let y = 0; y < height; y += spacing) {
            this.p.line(0, y, width, y);
        }

        // TOP
        this.p.stroke(this.colors.dark);

        this.p.fill(this.colors.light);

        this.p.vertex(0, 0); // bot left
        this.p.vertex(width, 0); // bot right
        this.p.vertex(0, 0 - (height / 2));   // top right
        this.p.vertex(0 - width, 0 - (height / 2));   // top left

        // LEFT

        // this.p.fill(this.colors.dark);

        this.p.noFill();

        this.p.vertex(0, 0);  // top right
        this.p.vertex(0 - width, 0 - (height / 2)); // top left
        this.p.vertex(0 - width, 0); // bot left
        this.p.vertex(0, (height / 2)); // bot right


        this.p.stroke(this.colors.dark);

        let x1 = 0 - width;
        let y1 = 0 - (height / 2);

        let x2 = 0;
        let y2 = 0;

        while (y1 < 0) {
            this.p.line(x1, y1, x2, y2);
            // x1 += 1;
            y1 += spacing;
            // x2 += 1;
            y2 += spacing;
        }


        // for (let y = 0 - (height / 2); y < (height / 2); y += 2) {
        //
        //     this.p.line(0, y, 0 - (width / 2), y);
        // }

        this.p.endShape();

        this.p.pop();
    }
}