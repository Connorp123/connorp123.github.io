var debug = false;   // Draws debug stuff
var flowField;      // flowField object
var vehicles = [];  // List of Vehicle objects

function setup() {
  // Creates the canvas
  var myCanvas = createCanvas(600, 300);
  myCanvas.parent('canvas');

  // Makes a new flowField
  flowField = new FlowField(20);

  // Makes a bunch of vehicles with random values
  for (var i = 0; i < 120; i++) {
    vehicles.push(new Vehicle(random(width), random(height), random(2, 5), random(0.1, 0.5)));
  }
}

function draw() {
  background(51);
  // Display the flowField in "debug" mode
  if (debug) flowField.display();
  // Tell all the vehicles to follow the flow field
  for (var i = 0; i < vehicles.length; i++) {
    vehicles[i].follow(flowField);
    vehicles[i].run();
  }

}

// Key-binds
function keyPressed() {
  // SPACE - Debug
  if (key == ' ') {
    debug = !debug;
  }
}

// When the mouse is pressed
function mousePressed() {
  // Create a new flow field
  flowField.init();
}