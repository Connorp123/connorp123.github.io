let cursor_v1 = (p) => {
  let canvas;
  const fps = 100;
  let cursor;

  p.setup = () => {
    canvas = createInstanceCanvas(p)
    p.frameRate(fps)
    cursor = new Cursor(p)
  }

  p.draw = () => {
    redrawBackground(p)
    cursor.update()
    cursor.display()
  }
}

class Cursor {
  constructor(p) {
    // For all cursors
    this.history = []
    this.length = 40
    this.widthMean = 10
    this.widthStdDev = 3
    this.t = 0
    this.tStep = 0.01
    this.p = p

    // For this cursor
    this.newCursor()
  }

  newCursor() {

    // Generate new cursor
    this.color = [
      this.p.noise(this.t) * 255,
      this.p.noise(this.t + 5) * 255,
      this.p.noise(this.t + 10) * 255,
    ]
    this.width = this.p.randomGaussian(this.widthMean, this.widthStdDev)
    this.pos = [this.p.mouseX, this.p.mouseY]

    // Check history length
    if (this.history.length >= this.length) {
      this.history.splice(0, this.history.length - this.length + 1)
    }

    // Save the cursor
    this.history.push({
      color: this.color,
      width: this.width,
      pos: this.pos
    })
  }

  // Create a new cursor and update the time
  update() {
    this.newCursor()
    this.t += this.tStep
  }

  // Display the cursor
  display() {
    this.p.stroke(0)
    this.p.strokeWeight(0)

    // Draw each cursor in the history
    for(let i = 0; i < this.history.length - 10; i++) {
      let cursor = this.history[i]
      this.p.fill(cursor.color[0], cursor.color[1], cursor.color[2])
      this.p.circle(cursor.pos[0], cursor.pos[1], cursor.width)
    }
  }
}