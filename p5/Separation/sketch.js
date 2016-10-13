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
    if (!trails) background(51);
    mouse = createVector(mouseX, mouseY);
    // Display the flowField in "debug" mode
    if (debug) flowField.display();
    // Tell all the vehicles to follow the flow field
    for (var i = 0; i < vehicles.length; i++) {
        if (flow) vehicles[i].follow(flowField);
        if (attract) {
            vehicles[i].attract(mouse);
        }
        if (separate) {
            vehicles[i].separate(vehicles);
        }
        vehicles[i].run();
    }

}

function mouseDragged() {
    vehicles.push(new Vehicle(mouseX, mouseY));
}
var flow = false;
var attract = false;
var separate = true;
var trails = false;
// Key-binds
function keyPressed() {
    // "F" - Toggles the flow field
    if(key === "F") {
        // Create a new flow field
        flow = !flow;
        if(flow) flowField.init();
    }
    // "A" - Toggles the attraction to the mouse
    if(key === "A") {
        attract = !attract;
    }
    // "S" - Toggles the separation of the vehicles
    if(key === "S") {
        separate = !separate;
    }
    // "T" - Toggles the trails
    if(key === "T") {
        trails = !trails;
    }
    // "C" - Clears the vehicles
    if(key === "C") {
        vehicles = [];
    }
    // SPACE - Toggles debug
    if (key === ' ') {
        debug = !debug;
    }
}

function touchMoved() {
    vehicles.push(new Vehicle(mouseX, mouseY));
    return false;
}