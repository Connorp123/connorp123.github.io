class SnakeFood {

  constructor(scale) {
    this.scale = scale
    this.color = {
      r: 255,
      g: 0,
      b: 0
    }
    this.pickLocation()
  }

  pickLocation() {
    let rows = floor(height / this.scale)
    let cols = floor(width / this.scale)
    this.pos = createVector(floor(random(cols)), floor(random(rows)))
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
    if (dist(this.pos.x, this.pos.y, snakePos.x, snakePos.y) < 1) {
      this.pickLocation()
      return true
    } else {
      return false;
    }
  }

  display() {
    fill(this.color.r, this.color.g, this.color.b)
    rect(this.pos.x, this.pos.y, this.scale, this.scale)
  }
}