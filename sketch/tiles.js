let redraw = false;
let NUM_SQUARES = 100;
let ROW_LENGTH = 10;
let squares = [];
let current = 0;
let drawing = true;

function setup() {
  let myCanvas = createCanvas(480, 480);
  myCanvas.parent('sketch');
  frameRate(45);
  background(0);

  // Create each square
  let w = width / ROW_LENGTH;
  let x = 0;
  let y = 0;

  // Create each square
  for(let row = 0; row < ROW_LENGTH; row++) {
    for(let col = 0; col < ROW_LENGTH; col++) {
      squares.push(new Square(x, y, w));
      x += w;
    }
    x = 0;
    y += w;
  }
}

function draw() {
  if (redraw) background(0);

  // At each frame, show the next square
  if (current >= NUM_SQUARES) {
    current = 0;
    drawing = !drawing;
  }

  if (drawing) {
    squares[current].draw();
  } else {
    squares[current].hide();
  }

  current++;
}

function keyPressed() {

}

function mouseClicked() {

}