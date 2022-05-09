let debug = false;   // Draw the flow field
let redrawBackground = true; // Re-draw the background every frame
let flowField;      // flowField object
let vehicles = [];  // List of Vehicle objects
let NUM_VEHICLES = 100;
let myCanvas;
let bgColor = 250;

function setup() {
  // Creates the canvas
  myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.position(0,0);
  myCanvas.style('z-index', '-1');


  // Makes a new flowField
  flowField = new FlowField(30);

  // Makes a bunch of vehicles with random values
  for (let i = 0; i < NUM_VEHICLES; i++) {
    vehicles.push(new Vehicle(random(width), random(height), random(2, 5), random(0.1, 0.5)));
  }
}

function draw() {

  // Re-draw the background
  if (redrawBackground) background(bgColor);

  // Display the flowField in "debug" mode
  if (debug) flowField.display();

  // Tell all the vehicles to follow the flow field
  for (let i = 0; i < vehicles.length; i++) {
    vehicles[i].follow(flowField);
    vehicles[i].run();
  }
}

// Key-binds
function keyPressed() {
  // SPACE - Debug
  if (key === ' ') {
    debug = !debug;
  } else if (key === 'p' || key === 'P') {
    alert(
      "Controls:\n"
      + "Click to create a new flow field\n"
      + "Hit space to show the flow field\n"
      + "Hit 'b' to stop the background redraw"
    );
  } else if (key === 'b' || key === 'B') {
    redrawBackground = !redrawBackground;
  }
}

// When the mouse is pressed
function mousePressed() {
  // Create a new flow field
  flowField.init();
}