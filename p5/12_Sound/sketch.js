var song;
var button;
var amp;
var vol;
var diam;
var canvas;
var loading;

function setup() {
  canvas = createCanvas(windowWidth-100, windowHeight-100);
  canvas.parent('canvas');

  song = loadSound("rainbow.mp3", loaded);


  // loading = createP('Sketch is loading!');
  // loading.parent('p5_loading');

  amp = new p5.Amplitude();
  background(51);
}

// function preload() {
//   song = loadSound("rainbow.mp3", loaded);
// }

function loaded() {
  button = createButton("play");
  button.mousePressed(togglePlaying);
}

function draw() {
  background(51);

  vol = amp.getLevel();
  diam = map(vol, 0, 0.3, 10, windowHeight);
  clr = color(map(vol, 0, 0.3, 0, 255), map(vol, 0, 0.3, 125, 255), 255);

  fill(clr);
  ellipse(width / 2, height / 2, diam, diam);
}

function mouseClicked() {
  togglePlaying();
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.play();
    song.setVolume(0.3);
    button.html("pause");
  } else {
    song.stop();
    button.html("play");
  }
}