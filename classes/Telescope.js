const SPACING = 20;
const GROWTH_RATE = 2;
const MAX_SHAPES = 10;

class Telescope {

  constructor(x, y) {
    this.pos = createVector(x, y);

    this.isIncreasing = random() > 0.5;
    this.isApproaching = random() > 0.5;
    this.quadrant = int(random(0, 4) + 1);

    this.R = random(0, 255);
    this.G = random(0, 255);
    this.B = random(0, 255);

    this.height = this.isIncreasing ? 1 : MAX_SHAPES * GROWTH_RATE;
    this.width = this.isIncreasing ? 1 : MAX_SHAPES * GROWTH_RATE;
    this.age = 0;

    this.shape = int(random(0, 3) + 1);
  }

  update = () => {
    if (!this.isDead()) {


      // Grow or shrink
      if (this.isIncreasing) {
        this.height += GROWTH_RATE;
        this.width += GROWTH_RATE;
      } else {
        this.height -= GROWTH_RATE;
        this.width -= GROWTH_RATE;
      }

      // Move
      if (this.quadrant === 1) {
        this.pos.x += SPACING;
        this.pos.y -= SPACING;
      } else if (this.quadrant === 2) {
        this.pos.x -= SPACING;
        this.pos.y -= SPACING;
      } else if (this.quadrant === 3) {
        this.pos.x += SPACING;
        this.pos.y -= SPACING;
      } else if (this.quadrant === 4) {
        this.pos.x += SPACING;
        this.pos.y += SPACING;
      }

      // Kill old
      this.age++;
    }
  }

  display = () => {
    if (!this.isDead()) {
      noFill();

      if(this.isApproaching) {
        strokeWeight(this.age);
      } else {
        strokeWeight(MAX_SHAPES - this.age);
      }
      stroke(this.R, this.G, this.B);

      if(this.shape === 1) {
        square(this.pos.x, this.pos.y, this.height * SPACING);
      } else if (this.shape === 2) {
        circle(this.pos.x, this.pos.y, this.height * SPACING);
      } else {
        triangle(this.pos.x, this.pos.y,
          this.pos.x + (10 * this.width), this.pos.y + (30 * this.height),
          this.pos.x - (10 * this.width), this.pos.y + (30 * this.height));
      }
    }
  }

  isDead = () => {
    return this.age >= MAX_SHAPES;
  }
}
