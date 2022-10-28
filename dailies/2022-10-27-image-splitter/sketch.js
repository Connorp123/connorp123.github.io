let sketch = (p) => {
  let canvas;
  let imgLoaded = false;

  let originalImg;
  let imgWidth;
  let imgHeight;
  let MAX_WIDTH = 400;
  let MAX_HEIGHT = 400;
  let CELL_SIZE = 4;
  let CELL_SPACING = 1;
  let minis = [];

  p.setup = () => {
    canvas = createInstanceCanvas(p);
    redrawBackground(p);

    // Load the image
    p.loadImage("../../img/colorful-architecture.jpg", image => {

      // Save the image and update vars
      originalImg = image;
      imgLoaded = true;

      // Resize image to fit in the canvas
      imgWidth = p.min(originalImg.width, p.width, MAX_WIDTH);
      imgHeight = p.min(originalImg.height, p.height, MAX_HEIGHT);
      originalImg.resize(imgWidth, imgHeight);

      // Create mini images
      minis = ImageSplitter.splitImage(originalImg, imgWidth, imgHeight, CELL_SIZE, CELL_SIZE, CELL_SPACING);
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

  class ImageSplitter {
    static splitImage(originalImage, imageWidth, imageHeight, cellWidth, cellHeight, cellSpacing = 0, xOff = 0, yOff = 0) {
      let miniImages = [];
      let newMini;
      let xSpacing;
      let ySpacing;
      for (let y = 0; y < imageHeight; y += cellHeight) {
        for (let x = 0; x < imageWidth; x += cellWidth) {
          xSpacing = (x / cellWidth) * cellSpacing;
          ySpacing = (y / cellHeight) * cellSpacing;
          newMini = new MiniImage(cellWidth, cellHeight);
          newMini.setImage(originalImage, x, y, cellWidth, cellHeight);
          newMini.setPos(x + xOff + xSpacing, y + yOff + ySpacing);
          miniImages.push(newMini);
        }
      }
      return miniImages;
    }
  }

  class MiniImage {

    constructor(w, h) {
      this.image = p.createImage(w, h);
      this.width = w;
      this.height = h;
      this.x = 0;
      this.y = 0;
    }

    setPos(x, y) {
      this.x = x;
      this.y = y;
    }

    // Assumes values are within bounds
    setImage(fromImage, startX, startY, copyWidth = this.width, copyHeight = this.height) {

      if (copyWidth > this.width || copyHeight > this.height) {
        console.log("Copy width or height are too big... exiting");
        return;
      }

      let xDiff = startX;
      let yDiff = startY;

      let stopWidth = startX + copyWidth;
      let stopHeight = startY + copyHeight;

      // Prep layer for updates
      this.image.loadPixels();

      // Loop over every pixel in the row
      for (let currentRow = startY; currentRow < stopHeight; currentRow++) {
        for (let currentCol = startX; currentCol < stopWidth; currentCol++) {

          // Read the pixel's color
          let originalColor = fromImage.get(currentCol, currentRow);

          // Set the pixel's color
          this.image.set(currentCol - xDiff, currentRow - yDiff, originalColor);
        }
      }
      // Update drawn layer
      this.image.updatePixels();
    }

    display() {
      p.image(this.image, this.x, this.y, this.width, this.height);
    }
  }
};

