// type = 1 - main, 2 - preview
function createSketch(idName, type) {

  var capture;

  // save this file as sketch.js
  // Sketch One
  var s = function( p ) { // p could be any variable name

    p.setup = function() {
      if (type === MAIN) {
        p.createCanvas((windowWidth*.4), (windowWidth*.4)/1.333);
        p.frameRate(MAIN_FRAME_RATE);
      } else {
        p.createCanvas(160, 120);
        p.frameRate(PREVIEW_FRAME_RATE);
      }

      capture = p.createCapture(p.VIDEO);
      capture.size(160, 120);
      capture.hide();
    };

    p.draw = function() {
      p.background(255);
      if (type == 1) {
        p.image(capture, 0, 0, (windowWidth*.4), (windowWidth*.4)/1.333);
      } else {
        p.image(capture, 0, 0, 160, 120);
      }
    };

    if(type === MAIN) {
      p.saveGif = function () {
        capturer.start();
      };
    }

    if(type === MAIN) {
      p.windowResized = function() {
          p.resizeCanvas((windowWidth*.4), (windowWidth*.4)/1.333);
      }
    }

  };
  return new p5(s, idName);
}
