let music_cursor = (p) => {
  let canvas;
  const fps = 100;
  let cursor;
  let song;
  let amp;
  let vol;
  let songLength;
  let currentTime;
  let fft;
  let avgFreq;

  // Load the song
  p.preload = () => {
    song = p.loadSound('../../resources/lofi.wav')
  }

  p.setup = () => {

    // Set up canvas
    canvas = createInstanceCanvas(p)
    canvas.mouseClicked(() => {
      p.userStartAudio()
      song.play()
    })
    p.frameRate(fps)

    // Set up cursor
    cursor = new Cursor(p, p.width / 2, p.height / 2)

    // Set up song
    // p.pause();
    p.getAudioContext().suspend();
    amp = new p5.Amplitude();
    fft = new p5.FFT();
  }

  p.draw = () => {
    redrawBackground(p)

    // Get info about the song
    if (song.isPlaying()) {
      vol = amp.getLevel()
      // avgFreq = getAverageFreq()
      // console.log('AvgFreq:', avgFreq)

      // Update the cursor
      let newX = p.map(vol, 0, 1, 0, p.width)
      // let newX = p.width/2
      let newY = getAverageFreq()
      // let newY = p.map(avgFreq, 0, 10, 0, p.height)
      // console.log('avgFreq', avgFreq)
      console.log('newY', newY)

      if(newY > 0 && newY < p.height) {
        cursor.update(newX, newY)
        cursor.display()
      }
    }
  }

  let getAverageFreq = () => {
    let spectrum = fft.analyze()

    // get the centroid
    let spectralCentroid = fft.getCentroid()
    let mean_freq_index = spectralCentroid/(22050/spectrum.length)
    let centroidplot = p.map(p.log(mean_freq_index), 0, p.log(spectrum.length), 0, p.height)

    return centroidplot
  }
}

class Cursor {
  constructor(p, x, y) {
    // For all cursors
    this.history = []
    this.length = 40
    this.widthMean = 10
    this.widthStdDev = 3
    this.t = 0
    this.tStep = 0.01
    this.p = p

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

    if (this.history.length > 0) {

      // Determine how much it should move
      let maxMove = 5
      let move = this.p.createVector(x - this.pos.x, y - this.pos.y)
      move.limit(maxMove)

      // Update the position
      this.pos.add(move)

    } else {
      this.pos = this.p.createVector(x, y)
    }

    // Check history length
    if (this.history.length >= this.length) {
      this.history.splice(0, this.history.length - this.length + 1)
    }

    // Save the cursor
    this.history.push({
      color: this.color,
      width: this.width,
      pos: this.pos.copy()
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
    for (let i = 0; i < this.history.length - 10; i++) {
      let cursor = this.history[i]
      this.p.fill(cursor.color[0], cursor.color[1], cursor.color[2])
      this.p.circle(cursor.pos.x, cursor.pos.y, cursor.width)
    }
  }
}