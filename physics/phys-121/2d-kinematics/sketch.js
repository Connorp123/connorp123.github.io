/*
    Global Variables
 */
let FRAME_RATE = 60;
let BG_COLOR = 0;
let DEBUG = true;


// For time
let t = 0;


// For ground
let Hground;
let Lground;


// For object
let r = 25;
let Rx;
let Ry;
let Vx;
let Vy;
let Ax;
let Ay;

// For origin
let Ox;
let Oy;

//-------------------------------------------------------------------------------------------------
/*
    p5 Basic Functions
 */
function setup() {
  var myCanvas = createCanvas(windowWidth - 50, windowHeight - 50);
  myCanvas.parent('canvas');
  frameRate(FRAME_RATE);

  // Set ground properties
  Lground = width;
  Hground = 50;

  // Set origin
  Ox = 50;
  Oy = (height - Hground) - r;

  // Set object starting position
  Rx = Ox;
  Ry = Oy;

  Vx = 0;
  Vy = 0;

  Ax = 0;
  Ay = 0;

}
function draw() {

  background(BG_COLOR);

  drawEnvironment();
  drawObject();
  displayValues();
}//------------------------------------------------------------------------------------------------

// Create the stage
function drawEnvironment() {

  fill(BG_COLOR + 75);
  noStroke();
  rect(0, height - Hground, Lground, Hground);
}


// Create the starting object
function drawObject() {

  fill(255);
  noStroke();
  circle(Rx, Ry, r);
}


// Display the initial kinematics values
function displayValues() {

  fill(0, 0, 255);
  textSize(20);

  let realRx = Rx - Ox;
  let realRy = Ry - Oy;
  // realVx = Vx;
  // realVy = Vy;
  // realAx = Ax;
  // realAy = Ay;


  let positonString = "R(" + t + "): (" + realRx + ", " + realRy + ")";
  let velocityString = "V(" + t + "): (" + Vx + ", " + Vy + ")";
  let accelerationString = "a(" + t + "): (" + Ax + ", " + Ay + ")";


  text(positonString, 5, 20);
  text(velocityString, 5, 40);
  text(accelerationString, 5, 60);
}


// Display the start button


// Run the experiment


// Display the final values