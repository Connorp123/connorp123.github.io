let redraw      = true;
let reset       = true;
let repel       = true;
let radiate     = false;
let debug       = false;
let displayMode = 0;
let bgColor     = 0;
let vehicles    = [];
let fontNames   = ['waltograph42.ttf', 'waltographUI.ttf'];
let fontNum     = 0;
let fontSize;
let font;
let textBox1;
let fontButton;
let displayModeButton;
//--------------------------------------------------------------------------------------------------

function preload() {
    // Load the font
    font = loadFont(fontNames[0]);
}//-------------------------------------------------------------------------------------------------

function setup() {
    // Creates the canvas
    let myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.parent('canvas');
    console.log(width + ", " + height);

    // Calculate the font size
    fontSize = floor(width / 4.5);
    console.log("Font size: " + fontSize);

     // Create the html elements
    createElements();

    // Display the particles
    updateText();
}//-------------------------------------------------------------------------------------------------

function draw() {
    if (redraw) background(bgColor);
    if (debug)  drawDebug();
    mouse = createVector(mouseX, mouseY);

    // Applies behaviors to the vehicles
    for (let i = 0; i < vehicles.length; i++) {
        if (reset)    vehicles[i].reset();
        if (repel)    vehicles[i].repel(mouse);
        if (radiate)  vehicles[i].repel(createVector(width/2,height/2), width);
        vehicles[i].run();
    }
}//-------------------------------------------------------------------------------------------------

// Key-binds
function keyPressed() {
    if(key === "1") { reset   = !reset;   }
    if(key === "R") { repel   = !repel;   }
    if(key === "B") { redraw  = !redraw;  }
    if(key === "F") { radiate = !radiate; }
    if(key === " ") { debug   = !debug;   }
    if(keyCode === UP_ARROW)    { changeFontSize(25); }
    if(keyCode ===  DOWN_ARROW) { changeFontSize(-25); }
}//-------------------------------------------------------------------------------------------------

function changeFontSize(amount) {
    fontSize += amount;
    updateText();
    console.log("New font size: " + fontSize);
}//-------------------------------------------------------------------------------------------------

function updateText() {

    let text = textBox1.value();
    let xPos = 25;
    let yPos = height/2 + fontSize/3;

    // Gets a list of points from the borders of the text
    let points = font.textToPoints(text, xPos, yPos, fontSize, {
        sampleFactor: 0.15  // sampleFactor ~ frequency of points
    });

    // Creates a vehicle at each of the points
    vehicles = [];
    for(let i = 0; i < points.length; i++) {
        let pt = points[i];
        let vehicle = new Vehicle(pt.x, pt.y, 5);
        vehicle.randomizePos();
        vehicles.push(vehicle);
    }
}//-------------------------------------------------------------------------------------------------

function switchFont() {
    fontNum++;
    font = loadFont(fontNames[fontNum % fontNames.length], updateText);
}//-------------------------------------------------------------------------------------------------

// Create the HTML Elements
function createElements() {

    // Get the variables from the URL
    let urlValues = getURLValues();

    // Create the elements
    if(urlValues.text)
        textBox1      = createInput(urlValues.text);
    else
        textBox1      = createInput('ConnorPeace');
    fontButton        = createButton('Switch Font');
    displayModeButton = createButton('Switch Particle Type');

    // Set their functions
    textBox1.input(updateText);
    fontButton.mousePressed(switchFont);
    displayModeButton.mousePressed(changeDisplayMode);

    // Set their positions
    textBox1.position(0,0);
    fontButton.position(textBox1.width, 0);
    displayModeButton.position(textBox1.width + fontButton.width, 0);

    // Set their parents
    // textBox1.parent('textInput1');
    // fontButton.parent('fontButton');
    // displayModeButton.parent('displayModeButton');
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
}//-------------------------------------------------------------------------------------------------

function drawDebug() {
    stroke(255);
    line(0, height/2, width, height/2);
    line(0, height/2 + fontSize/2, width, height/2 + fontSize/2);
    line(0, height/2 - fontSize/2, width, height/2 - fontSize/2);
}//-------------------------------------------------------------------------------------------------