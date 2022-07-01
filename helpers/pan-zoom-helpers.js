/********************
 * Needed variables *
 ********************/
let worldBorder = {
  topLeft: [0, 0],
  bottomRight: [0, 0],
};
let screenBorder = {};
let offset = [0, 0];
let scale = [1, 1];

// For zoom
let lastTouch;
let mouseBeforeZoom;
let mouseAfterZoom;


/***********************
 * Translation helpers *
 ***********************/
// screenX = ( worldX - offsetX) * scaleX
let worldToScreen = (worldCoord) => {
  return [
    (worldCoord[0] - offset[0]) * scale[0],
    (worldCoord[1] - offset[1]) * scale[1],
  ];
};

// worldX = offsetX + (screenX / scaleX)
let screenToWorld = (screenCoord) => {
  return [
    (screenCoord[0] / scale[0]) + offset[0],
    (screenCoord[1] / scale[1]) + offset[1],
  ];
};

let isInScreen = (worldCoord) => {
  return (worldCoord[0] >= worldBorder.topLeft[0] && worldCoord[0] <= worldBorder.bottomRight[0]) &&
    (worldCoord[1] >= worldBorder.topLeft[1] && worldCoord[1] <= worldBorder.bottomRight[1]);
};

let getMouseWorld = (p) => {
  return screenToWorld([p.mouseX, p.mouseY]);
};

/******************
 * Border helpers *
 ******************/
let setWorldBorder = (p) => {
  worldBorder.topLeft = screenToWorld([0, 0]);
  worldBorder.bottomRight = screenToWorld([p.width, p.height]);
};

let setScreenBorder = () => {
  screenBorder.topLeft = worldToScreen(worldBorder.topLeft);
  screenBorder.bottomRight = worldToScreen(worldBorder.bottomRight);
};

/***************
 * Pan helpers *
 ***************/
// Record initial pos
let onTouchStarted = (p) => {
  lastTouch = [p.mouseX, p.mouseY];
};

// Calculate offset and update position
let onTouchMoved = (p) => {
  offset = [
    offset[0] - ((p.mouseX - lastTouch[0]) / scale[0]),
    offset[1] - ((p.mouseY - lastTouch[1]) / scale[1]),
  ];
  lastTouch = [p.mouseX, p.mouseY];
};

/****************
 * Zoom helpers *
 ****************/
let onMouseWheel = (p, e) => {

  // Capture mouse before zoom
  mouseBeforeZoom = getMouseWorld(p);

  // Change scale based on mouse scroll
  if (e.delta < 0) {
    scale = [
      scale[0] * 1.1,
      scale[1] * 1.1,
    ];
  } else {
    scale = [
      scale[0] * 0.9,
      scale[1] * 0.9,
    ];
  }

  // Capture mouse after zoom
  mouseAfterZoom = getMouseWorld(p);

  // Displace world around mouse cursor
  offset = [
    offset[0] + (mouseBeforeZoom[0] - mouseAfterZoom[0]),
    offset[1] + (mouseBeforeZoom[1] - mouseAfterZoom[1]),
  ];

  // Stop default scroll behavior
  return false;
};

/*********
 * Debug *
 *********/
let drawScreenBorder = (p) => {
  setScreenBorder();
  p.stroke(0, 255, 0);
  p.line(screenBorder.topLeft[0], screenBorder.topLeft[1], screenBorder.bottomRight[0], screenBorder.topLeft[1]);         // Top
  p.line(screenBorder.topLeft[0], screenBorder.bottomRight[1], screenBorder.bottomRight[0], screenBorder.bottomRight[1]); // Bot
  p.line(screenBorder.topLeft[0], screenBorder.topLeft[1], screenBorder.topLeft[0], screenBorder.bottomRight[1]);
  p.line(screenBorder.bottomRight[0], screenBorder.topLeft[1], screenBorder.bottomRight[0], screenBorder.bottomRight[1]);
  p.noStroke();
};

/*********************************************************************************************************************
 * World <-> Screen Controls
 * Thanks to https://www.youtube.com/watch?v=ZQ8qtAizis4
 ********************************************************************************************************************/