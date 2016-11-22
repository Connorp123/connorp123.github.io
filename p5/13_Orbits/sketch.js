var debug = false;   // Draws debug stuff
var redraw = true;
var p = false;
var planets = [];  // List of Planet objects

function setup() {
    // Creates the canvas
    // var myCanvas = createCanvas(640, 360);
    var myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.parent('canvas');

}

function draw() {

    // Re-draws the background
    if (redraw) background(51);

    // Creates a vector at the mouse position
    mouse = createVector(mouseX, mouseY);

    // Applies forces to the planets
    for (var i = 0; i < planets.length; i++) {
        planets[i].run();
    }

}

function mouseClicked() {
    planets.push(new Planet(mouseX, mouseY));
}

// Key-binds
function keyPressed() {
    // "P" - Toggles pause
    if(key === "P") {
        Pause();
    }
    // "B" - Toggles the background redraw
    if(key === "B") {
        redraw = !redraw;
    }
    // "C" - Clears the planets
    if(key === "C") {
        planets = [];
    }
    // SPACE - Toggles debug
    if (key === ' ') {
        debug = !debug;
    }
}

// Stop/Start the draw() loop
function Pause() {
    if(p) {
        loop();
    }
    else{
        noLoop();
    }
    p = !p;
}

// // Happens when someone drags their finger on a mobile device
// function touchMoved() {
//     planets.push(new Planet(mouseX, mouseY));
//     return false;
// }