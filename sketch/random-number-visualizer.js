// let FRAME_RATE = 60;
let FRAME_RATE = 5;
let num_dots = 1;
let dots_left_to_display = num_dots;
let dots_per_frame;

let y;

let myCanvas;
let camera;

function setup() {
  // initCanvas()

  // Camera - Setup
  camera = new Camera(FRAME_RATE, 10);
  camera.setupCanvas();

  background(0);
  frameRate(FRAME_RATE);

  dots_per_frame = 1;

  displayNumDots(num_dots);
  displayDotsPerFrame(1);



}//------------------------------------------------------------------------------------------------

function draw() {
  if (dots_left_to_display > 0) {
    // Draw dots
    displayDots(dots_per_frame);
    dots_left_to_display -= dots_per_frame;

    // Draw progress bar
    y = map(dots_left_to_display, num_dots, 0, 0, width);
    stroke(0, 255, 0);
    rect(0, 0, y, 1);
    stroke(255, 0, 0);
    rect(y, 0, width-y, 1);
  }
  camera.capture(myCanvas)
}//------------------------------------------------------------------------------------------------

function keyPressed() {
  // Increment the number of dots by a power of 10 & redraw the dots
  if (keyCode === UP_ARROW) {
    num_dots *= 10;
    redrawDots();
  }

  else if (key === 's' || key === 'S') {
    camera.startCapture()
  }

  // Decrement the number of dots by a power of 10 and redraw the dots
  else if (keyCode === DOWN_ARROW) {
    if(num_dots >= 10) {
      num_dots /= 10;
      redrawDots();
    }
  }
  else if (keyCode === RIGHT_ARROW) {
    recalculateDotsPerFrame(10);
  } else if (keyCode === LEFT_ARROW) {
    recalculateDotsPerFrame(0.1);
  }
  else if (key === "P" || key === "p") {
    alert("Up Arrow - 10x number of dots\n"
      + "Down Arrow - 1/10 number of dots\n"
      + "Right Arrow - 10x speed of dots\n"
      + "Left Arrow - 1/10 speed of dots\n"
      + "\n"
      + "The top number is the number of (random) dots being drawn\n"
      + "The bottom number is the speed the dots are drawn");
  }
}//------------------------------------------------------------------------------------------------

// Controls for touchscreen devices
function mouseClicked() {
  if (num_dots > dots_per_frame) {
    recalculateDotsPerFrame(10);
  }
  num_dots *= 10;
  redrawDots();
}//------------------------------------------------------------------------------------------------

// "Refresh" the canvas, update the displayed number, and display (num_dots) on the canvas
function redrawDots() {

  // Paint over old dots
  background(0);

  // Show how many dots will be drawn
  displayNumDots(num_dots);

  // Show the dots per second
  displayDotsPerFrame(1);

  // Display the dots
  dots_left_to_display = num_dots;

}//------------------------------------------------------------------------------------------------

// Display the number of dots as text on the canvas
function displayNumDots(n) {
  fill(255);
  noStroke();
  textSize(50);
  textAlign(LEFT, TOP);
  text(n.toLocaleString(), 20, 20);
}//------------------------------------------------------------------------------------------------

// Display the dots per frame
function displayDotsPerFrame(isOn) {
  if(isOn) {
    fill(255);
    noStroke();
  } else {
    fill(0);
    stroke(0);
    strokeWeight(2);
  }

  textSize(50);
  textAlign(LEFT, BOTTOM);
  text(dots_per_frame.toLocaleString(), 20, height-20);
  strokeWeight(0);
}//------------------------------------------------------------------------------------------------

// Display a number (n) of dots on the canvas
function displayDots(n) {
  strokeWeight(2);
  for (let j = 0; j < n; j++) {
    new Dot().display();
  }
}//------------------------------------------------------------------------------------------------

// Re-calculate the dots per frame
function recalculateDotsPerFrame(dpfMultiplier) {
  if ((dots_per_frame >= 10 && dpfMultiplier < 1)
    || (dots_per_frame <= 1000 && dpfMultiplier > 1 && dots_per_frame < num_dots)) {

    // Clear old text
    displayDotsPerFrame(0);

    // update dots per frame
    dots_per_frame *= dpfMultiplier;

    // Write new text
    displayDotsPerFrame(1);
  }
}//------------------------------------------------------------------------------------------------