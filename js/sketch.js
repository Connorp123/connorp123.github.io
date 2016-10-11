// function setup() {
//   createCanvas(windowWidth,windowHeight);
//   smooth();
//   strokeWeight(5);
//   frameRate(60);
// }
//
// var minRadius = 10;
// var maxRadius = 100;
//
// var balls = [];
//
// var mouseP = new p5.Vector(0,0);
//
// function Ball(x,y,r) {
//   this.position = new p5.Vector(x,y);
//   this.velocity = new p5.Vector(0,0);
//   this.acceleration = new p5.Vector(0,0);
//   this.r = r;
//   this.beingDragged = false;
//   this.checkEdgeCollide = function() {
//     if (this.position.x < this.r) {
//       this.position.x = this.r;
//       this.velocity.x *= -0.8;
//     } if (this.position.x > width-this.r) {
//       this.position.x = width-this.r;
//       this.velocity.x *= -0.8;
//     } if (this.position.y < this.r) {
//       this.position.y = this.r;
//       this.velocity.y *= -0.8;
//     } if (this.position.y > height-this.r) {
//       this.position.y = height-this.r;
//       this.velocity.y *= -0.8;
// 	  this.velocity.x *= 0.99;
//     }
//   }
//   this.draw = function() {
//     fill(0,0,0,0);
//     stroke(0);
//     ellipse(this.position.x,this.position.y,this.r*2,this.r*2); // draw ellipse
//     stroke(0,0,255,120);
//     line(this.position.x,this.position.y,this.position.x+this.velocity.x*5,this.position.y+this.velocity.y*5);
//     stroke(255,0,0,120);
//     line(this.position.x,this.position.y,this.position.x+this.acceleration.x*100,this.position.y+this.acceleration.y*100);
//     this.acceleration.set(0,0.3)
//     this.checkEdgeCollide(); // check for collisions
//     if(this.beingDragged) {
//       this.acceleration.add((mouseP.x-this.position.x)/5/this.r,(mouseP.y-this.position.y)/5/this.r);
//       stroke(0,120);
//       line(this.position.x,this.position.y,mouseX,mouseY);
//     }
//     this.velocity.add(this.acceleration);
//     this.velocity.mult(0.995); // air friction
//     this.position.add(this.velocity); // add velocity to pos
//   }
// }
//
// function mousePressed() {
//   for(var i in balls) {
//     if(dist(balls[i].position.x,balls[i].position.y,mouseX,mouseY) < balls[i].r) {
//       balls[i].beingDragged = true;
//     }
//   }
// }
// function mouseReleased() {
//   for(var i in balls) {
//     balls[i].beingDragged = false;
//   }
// }
//
// function draw() {
//   mouseP.set(mouseX,mouseY);
//   background(255,255,255);
//   for(var i in balls) {
//     balls[i].draw();
//   }
// }
//
// function keyPressed() {
//   if(key === "F") {
//     balls.push(new Ball(mouseX,mouseY,random(minRadius,maxRadius)))
//   }
//   if(key === "C") {
//     balls = [];
//   }
//   if(key === "R") {
//     for(var i in balls) {
//       if(dist(balls[i].position.x,balls[i].position.y,mouseX,mouseY) < balls[i].r) {
//         balls.splice(i,1);
//         i++;
//       }
//     }
//   }
// }
var balls = [];

function Ball(x, y, r) {
  this.r = r;
  this.acceleration = new p5.Vector(0, 0);
  this.velocity = new p5.Vector(0, 0);
  this.position = new p5.Vector(x, y);
  this.dragged = false;

  this.checkEdgeCollide = function() {
    if(this.position.x < this.r) {
      this.position.x = this.r;
      this.acceleration.x += this.velocity.x * -1.8;
      // console.log('hit wall');
    }
    if(this.position.x > width - this.r) {
      this.position.x = width - this.r;
      this.acceleration.x += this.velocity.x * -1.8;
      // console.log('hit wall');
    }
    if(this.position.y < this.r) {
      this.position.y = this.r;
      this.acceleration.y += this.velocity.y * -1.8;
      // console.log('hit wall');
    }
    if(this.position.y > height - this.r) {
      this.position.y = height - this.r;
      this.acceleration.y += this.velocity.y * -1.8;
      // console.log('hit wall');
    }
  }

  this.movement = function() {
    // console.log(this.acceleration.y + ' accel');
    this.velocity.add(this.acceleration);
    // console.log(this.velocity.y + ' speed');
    this.position.add(this.velocity);
    this.acceleration.set(0,0.3);
    this.checkEdgeCollide();
    this.acceleration.sub(this.velocity.x * 0.005, this.velocity.y * 0.005);
    if(this.dragged) {
      this.acceleration.add((mouseX-this.position.x)/r/5,(mouseY-this.position.y)/r/5);
    }
    stroke(255,0,0);
    line(this.position.x, this.position.y, this.position.x + this.acceleration.x * 100, this.position.y + this.acceleration.y * 100);
    stroke(0,0,255);
    line(this.position.x, this.position.y, this.position.x + this.velocity.x * 5, this.position.y + this.velocity.y * 5);
  }

  this.draw = function() {
    this.movement();
    fill(0,0);
    stroke(0);
    ellipse(this.position.x, this.position.y, this.r*2, this.r*2);
    if(this.dragged) {
      line(this.position.x,this.position.y,mouseX,mouseY);
    }
  }
}

function setup() {
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  smooth();
  strokeWeight(5);
}

function draw() {
  background(255);
  for(var i in balls) {
    balls[i].draw();
  }
}

function keyPressed() {
  if(key === "F") {
    balls.push(new Ball(mouseX,mouseY,random(10,100)));
  }
  if(key === "R") {
    for(var i in balls) {
      if(dist(mouseX,mouseY,balls[i].position.x,balls[i].position.y) < balls[i].r) {
        balls.splice(i,1);
      }
    }
  }
  if(key === "C") {
    balls = [];
  }
}

function mousePressed() {
  for(var i in balls) {
    if(dist(mouseX,mouseY,balls[i].position.x,balls[i].position.y) < balls[i].r) {
      balls[i].dragged = true;
    }
  }
}

function mouseReleased() {
  for(var i in balls) {
    balls[i].dragged = false;
  }
}