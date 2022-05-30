
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
  let constraints = {
    video: {
      // mandatory: {
      //   minWidth: 1280,
      //   minHeight: 720
      // },
      optional: [{ maxFrameRate: 15 }]
    },
    audio: false
  };

  // For tensorflow
  let faceCenter
  let faceDetection
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

    // getPredictions()

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

      // faceDetection.send({image: video});

      // Get predictions
      sendVideoToModel().then( () => {

        // Draw camera
        p.image(video, 0, 0)

        // Update and draw walkers
        for (let i = 0; i < walkers.length; i++ ) {
          if (faceCenter) {
            walkers[i].attract(faceCenter[0], faceCenter[1])
          }
          walkers[i].update();
          walkers[i].display();
        }
      })
    }
  }
  //-------------------------------------------------------------------------------------------------------------------
  let startSketch = async () => {

    if (!started) {
      started = true

      // Set up video
      video = p.createCapture(constraints, p.width, p.width * 0.75, () => {
        videoReady = true
        videoElement = document.querySelector("video")
        console.log(videoElement)
      })
      video.hide()

      // Start tensorflow
      // model = await faceDetection.SupportedModels.MediaPipeFaceDetector;
      // const detectorConfig = {
      //   runtime: 'mediapipe', // or 'tfjs'
      //   solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_detection',
      // }
      // detector = await faceDetection.createDetector(model, detectorConfig);

      // model = await handpose.load();


      faceDetection = new FaceDetection({locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection@0.4/${file}`;
        }});
      faceDetection.setOptions({
        modelSelection: 0,
        minDetectionConfidence: 0.5
      });
      faceDetection.onResults(onResults);

      // Say that the model is ready
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

  let sendVideoToModel = async () => {
    await faceDetection.send({image: videoElement});
    // onPredict(faces)
    // }
  }

  let onResults = (results) => {
    if(results.detections.length > 0) {
      faceCenter = [
        results.detections[0].boundingBox.xCenter,
        results.detections[0].boundingBox.yCenter,
      ]
    } else {
      faceCenter = null
    }
  }

  function Walker() {

    // Initializes the walker to the middle of the screen
    this.pos = p.createVector(p.random(0, p.width), p.random(0, p.height));

    // Initializes the velocity
    this.vel = p.createVector(20, 20);
    this.acc = p.createVector(0, 0);
    this.r = p.randomGaussian(10, 2);                     // Radius
    this.maxVel = p.randomGaussian(30, 4);
    this.maxAcc = p.randomGaussian(10, 2);
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
      this.acc.limit(this.maxAcc)

      // Acceleration changes velocity
      this.vel.x += this.acc.x
      this.vel.y += this.acc.y
      this.vel.limit(this.maxVel)

      // Velocity changes position
      this.pos.x += this.vel.x
      this.pos.y += this.vel.y
    }

    // Draws the walker
    this.display = function () {
      p.fill(this.R, this.G, this.B);
      p.ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    }
  }
}