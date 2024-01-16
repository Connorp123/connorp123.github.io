const SPACING = 10;

class ConcentricCircle {

  constructor(x, y, isWide = false) {
    this.pos = createVector(x, y);
    this.size = int(random(15, 50) + 1);
    this.R = random(0, 255);
    this.G = random(0, 255);
    this.B = random(0, 255);

    if(isWide) {
      this.innerRadius = this.size - SPACING;
      this.rBorder = this.R;
      this.gBorder = this.G;
      this.bBorder = this.B;
    } else {
      this.innerRadius = int(random(1, 6) + 1);
      this.rBorder = 0;
      this.gBorder = 0;
      this.bBorder = 0;
    }
  }

  update = () => {

  }

  display = () => {
    noFill();
    strokeWeight(1);
    stroke(this.R, this.G, this.B);
    let radius;
    for (radius = this.innerRadius; radius < this.size; radius += SPACING) {
      circle(this.pos.x, this.pos.y, radius);
    }
    stroke(this.rBorder, this.gBorder, this.bBorder);
    circle(this.pos.x, this.pos.y, radius);
  }
}
