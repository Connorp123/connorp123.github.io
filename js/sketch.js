function setup() {
  createCanvas(windowWidth,windowHeight);
  smooth();
  strokeWeight(5);
  frameRate(60);
}

var minRadius = 10;
var maxRadius = 100;

var balls = [];

var mouseP = new p5.Vector(0,0);

function Ball(x,y,r) {
  this.position = new p5.Vector(x,y);
  this.velocity = new p5.Vector(0,0);
  this.acceleration = new p5.Vector(0,0);
  this.r = r;
  this.beingDragged = false;
  this.checkEdgeCollide = function() {
    if (this.position.x < this.r) {
      this.position.x = this.r;
      this.velocity.x *= -0.8;
    } if (this.position.x > width-this.r) {
      this.position.x = width-this.r;
      this.velocity.x *= -0.8;
    } if (this.position.y < this.r) {
      this.position.y = this.r;
      this.velocity.y *= -0.8;
    } if (this.position.y > height-this.r) {
      this.position.y = height-this.r;
      this.velocity.y *= -0.8;
	  this.velocity.x *= 0.99;
    }
  }
  this.draw = function() {
    fill(0,0,0,0);
    stroke(0);
    ellipse(this.position.x,this.position.y,this.r*2,this.r*2); // draw ellipse
    stroke(0,0,255,120);
    line(this.position.x,this.position.y,this.position.x+this.velocity.x*5,this.position.y+this.velocity.y*5);
    stroke(255,0,0,120);
    line(this.position.x,this.position.y,this.position.x+this.acceleration.x*100,this.position.y+this.acceleration.y*100);
    this.acceleration.set(0,0.3)
    this.checkEdgeCollide(); // check for collisions
    if(this.beingDragged) {
      this.acceleration.add((mouseP.x-this.position.x)/5/this.r,(mouseP.y-this.position.y)/5/this.r);
      stroke(0,120);
      line(this.position.x,this.position.y,mouseX,mouseY);
    }
    this.velocity.add(this.acceleration);
    this.velocity.mult(0.995); // air friction
    this.position.add(this.velocity); // add velocity to pos
  }
}

function mousePressed() {
  for(var i in balls) {
    if(dist(balls[i].position.x,balls[i].position.y,mouseX,mouseY) < balls[i].r) {
      balls[i].beingDragged = true;
    }
  }
}
function mouseReleased() {
  for(var i in balls) {
    balls[i].beingDragged = false;
  }
}

function draw() {
  mouseP.set(mouseX,mouseY);
  background(255,255,255);
  for(var i in balls) {
    balls[i].draw();
  }
}

function keyPressed() {
  if(key === "F") {
    balls.push(new Ball(mouseX,mouseY,random(minRadius,maxRadius)))
  }
  if(key === "C") {
    balls = [];
  }
  if(key === "R") {
    for(var i in balls) {
      if(dist(balls[i].position.x,balls[i].position.y,mouseX,mouseY) < balls[i].r) {
        balls.splice(i,1);
        i++;
      }
    }
  }
}
