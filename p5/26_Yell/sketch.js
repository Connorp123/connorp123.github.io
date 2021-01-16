var w;
var walkers = [];
var bgRedraw = true;
let mic;
let NUM_WALKERS = 50;
let maxAcc = 10;
let maxVel = 20;
let vol;
//------------------------------------------------------------------------------------

function setup() {
  var myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent('canvas');

  // Create an Audio input
  mic = new p5.AudioIn();

  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start();

  for(let i = 0; i < NUM_WALKERS; i++) {
    walkers.push(new Walker(random(0, width), random(0, height), 25));
  }
}

function draw() {
  if (bgRedraw) background(51);

  vol = mic.getLevel();
  maxAcc = map(vol, 0, .1, 2, 0);
  maxVel = map(vol, 0, .1, 40, 0);

  // Shows the walker
  for(var i = 0; i < walkers.length; ++i) {
    walkers[i].run();
  }
}
//------------------------------------------------------------------------------------
function touchStarted() {
  getAudioContext().resume();
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
    bgRedraw = !bgRedraw;
  } else if(key === "s" || key === "S") {
    saveCanvas(myCanvas, 'p5_Attraction', 'png');
  }
}//----------------------------------------------------------------------------------

