var w;
var walkers = [];

function setup() {
    var myCanvas = createCanvas(windowWidth-20, windowHeight-200);
    myCanvas.parent('myContainer');

    // Creates the walker object
    w = new Walker();
}

function draw() {
    background(51);
    // Shows the walker
    for(var i = 0; i < walkers.length; ++i) {
        walkers[i].update();
        walkers[i].display();
    }
    // w.update();
    // w.display();
}

function Walker() {

    // Initializes the walker to the middle of the screen
    this.pos = createVector(width/2, height/2);

    // Initializes the velocity
    this.vel = createVector(20,20);
    this.acc = createVector(0,0);
    this.maxVel = 50;
    this.maxAcc = 3;

    // this.acc = p5.Vector.fromAngle(3*PI/2);

    // Makes it walk randomly around the screen
    this.update = function () {

        // Gets the mouse position
        var mouse = createVector(mouseX, mouseY);

        // Points the acceleration towards the mouse
        this.acc = p5.Vector.sub(mouse, this.pos);

        // Controls the max size of the acceleration
        this.acc.limit(this.maxAcc);
        // this.acc.normalize();

        // this.acc.mult(.5);
        // this.acc.setMag(0.1);

        // Create a vector from an angle
        // this.acc = p5.Vector.fromAngle(3*PI/2);

        // Rotates the velocity
        // this.vel.rotate(0.1);

        // Acceleration changes velocity
        this.vel.add(this.acc);
        this.vel.limit(this.maxVel);
        // Velocity changes position
        this.pos.add(this.vel);
    }

    // Draws the walker
    this.display = function () {
        fill(255);
        ellipse(this.pos.x, this.pos.y, 48, 48);
    }
}


function keyPressed() {
    if(key === "F") {
        walkers.push(new Walker());
    }
    if(key === "C") {
        walkers = [];
    }
}
