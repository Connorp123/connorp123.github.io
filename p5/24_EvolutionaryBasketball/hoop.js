function Hoop(x, y, w, h) {

  this.x = x || HOOP_STARTING_X;
  this.y = y || HOOP_STARTING_Y;
  this.w = w || 30;
  this.h = h || 1;

  this.centerX = this.x + (this.w / 2);

  this.rgb = [255, 255, 255];

  this.display = function () {
    noStroke();
    fill(this.rgb);
    rect(this.x, this.y, this.w, this.h);
  };

}//------------------------------------------------------------------------------------------------