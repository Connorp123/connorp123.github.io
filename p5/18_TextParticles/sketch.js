let redraw   = true;
let reset    = true;
let repel    = true;
let vehicles = [];  // List of Vehicle objects
let font;
let textBox1;
//--------------------------------------------------------------------------------------------------

function preload() {
    // Load the font
    font = loadFont('waltographUI.ttf');
}//-------------------------------------------------------------------------------------------------

function setup() {
    // Creates the canvas
    let myCanvas = createCanvas(1000, 600);
    myCanvas.parent('canvas');

     // Create the buttons
    textBox1 =  createInput('');
    textBox1.input(updateText);
    textBox1.parent('textBox1');

    // Gets a list of points from the borders of the text
    let points = font.textToPoints('Connor', 75, height/1.75, 200, {
        sampleFactor: 0.25  // sampleFactor ~ frequency of points
    });

    // Creates a vehicle at each of the points
    for(let i = 0; i < points.length; i++) {
        let pt = points[i];
        let vehicle = new Vehicle(pt.x, pt.y, 5);
        vehicles.push(vehicle);
    }
}//-------------------------------------------------------------------------------------------------

function draw() {
    if (redraw) background(51);
    mouse = createVector(mouseX, mouseY);

    // Applies behaviors to the vehicles
    for (let i = 0; i < vehicles.length; i++) {
        if (reset)    vehicles[i].reset();
        if (repel)    vehicles[i].repel(mouse);
        vehicles[i].run();
    }
}//-------------------------------------------------------------------------------------------------

// Key-binds
function keyPressed() {
    if(key === "1") { reset  = !reset; }
    if(key === "R") { repel  = !repel; }
    if(key === "B") { redraw = !redraw; }
}//-------------------------------------------------------------------------------------------------

function updateText() {
    // Gets a list of points from the borders of the text
    let points = font.textToPoints(this.value(), 75, height/1.75, 200, {
        sampleFactor: 0.25  // sampleFactor ~ frequency of points
    });

    // Creates a vehicle at each of the points
    vehicles = [];
    for(let i = 0; i < points.length; i++) {
        let pt = points[i];
        let vehicle = new Vehicle(pt.x, pt.y, 5);
        vehicles.push(vehicle);
    }
}