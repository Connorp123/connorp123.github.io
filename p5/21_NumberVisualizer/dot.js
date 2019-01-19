function Dot(x, y, d) {

  this.x = x || random(0, width);
  this.y = y || random(0, height);
  this.d = d || 0;

  this.rgb = [random(0,255), random(0,255), random(0,255)];

  this.display = function () {
    this.drawPoint(this.x, this.y);
  };

  this.drawPoint = function (x, y) {
    stroke(this.rgb[0], this.rgb[1], this.rgb[2]);
    point(x, y);
  };

}//------------------------------------------------------------------------------------------------