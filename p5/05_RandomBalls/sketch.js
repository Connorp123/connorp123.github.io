var debug = false;  // Draws debug stuff
var trails = false; // Draws the trails (stops re-drawing the background)
var balls = [];     // List of Ball objects

function setup() {
    // Creates the canvas
    var myCanvas = createCanvas(windowWidth-400, windowHeight-100);
    myCanvas.parent('canvas');

    // Creates a ball
    acc = createVector(random(-10,10), random(-10,10));
    vel = createVector(random(-10,10), random(-10,10));
    balls.push(new Ball(mouseX, mouseY, random(10,100), acc, vel));
}

function draw()
{
    // Draws the background if 'trails' is false
    if(!trails) background(51);

    // Moves all of the balls
    for(var i = 0; i < balls.length; ++i) {
        balls[i].run();
    }
}


// Key-binds
function keyPressed() {
    // "T" - Toggles the trails
    if(key === "T") {
        trails = !trails;
    }
    // "B" - Creates a new ball at the mouse location
    if(key === "B") {
        acc = createVector(random(-10,10), random(-10,10));
        vel = createVector(random(-10,10), random(-10,10));
        balls.push(new Ball(mouseX, mouseY, random(10,100), acc, vel));
    }
    // "C" - Clears the vehicles
    if(key === "C") {
        balls = [];
    }
    // SPACE - Toggles debug
    if (key === ' ') {
        debug = !debug;
    }
}