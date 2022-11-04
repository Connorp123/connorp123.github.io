class ImageSplitter {
  static splitImageAdvanced(p_, originalImage, imageWidth, imageHeight, cellWidth, cellHeight, cellSpacing = 0, xOff = 0, yOff = 0) {
    let miniImages = [];
    let newMini;
    let xSpacing;
    let ySpacing;
    for (let y = 0; y < imageHeight; y += cellHeight) {
      for (let x = 0; x < imageWidth; x += cellWidth) {
        xSpacing = (x / cellWidth) * cellSpacing;
        ySpacing = (y / cellHeight) * cellSpacing;
        newMini = new MiniImage(p_, cellWidth, cellHeight);
        newMini.setImage(originalImage, x, y, cellWidth, cellHeight);
        newMini.setPos(x + xOff + xSpacing, y + yOff + ySpacing);
        miniImages.push(newMini);
      }
    }
    return miniImages;
  }

  // Only works with square images
  static splitImageIntoSquares(p_, originalImage, imageWidth, imageHeight, numImagesToCreate, cellSpacing = 0, xOff = 0, yOff = 0) {
    let CELL_WIDTH = p_.sqrt((imageWidth * imageHeight) / numImagesToCreate);
    return this.splitImageAdvanced(p_, originalImage, imageWidth, imageHeight, CELL_WIDTH, CELL_WIDTH, cellSpacing, xOff, yOff);
  }
}

class MiniImage {

  constructor(p_, w, h) {
    this.p = p_;
    this.image = p_.createImage(w, h);
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
    this.p.image(this.image, this.x, this.y, this.width, this.height);
  }
}