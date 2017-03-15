let vehicles       = [];
let REDRAW         = true;
let DEBUG          = false;
let COLORFUL       = false;
let BG_COLOR       = 255;
let ANGLE          = 0;
let SEPARATION     = 5;
let SPEED_STEP     = 0.1;
let STROKE_WEIGHT  = 5;
let ROTATION_SPEED = 3;
let song;
let amp;
let vol;
let rainbow;
//--------------------------------------------------------------------------------------------------

function preload() {
    // Load the song
    song = loadSound("ChainSmoker.mp3");
}//-------------------------------------------------------------------------------------------------

function setup() {
    // Creates the canvas
    let myCanvas = createCanvas(windowWidth-20, windowHeight-20);
    myCanvas.parent('canvas');
    frameRate(60);

    // Create the vehicles
    createVehicles();

    // Set up song
    pause();
    amp = new p5.Amplitude();
}//-------------------------------------------------------------------------------------------------

function draw() {
    if (REDRAW) background(BG_COLOR);
    if (DEBUG)  drawDebug();

    // Applies behaviors to the vehicles
    for (let i = 0; i < vehicles.length; i++) {
        vehicles[i].update(ANGLE);
        vehicles[i].display();
    }

    // Control the rotation speed with the speed of the song
    vol = amp.getLevel();
    ANGLE += vol * ROTATION_SPEED;
}//-------------------------------------------------------------------------------------------------

function createVehicles() {
    vehicles = [];

    // Draw a particle in the center
    let x = width/2;
    let y = height/2;
    let speed = 1;
    let newVehicle = new Vehicle(x, y, speed);
    newVehicle.clr = setRainbow(y, height/2, 0);
    vehicles.push( newVehicle );

    // Draw particles until they reach the top of the screen
    while(y > 0) {
        // Draw a particle above the starting value
        newVehicle = new Vehicle(x, y, speed);
        newVehicle.clr = setRainbow(y, height/2, 0);
        vehicles.push( newVehicle );

        // Increment i & adjust separation
        y -= SEPARATION;
        speed += SPEED_STEP;
    }
}//-------------------------------------------------------------------------------------------------

// Key-binds
function keyPressed() {
    if(key === "C") { COLORFUL = !COLORFUL; }
    if(key === "B") { REDRAW  = !REDRAW;  }
    if(key === " ") { DEBUG   = !DEBUG;   }
    if(key === "P") { pause(); }
    if(keyCode === UP_ARROW)    { STROKE_WEIGHT += 1; }
    if(keyCode === DOWN_ARROW)  { if(STROKE_WEIGHT > 1) STROKE_WEIGHT -= 1; }
    if(keyCode === RIGHT_ARROW) { ROTATION_SPEED += 1; }
    if(keyCode === LEFT_ARROW)  { ROTATION_SPEED -= 1; }
}//-------------------------------------------------------------------------------------------------

function pause() {
    if (song.isPlaying()) {
        song.pause();
    } else {
        song.play();
    }
}//-------------------------------------------------------------------------------------------------

function drawDebug() {
    fill(0);
    textSize(20);
    text("FPS: " + floor(frameRate()), width-80, 20);
    text("Rotation Speed: " + ROTATION_SPEED, width-177, 40);
}//-------------------------------------------------------------------------------------------------

function setRainbow(value, low, height) {
    let rainbow = [
        color(255,0,0),       // Red
        color(255,65,0),
        color(255,130,0),     // Orange
        color(255,195,0),
        color(255,255,0),     // Yellow
        color(195,255,0),
        color(130,255,0),
        color(65,255,0),
        color(0,255,0),       // Green
        color(0,255,65),
        color(0,255,130),
        color(0,255,195),
        color(0,255,255),
        color(0,195,255),
        color(0,130,255),
        color(0,65,255),
        color(0,0,255),       // Blue
        color(65,0,255),
        color(130,0,255),     // Indigo
        color(195,0,255),
        color(255,0,255),      // Violet
    ];
    let i = floor( map(value, low, height, 0, rainbow.length) );
    if(i < 0) {
        i = 0;
    }
    console.log(i);
    return rainbow[i];
}//-------------------------------------------------------------------------------------------------