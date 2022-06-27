let sketch = (p) => {
  let canvas;
  let scale = 100;
  let items = [];
  let reference = [0, 0];

  // For dragging
  let lastTouch;

  p.setup = async () => {
    canvas = createInstanceCanvas(p);
    for(let i = 0; i < 15; i++)  {
      items.push(new Item(p.random(p.width), p.random(p.height), p.random(40)));
    }
  };

  p.draw = () => {
    redrawBackground(p);

    // Translate
    p.translate(reference[0], reference[1]);

    items.forEach(item => {
      item.draw();
    });
  };

  p.mouseWheel = (e) => {
    scale -= (e.delta / 10);
    scale = p.max(10, scale);
    console.log(scale);
    return false;
  };

  p.touchStarted = () => {
    // Record initial pos
    lastTouch = [p.mouseX, p.mouseY];
    console.log(`Touch started at: ${lastTouch[0]}, ${lastTouch[1]}`);
  };

  p.touchMoved = () => {
    // Calculate direction

    reference = [
      reference[0] + (p.mouseX - lastTouch[0]),
      reference[1] + (p.mouseY - lastTouch[1]),
    ]

    lastTouch = [p.mouseX, p.mouseY]
  };


  class Item {
    constructor(x, y, size) {
      this.pos = [x, y];
      this.size = size;
      this.color = [p.random(255), p.random(255), p.random(255)];
    }

    draw() {
      p.fill(this.color[0], this.color[1], this.color[2]);
      p.circle(this.pos[0], this.pos[1], this.size * (scale / 100));
    }
  }
};