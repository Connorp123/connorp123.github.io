let sketch = (p) => {
  let canvas;

  // For image loading / resizing
  let imgLoaded = false;
  let imgWidth;
  let imgHeight;

  // For ImageSplitter
  let MAX_WIDTH = 400;
  let MAX_HEIGHT = 400;
  let CELL_SIZE = 10;
  let CELL_SPACING = 2;
  let X_OFF = 20;
  let Y_OFF = 50;
  let minis = [];

  p.setup = () => {
    canvas = createInstanceCanvas(p);
    redrawBackground(p);

    // Load the image
    p.loadImage("../../img/colorful-architecture.jpg", image => {
      imgLoaded = true;

      // Resize image to fit in the canvas
      imgWidth = p.min(image.width, p.width, MAX_WIDTH);
      imgHeight = p.min(image.height, p.height, MAX_HEIGHT);
      image.resize(imgWidth, imgHeight);

      // Create mini images
      // minis = ImageSplitter.splitImageAdvanced(p, image, imgWidth, imgHeight, CELL_SIZE, CELL_SIZE, CELL_SPACING, X_OFF, Y_OFF);
      minis = ImageSplitter.splitImageIntoSquares(p, image, imgWidth, imgHeight, 16, CELL_SPACING);
    });
  };

  p.draw = () => {
    redrawBackground(p);
    p.fill(255);
    p.text(p.frameCount, p.width - 100, 100);
    if (imgLoaded) {
      minis.forEach(img => {
        img.display();
      });
    }
  };
};

