function Ball(pos) {

  /*
        Attributes
   */
  this.d = 10;
  this.rgb = [random(100,255), random(100,255), random(100,255)];
  this.showAim = false;
  this.launched = false;

  this.mass = 1;
  this.pos = pos || createVector(75, height - 75);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  //------------------------------------------------------------------------------------------------

  /*
        Game-Related
   */
  // Reset the ball's position
  this.reset = function () {
    this.pos.set(75, height-75);
    this.vel.set(0,0);
    this.acc.set(0,0);
    this.showAim = false;
    this.launched = false;
  };//----------------------------------------------------------------------------------------------
  /*
        Physics
   */
  this.addForce = function (df) {
    this.acc.add(df);
  };//----------------------------------------------------------------------------------------------
  this.addForceXY = function (x, y) {
    this.acc.add(x, y);
  };//----------------------------------------------------------------------------------------------
  this.update = function () {

    // Apply gravity
    if(this.launched)
      this.applyGravity();

    // Acc updates Vel
    this.vel.add(this.acc);

    // Vel updates Pos
    this.pos.add(this.vel);

    // Clear acceleration
    this.acc.set(0,0);
  };//------------------------------------------------------------------------------------------------

  this.applyGravity = function () {
    this.addForceXY(0, 0.98);
  };//------------------------------------------------------------------------------------------------
  /*
        Actions
   */
  // Launch the ball towards the mouse
  this.launchBall = function () {
      this.showAim = false;
      this.launched = true;
      var launchForce = createVector(mouseX - this.pos.x, mouseY - this.pos.y);
      launchForce.div(10);
      this.addForce(launchForce);
  };//------------------------------------------------------------------------------------------------
  /*
        Drawing
   */
  // Display the ball + aiming line
  this.display = function () {
    // Draw the aiming line
    if(this.showAim)
      this.drawAimingLine();

    // Draw the ball
    noStroke();
    fill(this.rgb);
    circle(this.pos.x, this.pos.y, this.d/2);
  };//------------------------------------------------------------------------------------------------

  // Display the aiming line
  this.drawAimingLine = function () {
    stroke(255, 0, 0);
    strokeWeight(1);
    line(this.pos.x, this.pos.y, mouseX, mouseY);
  };//------------------------------------------------------------------------------------------------

}//------------------------------------------------------------------------------------------------