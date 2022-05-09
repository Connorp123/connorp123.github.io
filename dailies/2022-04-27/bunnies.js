let music_cursor = (p) => {
  let canvas;
  let bunnies = [];
  const fps = 100;

  p.setup = () => {

    // Set up canvas
    canvas = createInstanceCanvas(p)
    canvas.mouseClicked(() => {
      bunnies.push(new Bunny(p.mouseX, p.mouseY))
    })
    p.frameRate(fps)
    redrawBackground(p)
  }

  p.draw = () => {
    if(bunnies.length > 0) {
      bunnies.forEach(bun => {
        bun.update()
        bun.draw()
      })
    }
  }

  class Bunny {
    constructor(centerX, centerY, w=100, h=100) {

      // Position of frame
      this.leftX = centerX - (w / 2) - 7
      this.rightX = centerX + (w / 2) + 1
      this.topY = centerY - (h / 2) - 1
      this.bottomY = centerY + (h / 2) + 1

      // Bunny direction/movement
      this.side = p.TOP
      this.isMoving = true
      this.pos = p.createVector(this.leftX, this.topY)

      // Colors
      this.r = [255,0,0]
      this.o = [255,122,0]
      this.y = [255,255,0]
      this.g = [0,255,0]
      this.b = [0,0,255]
      this.i = [0,122,255]
      this.v = [255,0,255]
      this.colors = [this.r, this.o, this.y, this.g, this.b, this.i, this.v]
    }

    update() {

      if(this.side === p.TOP) {
        if (this.pos.x <= (this.rightX + 7)) {
          this.pos.x += 1
        } else {
          this.pos.x -= 7
          this.side = p.RIGHT
        }
      } else if (this.side === p.RIGHT) {
        if (this.pos.y <= (this.bottomY + 7)) {
          this.pos.y += 1
        } else {
          this.pos.y -= 7
          this.side = p.BOTTOM
        }
      } else if (this.side === p.BOTTOM) {
        if (this.pos.x >= this.leftX - 7) {
          this.pos.x -= 1
        } else {
          this.pos.x += 7
          this.side = p.LEFT
        }
      } else if (this.side === p.LEFT) {
        if (this.pos.y >= this.topY - 7) {
          this.pos.y -= 1
        } else {
          this.isMoving = false
        }
      }
    }

    setColor(n) {
      console.assert(n >= 0 && this.colors.length, n)
      p.stroke(this.colors[n][0], this.colors[n][1], this.colors[n][2])
    }

    drawRainbow() {
      if(this.side === p.TOP) {
        for(let i = 0; i < this.colors.length; i++) {
          this.setColor(i)
          p.point(this.pos.x, this.pos.y - (this.colors.length - i))
        }
      } else if (this.side === p.RIGHT) {
        for(let i = 0; i < this.colors.length; i++) {
          this.setColor(i)
          p.point(this.pos.x + (this.colors.length - i), this.pos.y)
        }
      } else if (this.side === p.BOTTOM) {
        for(let i = 0; i < this.colors.length; i++) {
          this.setColor(i)
          p.point(this.pos.x, this.pos.y + (this.colors.length - i))
        }
      } else {
        for(let i = 0; i < this.colors.length; i++) {
          this.setColor(i)
          p.point(this.pos.x - (this.colors.length - i), this.pos.y)
        }
      }
    }

    draw() {
      if(this.isMoving) {
        p.strokeWeight(1)
        this.drawRainbow()
      }
    }
  }
}
