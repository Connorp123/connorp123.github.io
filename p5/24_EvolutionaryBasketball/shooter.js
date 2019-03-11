function Shooter(x, y) {

  /*
        Attributes
   */
  this.d = 10;
  this.rgb = [random(100,255), random(100,255), random(100,255)];
  this.showAim = false;
  this.launched = false;

  this.mass = 1;
  this.pos = createVector(75, height - 75);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);

  this.dna = new Dna(x, y);

  this.fitness = 1000000;
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
  // Set the fitness to the distance from the middle of the hoop
  this.checkFitness = function (hoopX, hoopY) {

    /*
    var Px = this.pos.x;
    var Py = this.pos.y;
    var r  = this.d / 2;
    var Vx = this.vel.x;
    var Vy = this.vel.y;
    var Hx = hoopX;
    var Hy = hoopY;
    var Hw = hoop.w;

    var dA = dist(Px + Vx, Py + Vy, , 2);
    var dB = dist()


    if(
      Px + Vx >= Hx
      && Px + Vx <= Hx + Hw
      && Py + r < Hy
      && Py + r + Vy + r >= Hy
    ) {
      baskets++;
    }
    */



    var d = dist(this.pos.x, this.pos.y, hoopX, hoopY);
    if(d < this.fitness) {

      if(this.pos.y < hoopY) {
        d -= 300;
      }
      this.fitness = d;
    }


  };//----------------------------------------------------------------------------------------------
  // Merge this shooter with another shooter
  this.merge = function (otherShooter) {
    this.dna = this.dna.merge(otherShooter.dna);
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
      var launchForce = createVector(this.dna.x - this.pos.x, this.dna.y - this.pos.y);
      launchForce.div(10);
      // launchForce.setMag(50);
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
    line(this.pos.x, this.pos.y, this.dna.x, this.dna.y);
  };//------------------------------------------------------------------------------------------------

}//------------------------------------------------------------------------------------------------