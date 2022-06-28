let sketch = (p) => {
  let canvas;
  let items = [];
  let debugCount = 0;

  // For world
  let offset = [0, 0];
  let scale = [1, 1];
  let screenBorder = {
    topLeft: [0, 0],
    bottomRight: [0, 0],
  };

  // For zoom
  let lastTouch;
  let mouseBeforeZoom;
  let mouseAfterZoom;

  p.setup = async () => {
    // Create canvas
    canvas = createInstanceCanvas(p);

    // Create objects (for testing)
    for (let i = 0; i < 15; i++) {
      items.push(new Item(p.random(p.width), p.random(p.height), p.random(40)));
    }
    console.group("Debug");
  };

  p.draw = () => {
    debugCount = 0;
    redrawBackground(p);

    // Set world border
    screenBorder.topLeft = screenToWorld([0, 0]);
    screenBorder.bottomRight = screenToWorld([p.width, p.height]);

    // Draw each item
    items.forEach(item => {
      item.draw();
    });

    console.log(debugCount);
  };

  /*********************************************************************************************************************
   * World <-> Screen Controls
   * Thanks to https://www.youtube.com/watch?v=ZQ8qtAizis4
   ********************************************************************************************************************/

  /*****************
   * Zoom controls *
   *****************/

  p.mouseWheel = (e) => {

    // Capture mouse before zoom
    mouseBeforeZoom = screenToWorld([p.mouseX, p.mouseY]);

    // Change scale based on mouse scroll
    if (e.delta < 0) {
      scale = [
        scale[0] * 1.01,
        scale[1] * 1.01,
      ];
    } else {
      scale = [
        scale[0] * 0.99,
        scale[1] * 0.99,
      ];
    }

    // Capture mouse after zoom
    mouseAfterZoom = screenToWorld([p.mouseX, p.mouseY]);

    // Displace world around mouse cursor
    offset = [
      offset[0] + (mouseBeforeZoom[0] - mouseAfterZoom[0]),
      offset[1] + (mouseBeforeZoom[1] - mouseAfterZoom[1]),
    ];
    return false;
  };

  /****************
   * Pan controls *
   ****************/

  // Record initial pos
  p.touchStarted = () => {
    lastTouch = [p.mouseX, p.mouseY];
  };

  // Calculate offset and update position
  p.touchMoved = () => {
    offset = [
      offset[0] - (p.mouseX - lastTouch[0]),
      offset[1] - (p.mouseY - lastTouch[1]),
    ];
    lastTouch = [p.mouseX, p.mouseY];
  };

  /***********************
   * Translation helpers *
   ***********************/

  let worldToScreen = (worldCoord) => {
    return [
      (worldCoord[0] - offset[0]) * scale[0],
      (worldCoord[1] - offset[1]) * scale[1],
    ];
  };

  let screenToWorld = (screenCoord) => {
    return [
      (screenCoord[0] + offset[0]) / scale[0],
      (screenCoord[1] + offset[1]) / scale[1],
    ];
  };

  let isInScreen = (worldCoord) => {
    return worldCoord[0] >= screenBorder.topLeft[0] && worldCoord[0] <= screenBorder.bottomRight[0] &&
      worldCoord[1] >= screenBorder.topLeft[1] && worldCoord[1] <= screenBorder.bottomRight[1];
  };

  /********************************************************************************************************************/

  class Item {
    constructor(x, y, size) {
      this.pos = screenToWorld([x, y]);
      this.size = size;
      this.color = [p.random(255), p.random(255), p.random(255)];
    }

    draw() {
      if (isInScreen(this.pos)) {
        debugCount += 1;
        let screenPos = worldToScreen(this.pos);
        p.fill(this.color[0], this.color[1], this.color[2]);
        p.circle(screenPos[0], screenPos[1], this.size * (scale[0]));
      }
    }
  }
};