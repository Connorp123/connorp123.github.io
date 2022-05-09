let redraw = false;
let myCanvas;
let camera;
let radius = 1;
let x = 0;
let y = 0;
let R, G, B;
let forgiveness = 20;
let SPACING = 10;

function setup() {

  myCanvas = initCanvas()
  frameRate(45);
  background(0);
  noFill();
  strokeWeight(1);
}

function draw() {
  if(redraw) {
    background(0);
  }

  if(mouseIsPressed) {
    // If the mouse is in the same spot
    if(abs(x - mouseX) <= forgiveness && abs(y - mouseY) <= forgiveness) {
      radius += SPACING;
    }
    else {
      radius = int(random(4, 6) + 1);
      x = mouseX;
      y = mouseY;
      R = random(0, 255);
      G = random(0, 255);
      B = random(0, 255);
    }
    drawCircle(radius);
  }

  // camera.captureFrame(myCanvas);
}

function drawCircle() {
  stroke(R, G, B);
  circle(mouseX, mouseY, radius);
}

function keyPressed() {
  if(key === "b" || key === "B") {
    redraw = !redraw;
  } else if(key === "s" || key === "S") {
    // camera.startCapture();
  } else if(key === "c" || key === "C") {
    background(0);
  }
}

