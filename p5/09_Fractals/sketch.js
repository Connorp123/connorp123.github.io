var fractal;

function setup() {
    var myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.parent('canvas');

     fractal = new Fractal(width/2, height/2, 500);
}//------------------------------------------------------------------------------------------------

function draw() {
    background(51);
    fractal.display();

}//------------------------------------------------------------------------------------------------

function Fractal(x, y, d) {
    
    this.x = x;
    this.y = y;
    this.d = d;

    this.rgb = [random(0,255), random(0,255), random(0,255)];
    
    this.display = function () {
        this.drawCircle(this.x, this.y, this.d);
    }
    
    this.drawCircle = function(x, y, d) {
        if(d > 5) {
            this.rgb = [random(0,255), random(0,255), random(0,255)];
            stroke(this.rgb[0], this.rgb[1], this.rgb[2]);
            noFill();
            ellipse(x, y, d, d);
            this.drawCircle(x + d/2, y, d/2);
            this.drawCircle(x - d/2, y, d/2);
            this.drawCircle(x, y + d/2, d/2);
            this.drawCircle(x, y - d/2, d/2);
        }
    }
    
}//------------------------------------------------------------------------------------------------

