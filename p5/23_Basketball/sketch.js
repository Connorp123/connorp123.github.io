/*
        Global Variables
 */
var FRAME_RATE = 60;
var BG_COLOR = 0;

var balls = [];
var hoops = [];

var shots = 0;
var baskets = 0;
//-------------------------------------------------------------------------------------------------
/*
        p5 Basic Functions
 */
function setup() {
    var myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.parent('canvas');

    background(BG_COLOR);
    frameRate(FRAME_RATE);

    // Create original ball
    balls.push(new Ball());

    // Create original hoop
    hoops.push(new Hoop());
}
function draw() {

    background(BG_COLOR);

    // Display the balls
    for(let i = 0; i < balls.length; i++) {
        balls[i].update();
        balls[i].display();
        checkBasket(balls[i], hoops[0]);
    }

    // Display the hoop
    hoops[0].display();

    // Display the counters
    showShots();
    showBaskets();

    // Check if the ball is about to make a basket
}//------------------------------------------------------------------------------------------------
/*
        Game-Related
 */
function checkBasket(ball, hoop) {
    var Px = ball.pos.x;
    var Py = ball.pos.y;
    var r  = ball.d / 2;
    var Vx = ball.vel.x;
    var Vy = ball.vel.y;
    var Hx = hoop.x;
    var Hy = hoop.y;
    var Hw = hoop.w;

    if(
         Px + Vx >= Hx
      && Px + Vx <= Hx + Hw
      && Py + r < Hy
      && Py + r + Vy + r >= Hy
    ) {
        baskets++;
        balls.push(new Ball(createVector(Px + Vx, Py + Vy)));
    }
}//------------------------------------------------------------------------------------------------
/*
        Counters
 */
// Show number of shots
function showShots() {
    stroke(255);
    strokeWeight(1);
    textSize(25);
    text("Shots: " + shots, 30, 30);
}

// Show number of baskets
function showBaskets() {
    stroke(255);
    strokeWeight(1);
    textSize(25);
    text("Baskets: " + baskets, 30, 60);
}
//------------------------------------------------------------------------------------------------
/*
        Controls
 */
// Keyboard controls
function keyPressed() {
    if (key === "P" || key === "p") {
        alert("");
    }
}
// Controls for touchscreen devices
function mouseClicked() {
    if(!balls[0].launched) {
        if(!balls[0].showAim) {
            balls[0].showAim = true;
        } else {
            balls[0].launchBall();
            shots++;
        }
    } else if (!balls[0].showAim) {
        balls[0].reset();
    }
}//------------------------------------------------------------------------------------------------