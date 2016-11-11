/******************
 * INITIALIZATION *
 ******************/

var debug = false;  // Draws debug stuff
var trails = false; // Draws the trails (stops re-drawing the background)
var rods = [];
var environment;
var pause = false;
var xoff = 0;
//-------------------------------------------------------------------------------------------------

/*********
 * SETUP *
 *********/

function setup() {
    // Creates the canvas
    var myCanvas = createCanvas(windowWidth-300, windowHeight-100);
    myCanvas.parent('canvas');

    // Creates an environment
    // environment = new Environment();

    // Create a x & y axis
    stroke(0);
    line(width/2, 0, width/2, height);
    line(0, height/2, width, height/2);

    // Create a rod
    rods.push(new Rod(width/2,height/2, 200, 10, 0, 1, 2));
}//------------------------------------------------------------------------------------------------

/********
 * DRAW *
 ********/

function draw() {

    // If the simulation ISN'T paused
    if(!pause) {
        // Draws the background if 'trails' is false
        if(!trails) background(151);

        // Create a x & y axis
        stroke(0);
        line(width/2, 0, width/2, height);
        line(0, height/2, width, height/2);

        // Draw & rotate the rods
        for(var i in rods) {

            // Update the mover
            rods[i].update();
            rods[i].spin();
            rods[i].edges();
            rods[i].display();

        }
    }
    // If the simulation IS paused
    else{
        // Do nothing
    }

}//------------------------------------------------------------------------------------------------

/*************
 * KEY-BINDS *
 *************/

function keyPressed() {
    // 'T' - Toggles the trails
    if(key === "T") {
        trails = !trails;
    }
    // 'P' - Pauuse
    if (key === 'P') {
        pause = !pause;
    }
    // 'R' - Creates a new Rod
    if (key === 'R') {
        rods.push(new Rod(mouseX,mouseY));
    }
    // 'C' - Clears the Rods
    if (key === 'C') {
        rods = [];
    }
}//------------------------------------------------------------------------------------------------