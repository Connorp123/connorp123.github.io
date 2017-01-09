function Circle(x, y, r) {
  
  
  this.x = x || 0;
  this.y = y || 0;
  this.r = r || 0;
  
  this.growing = true;
  
  // this.R = 255;
  // this.G = 255;
  // this.B = 255;
  // this.A = 255;
  // this.clr = color(this.R, this.G, this.B, this.A);

  this.R = random(255);
  this.G = random(255);
  this.B = random(255);
  this.A = 255;
  this.clr = color(this.R, this.G, this.B, this.A, 200);
  
  
  // Show the circle
  this.show = function() {
    stroke(this.clr);
    strokeWeight(2);
    noFill();
    ellipse(this.x, this.y, this.r*2, this.r*2);
  }
  
  // Increase the size of the circle
  this.grow = function() {
    if (this.growing) this.r += 1;
  }
  
  // Check if the circle is within the canvas
  this.edges = function() {
  
    var right  = this.x + this.r > width;
    var left   = this.x - this.r < 0;
    var bottom = this.y + this.r > height;
    var top    = this.y - this.r < 0;
    
    return (right || left || bottom || top);
    
  }
  
  
}