// A list of vehicles
var vehicles = [];

var sepSlider;
var seekSlider;

function setup() {
    var canvas = createCanvas(640,360);
    canvas.parent('canvas');
    sepSlider  = createSlider(0, 10, 1, 0.5);
    sepSlider.position(width, 0);
    seekSlider = createSlider(0, 10, 1, 0.5);
    seekSlider.position(width, 30);

    // We are now making random vehicles and storing them in an array
  for (var i = 0; i < 75; i++) {
    vehicles.push(new Vehicle(random(width),random(height)));
  }
}

function draw() {
    background(51);
    for (var i = 0; i < vehicles.length; i++) {
        vehicles[i].applyBehaviors(vehicles, sepSlider.value(), seekSlider.value());
        vehicles[i].update();
        vehicles[i].borders();
        vehicles[i].display();
    }

}

// Key-binds
function keyPressed() {
    if (key === "C") {
        vehicles = [];
    }
}


function mouseDragged() {
  vehicles.push(new Vehicle(mouseX,mouseY));
}



