export default class CameraStuff {
    constructor({p, capture, vWidth, vHeight, xChunk, yChunk}) {
        this.p           = p;
        this.capture     = capture;
        this.vWidth      = vWidth;
        this.vHeight     = vHeight;
        this.xChunk      = xChunk;
        this.yChunk      = yChunk;
        this.scaleFactor = p.width / vWidth;
    }

    drawHorizontalLines() {
        if (!this.capture.loadedmetadata) return;
        this.capture.loadPixels();
        this.p.stroke(255);
        this.p.strokeWeight(1);
        let y = 0; // Starting y-coordinate
        for (let j = 0; j < this.vHeight; j += this.yChunk) {
            let x             = 0;
            let sumBrightness = 0;
            while (x < this.vWidth) {

                // Calculate the average brightness of the chunk
                sumBrightness = 0;
                for (let k = j; k < j + this.yChunk && k < this.vHeight; k++) {
                    for (let i = x; i < x + this.xChunk && i < this.vWidth; i++) {
                        let index      = (i + k * this.vWidth) * 4;
                        let r          = this.capture.pixels[index];
                        let g          = this.capture.pixels[index + 1];
                        let b          = this.capture.pixels[index + 2];
                        let brightness = (r + g + b) / 3;
                        sumBrightness += brightness;
                    }
                }
                let avgBrightness = sumBrightness / (this.xChunk * this.yChunk);

                // map the brightness to line length and scale
                let lineLength = this.p.map(avgBrightness, 0, 255, 0, this.xChunk) * this.scaleFactor;

                // center the line and scale
                let startX = (x * this.scaleFactor) + ((this.xChunk * this.scaleFactor - lineLength) / 2);

                // Draw the line
                this.p.line(startX, y, startX + lineLength, y);

                // Move to the next chunk
                x += this.xChunk;
            }

            // Calculate the spacing
            let lineSpacing = this.p.map(sumBrightness / this.vWidth, 0, 255, 40, 1) / this.scaleFactor;

            // Adjust the next y-coordinate according to line spacing multiplied by chunkSizeY
            y += lineSpacing * this.yChunk;
        }
    }
}

export const createVideoCapture = (p, {width = 150.0, height = 150.0} = {}) => {
    let constraints = {
        video: {
            width:  width,
            height: height
        }
    };

    return p.createCapture(constraints);
};