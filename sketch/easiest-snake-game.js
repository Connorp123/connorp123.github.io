// Snake
let s;
let canvas;
let bgColor;
let food;
let rightBorderWidth;
let bottomBorderHeight;
let gameOver;
let best = 0;

const draw_scale = 50;
const fps = 10;

function setup() {
  // Canvas setup
  canvas = createCanvas(windowWidth, windowHeight)
  canvas.parent('sketch')
  frameRate(fps)
  calcBorderValues()

  // Snake setup
  setupGame()
}

function draw() {
  // Draw board
  background(bgColor.r, bgColor.g, bgColor.b)
  drawBorder()

  // Check for death
  if (s.die()) {
    endGame()
  }

  // Update snake
  s.update()
  s.display()

  // Update food
  food.display()
  if (food.eat(s.pos)) {
    s.grow()
  }
}

function keyPressed() {
  if (gameOver) {
    setupGame()
  } else {
    if (keyCode === UP_ARROW) {
      s.moveUp()
    } else if (keyCode === DOWN_ARROW) {
      s.moveDown()
    } else if (keyCode === RIGHT_ARROW) {
      s.moveRight()
    } else if (keyCode === LEFT_ARROW) {
      s.moveLeft()
    }
  }
}

function touchStarted() {
  if (gameOver) {
    setupGame()
  }
  // Middle third
  else if (mouseX > width / 3 && mouseX < (2 * width) / 3) {
    // Top third
    if (mouseY < height / 3) {
      s.moveUp()
    }
    // Bottom third
    else if (mouseY > (height * 2) / 3) {
      s.moveDown()
    }
  }
  // Outer 2 thirds
  else {
    if (mouseX < width / 3) {
      s.moveLeft()
    } else if (mouseX > (width * 2) / 3) {
      s.moveRight()
    }
  }
}

function calcBorderValues() {
  rightBorderWidth = width
  while (rightBorderWidth > draw_scale) {
    rightBorderWidth -= draw_scale
  }
  bottomBorderHeight = height
  while (bottomBorderHeight > draw_scale) {
    bottomBorderHeight -= draw_scale
  }
}

function setupGame() {
  // Game variables
  s = new Snake(draw_scale)
  food = new SnakeFood(draw_scale)
  gameOver = false;

  // Game styles
  bgColor = {
    r: 170,
    g: 215,
    b: 81
  }
  stroke(0)
}


function drawBorder() {
  fill(0)
  rect(width - rightBorderWidth, 0, rightBorderWidth, height)
  rect(0, height - bottomBorderHeight, width, bottomBorderHeight)
}

function endGame() {

  // Set gameOver
  gameOver = true
  best = max(s.total - 1, best);

  bgColor = {
    r: 255,
    g: 0,
    b: 0
  }
  noStroke()

  // Show score
  fill(255)
  textSize(40)
  let x = width / 2
  let y = height / 2
  textAlign(CENTER, CENTER)
  text("GAME OVER", x, y - 40)
  text(`SCORE: ${s.total - 1}`, x, y)
  if (best > 0)
    text(`BEST: ${best}`, x, y + 40)
}

