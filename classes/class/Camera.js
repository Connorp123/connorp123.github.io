/*
    Use ffmpeg:
      https://www.wikihow.com/Install-FFmpeg-on-Windows
      ffmpeg -r 5 -f image2 -s 480x480 -i "frame%02d.png" -vcodec libx264 -crf 17 -pix_fmt yuv420p output.mp4

 */

class Camera {

    // Default values based on the upper limits of Giphy recommendations
    constructor(frameRate, seconds) {
        this.frameRate  = frameRate || 16;
        this.maxFrames  = this.frameRate * (seconds || 6);
        this.frameCount = 0;
        this.capturing  = false;

        this.capturer = new CCapture({
            format: "gif",
            // workersPath: 'C:\\Workspace\\personal-website-v2\\class',
            frameRate: frameRate || 16,
            verbose:   true
            // frameLimit: maxFrames
        });
    }

    setupCanvas() {
        myCanvas = createCanvas(480, 480);
        myCanvas.parent("sketch");
        frameRate(this.frameRate);
    }

    // Start capturing the gif
    startCapture() {
        this.capturing = true;
        console.log("Capture started");
    }

    captureFrame(canvas) {

        if (this.capturing) {
            // Save canvas and increment frameCount
            saveCanvas(canvas, "frame" + (this.frameCount >= 10 ? "" : "0") + this.frameCount, "png");
            this.frameCount++;

            // Show a red recording dot
            fill(255, 0, 0);
            circle(windowWidth - 25, 25, 10);
        }

        // Stop capturing when the max frames is reached
        if (this.frameCount >= this.maxFrames) {
            this.capturing = false;
            this.stopCapture();
            console.log("");
        }
    }

    stopCapture() {
        this.capturing  = false;
        this.frameCount = 0;
        console.log("fCapture stopped. Use ffmpeg to compile.");
        console.log("Frame Rate: " + this.frameRate);
        console.log("Seconds recorded: " + (this.maxFrames / this.frameRate));
    }
}