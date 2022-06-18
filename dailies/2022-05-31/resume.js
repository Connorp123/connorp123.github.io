let resume = (p) => {

  let canvas
  let attract = false
  let reset = true
  let redraw = true
  let vehicles = []

  // Images
  let resumeImage

  //
  p.preload = () => {
    resumeImage = p.loadImage('../img/resume-small.jpg');
    // resumeImage = p.loadImage('../img/resume.jpg');
    resumeImage.resize(p.width, 0);
  }

  //--------------------------------------------------------------------------------------------------------------------
  p.setup = () => {
    canvas = p.createCanvas(resumeImage.width, resumeImage.height)


    // Setup the image vehicles
    drawImage(resumeImage)

    console.log(vehicles)
  }

  //--------------------------------------------------------------------------------------------------------------------
  p.draw = () => {
    // if (redraw) redrawBackground(p)

    vehicles.forEach(v => {
      // if(reset) v.resetPos()

      v.display()
    })
  }
  //-------------------------------------------------------------------------------------------------------------------

  let drawImage = (img) => {

    // Set density
    let d = 2

    // Load the pixels into the pixel array
    img.loadPixels()

    // Create a new vehicle at each location
    for(let x = d/2; x < img.width; x+= d) {
      for(let y = d/2; y < img.height; y += d) {

        let loc = x + y * img.width

        let imgR = p.red  (img.pixels[loc]);
        let imgG = p.green(img.pixels[loc]);
        let imgB = p.blue (img.pixels[loc]);

        // Create the vehicle
        p.fill(imgR, imgG, imgB)
        p.stroke(imgR, imgG, imgB)
        p.point(x, y)
        // vehicles.push(new Vehicle(x, y, imgR, imgG, imgB))
      }
    }

  }

  function Vehicle(x_, y_, R, G, B) {

    // Initializes the walker to the middle of the screen
    this.pos = p.createVector(x_, y_)
    this.initialPos = this.pos.copy()

    // Initializes the velocity
    this.vel = p.createVector(0, 0)
    this.acc = p.createVector(0, 0)
    this.r = 3
    this.maxVel = 20
    this.maxAcc = 10
    this.R = R
    this.G = G
    this.B = B


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

    this.arrive = (target) => {
      // let desired = target.sub(this.pos)
    }

    this.resetPos = () => {
      this.arrive(this.initialPos)
    }
  }
}