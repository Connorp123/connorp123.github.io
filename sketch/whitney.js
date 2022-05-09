// Inspired by John Whitney - Matrix (1971) and also a post by IG: @perryeyal about @zach.lieberman's course named "Recreating the Past"
// https://www.youtube.com/watch?v=XGe9QuJWOIg

let telescopes = [];
let redraw = true;
let timer = 0;
let fading = false;
let myCanvas;
let camera;

function setup() {

  // Camera - Setup
  // camera = new Camera(1, 30);
  // camera.setupCanvas();

  myCanvas = createCanvas(windowWidth - 400, windowHeight);
  myCanvas.parent('sketch');
  myCanvas.mouseClicked(drawTelescope);
  frameRate(5);
  background(0);
}

function draw() {
  if(redraw) {
    background(0, 100);
  }

  for(let i = 0; i < telescopes.length; i++) {
    telescopes[i].update();
    telescopes[i].display();
  }

  // Kill the old shapes
  if (frameCount % 150 === 0) {
    telescopes = [];
  }
}

function drawTelescope() {
  // Choose a random number of shapes

  // Choose a up/down boolean

  // Choose a left/right boolean

  // Choose a increasing/decreasing in size boolean

  // Draw the shapes with increasing brightness
  telescopes.push(new Telescope(mouseX, mouseY));

  // Start a fading timer
  fading = true;
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

