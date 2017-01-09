var circles = [];
var spots = [];

// For background
var br = true;
var bgcolor = 0;

// function preload() {
//   img = loadImage("2017.png");
//
//
// }

function setup() {

  // Create canvas
  // createCanvas(300, 127);
  createCanvas(windowWidth, windowHeight);
  background(bgcolor);
  frameRate(100);

  // Analyze image
  // img.loadPixels();

  // for (var x = 0; x < img.width; x++) {
  //   for (var y = 0; y < img.height; y++) {
  //
  //
  //     // Get index of the next pixel
  //     var index = x + y * img.width;
  //     console.log("index: " + index);
  //
  //     // Gets the pixel at the index
  //     var nxt = color(img.pixels[index]);
  //     console.log("nxt: " + nxt);
  //
  //     // Gets the color of the pixel
  //     // var c = color(nxt);
  //     // var c = nxt;
  //
  //     // Gets the brightness of the pixel
  //     var b = brightness(nxt);
  //
  //     if (b > 200) {
  //       spots.push(createVector(x, y));
  //     }
  //
  //   }
  // }
  //
  // console.log(spots.length);

}

function draw() {
  
  // Redraw background
  if (br) background(bgcolor);
  
  // Create new circles
  createCircles(10);
  
  // Draw the circles
  for(var i = 0; i < circles.length; i++) {
    
    if(circles[i].growing) {
      
      // Check if the circle is within the canvas
      if(circles[i].edges()) {
        circles[i].growing = false;
      } 
      // Check Overlap
      else {
        
        for (var j = 0; j < circles.length; j++) {
          
          // Check if its the same object
          if (i != j) {
            var d = dist(circles[i].x, circles[i].y, circles[j].x, circles[j].y);
            if (d - 2 < circles[i].r + circles[j].r) {
              circles[i].growing = false;
              break;
            }
          }
        }
        
      }
    }
    
    
    circles[i].show();
    circles[i].grow();
    
  }
  
}

function keyPressed() {
  
  if (key == "R") br = !br;
  
}

// Create a new circle in a valid position
function newCircle() {

  // if(spots.length != 0) {
    // Choose a random spot
    // var r = int(random(0, spots.length));

    // console.log(r);

    // var spot = spots[r];

    // console.log(spot);

    // var x = spot.x;
    // var y = spot.y;

    var x = random(width);
    var y = random(height);

    console.log("x: " + x + " y: " + y);

    var valid = true;
    for (var i = 0; i < circles.length; i++) {
      var d = dist(x, y, circles[i].x, circles[i].y);
      if (d - 7 < circles[i].r) {
        valid = false;
        break;
      }
    }

    if (valid) {
      return new Circle(x, y, 1);
    }
    else {
      return null;
    }
  // }

}

// Create n new circles
function createCircles(n) {
  
  var count = 0;
  var total = n;
  var attempts = 0;

  while (count < total) {
      var newC = newCircle();
      if (newC) {
        circles.push(newC);
        count++;
      } 
      attempts++;
      if(attempts > 1000) {
        noLoop();
        break;
        console.log("Finished");
      }
  }
}