export class RandomLine {
    constructor({p, pixelIndex, x, y, lineLength}) {
        this.p      = p;
        this.x      = p.floor(x);
        this.y      = p.floor(y);
        this.theta  = p.random(0, p.TWO_PI);
        this.length = lineLength;
        this.dx     = p.cos(this.theta) * this.length;
        this.dy     = p.sin(this.theta) * this.length;
        this.index  = pixelIndex;
    }

    display() {
        this.rotate();
        this.p.push();
        this.p.translate(this.x, this.y);
        this.p.line(0, 0, this.dx, this.dy);
        this.p.pop();
    }

    rotateRandom() {
        this.theta  = this.p.random(0, this.p.TWO_PI);
        this.dx     = this.p.cos(this.theta) * this.length;
        this.dy     = this.p.sin(this.theta) * this.length;
    }

    rotate() {
        this.theta  += 0.1;
        this.dx     = this.p.cos(this.theta) * this.length;
        this.dy     = this.p.sin(this.theta) * this.length;
    }
}