class Dot {

  constructor(p, x, y, d) {
    this.p = p;
    this.x = x || Math.ceil(this.p.random(0, this.p.width));
    this.y = y || Math.ceil(this.p.random(0, this.p.height));
    this.d = d || 0;

    this.rgb = [this.p.random(0,255), this.p.random(0,255), this.p.random(0,255)];

    this.rgb = [Math.ceil(this.p.random(0,255)), Math.ceil(this.p.random(0,255)), Math.ceil(this.p.random(0,255))];
  }

  drawPoint = (x, y) => {
    this.p.stroke(this.rgb[0], this.rgb[1], this.rgb[2]);
    this.p.point(x, y);
  };

  display = () => {
    this.drawPoint(this.x, this.y);
  };
}