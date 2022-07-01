let sketch = (p) => {
  let canvas;
  let items = [];
  let debugCount = 0;

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
    setWorldBorder(p);

    // Draw screen border
    drawScreenBorder(p);

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
    return onMouseWheel(p, e);
  };

  /****************
   * Pan controls *
   ****************/
  p.touchStarted = () => {
    return onTouchStarted(p);
  };
  p.touchMoved = () => {
    return onTouchMoved(p);
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
        p.circle(screenPos[0], screenPos[1], this.size * scale[0]);
      }
    }
  }
};