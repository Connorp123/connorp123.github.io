var debug = false;   // Draws debug stuff
var flow = false;
var attract = false;
var separate = true;
var redraw = true;

var flowField;      // flowField object
var vehicles = [];  // List of Vehicle objects

function setup() {
    // Creates the canvas
    var myCanvas = createCanvas(960, 520);
    myCanvas.parent('canvas');

    // Makes a new flowField
    flowField = new FlowField(20);

    // Makes a bunch of vehicles with random values
    // for (var i = 0; i < 20; i++) {
    //     vehicles.push(new Vehicle(random(width), random(height)));
    // }
}

function draw() {
    if (redraw) background(51);
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

// Key-binds
function keyPressed() {
    if (key === 'p' || key === 'P') {
        alert(
          "Controls:\n"
          + "Drag to spawn new balls\n"
          + "C - Clear all balls\n"
          + "F - Toggle flow field\n"
          + "A - Toggle attraction to the mouse\n"
          + "S - Toggle separation of the balls\n"
          + "B - Toggle background re-draw\n"
          + "SPACE - Toggle debug mode\n"
        );
    }
    // "F" - Toggles the flow field
    else if(key === "f" || key === "F") {
        // Create a new flow field
        flow = !flow;
        if(flow) flowField.init();
    }
    // "A" - Toggles the attraction to the mouse
    else if(key === "a" || key === "A") {
        attract = !attract;
    }
    // "S" - Toggles the separation of the vehicles
    else if(key === "s" || key === "S") {
        separate = !separate;
    }
    // "B" - Toggles background re-draw
    else if(key === "b" || key === "B") {
        redraw = !redraw;
    }
    // "C" - Clears the vehicles
    else if(key === "c" || key === "C") {
        vehicles = [];
    }
    // SPACE - Toggles debug
    else if (key === ' ') {
        debug = !debug;
    }
}

function touchMoved() {
    vehicles.push(new Vehicle(mouseX, mouseY));
    return false;
}