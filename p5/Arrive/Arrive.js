var vehicle;
var vehicles = [];

function setup() {
    var myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.parent('myContainer');
}

function draw() {
    background(51);

    // Arrive at the target
    var target = createVector(mouseX, mouseY);

    // Update and display
    for(var i = 0; i < vehicles.length; ++i){
        vehicles[i].arrive(target);
        vehicles[i].update();
        vehicles[i].display();
    }

}

// Creates key-binds
function keyPressed() {
    // "F" - Create a new vehicle
    if (key === "F") {
        vehicles.push(new Vehicle(0, 0));
    }
    // "C" - Clear all vehicles
    if (key === "C") {
        vehicles = [];
    }
    // "R" - Remove all balls @ the mouse location
    if (key === "R") {
        for(var i = 0; i < vehicles.length; ++i){
            if (dist(vehicles[i].pos.x, vehicles[i].pos.y, mouseX, mouseY) < vehicles[i].r) {
                vehicles.splice(i, 1);
                i++;
            }
        }
    }
}