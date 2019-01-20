/*
        Global Variables
 */
var FRAME_RATE = 60;
var MAX_DPF = 1000;

var num_dots = 1;
var dots_left_to_display = num_dots;
var dots_per_frame;

var y;

// For existing pixels
var num_pixels;
var spots_left;
var num_spots_left;
var x_pos;
var y_pos;
var temp_val;
var o;
//-------------------------------------------------------------------------------------------------
/*
        p5 Basic Functions
 */
function setup() {
    var myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.parent('canvas');

    // Populate the arrays
    num_pixels = width * height;
    // spots_left = num_pixels;
    resetSpotsLeft();

    background(0);
    frameRate(FRAME_RATE);

    dots_per_frame = 1;

    displayNumDotsToDraw(num_dots);
    displayDotsPerFrame(1);
}//------------------------------------------------------------------------------------------------
function draw() {
    if (dots_left_to_display > 0) {
        // Draw dots
        if(num_spots_left > dots_per_frame) {
            displayDots(dots_per_frame);
            num_spots_left -= dots_per_frame;
            dots_left_to_display -= dots_per_frame;
        } else if (num_spots_left > 0){
            displayDots(num_spots_left);
            dots_left_to_display -= num_spots_left;
            num_spots_left = 0;
            displayNumDotsDrawn(dots_left_to_display);
        }

        // Draw progress bar
        displayProgressBar();
    }
}//------------------------------------------------------------------------------------------------
/*
        Displaying
 */
// Display a number (n) of dots on the canvas
function displayDots(n) {
    while (n > 0) {
        temp_val = spots_left.splice(int(random(0, num_spots_left)), 1)[0];
        x_pos = temp_val % width;
        y_pos = temp_val / width;
        new Dot(x_pos, y_pos).display();

        n--;
    }
}//------------------------------------------------------------------------------------------------
// Display a progress bar at the top
function displayProgressBar() {
    y = map(dots_left_to_display, num_dots, 0, 0, width);
    fill(0, 255, 0);
    rect(0, 0, y, 1);
    fill(255, 0, 0);
    rect(y, 0, width-y, 1);
}//------------------------------------------------------------------------------------------------
/*
        Refreshing values
 */
// Re-calculate the dots per frame
function recalculateDotsPerFrame(dpfMultiplier) {
    if ((dots_per_frame >= 10 && dpfMultiplier < 1)
      || (dots_per_frame <= MAX_DPF / 10 && dpfMultiplier > 1 && dots_per_frame < num_dots)) {

        // Clear old text
        displayDotsPerFrame(0);

        // update dots per frame
        dots_per_frame *= dpfMultiplier;

        // Write new text
        displayDotsPerFrame(1);
    }
}//------------------------------------------------------------------------------------------------
// Re-make the array with the pixel spots left
function resetSpotsLeft() {
    num_spots_left = num_pixels;
    spots_left = new Array(num_spots_left);
    for (var p = 0; p < num_spots_left; p++) {
        spots_left[p] = p;
    }
}//------------------------------------------------------------------------------------------------

// "Refresh" the canvas, update the displayed number, and display (num_dots) on the canvas
function redrawDots() {

    // Paint over old dots
    background(0);
    resetSpotsLeft();

    // Show how many dots will be drawn
    displayNumDotsToDraw(num_dots);

    // Show the dots per second
    displayDotsPerFrame(1);

    // Display the dots
    dots_left_to_display = num_dots;

}//------------------------------------------------------------------------------------------------
/*
        Counters
 */
// Display the number of dots as text on the canvas
function displayNumDotsToDraw(n) {
    fill(255);
    noStroke();
    textSize(50);
    textAlign(LEFT, TOP);
    text(n.toLocaleString(), 20, 20);
    println("Total pixels: " + num_pixels);
}//------------------------------------------------------------------------------------------------
// Display the number of dots as text on the canvas
function displayNumDotsDrawn(numLeft) {
    fill(255);
    noStroke();
    textSize(20);
    textAlign(RIGHT, TOP);
    text(num_pixels.toLocaleString() + " dots were drawn."
        + numLeft.toLocaleString() + " dots were left", width-20, 20);
}//------------------------------------------------------------------------------------------------
// Display the dots per frame
function displayDotsPerFrame(isOn) {
    if(isOn) {
        fill(255);
        noStroke();
    } else {
        fill(0);
        stroke(0);
        strokeWeight(2);
    }

    textSize(50);
    textAlign(LEFT, BOTTOM);
    text(dots_per_frame.toLocaleString(), 20, height-20);
    strokeWeight(0);
}//------------------------------------------------------------------------------------------------
/*
        Controls
 */
// Keyboard controls
function keyPressed() {
    // Increment the number of dots by a power of 10 & redraw the dots
    if (keyCode === UP_ARROW) {
        num_dots *= 10;
        redrawDots();
    }
    // Decrement the number of dots by a power of 10 and redraw the dots
    else if (keyCode === DOWN_ARROW) {
        if(num_dots >= 10) {
            num_dots /= 10;
            redrawDots();
        }
    }
    else if (keyCode === RIGHT_ARROW) {
        recalculateDotsPerFrame(10);
    } else if (keyCode === LEFT_ARROW) {
        recalculateDotsPerFrame(0.1);
    }
    else if (key === "P" || key === "p") {
        alert("Up Arrow - 10x number of dots\n"
          + "Down Arrow - 1/10 number of dots\n"
          + "Right Arrow - 10x speed of dots\n"
          + "Left Arrow - 1/10 speed of dots\n"
          + "\n"
          + "The top number is the number of (random) dots being drawn\n"
          + "The bottom number is the speed the dots are drawn");
    }
}//------------------------------------------------------------------------------------------------
// Controls for touchscreen devices
function mouseClicked() {
    if (num_dots > dots_per_frame) {
        recalculateDotsPerFrame(10);
    }
    num_dots *= 10;
    redrawDots();
}//------------------------------------------------------------------------------------------------