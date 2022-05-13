let hand_attraction = (p) => {

  let redraw = true

  // For particles
  let walkers = [];
  let numWalkers = 10;

  // For video
  let video
  let handpose
  let landmarks
  let boundingBox
  let ready = false
  const options = {
    flipHorizontal: false, // boolean value for if the video should be flipped, defaults to false
  }

  p.setup = () => {
    createInstanceCanvas(p)

    video = p.createCapture(p.VIDEO)
    // p.frameRate(15)
    video.hide()
    handpose = ml5.handpose(video, options, modelReady)

    handpose.on("predict", results => {
      if(results.length > 0) {
        landmarks = results[0].landmarks;
        boundingBox = [results[0].boundingBox.topLeft, results[0].boundingBox.bottomRight]
      } else {
        boundingBox = null
      }
    });
  }

  let modelReady = () => {
    console.log("Model ready!");
    ready = true
    for(let i = 0; i < numWalkers; i++) {
      walkers.push(new Walker());
    }
  }

  p.draw = () => {
    // video.loadPixels();

    if (ready && redraw) redrawBackground(p)
    else if (!ready) p.background(p.frameCount)

    // p.push()

    // Flip everything
    // p.translate(p.width, 0)
    // p.scale(-1, 1)

    // Draw camera
    p.image(video, 0, 0)

    // Draw effects
    drawEffects()

    // drawKeypoints()

    // p.pop()
  }

  let drawEffects = () => {
    for (const walker of walkers) {
      attractToHand(walker)
      walker.update();
      walker.display();
    }
  }

  let attractToHand = (walker) => {
    if(!boundingBox) return
    let xx = (boundingBox[0][0] + boundingBox[1][0]) / 2
    let yy = (boundingBox[0][1] + boundingBox[1][1]) / 2
    walker.attract(xx, yy)
  }

  let attractToKeypoints = () => {
    if (walkers.length === 0 || !landmarks) return
    for (const walker of walkers) {
      for (const keypoint of landmarks) {
        walker.attract(keypoint[0], keypoint[1])
      }
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
      let target = p.createVector(targetX, targetY);
      this.acc = p5.Vector.sub(target, this.pos);    }

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