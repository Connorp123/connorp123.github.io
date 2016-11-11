function Wheel(x, y, r, acc, vel) {

  this.pos = createVector(x,y);
  this.acc = acc || createVector(0,0);
  this.vel = vel || createVector(0,0);
  this.r = r || 30;
  this.maxVel = 10;
  this.maxForce = 0.5;
  this.beingDragged = false;

  var angles = [ 30, 10, 45, 35, 60, 38, 75, 67 ];

  this.display = function () {

    var lastAngle = 0;
    for (var i = 0; i < data.length; i++) {
      var gray = map(i, 0, data.length, 0, 255);
      fill(gray);
      arc(width/2, height/2, diameter, diameter, lastAngle, lastAngle+radians(angles[i]));
      lastAngle += radians(angles[i]);
    }
  }


}