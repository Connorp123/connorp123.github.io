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
//--------------------------------------------------------------------------------------------------

function preload() {
    // Load the song
    song = loadSound("ChainSmoker.mp3");
}//-------------------------------------------------------------------------------------------------

function setup() {
    // Creates the canvas
    let myCanvas = createCanvas(windowWidth, windowHeight);
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
    let i = 1;
    let x = width/2;
    let y = height/2;
    let separation = SEPARATION;
    let speed = 1;

    // Draw a particle in the center
    vehicles.push( new Vehicle(x, y, speed) );

    // Draw particles until they reach the top of the screen
    while(y - separation > 0) {
        // Draw a particle above the starting value
        vehicles.push( new Vehicle(x, y - separation, speed) );

        // Increment i & adjust separation
        i++;
        separation = SEPARATION * i;
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
    if(keyCode === RIGHT_ARROW) { ROTATION_SPEED += 0.1; }
    if(keyCode === LEFT_ARROW)  { ROTATION_SPEED -= 0.1; }
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
    text("FPS: " + floor(frameRate()), width-100, 20);
}//-------------------------------------------------------------------------------------------------