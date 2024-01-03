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

        this.p.push();

        this.p.translate(this.x, this.y);
        this.p.beginShape(this.p.QUADS);
        this.p.stroke(this.colors.dark);

        // this.p.noFill();

        // FRONT

        this.p.fill(this.colors.green);

        this.p.vertex(0, 0); // top left
        this.p.vertex(width, 0); // top right
        this.p.vertex(width, height); // bot right
        this.p.vertex(0, height); // bot left

        // TOP

        this.p.fill(this.colors.light);

        this.p.vertex(0, 0); // bot left
        this.p.vertex(width, 0); // bot right
        this.p.vertex(0, 0 - (height / 2));   // top right
        this.p.vertex(0 - width, 0 - (height / 2));   // top left

        // LEFT

        this.p.fill(this.colors.dark);

        this.p.vertex(0, 0);  // top right
        this.p.vertex(0 - width, 0 - (height / 2)); // top left
        this.p.vertex(0 - width, 0); // bot left
        this.p.vertex(0, (height / 2)); // bot right

        this.p.endShape();

        this.p.pop();
    }
}