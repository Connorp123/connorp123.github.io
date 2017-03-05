let redraw   = true;
let reset    = true;
let repel    = true;
let displayMode = 0;
let vehicles = [];
let fontNames = ['waltograph42.ttf', 'waltographUI.ttf'];
let font;
let fontNum   = 0;
let fontSize  = 200;
let textBox1;
let fontButton;
let displayModeButton;
let urlValues;
//--------------------------------------------------------------------------------------------------

function preload() {
    // Load the font
    font = loadFont(fontNames[0]);
}//-------------------------------------------------------------------------------------------------

function setup() {
    // Creates the canvas
    let myCanvas = createCanvas(1000, 600);
    myCanvas.parent('canvas');

    // Get the variables from the URL
    urlValues = getURLValues();

     // Create the html elements
    if(urlValues.text)
        textBox1 = createInput(urlValues.text);
    else
        textBox1 = createInput('ConnorPeace');
    textBox1.input(updateText);
    textBox1.parent('textInput1');
    fontButton = createButton('Switch Font');
    fontButton.parent('fontButton');
    fontButton.mousePressed(switchFont);
    displayModeButton = createButton('Switch Particle Type');
    displayModeButton.parent('displayModeButton');
    displayModeButton.mousePressed(changeDisplayMode);

    // Display the particles
    updateText();
}//-------------------------------------------------------------------------------------------------

function draw() {
    if (redraw) background(0);
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
    if(keyCode ===  DOWN_ARROW) { fontSize -= 5; updateText(); console.log("Working"); }
    if(keyCode === UP_ARROW)    { fontSize += 5; updateText(); }
}//-------------------------------------------------------------------------------------------------

function updateText() {
    // Gets a list of points from the borders of the text
    let points = font.textToPoints(textBox1.value(), 75, height/1.75, fontSize, {
        sampleFactor: 0.25  // sampleFactor ~ frequency of points
    });

    // Creates a vehicle at each of the points
    vehicles = [];
    for(let i = 0; i < points.length; i++) {
        let pt = points[i];
        let vehicle = new Vehicle(pt.x, pt.y, 5);
        vehicles.push(vehicle);
    }
}//-------------------------------------------------------------------------------------------------

function switchFont() {
    fontNum++;
    font = loadFont(fontNames[fontNum % fontNames.length], updateText);
}//-------------------------------------------------------------------------------------------------

// From http://stackoverflow.com/questions/8237780/javascript-read-variable-value-from-url
function getURLValues() {

    let search = window.location.search.replace(/^\?/,'').replace(/\+/g,' ');
    let values = {};

    if (search.length) {
        let part, parts = search.split('&');

        for (let i=0, iLen=parts.length; i<iLen; i++ ) {
            part = parts[i].split('=');
            values[part[0]] = window.decodeURIComponent(part[1]);
        }
    }
    console.log(values);
    return values;
}//-------------------------------------------------------------------------------------------------

function changeDisplayMode() {
    displayMode++;
    displayMode = displayMode % 2;
    updateText();
}