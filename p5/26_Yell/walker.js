function Walker(x, y, r) {

  // Initializes the walker to the middle of the screen
  this.pos = createVector(x, y);
  this.mid = createVector(width/2, height/2);

  // Initializes the velocity
  this.vel = createVector(0,0);
  this.acc = createVector(0,0);
  this.r = r;                     // Radius
  this.maxVel = 50;
  this.maxAcc = 5;
  this.R = random(0,255);
  this.G = random(0,255);
  this.B = random(0,255);
  this.mass = 100000000;

  // Check if the ball is colliding with another object
  this.checkEdgeCollide = function() {
    // If the ball is hitting the left side of the screen
    if (this.pos.x < this.r) {
      // Places the ball at the border
      this.pos.x = this.r;
      // Makes the ball bounce off @ 80% velocity
      this.vel.x *= -0.8;
    }
    // If the ball is hitting the right side of the screen
    if (this.pos.x > width-this.r) {
      // Places the ball at the border
      this.pos.x = width-this.r;
      // Makes the ball bounce off @ 80% velocity
      this.vel.x *= -0.8;
    }
    // If the ball is hitting the top of the screen
    if (this.pos.y < this.r) {
      // Places the ball at the border
      this.pos.y = this.r;
      // Makes the ball bounce off @ 80% velocity
      this.vel.y *= -0.8;
    }
    // If the ball is hitting the bottom of the screen
    if (this.pos.y > height-this.r) {
      // Places the ball at the border
      this.pos.y = height-this.r;
      // Makes the ball bounce off @ 80% velocity
      this.vel.y *= -0.8;
    }
  }//----------------------------------------------------------------------------------

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.attractMiddle = function() {
    let G = 6.67;
    let M = this.mass;
    let r = p5.Vector.sub(this.mid, this.pos);

    let fGravity = r.normalize();
    fGravity.mag((G * M) / (r * r));

    this.applyForce(fGravity);
  }//----------------------------------------------------------------------------------

  this.updateMic = function(vol) {
    this.maxAcc = map(vol, 0, .1, 5, 0);
    this.maxVel = map(vol, 0, .1, 50, 0);
  }

  // Makes it walk randomly around the screen
  this.update = function () {

    // Force changes acceleration
    this.acc.limit(this.maxAcc);

    // Acceleration changes velocity
    this.vel.add(this.acc);
    this.vel.limit(this.maxVel);

    // Velocity changes position
    this.pos.add(this.vel);

    // Checks for collisions
    this.checkEdgeCollide();
  }//----------------------------------------------------------------------------------

  // Draws the walker
  this.display = function () {
    fill(this.R, this.G, this.B);
    ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
  }//----------------------------------------------------------------------------------
}