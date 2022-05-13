let hand_attraction = (p) => {

  let canvas
  let redraw = true
  let started = false

  // For particles
  let walkers = [];
  let numWalkers = 20;

  // For video
  let video
  let videoReady = false
  let videoElement

  // For tensorflow
  let model
  let landmarks
  let handCenter
  let modelReady = false

  //--------------------------------------------------------------------------------------------------------------------
  p.setup = () => {
    canvas = createInstanceCanvas(p)
    canvas.mouseClicked(startSketch)
    p.frameRate(15)
    p.textAlign(p.CENTER, p.CENTER)
  }

  //--------------------------------------------------------------------------------------------------------------------
  p.draw = () => {

    // Basic canvas display
    if (!started) {
      redrawBackground(p)
      p.fill(255)
      p.text("Click to start", p.width / 2, p.height / 2)
    } else if (started && !modelReady) {
      p.background(p.frameCount % 255)
      p.fill(255)
      p.text("Loading model...", p.width / 2, p.height / 2)
    }
    else if (modelReady && redraw) redrawBackground(p)

    // If started and everything is ready
    if(started && videoReady && modelReady) {

      // Get predictions
      getPredictions().then( () => {

        // Draw camera
        p.image(video, 0, 0)

        // Update and draw walkers
        for (const walker of walkers) {
          if (handCenter) {
            walker.attract(handCenter[0], handCenter[1])
          }
          walker.update();
          walker.display();
        }
      })
    }
  }
  //-------------------------------------------------------------------------------------------------------------------
  let startSketch = async () => {

    if (!started) {
      started = true

      // Set up video
      video = p.createCapture(p.VIDEO, () => {
        videoReady = true
        videoElement = document.querySelector("video")
      })
      video.hide()

      // Start tensorflow
      model = await handpose.load();
      modelReady = true

      // Create walkers
      for(let i = 0; i < numWalkers; i++) {
        walkers.push(new Walker());
      }

    } else {
      started = false
      videoReady = false
      modelReady = false
      walkers = []

      // Stop video
      video.remove()
      video = null
    }
  }

  let getPredictions = async () => {
    const predictions = await model.estimateHands(videoElement)
    onPredict(predictions)
  }

  let onPredict = (hands) => {
    if(hands.length > 0) {
      handCenter = [
        (hands[0].boundingBox.topLeft[0] + hands[0].boundingBox.bottomRight[0]) / 2,
        (hands[0].boundingBox.topLeft[1] + hands[0].boundingBox.bottomRight[1]) / 2
      ]
    } else {
      handCenter = null
    }
  }

// A function to draw ellipses over the detected keypoints
  let drawKeypoints = () => {
    if (!landmarks) return
    for (const keypoint of landmarks) {
      p.fill(255,204,0);
      p.stroke(255,150,0);
      p.ellipse(keypoint[0], keypoint[1], 10, 10);
    }
  }

  function Walker() {

    // Initializes the walker to the middle of the screen
    this.pos = p.createVector(p.random(0, p.width), p.random(0, p.height));

    // Initializes the velocity
    this.vel = p.createVector(20, 20);
    this.acc = p.createVector(0, 0);
    this.r = p.randomGaussian(10, 2);                     // Radius
    this.maxVel = p.randomGaussian(15, 2);
    this.maxAcc = p.randomGaussian(2, 0.5);
    this.R = p.random(0, 255);
    this.G = p.random(0, 255);
    this.B = p.random(0, 255);

    this.attract = function (targetX, targetY) {
      this.acc.y = targetY - this.pos.y
      this.acc.x = targetX - this.pos.x
    }

    // Makes it walk randomly around the screen
    this.update = function () {

      // Controls the max size of the acceleration
      this.acc.limit(this.maxAcc);

      // Acceleration changes velocity
      this.vel.add(this.acc);
      this.vel.limit(this.maxVel);

      // Velocity changes position
      this.pos.add(this.vel);
    }

    // Draws the walker
    this.display = function () {
      p.fill(this.R, this.G, this.B);
      p.ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    }
  }
}