var debug = false;   // Draws debug stuff
var redraw = true;
var p = false;
var planets = [];  // List of Planet objects
var planet1;
var planet2;

function setup() {

    // Creates the canvas
    var myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.parent('canvas');

    // Create the planets
    planet1 = new Planet(width/4, height/2);
    planet2 = new Planet(width - width/4, height/2);

}

function draw() {

    // Re-draw the background
    if (redraw) background(51);

    // Create a vector at the mouse position
    mouse = createVector(mouseX, mouseY);

    // Apply gravity to the planets
    planet1.attract(planet2.pos);
    planet2.attract(planet1.pos);

    // Apply borders
    planet1.borders();
    planet2.borders();

    // Display the planets
    planet1.display();
    planet2.display();




}

function mousePressed() {


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