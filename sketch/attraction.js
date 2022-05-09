let w;
let walkers = [];
let redraw = true;
let recording = false;
let frame = 0;
let RECORDING_LENGTH = 30 * 5;

function setup() {
  initCanvas()
  frameRate(60);

  walkers.push(new Walker(mouseX, mouseY, 20));
  walkers.push(new Walker(mouseX, mouseY, 20));
  walkers.push(new Walker(mouseX, mouseY, 20));
  walkers.push(new Walker(mouseX, mouseY, 20));
}

function draw() {
  if (redraw) background(0);
  // Shows the walker
  for(let i = 0; i < walkers.length; ++i) {
    walkers[i].update();
    walkers[i].display();
  }

  if(recording) {
    saveCanvas('img' + frame, 'png');
    frame++;
    if(frame >= RECORDING_LENGTH) {
      recording = false;
    }
  }
}

function touchStarted() {
  walkers.push(new Walker(mouseX, mouseY, 20));
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
  } else if(key === "c" || key === "C") {
    walkers = [];
  } else if(key === "b" || key === "B") {
    redraw = !redraw;
  } else if(key === "s" || key === "S") {
    recording = true;
  }
}
