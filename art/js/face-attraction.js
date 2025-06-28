import { createGalleryCanvas, setupFullscreenButton } from "./helpers/gallery-page-helper.js";

export const face_attraction = (p) => {

    let canvas;
    let redraw  = true;
    let started = false;

    // For particles
    let walkers    = [];
    let numWalkers = 40;

    // For video
    let video;
    let videoReady  = false;
    let videoElement;
    let constraints = {
        video: {
            // mandatory: {
            //   minWidth: 1280,
            //   minHeight: 720
            // },
            optional: [{maxFrameRate: 30}]
        },
        audio: false
    };

    // For tensorflow
    let model;
    let modelReady = false;
    let predictions;
    let faceCenter;

    //--------------------------------------------------------------------------------------------------------------------
    p.setup = () => {
        canvas = createGalleryCanvas(p);
        setupFullscreenButton(p);
        canvas.mouseClicked(startSketch);
        p.frameRate(30);
        p.textAlign(p.CENTER, p.CENTER);
    };

    //--------------------------------------------------------------------------------------------------------------------
    p.draw          = () => {

        // Basic canvas display
        if (!started) {
            p.background(0);
            p.fill(255);
            p.text("Click to start", p.width / 2, p.height / 2);
        } else if (started && !modelReady) {
            p.background(p.frameCount % 255);
            p.fill(255);
            p.text("Loading model...", p.width / 2, p.height / 2);
        } else if (started && modelReady && redraw) p.background(0);

        // If started and everything is ready
        if (started && videoReady && modelReady) {

            // Draw camera
            p.image(video, 0, 0);

            // Get predictions
            sendVideoToModel().then(() => {
                // Set the face center
                faceCenter = getFaceCenter();
            });

            // Update and draw walkers
            walkers.forEach(walker => {
                if (faceCenter) {
                    walker.attract(faceCenter[0], faceCenter[1]);
                }
                walker.update();
                walker.display();
            });
        }
    };
    //-------------------------------------------------------------------------------------------------------------------
    let startSketch = async () => {

        if (!started) {
            started = true;

            // Set up video
            video = p.createCapture(constraints, p.width, p.width * 0.75, () => {
                videoReady   = true;
                videoElement = document.querySelector("video");
            });
            video.hide();

            // Start tensorflow
            model = await blazeface.load();

            // Say that the model is ready
            modelReady = true;

            // Create walkers
            for (let i = 0; i < numWalkers; i++) {
                walkers.push(new Walker());
            }

        } else {
            started    = false;
            videoReady = false;
            modelReady = false;
            walkers    = [];

            // Stop video
            video.remove();
            video = null;
        }
    };

    // Send video to the model and get the face predictions
    let sendVideoToModel = async () => {
        // Pass in an image or video to the model. The model returns an array of
        // bounding boxes, probabilities, and landmarks, one for each detected face.
        const returnTensors = false; // Pass in `true` to get tensors back, rather than values.
        predictions         = await model.estimateFaces(videoElement, returnTensors);
    };

    let getFaceCenter = () => {
        if (predictions.length > 0) {
            const start = predictions[0].topLeft;
            const end   = predictions[0].bottomRight;
            return [
                (start[0] + end[0]) / 2,
                (start[1] + end[1]) / 2
            ];
        } else {
            return null;
        }
    };

    function Walker() {

        // Initializes the walker to the middle of the screen
        this.pos = p.createVector(p.random(0, p.width), p.random(0, p.height));

        // Initializes the velocity
        this.vel    = p.createVector(20, 20);
        this.acc    = p.createVector(0, 0);
        this.r      = p.randomGaussian(10, 2);                     // Radius
        this.maxVel = p.randomGaussian(30, 4);
        this.maxAcc = p.randomGaussian(10, 2);
        this.R      = p.random(0, 255);
        this.G      = p.random(0, 255);
        this.B      = p.random(0, 255);

        this.attract = function (targetX, targetY) {
            this.acc.y = targetY - this.pos.y;
            this.acc.x = targetX - this.pos.x;
        };

        // Makes it walk randomly around the screen
        this.update = function () {

            // Controls the max size of the acceleration
            this.acc.limit(this.maxAcc);

            // Acceleration changes velocity
            this.vel.x += this.acc.x;
            this.vel.y += this.acc.y;
            this.vel.limit(this.maxVel);

            // Velocity changes position
            this.pos.x += this.vel.x;
            this.pos.y += this.vel.y;
        };

        // Draws the walker
        this.display = function () {
            p.fill(this.R, this.G, this.B);
            p.ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
        };
    }
};
