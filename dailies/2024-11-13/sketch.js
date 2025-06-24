import { getGifName, createSvgCanvas } from "../../helpers/modules/display-helpers-modules.js";


export const sketch = (p) => {

    // Basics
    let canvas;
    let state = {
        debug:            false,
        redrawBackground: false,
        drawMax:          true
    };

    let originalImage;
    let imgLoaded = false;
    let imgWidth;
    let imgHeight;
    let referenceImage;


    p.setup = () => {
        canvas = createSvgCanvas(p, p.windowWidth, p.windowHeight);
        p.frameRate(144);

        //

        p.loadImage("./max-no-background-bw-png.png", image => {

            // Save the image and update vars
            originalImage = image;
            imgLoaded     = true;
            p.imageMode(p.CENTER);

            // Resize image to fit in the canvas
            const scale = 4;
            imgWidth    = p.floor(originalImage.width / scale);
            imgHeight   = p.floor(originalImage.height / scale);
            originalImage.resize(imgWidth, imgHeight);

            drawImage();
        });

    };

    p.draw = () => {
        // if (state.redrawBackground) p.background(0);
        // if (state.drawMax) {
        //     p.image(originalImage, p.width / 2, p.height / 2);
        // }
    };

    p.keyPressed = () => {
        const key = p.key.toLowerCase();
        if (key === "s") p.save(`${getGifName()}.svg`);
    };

    let drawImage = () => {

        const squareSize     = 2;
        const halfSquareSize = squareSize / 2;

        // p.background(0);
        p.stroke(255);
        p.noFill();

        let circleCount = 0;

        for (let y = 0; y < p.height; y += squareSize) {
            for (let x = 0; x < p.width; x += squareSize) {

                // Get average brightness of this current square
                // right now, lets just check center pixel
                let avgBrightness = getAverageBrightness(originalImage, x, y, squareSize);


                // If average brightness > 100, draw circle
                if (avgBrightness > 65) {
                    p.circle(x + halfSquareSize, y + halfSquareSize, squareSize);
                    circleCount++;
                }
            }
        }

        console.log("Drawing " + circleCount + " circles");
        p.noLoop();
    };

    const getAverageBrightness = (img, startX, startY, squareSize) => {

        let totalBrightness = 0;
        let totalAlpha      = 0;
        const area          = squareSize * squareSize;

        for (let y = startY; y < startY + squareSize; y++) {
            for (let x = startX; x < startX + squareSize; x++) {
                const px = img.get(x, y);
                totalBrightness += p.brightness(px);
                totalAlpha += p.alpha(px);
            }
        }

        // if (totalAlpha / area > 255) {
        //     console.log(totalAlpha / area);
        //     return 0;
        // }

        return totalBrightness / area;
    };
};