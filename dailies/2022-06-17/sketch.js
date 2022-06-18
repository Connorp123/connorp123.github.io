/*
    True facts:
    - Balls that end the branches are always 22% of total balls
    - Balls at bases of branches are always 22% of total balls
    - Number of stems is random

    Experiment:
    1. Put all balls in middle
    2. Put positive charge in middle
      - All balls become positively charged
      - Balls want to repel each other
    3. Put negatively charged ring on outside
      - Slightly attracts the balls
      - When balls touch, they become negatively charged + slight attraction to center, slightly repelled from outside

 */

let sketch = (p) => {
  let canvas;
  let balls = [];
  let NUM_BALLS = 150;
  let centerCharge;
  let border;

  p.setup = () => {
    canvas = createInstanceCanvas(p);
    p.angleMode(p.DEGREES);


    // Create balls
    for (let i = 0; i < NUM_BALLS; i++) {
      balls.push(new Ball(p.width / 2, p.height / 2));
    }

    // Put positive charge in middle
    centerCharge = new Ball(p.width / 2, p.height / 2, true);
    centerCharge.charge = 1;

    // Put negative charge on outside
    border = new Border();
  }

  p.draw = () => {
    redrawBackground(p);

    // Draw center ion
    centerCharge.display();

    // Draw outside charge
    border.display();

    // Update and draw all balls
    balls.forEach(ball => {
      ball.update();
      ball.display();
    })


  }

  let chargeAll = () => {

  }

  class Ball {
    constructor(x, y, isStatic=false) {
      this.position = isStatic ?
        p.createVector(x, y) :
        p.createVector(x + p.randomGaussian(0, 50), y + p.randomGaussian(0, 50));
      this.acceleration = p.createVector(0, 0);
      this.velocity = p.createVector(0, 0);
      this.r = 20;
      this.charge = 0;
    }

    run() {
      this.update();
      this.borders();
      this.display();
    }

    applyForce(force) {
      // We could add mass here if we want A = F / M
      this.acceleration.add(force);
    }

    // Method to update location
    update() {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
    }

    // Wraparound
    // borders() {
    //   if (this.position.x < -this.r) this.position.x = width + this.r;
    //   if (this.position.y < -this.r) this.position.y = height + this.r;
    //   if (this.position.x > width + this.r) this.position.x = -this.r;
    //   if (this.position.y > height + this.r) this.position.y = -this.r;
    // }

    display() {

      // Set color based on charge
      if (this.charge > 0) {
        p.fill(0, 255, 0);
      } else if (this.charge < 0) {
        p.fill(255, 0, 0);
      } else {
        p.fill(255);
      }

      p.noStroke();
      p.circle(this.position.x, this.position.y, this.r);
    }
  }

  class Border {
    constructor() {
      this.d = p.min(p.width, p.height);
      this.r = this.d;
      this.pos = [p.width / 2, p.height / 2];
    }

    display() {
      p.stroke(255,0,0);
      p.noFill();
      p.strokeWeight(3);
      p.circle(this.pos[0], this.pos[1], this.r);
    }
  }
}