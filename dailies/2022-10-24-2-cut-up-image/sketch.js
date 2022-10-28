let sketch = (p) => {
  let canvas;
  let imgLoaded = false;
  let isDrawing = false;
  let currentRow = 0;
  let layerNumber = 0;

  let originalImage;
  let drawnImage;
  let imgWidth;
  let imgHeight;
  let MAX_WIDTH = 400;
  let MAX_HEIGHT = 400;

  let CELL_SIZE = 40;
  let CELL_BORDER_WIDTH = 1;

  p.setup = () => {
    canvas = createInstanceCanvas(p);
    redrawBackground(p);
    p.fill(255);
    p.textSize(48);
    p.textAlign(p.CENTER, p.CENTER);
    p.text("Click!", p.width / 2, p.height / 2);

    // Load the image
    p.loadImage("../../img/colorful-architecture.jpg", image => {

      // Save the image and update vars
      originalImage = image;
      imgLoaded = true;
      p.imageMode(p.CENTER);

      // Resize image to fit in the canvas
      imgWidth = p.min(originalImage.width, p.width, MAX_WIDTH);
      imgHeight = p.min(originalImage.height, p.height, MAX_HEIGHT);
      originalImage.resize(imgWidth, imgHeight);

      // Increase height to make space for added pixels
      imgWidth += (imgWidth / CELL_SIZE) * CELL_BORDER_WIDTH;
      imgHeight += (imgHeight / CELL_SIZE) * CELL_BORDER_WIDTH;
      drawnImage = p.createImage(imgWidth, imgHeight);

      redrawBackground(p);
      createLines(originalImage, drawnImage);
      drawLayer(drawnImage);
    });
  };

  p.draw = () => {
    //
    // // Check if done drawing
    // if (currentRow > imgHeight) {
    //   isDrawing = false;
    //   currentRow = 0;
    // }
    //
    // if (isDrawing) {
    //   copyLayerSlowly(originalImage, drawnImage);
    //   drawLayer(drawnImage);
    // }
  };

  // p.mousePressed = () => {
  //   if (!isDrawing) {
  //     layerNumber = (layerNumber + 1) % 4;
  //     isDrawing = true;
  //   }
  // };

  let drawLayer = (imageLayer) => {
    p.image(imageLayer, p.width / 2, p.height / 2, imgWidth, imgHeight);
  };

  // Every draw loop

  let originalX = 0;
  let originalY = 0;
  let newX = 0;
  let newY = 0;

  let createLines = (fromLayer, toLayer) => {

    // Prep layer for updates
    toLayer.loadPixels();

    while (newX < imgWidth) {

      while (newY < imgHeight) {

        // Check if should draw border
        if (newY % CELL_SIZE < CELL_BORDER_WIDTH || newX % CELL_SIZE < CELL_BORDER_WIDTH) {
          toLayer.set(newX, newY, p.color(0));
          newY++;
        } else {
          let originalColor = fromLayer.get(originalX, originalY);
          toLayer.set(newX, newY, originalColor);
        }
        newY++;
        originalY++;
      }
      originalY = 0;
      newY = 0;

      if (newX % CELL_SIZE < CELL_BORDER_WIDTH) {
        newX++;
      }
      originalX++;
      newX++;
    }

    // Update drawn layer
    toLayer.updatePixels();
  };

  let copyLayerSlowly = (fromLayer, toLayer) => {

    // Prep layer for updates
    toLayer.loadPixels();

    // Loop over every pixel in the row
    for (let x = 0; x < imgWidth; x++) {
      // Read the pixel's color
      let originalColor = fromLayer.get(x, currentRow);


      // Set the pixel's color
      if (x % CELL_SIZE === 0 || currentRow % CELL_SIZE === 0) {
        toLayer.set(x, currentRow, p.color(0, 0, 0));
      } else {
        toLayer.set(x, currentRow, originalColor);
      }
    }
    // Update drawn layer
    toLayer.updatePixels();

    // Increment row
    currentRow += 1;
  };

  /* --- ARCHIVED for possible later use ---
  let updateLayer = (imageLayer, showRed, showBlue, showGreen) => {
    // Loop over every pixel in the image
    for (let y = 0; y < imgHeight; y++) {
      for (let x = 0; x < imgWidth; x++) {
        // Read the pixel's color
        let originalColor = originalImage.get(x, y);

        // Filter the color
        const r = showRed ? p.red(originalColor) : 0;
        const g = showGreen ? p.green(originalColor) : 0;
        const b = showBlue ? p.blue(originalColor) : 0;
        let outputColor = p.color(r, g, b);

        // Set the pixel's color
        imageLayer.set(x, y, outputColor);
      }
    }
    imageLayer.updatePixels();
  };
  */
};

