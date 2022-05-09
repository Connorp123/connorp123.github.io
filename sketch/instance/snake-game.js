// Snake
let snake_game = (p) => {
  let s;
  let canvas;
  let bgColor;
  let food;
  let rightBorderWidth;
  let bottomBorderHeight;
  let gameOver;
  let best = 0;
  let initialGrow = 5;

  const draw_scale = 20;
  const fps = 5;

  p.setup = () => {
    // Canvas setup
    canvas = createInstanceCanvas(p)
    p.frameRate(fps)

    // Snake setup
    setupGame()
  }

  p.draw = () => {
    // Draw board
    p.background(bgColor.r, bgColor.g, bgColor.b)

    // Check for death
    if (s.die() && gameOver === false) {
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

    if(initialGrow > 0) {
      s.grow()
      initialGrow--;
    }
  }

  function setupGame() {
    // Game variables
    s = new Snake(p, draw_scale)
    food = new SnakeFood(p, draw_scale)
    gameOver = false;
    initialGrow = 5;

    // Game styles
    bgColor = {
      r: 170,
      g: 215,
      b: 81
    }
    p.stroke(0)
  }

  async function endGame() {

    // Set gameOver
    gameOver = true
    best = p.max(s.total - 1, best);

    bgColor = {
      r: 255,
      g: 0,
      b: 0
    }
    p.noStroke()

    // Show score
    p.background(bgColor.r, bgColor.g, bgColor.b)
    p.fill(255)
    p.textSize(40)
    let x = p.width / 2
    let y = p.height / 2
    p.textAlign(p.CENTER, p.CENTER)
    p.text("GAME OVER", x, y - 40)
    p.text(`SCORE: ${s.total - 1}`, x, y)
    if (best > 0)
      p.text(`BEST: ${best}`, x, y + 40)

    p.noLoop()
    await sleep()
    p.loop()
    setupGame()
  }

  function sleep() {
    return new Promise(resolve => setTimeout(resolve, 1500));
  }
}

class Snake {

  constructor(p, scale) {
    this.p = p
    this.pos = this.p.createVector(200, 200)
    this.xSpeed = 1
    this.ySpeed = 0
    this.color = {
      r: 70,
      g: 115,
      b: 233
    }
    this.scale = scale
    this.total = 1
    this.tail = []
    this.isDead = false
    this.t = this.p.frameCount
    this.tStep = 0.5
  }

  dir(x, y) {
    this.xSpeed = x
    this.ySpeed = y
  }

  moveUp() {
    if((this.xSpeed !== 0 || this.ySpeed !== 1)) {
      this.dir(0, -1)
    }
  }

  moveDown() {
    if((this.xSpeed !== 0 || this.ySpeed !== -1)) {
      this.dir(0, 1)
    }
  }

  moveLeft() {
    if((this.xSpeed !== 1 || this.ySpeed !== 0)) {
      this.dir(-1, 0)
    }
  }

  moveRight() {
    if((this.xSpeed !== -1 || this.ySpeed !== 0)) {
      this.dir(1, 0)
    }
  }

  setScale(scale) {
    this.scale = scale
  }

  update() {

    // Shift the tail over
    this.shiftTail()

    // Randomly move
    let dir = this.p.noise(this.t)
    if(dir < 0.2) this.moveRight()
    else if (dir < 0.4) this.moveLeft()
    else if (dir < 0.6) this.moveUp()
    else if (dir < 0.8) this.moveDown()

    // Update based on speed
    this.pos.x += this.xSpeed * this.scale
    this.pos.y += this.ySpeed * this.scale

    // Constrain to screen
    this.pos.x = this.p.constrain(this.pos.x, 0, this.p.width - this.scale)
    this.pos.y = this.p.constrain(this.pos.y, 0, this.p.height - this.scale)

    // Update t
    this.t += this.tStep
  }

  display() {
    if (!this.isDead) {
      this.p.fill(this.color.r, this.color.g, this.color.b)

      for (let i = 0; i < this.tail.length; i++) {
        this.p.rect(this.tail[i].x, this.tail[i].y, this.scale, this.scale)
      }
    }
  }

  shiftTail() {
    if (this.total === this.tail.length) {
      for (let i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
    }
    this.tail[this.total - 1] = this.p.createVector(this.pos.x, this.pos.y)
  }

  grow() {
    this.total++
  }

  deleteSnake() {
    this.isDead = true
  }

  tailWillIntersect() {
    for (let i = 0; i < this.tail.length; i++) {
      let tailPos = this.tail[i]
      let d = this.p.dist(this.pos.x, this.pos.y, tailPos.x, tailPos.y)
      if (d < 1) {
        this.deleteSnake()
        return true
      }
    }
  }

  die() {

    // Check for tail intersection
    if(this.tailWillIntersect())  return true

    // Check for edge intersection
    if (this.pos.x + this.scale > this.p.width
      || this.pos.x < 0
      || this.pos.y + this.scale > this.p.height
      || this.pos.y < 0) {
      this.deleteSnake()
      return true
    }

    return false
  }
}

class SnakeFood {

  constructor(p, scale) {
    this.p = p
    this.scale = scale
    this.color = {
      r: 255,
      g: 0,
      b: 0
    }
    this.pickLocation()
  }

  pickLocation() {
    let rows = this.p.floor(this.p.height / this.scale)
    let cols = this.p.floor(this.p.width / this.scale)
    this.pos = this.p.createVector(this.p.floor(this.p.random(cols)), this.p.floor(this.p.random(rows)))
    this.pos.mult(this.scale);
  }

  getPos() {
    return this.pos
  }

  /**
   * Eat the food if the snake is on it and get a new food location
   * @param snakePos Position vector of the snake
   * @returns {boolean} True if food is eaten
   */
  eat(snakePos) {
    if (this.p.dist(this.pos.x, this.pos.y, snakePos.x, snakePos.y) < 1) {
      this.pickLocation()
      return true
    } else {
      return false;
    }
  }

  display() {
    this.p.fill(this.color.r, this.color.g, this.color.b)
    this.p.rect(this.pos.x, this.pos.y, this.scale, this.scale)
  }
}


