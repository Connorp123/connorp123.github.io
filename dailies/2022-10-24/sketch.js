let sketch = (p) => {
  let canvas;
  let videoScale = 16;
  let video;
  let particles = [];

  p.setup = () => {
    canvas = createInstanceCanvas(p);
    p.pixelDensity(1);

    // Set up video
    video = p.createCapture(p.VIDEO);
    video.size(p.width / videoScale, p.height / videoScale);

    // Create particles
    for (let i = 0; i < 400; i++) {
      particles.push(new CameraParticle());
    }
  };

  p.draw = () => {
    video.loadPixels();

    particles.forEach(particle => {
      particle.update();
      particle.display();
    });
  };

  class CameraParticle {
    constructor() {
      this.x = p.random(0, p.width);
      this.y = p.random(0, p.height);
      this.r = p.random(16, 32);
    }

    update() {
      this.x += p.random(-10, 10);
      this.y += p.random(-10, 10);

      this.x = p.constrain(this.x, 0, p.width);
      this.y = p.constrain(this.y, 0, p.height);
    }

    display() {

      let px = p.floor(this.x / videoScale);
      let py = p.floor(this.y / videoScale);
      let color = video.get(px, py);

      // p.noStroke();
      p.fill(color[0], color[1], color[2], 50);
      p.ellipse(this.x, this.y, this.r, this.r);
    }
  }
};