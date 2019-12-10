var vehicle;
var vehicles = [];
var target;
var redraw = true;

function setup() {
    var myCanvas = createCanvas(960, 520);
    myCanvas.parent('canvas');

    target = createVector(width/2, height/2);
}

function draw() {

    if (redraw) background(51);

    // Arrive at the target

    // Update and display
    for(var i = 0; i < vehicles.length; ++i){
        vehicles[i].arrive(target);
        vehicles[i].update();
        vehicles[i].display();
    }

}

// Creates key-binds
function keyPressed() {
    // "P" - Pause
    if (key === "p" || key === "P") {
        alert(
              "Controls:\n"
            + "F to create a vehicle\n"
            + "C to clear all balls\n"
            + "B to turn off background re-draw\n"
        );
    }
    // "F" - Create a new vehicle
    else if (key === "f" || key === "F") {
        vehicles.push(new Vehicle(random(0, width), random(0, height)));
    }
    // "C" - Clear all vehicles
    else if (key === "c" || key === "C") {
        vehicles = [];
    }
    // "B" - Toggle background re-draw
    else if(key === "b" || key === "B") {
        redraw = !redraw;
    }
    // "R" - Remove all vehicles @ the mouse location
    else if (key === "r" || key === "R") {
        for(var i = 0; i < vehicles.length; ++i){
            if (dist(vehicles[i].pos.x, vehicles[i].pos.y, mouseX, mouseY) < vehicles[i].r) {
                vehicles.splice(i, 1);
                i++;
            }
        }
    }
}

function mousePressed() {
    target = createVector(mouseX, mouseY);
}