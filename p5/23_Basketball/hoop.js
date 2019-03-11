function Hoop(x, y, w, h) {

  this.x = x || width - 50;
  this.y = y || height / 4;
  this.w = w || 30;
  this.h = h || 1;

  this.rgb = [255, 255, 255];

  this.display = function () {
    noStroke();
    fill(this.rgb);
    rect(this.x, this.y, this.w, this.h);
  };

}//------------------------------------------------------------------------------------------------