let music_cursor = (p) => {
  let canvas;
  const fps = 100;
  let cursor;
  let song;
  let amp;
  let vol;
  let songLength;
  let currentTime;

  // Load the song
  p.preload = () => {
    song = p.loadSound('../../resources/lofi.wav')

  }

  p.setup = () => {

    // Set up canvas
    canvas = createInstanceCanvas(p)
    canvas.mouseClicked(() => {
      p.userStartAudio()
    })
    p.frameRate(fps)

    // Set up cursor
    cursor = new Cursor(p, p.width/2, p.height/2)

    // Set up song
    // p.pause();
    p.getAudioContext().suspend();
    song.play()
    amp = new p5.Amplitude();
  }

  p.draw = () => {
    redrawBackground(p)

    // Get info about the song
    vol = amp.getLevel()

    // Update the cursor
    let newX = p.map(vol, 0, 1, 0, p.width)
    let newY = p.height/2
    cursor.update(newX, newY)
    cursor.display()
  }
}

class Cursor {
  constructor(p, x, y) {
    // For all cursors
    this.history = []
    this.length = 100
    this.widthMean =
    this.widthStdDev = 15
    this.t = 0
    this.tStep = 0.01
    this.p = p
    this.pos = this.p.createVector(x, y)

    // For this cursor
    this.newCursor(x, y)
  }

  newCursor(x, y) {

    // Generate new cursor
    this.color = [
      this.p.noise(this.t) * 255,
      this.p.noise(this.t + 5) * 255,
      this.p.noise(this.t + 10) * 255,
    ]
    this.width = this.p.randomGaussian(this.widthMean, this.widthStdDev)

    // Determine how much it should move
    // let maxMove = 5;
    // let move = this.p.createVector(x - this.pos[0], y - this.pos[1])
    // move.limit(100)

    // this.pos = [move.x, move.y]

    this.pos = [x, y]

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
  update(newX, newY) {
    this.newCursor(newX, newY)
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