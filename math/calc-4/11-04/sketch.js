/*
    Global Variables
 */
var FRAME_RATE = 60;
var BG_COLOR = 0;
var DEBUG = true;

let origin;
let vectorA;
let vectorB;
let projectedVector;
let orthogonalVector;

let drawStatus = 0;

//-------------------------------------------------------------------------------------------------
/*
    p5 Basic Functions
 */
function setup() {
  var myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent('canvas');
  frameRate(FRAME_RATE);


  // Set the origin
  origin = createVector(width * 0.1, height * 0.9);
  if (DEBUG) console.log("Origin: " + origin.x + ", " + origin.y);
  makeVectorB();
}
function draw() {

  background(BG_COLOR);

  drawVectorB();
  drawVectorA();
  drawProjectedVector();
  drawOrthogonalVector();
}//------------------------------------------------------------------------------------------------


// Draw a random vector to project onto
function makeVectorB() {
  vectorB = createVector(origin.x + random(width * 0.8), origin.y + random(-1 * (height * 0.8)));
  if (DEBUG) console.log("B: " + vectorB.x + ", " + vectorB.y);
}

function drawVectorB() {
  stroke(231, 97, 0);
  line(origin.x, origin.y, vectorB.x, vectorB.y);
}


// Draw a vector with mouse clicks
function mouseReleased() {
  makeVectorA();
}

function makeVectorA() {

  // Increment the draw status
  drawStatus++;

  // Clear the vector
  if(drawStatus % 3 === 0) {

  }

  // Start previewing the vector
  else if (drawStatus % 3 === 1) {

  }

  // Make the end point
  else {
    vectorA = createVector(mouseX, mouseY);
    if (DEBUG) console.log("A: " + vectorA.x + ", " + vectorA.y);

    // Make the 2 related vectors
    makeProjectedVector();
    makeOrthogonalVector();
  }
}

function drawVectorA() {

  // Clear the vector
  if(drawStatus % 3 === 0) {

  }

  // Start previewing the vector
  else if (drawStatus % 3 === 1) {
    stroke(0, 0, 255);
    line(origin.x, origin.y, mouseX, mouseY);
  }

  // Make the end point
  else {
    stroke(0, 0, 255);
    line(origin.x, origin.y, vectorA.x, vectorA.y);
  }
}


// Draw vector a projected onto b
function makeProjectedVector() {

  let realA = p5.Vector.sub(vectorA, origin);
  let realB = p5.Vector.sub(vectorB, origin);

  let top = p5.Vector.dot(realA, realB);
  let bot = realB.magSq();

  projectedVector = p5.Vector.mult(realB, (top / bot));
  projectedVector.add(origin.x, origin.y);

  if (DEBUG) console.log("Proj: " + projectedVector.x + ", " + projectedVector.y);
}

function drawProjectedVector() {
  if(drawStatus % 3 === 2) {
    stroke(0, 0, 255, 100);
    line(origin.x, origin.y, projectedVector.x, projectedVector.y);
  }
}

// Draw orthogonal vector a - (a projected onto b)
function makeOrthogonalVector() {

  let realA = p5.Vector.sub(vectorA, origin);
  let realP = p5.Vector.sub(projectedVector, origin);

  orthogonalVector = p5.Vector.sub(realA, realP);
  orthogonalVector.add(origin.x, origin.y);
  // orthogonalVector.add(projectedVector.x, projectedVector.y);

  if (DEBUG) console.log("Orth: " + orthogonalVector.x + ", " + orthogonalVector.y);
}

function drawOrthogonalVector() {
  if(drawStatus % 3 === 2) {
    push();
    stroke(0, 255, 0);
    translate(projectedVector.x, projectedVector.y);
    line(0, 0, orthogonalVector.x, orthogonalVector.y);
    pop();
  }
}


// Display all vector values


// Draw grid