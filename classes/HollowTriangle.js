class HollowTriangle {

  constructor(p1, p2, p3) {
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
  }

  display = () => {
    triangle(this.p1, this.p2, this.p3);
  }
}