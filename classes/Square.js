class Square {

  constructor(p, x, y, w) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.w = w;
  }

  draw = (t) => {
    this.color = [
      this.p.noise(t) * 255,
      this.p.noise(t + 1) * 255,
      this.p.noise(t + 2) * 255,
    ]
    this.p.fill(this.color[0], this.color[1], this.color[2]);
    this.p.square(this.x, this.y, this.w);
  }

  hide = () => {
    this.p.fill(0);
    this.p.square(this.x, this.y, this.w);
  }
}