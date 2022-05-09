function FlowField(r) {

  // Determines the number of columns
  this.resolution = r; // The size of each "cell"
  this.cols = width / this.resolution;
  this.rows = height / this.resolution;

  // Makes a 2d array
  this.make2Darray = function(n) {
    let array = [];
    for (let i = 0; i < n; i++) {
      array[i] = [];
    }
    return array;
  };

  // Creates the FlowField
  this.field = this.make2Darray(this.cols);


  this.init = function () {
    // Reseed the noise so that we get a new flow every time
    // Need to get noise working
    noiseSeed(Math.floor(random(10000)));
    let xoff = 0;
    for (let i = 0; i < this.cols; i++) {
      let yoff = 0;
      for (let j = 0; j < this.rows; j++) {

        // let theta = PI / 2;
        let theta = map(noise(xoff,yoff), 0, 1, 0, TWO_PI);
        // let theta = map(sin(xoff)+cos(yoff), -2, 2, 0, TWO_PI);

        // Polar to cartesian coordinate transformation to get x and y components of the vector
        this.field[i][j] = createVector(cos(theta), sin(theta));

        // Increment yoff
        yoff += 0.1;
      }
      // Increment xoff
      xoff += 0.1;
    }
  };
  this.init();

  // Draw every vector
  this.display = function() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        drawVector(this.field[i][j], i * this.resolution, j * this.resolution, this.resolution - 2);
      }
    }
  };

  this.lookup = function(lookup) {
    let column = Math.floor(constrain(lookup.x / this.resolution, 0, this.cols - 1));
    let row = Math.floor(constrain(lookup.y / this.resolution, 0, this.rows - 1));

    return this.field[column][row].copy();
  };

  // Renders a vector object 'v' as an arrow and a location 'x,y'
  let drawVector = function(v, x, y, scayl) {

    // Start the transformation
    push();
    let arrowsize = 4;

    // Translate to location to render vector
    translate(x, y);
    stroke(200, 100);

    // Call vector heading function to get direction (note that pointing to the right is a heading of 0) and rotate
    rotate(v.heading());

    // Calculate length of vector & scale it to be bigger or smaller if necessary
    let len = v.mag() * scayl;

    // Draw three lines to make an arrow (draw pointing up since we've rotate to the proper direction)
    line(0, 0, len, 0);
    // line(len,0,len-arrowsize,+arrowsize/2);
    // line(len,0,len-arrowsize,-arrowsize/2);
    pop();
  };
}