let random_number_visualizer = (p) => {
  let FRAME_RATE = 5;
  let num_dots = 1;
  let dots_left_to_display = num_dots;
  let dots_per_frame;
  let y;

  p.setup = () => {
    let myCanvas = createInstanceCanvas(p)
    myCanvas.mouseClicked(onMouseClick)
    p.background(0);
    p.frameRate(FRAME_RATE);

    dots_per_frame = 1;

    displayNumDots(num_dots);
    displayDotsPerFrame(1);
  }//------------------------------------------------------------------------------------------------

  p.draw = () => {
    if (dots_left_to_display > 0) {
      // Draw dots
      displayDots(dots_per_frame);
      dots_left_to_display -= dots_per_frame;

      // Draw progress bar
      y = p.map(dots_left_to_display, num_dots, 0, 0, p.width);
      p.stroke(0, 255, 0);
      p.rect(0, 0, y, 1);
      p.stroke(255, 0, 0);
      p.rect(y, 0, p.width - y, 1);
    }
  }//------------------------------------------------------------------------------------------------

  p.keyPressed = () => {
    // Increment the number of dots by a power of 10 & redraw the dots
    if (p.keyCode === p.UP_ARROW) {
      num_dots *= 10;
      redrawDots();
    }

    // Decrement the number of dots by a power of 10 and redraw the dots
    else if (p.keyCode === p.DOWN_ARROW) {
      if (num_dots >= 10) {
        num_dots /= 10;
        redrawDots();
      }
    } else if (p.keyCode === p.RIGHT_ARROW) {
      recalculateDotsPerFrame(10);
    } else if (p.keyCode === p.LEFT_ARROW) {
      recalculateDotsPerFrame(0.1);
    }
  }//------------------------------------------------------------------------------------------------

// Controls for touchscreen devices
  function onMouseClick() {
    if (num_dots > dots_per_frame) {
      recalculateDotsPerFrame(10);
    }
    num_dots *= 10;
    redrawDots();
  }//------------------------------------------------------------------------------------------------

// "Refresh" the canvas, update the displayed number, and display (num_dots) on the canvas
  function redrawDots() {

    // Paint over old dots
    p.background(0);

    // Show how many dots will be drawn
    displayNumDots(num_dots);

    // Show the dots per second
    displayDotsPerFrame(1);

    // Display the dots
    dots_left_to_display = num_dots;

  }//------------------------------------------------------------------------------------------------

// Display the number of dots as text on the canvas
  function displayNumDots(n) {
    p.fill(255);
    p.noStroke();
    p.textSize(50);
    p.textAlign(p.LEFT, p.TOP);
    p.text(n.toLocaleString(), 20, 20);
  }//------------------------------------------------------------------------------------------------

// Display the dots per frame
  function displayDotsPerFrame(isOn) {
    if (isOn) {
      p.fill(255);
      p.noStroke();
    } else {
      p.fill(0);
      p.stroke(0);
      p.strokeWeight(2);
    }

    p.textSize(50);
    p.textAlign(p.LEFT, p.BOTTOM);
    p.text(dots_per_frame.toLocaleString(), 20, p.height - 20);
    p.strokeWeight(0);
  }//------------------------------------------------------------------------------------------------

// Display a number (n) of dots on the canvas
  function displayDots(n) {
    p.strokeWeight(2);
    for (let j = 0; j < n; j++) {
      new Dot(p).display();
    }
  }//------------------------------------------------------------------------------------------------

// Re-calculate the dots per frame
  function recalculateDotsPerFrame(dpfMultiplier) {
    if ((dots_per_frame >= 10 && dpfMultiplier < 1)
      || (dots_per_frame <= 1000 && dpfMultiplier > 1 && dots_per_frame < num_dots)) {

      // Clear old text
      displayDotsPerFrame(0);

      // update dots per frame
      dots_per_frame *= dpfMultiplier;

      // Write new text
      displayDotsPerFrame(1);
    }
  }//------------------------------------------------------------------------------------------------
}
class Dot {

  constructor(p, x, y, d) {
    this.p = p;
    this.x = x || Math.ceil(this.p.random(0, this.p.width));
    this.y = y || Math.ceil(this.p.random(0, this.p.height));
    this.d = d || 0;

    this.rgb = [this.p.random(0,255), this.p.random(0,255), this.p.random(0,255)];

    this.rgb = [Math.ceil(this.p.random(0,255)), Math.ceil(this.p.random(0,255)), Math.ceil(this.p.random(0,255))];
  }

  drawPoint = (x, y) => {
    this.p.stroke(this.rgb[0], this.rgb[1], this.rgb[2]);
    this.p.point(x, y);
  };

  display = () => {
    this.drawPoint(this.x, this.y);
  };
}