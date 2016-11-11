var song;
var button;
var amp;
var vol;
var diam;

function setup() {
  createCanvas(windowWidth-100, windowHeight-100);
  song = loadSound("rainbow.mp3", loaded);
  amp = new p5.Amplitude();
  background(51);
}

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