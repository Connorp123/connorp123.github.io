class Snake {

  constructor(scale) {
    this.pos = createVector(0, 0)
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
    this.isDead = false;
  }

  dir(x, y) {
    this.xSpeed = x
    this.ySpeed = y
  }

  moveUp() {
    s.dir(0, -1)
  }

  moveDown() {
    s.dir(0, 1)
  }

  moveLeft() {
    s.dir(-1, 0)
  }

  moveRight() {
    s.dir(1, 0)
  }

  setScale(scale) {
    this.scale = scale
  }

  update() {

    // Shift the tail over
    this.shiftTail()

    // Update based on speed
    this.pos.x += this.xSpeed * this.scale
    this.pos.y += this.ySpeed * this.scale

    // Constrain to screen
    // this.pos.x = constrain(this.pos.x, 0, width - this.scale)
    // this.pos.y = constrain(this.pos.y, 0, height - this.scale)
  }

  display() {
    if (!this.isDead) {
      fill(this.color.r, this.color.g, this.color.b)

      for (let i = 0; i < this.tail.length; i++) {
        rect(this.tail[i].x, this.tail[i].y, this.scale, this.scale)
      }
    }
  }

  shiftTail() {
    if (this.total === this.tail.length) {
      for (let i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
    }
    this.tail[this.total - 1] = createVector(this.pos.x, this.pos.y)
  }

  grow() {
    this.total++
  }

  deleteSnake() {
    this.isDead = true
  }

  die() {

    // Check for tail intersection
    for (let i = 0; i < this.tail.length; i++) {
      let tailPos = this.tail[i]
      let d = dist(this.pos.x, this.pos.y, tailPos.x, tailPos.y)
      if (d < 1) {
        this.deleteSnake()
        return true
      }
    }

    // Check for edge intersection
    if (this.pos.x + this.scale > width
      || this.pos.x < 0
      || this.pos.y + this.scale > height
      || this.pos.y < 0) {
      this.deleteSnake()
      return true
    }

    return false
  }
}