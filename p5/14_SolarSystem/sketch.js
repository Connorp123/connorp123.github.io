var debug = false;   // Draws debug stuff
var redraw = true;
var p = false;
var planets = [];  // List of Planet objects

var mVec;
var gravity = false;

var rEarth = 1;
var rSun   = 109;

var mEarth = 1;
var mSun   = 333000;

var fr = 60; // Frame rate

function setup() {

    // Creates the canvas
    var myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.parent('canvas');

    // Create the planets
    planets.push(new Planet(width/3,         height/2, 200, mSun) );
    planets.push(new Planet(width - width/3, height/2, 10, mEarth) );

    planets[0].SetColor(255, 255, 0);
    planets[1].SetColor(0, 0, 255);

    // Set the frame rate
    frameRate(fr);
    console.log("The framerate is: " + fr);
}

function preload() {

}

function draw() {

    // Re-draw the background
    if (redraw) background(100);

    mVec = createVector(mouseX, mouseY);

    // Apply gravity to the planets
    if(gravity) {

        planets[0].attract(planets[1].pos, planets[1].mass);
        planets[1].attract(planets[0].pos, planets[0].mass);

        // // For each planet
        // for(var i = 0; i < planets.length; ++i) {
        //
        //     // Create a gravity force directed towards all the other planets
        //     for(var j = 0; j < planets.length; ++j) {
        //
        //         planets[i].attract(planets[j].pos, planets[j].mass);
        //     }
        // }
    }

    // update, borders, display
    for(var i = 0; i < planets.length; ++i) {
        planets[i].run();
    }
    // planet1.run();
    // planet2.run();

}

function mousePressed() {

    for(var i = 0; i < planets.length; ++i) {


        // Check if it is being dragged
        if (dist(planets[i].pos.x, planets[i].pos.y, mouseX, mouseY) < planets[i].r) {
            console.log("Planet is being dragged");
            planets[i].beingDragged = true;
        }
    }




    // if (dist(planet2.pos.x, planet2.pos.y, mVec.x, mVec.y) < planet2.r) {
    //     console.log("Planet 2 is being dragged");
    //     planet2.beingDragged = true;
    // }

}

function mouseReleased() {

    for(var i = 0; i < planets.length; ++i) {
        planets[i].beingDragged = false;
    }

        // planet1.beingDragged = false;
    // planet2.beingDragged = false;

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
    // "G" - Toggles gravity
    if (key === "G") {
        gravity = !gravity;
    }
    // "N" - Create a new planet
    if (key === "N") {
        // planets.push(new Planet(mouseX, mouseY, mInput.value()));
    }
    // "R" - Reset the sketch
    if (key === "R") {
        Reset();
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

function Reset() {

    // Clear the planets
    planets = [];

    // Create the starting planets
    // planets.push(new Planet(width/4,         height/2, m1Input.value() ) );
    // planets.push(new Planet(width - width/4, height/2, m2Input.value() ) );
}

// // Happens when someone drags their finger on a mobile device
// function touchMoved() {
//     planets.push(new Planet(mouseX, mouseY));
//     return false;
// }