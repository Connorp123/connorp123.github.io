
// For background
var br = true;
var bgcolor = 0;



function setup() {

  // Create canvas
  // createCanvas(300, 127);
  createCanvas(windowWidth, windowHeight);
  background(bgcolor);
  frameRate(100);

}

function draw() {
  
  // Redraw background
  if (br) background(bgcolor);

  
}

function keyPressed() {
  
  if (key == "R") br = !br;
  
}
