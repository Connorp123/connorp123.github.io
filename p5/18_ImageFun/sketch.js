var debug = false;   // Draws debug stuff
var flow = false;
var attract = false;
var separate = false;
var redraw = true;

var flowField;      // flowField object
var vehicles = [];  // List of Vehicle objects

// Image variables
var ChloPirate;

//--------------------------------------------------------------------------------------------------

function preload() {
    // Load the image(s)
    ChloPirate = loadImage("ChloPirate.jpg");
}//-------------------------------------------------------------------------------------------------

function setup() {
    // Creates the canvas
    var myCanvas = createCanvas(ChloPirate.width, ChloPirate.height);
    myCanvas.parent('canvas');

    // Makes a new flowField
    flowField = new FlowField(20);

    // Fill the screen with vehicles
    var d = 6;
    pixelDensity(1);
    ChloPirate.loadPixels();
    for (var x = d/2; x < ChloPirate.width; x += d) {
        for(var y = d/2; y < ChloPirate.height; y += d) {

            // Create the vehicle
            var newV = new Vehicle(x, y);

            // Color the vehicle
            var loc = (x + y * ChloPirate.width) * 4;
            var imgR = ChloPirate.pixels[loc];
            var imgG = ChloPirate.pixels[loc+1];
            var imgB = ChloPirate.pixels[loc+2];
            var imgClr = color(imgR, imgG, imgB);
            newV.clr = imgClr;

            // Add the vehicle to the array
            vehicles.push(newV);
        }
    }
}//-------------------------------------------------------------------------------------------------


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

}//-------------------------------------------------------------------------------------------------

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
    // "B" - Toggles background re-draw
    if(key === "B") {
        redraw = !redraw;
    }
    // "C" - Clears the vehicles
    if(key === "C") {
        vehicles = [];
    }
    // SPACE - Toggles debug
    if (key === ' ') {
        debug = !debug;
    }
}//-------------------------------------------------------------------------------------------------

