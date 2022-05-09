let redraw = false;
let myCanvas;

function setup() {

  myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent('sketch');
  background(0);
}

function draw() {
  if(redraw) {
    background(0);
  }

}

function keyPressed() {
  if(key === "b" || key === "B") {
    redraw = !redraw;
  }
}

