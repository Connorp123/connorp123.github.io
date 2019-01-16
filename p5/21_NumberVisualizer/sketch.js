var num_dots = 10;

function setup() {
    var myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.parent('canvas');

    redrawDots();
}//------------------------------------------------------------------------------------------------

function draw() {

}//------------------------------------------------------------------------------------------------

function Dot(x, y, d) {
    
    this.x = x || random(0, width);
    this.y = y || random(0, height);
    this.d = d || 0;

    this.rgb = [random(0,255), random(0,255), random(0,255)];
    
    this.display = function () {
        this.drawPoint(this.x, this.y);
    };

    this.drawPoint = function (x, y) {
        stroke(this.rgb[0], this.rgb[1], this.rgb[2]);
        point(x, y);
    };
    
}//------------------------------------------------------------------------------------------------

function keyPressed() {
    if(keyCode === RIGHT_ARROW) {
        num_dots *= 10;
        redrawDots();
    } else if (keyCode === LEFT_ARROW) {
        if(num_dots > 0) {
            num_dots /= 10;
            redrawDots();
        }
    }
}//------------------------------------------------------------------------------------------------

function redrawDots() {

    // Paint over old dots
    background(0);

    // Show how many dots will be drawn
    fill(255);
    noStroke();
    textSize(50);
    textAlign(CENTER, CENTER);
    text(str(num_dots), width/2, height/2);

    // Display the dots
    displayDots(num_dots);

}//------------------------------------------------------------------------------------------------

function displayDots(n) {
    for (var j = 0; j < n; j++) {
        new Dot().display();
    }
}//------------------------------------------------------------------------------------------------


