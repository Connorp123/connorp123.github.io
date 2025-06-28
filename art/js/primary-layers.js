import { createGalleryCanvas, setupFullscreenButton } from "./helpers/gallery-page-helper.js";

export const primary_layers = (p) => {
    let canvas;
    let imgLoaded   = false;
    let isDrawing   = false;
    let currentRow  = 0;
    let layerNumber = 0;

    let originalImage;
    let drawnImage;
    let imgWidth;
    let imgHeight;
    let MAX_WIDTH  = 400;
    let MAX_HEIGHT = 400;

    let autoRun  = true;
    let MAX_TIME = 600;
    let timer    = 100;

    p.setup = () => {
        canvas = createGalleryCanvas(p);
        setupFullscreenButton(p);
        p.background(0);
        if (!autoRun) {
            p.fill(255);
            p.textSize(48);
            p.textAlign(p.CENTER, p.CENTER);
            p.text("Click!", p.width / 2, p.height / 2);
        }

        // Load the image
        p.loadImage("../../static/img/colorful-architecture.jpg", image => {

            // Save the image and update vars
            originalImage = image;
            imgLoaded     = true;
            p.imageMode(p.CENTER);

            // Resize image to fit in the canvas
            imgWidth  = p.min(originalImage.width, p.width, MAX_WIDTH);
            imgHeight = p.min(originalImage.height, p.height, MAX_HEIGHT);
            originalImage.resize(imgWidth, imgHeight);
            drawnImage = p.createImage(imgWidth, imgHeight);
        });
    };

    p.draw = () => {

        // Check if done drawing
        if (currentRow > imgHeight) {
            isDrawing  = false;
            currentRow = 0;
        }

        if (isDrawing) {
            copyLayerSlowly(originalImage, drawnImage);
            drawLayer(drawnImage);
        }

        // RUN-AUTOMATICALLY
        if (autoRun) {
            timer--;
            if (timer <= 0) {
                timer       = MAX_TIME;
                layerNumber = (layerNumber + 1) % 4;
                isDrawing   = true;
            }
        }
    };

    p.mousePressed = () => {
        if (!isDrawing && !autoRun) {
            layerNumber = (layerNumber + 1) % 4;
            isDrawing   = true;
        }
    };

    let drawLayer = (imageLayer) => {
        p.image(imageLayer, p.width / 2, p.height / 2, imgWidth, imgHeight);
    };

    // Every draw loop
    let copyLayerSlowly = (fromLayer, toLayer) => {

        // Prep layer for updates
        toLayer.loadPixels();

        // Loop over every pixel in the row
        for (let x = 0; x < imgWidth; x++) {
            // Read the pixel's color
            let originalColor = fromLayer.get(x, currentRow);

            // Filter the color
            const r         = layerNumber >= 1 ? p.red(originalColor) : 0;
            const g         = layerNumber >= 3 ? p.green(originalColor) : 0;
            const b         = layerNumber >= 2 ? p.blue(originalColor) : 0;
            let outputColor = p.color(r, g, b);

            // Set the pixel's color
            toLayer.set(x, currentRow, outputColor);
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

