var w;
var walkers = [];
var redraw = true;

function setup() {
    var myCanvas = createCanvas(960, 520);
    myCanvas.parent('canvas');

}

function draw() {
    if (redraw) background(51);
    // Shows the walker
    for(var i = 0; i < walkers.length; ++i) {
        walkers[i].update();
        walkers[i].display();
    }
}

function Walker(x, y, r) {

    // Initializes the walker to the middle of the screen
    this.pos = createVector(x, y);

    // Initializes the velocity
    this.vel = createVector(20,20);
    this.acc = createVector(0,0);
    this.r = r;                     // Radius
    this.maxVel = 50;
    this.maxAcc = 3;
    this.R = random(0,255);
    this.G = random(0,255);
    this.B = random(0,255);

    // this.acc = p5.Vector.fromAngle(3*PI/2);

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
    }

    // Makes it walk randomly around the screen
    this.update = function () {

        // Gets the mouse position
        var mouse = createVector(mouseX, mouseY);

        // Points the acceleration towards the mouse
        this.acc = p5.Vector.sub(mouse, this.pos);

        // Controls the max size of the acceleration
        this.acc.limit(this.maxAcc);

        // Acceleration changes velocity
        this.vel.add(this.acc);
        this.vel.limit(this.maxVel);

        // Velocity changes position
        this.pos.add(this.vel);

        // Checks for collisions
        this.checkEdgeCollide();
    }

    // Draws the walker
    this.display = function () {
        fill(this.R, this.G, this.B);
        ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
    }
}


function keyPressed() {
    if(key === "p" || key === "P") {
        alert(
              "Controls:\n"
            + "F to place a ball\n"
            + "C to clear all balls\n"
            + "B to turn off background re-draw\n"
            + "S to screenshot\n"
        );
    } else if(key === "f" || key === "F") {
        walkers.push(new Walker(mouseX, mouseY, 20));
    } else if(key === "c" || key === "C") {
        walkers = [];
    } else if(key === "b" || key === "B") {
        redraw = !redraw;
    } else if(key === "s" || key === "S") {
        saveCanvas(myCanvas, 'p5_Attraction', 'png');
    }
}
