function Walker(x, y, r) {

  // Initializes the walker to the middle of the screen
  this.pos = createVector(x, y);
  this.mid = createVector(width/2, height/2);

  // Initializes the velocity
  this.vel = createVector(random(-10, 10),random(-10, 10));
  this.acc = createVector(0,0);
  this.r = r;                     // Radius
  this.R = random(0,255);
  this.G = random(0,255);
  this.B = random(0,255);

  this.run = function() {
    this.update();
    this.display();
  }

  this.attractMiddle = function() {
    this.acc.add(p5.Vector.sub(this.mid, this.pos));
  }//----------------------------------------------------------------------------------

  // Makes it walk randomly around the screen
  this.update = function () {

    // Force changes acceleration
    this.attractMiddle();
    this.acc.limit(maxAcc);

    // Acceleration changes velocity
    this.vel.add(this.acc);
    this.vel.limit(maxVel);

    // Velocity changes position
    this.pos.add(this.vel);

  }//----------------------------------------------------------------------------------

  // Draws the walker
  this.display = function () {
    fill(this.R, this.G, this.B);
    ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
  }//----------------------------------------------------------------------------------
}