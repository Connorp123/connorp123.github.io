var vehicle;
var vehicles = [];
var target;
var redraw = true;

function setup() {
    var myCanvas = createCanvas(windowWidth-20, windowHeight);
    myCanvas.parent('myContainer');

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
    // "F" - Create a new vehicle
    if (key === "F") {
        vehicles.push(new Vehicle(random(0, width), random(0, height)));
    }
    // "C" - Clear all vehicles
    if (key === "C") {
        vehicles = [];
    }
    // "B" - Toggle background re-draw
    if(key === "B") {
        redraw = !redraw;
    }
    // "R" - Remove all vehicles @ the mouse location
    if (key === "R") {
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