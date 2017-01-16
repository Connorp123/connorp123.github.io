var debug = false;  // Draws debug stuff
var trails = false; // Draws the trails (stops re-drawing the background)
var pause = false;

var balls = [];     // List of Ball objects
var environment;
var bgcolor = 51;

//--------------------------------------------------------------------------------------------------

function setup() {
    // Creates the canvas
    var myCanvas = createCanvas(windowWidth-400, windowHeight-100);
    myCanvas.parent('canvas');
    frameRate(60);

    // Creates a ball
    r = 20;
    acc = createVector(0, 0);
    vel = createVector(0, 0);
    balls.push(new Ball(width/2, height-r, r, acc, vel));
    environment = new Environment();
}//-------------------------------------------------------------------------------------------------

function draw() {
    // Draws the background if 'trails' is false
    if(!trails) background(bgcolor);

    // If paused -> draw objects without updating them
    if(pause) {
        for(var i = 0; i < balls.length; ++i) {
            balls[i].display();
        }
    }
    // Else -> update all of the objects
    else{
        // Moves all of the balls
        for(var i = 0; i < balls.length; ++i) {
            environment.applyBoundaries(balls[i]);
            environment.applyGravity(balls[i]);
            // balls[i].applyForce(environment.gravity);
            balls[i].run();
        }
    }
}//-------------------------------------------------------------------------------------------------

// MOUSE PRESS - Drag the ball
function mousePressed() {
    for(var i in balls) {
        if(dist(balls[i].pos.x,balls[i].pos.y,mouseX,mouseY) < balls[i].r) {
            balls[i].beingDragged = true;
        }
    }
}//-------------------------------------------------------------------------------------------------

// MOUSE RELEASE - Let go of the ball
function mouseReleased() {
    for(var i in balls) {
        balls[i].beingDragged = false;
    }
}//-------------------------------------------------------------------------------------------------


// Key-binds
function keyPressed() {
    // 'T' - Toggles the trails
    if(key === "T") {
        trails = !trails;
    }
    // 'B' - Creates a new ball at the mouse location
    if(key === "B") {
        acc = createVector(0, 0);
        vel = createVector(0, 0);
        balls.push(new Ball(mouseX, mouseY, r, acc, vel));
    }
    // 'C' - Clears the vehicles
    if(key === "C") {
        balls = [];
    }
    // SPACE - Toggles debug
    if (key === ' ') {
        debug = !debug;
    }
    // 'G' - Toggles gravity
    if (key === 'G') {
        environment.hasGravity = !environment.hasGravity;
    }
    // 'P' - Pauuse
    if (key === 'P') {
        pause = !pause;
    }
}//-------------------------------------------------------------------------------------------------
