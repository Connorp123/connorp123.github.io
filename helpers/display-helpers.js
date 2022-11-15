let quadrants = [
  //  0       1       2       3
  [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }], // 0
  [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }], // 1
  [{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }], // 2
  [{ x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 }],  // 3
];

function isMobile() {
  return window.innerWidth < 1024;
}

function initCanvas(parent) {
  let myCanvas = isMobile() ? createCanvas(windowWidth, windowHeight) : createCanvas(windowWidth - 400, windowHeight);
  myCanvas.parent(parent ?? "sketch");
  return myCanvas;
}

function initFullscreenCanvas(parent) {
  let myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent(parent ?? "sketch");
  return myCanvas;
}

const redrawBackground = (p) => {
  p.background(0);
};

const createInstanceCanvas = (p) => {
  return isMobile()
    ? p.createCanvas(p.windowWidth, p.windowHeight)
    : p.createCanvas(p.windowWidth - 400, p.windowHeight);
};