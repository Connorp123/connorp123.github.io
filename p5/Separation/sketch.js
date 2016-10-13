var debug = false;   // Draws debug stuff
var flowField;      // flowField object
var vehicles = [];  // List of Vehicle objects

function setup() {
    // Creates the canvas
    // var myCanvas = createCanvas(640, 360);
    var myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.parent('canvas');

    // Makes a new flowField
    flowField = new FlowField(20);

    // Makes a bunch of vehicles with random values
    // for (var i = 0; i < 20; i++) {
    //     vehicles.push(new Vehicle(random(width), random(height)));
    // }
}

function draw() {
    background(51);
    // Display the flowField in "debug" mode
    if (debug) flowField.display();
    // Tell all the vehicles to follow the flow field
    for (var i = 0; i < vehicles.length; i++) {
        if (flow) vehicles[i].follow(flowField);
        vehicles[i].separate(vehicles);
        vehicles[i].run();
    }

}

function mouseDragged() {
    vehicles.push(new Vehicle(mouseX, mouseY));
}
var flow = false;
// Key-binds
function keyPressed() {
    if(key === "F") {
        // Create a new flow field
        flow = !flow;
        if(flow) flowField.init();

    }
    if(key === "C") {
        vehicles = [];
    }
    // SPACE - Debug
    if (key === ' ') {
        debug = !debug;
    }
}

function touchMoved() {
    vehicles.push(new Vehicle(mouseX, mouseY));
    return false;
}