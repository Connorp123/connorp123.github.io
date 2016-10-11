// Initialize the global variables
var minRadius = 10;
var maxRadius = 100;
var balls = [];
var mouseP = new p5.Vector(0,0);

// Set up the drawing
function setup() {
  var myCanvas = createCanvas(windowWidth - 100, windowHeight - 200);
  myCanvas.parent('myContainer');
  smooth();
  strokeWeight(5);
  frameRate(60);
}

// Loops constantly
function draw() {

  // Set the mouse vector
  mouseP.set(mouseX,mouseY);

  // Re-draw the background
  background(200,200,200);

  // Update all of the balls
  for(var i in balls) {
    balls[i].update();
  }
}

// Create the ball object
function Ball(x,y,r) {

  // Initialize the attributes of the ball
  this.pos = new p5.Vector(x,y);  // Position
  this.vel = new p5.Vector(0,0);  // Velocity
  this.acc = new p5.Vector(0,0);  // Acceleration
  this.r = r;                     // Radius
  this.beingDragged = false;      // If it's being dragged or not

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
      // Reduces the speed of the ball by 1% (due to friction on the ground)
      this.vel.x *= 0.99;
    }
  }

  // Update the position of the ball
  this.update = function() {
    // Draw the ball
    fill(0,0,0,0);
    stroke(0);
    ellipse(this.pos.x,this.pos.y,this.r*2,this.r*2);

    // Draw the velocity vector
    stroke(0,0,255,120);
    line(this.pos.x,this.pos.y,this.pos.x+this.vel.x*5,this.pos.y+this.vel.y*5);

    // Draw the acceleration vector
    stroke(255,0,0,120);
    line(this.pos.x,this.pos.y,this.pos.x+this.acc.x*100,this.pos.y+this.acc.y*100);

    // Sets the acceleration of gravity
    this.acc.set(0,0.3);

    // Check for collisions
    this.checkEdgeCollide();

    // If the ball is being dragged
    if(this.beingDragged) {
      // Add acceleration towards the mouse
      this.acc.add((mouseP.x-this.pos.x)/5/this.r,(mouseP.y-this.pos.y)/5/this.r);
      stroke(0,120);
      line(this.pos.x,this.pos.y,mouseX,mouseY);
    }
    this.vel.add(this.acc);  // add acc to vel
    this.vel.mult(0.995);    // air friction
    this.pos.add(this.vel);  // add vel to pos
  }
}

// Run when a mouse button is pressed
function mousePressed() {
  for(var i in balls) {
    if(dist(balls[i].pos.x,balls[i].pos.y,mouseX,mouseY) < balls[i].r) {
      balls[i].beingDragged = true;
    }
  }
}
// Run when a mouse button is released
function mouseReleased() {
  for(var i in balls) {
    balls[i].beingDragged = false;
  }
}

// Creates key-binds
function keyPressed() {
  // "F" - Create a new ball @ the mouse position
  if(key === "F") {
    balls.push(new Ball(mouseX,mouseY,random(minRadius,maxRadius)))
  }
  // "C" - Clear all balls
  if(key === "C") {
    balls = [];
  }
  // "R" - Remove all balls @ the mouse location
  if(key === "R") {
    for(var i in balls) {
      if(dist(balls[i].pos.x,balls[i].pos.y,mouseX,mouseY) < balls[i].r) {
        balls.splice(i,1);
        i++;
      }
    }
  }
}
