import { getGifName } from "../../helpers/modules/display-helpers-modules.js";

const createWalker = ({p}) => {
    return class Walker {
        constructor() {
            // Initializes the walker to the middle of the screen
            this.pos = p.createVector(p.random(0, p.width), p.random(0, p.height));

            // Initializes the velocity
            this.vel    = p.createVector(0, 0);
            this.acc    = p.createVector(0, 0);
            this.r      = p.randomGaussian(10, 2);
            this.maxVel = p.randomGaussian(30, 4);
            this.maxAcc = p.randomGaussian(10, 2);
            this.R      = p.random(0, 255);
            this.G      = p.random(0, 255);
            this.B      = p.random(0, 255);
        }

        update() {

            // Controls the max size of the acceleration
            this.acc.limit(this.maxAcc);

            // Acceleration changes velocity
            this.vel.x += this.acc.x;
            this.vel.y += this.acc.y;
            this.vel.limit(this.maxVel);

            // Velocity changes position
            this.pos.x += this.vel.x;
            this.pos.y += this.vel.y;

            this.checkEdgeCollide();
        }

        draw() {
            p.stroke(0);
            p.fill(this.R, this.G, this.B);
            p.ellipse(this.pos.x, this.pos.y, this.r * 2);
        }

        attract(targetX, targetY) {
            this.acc.add(p.createVector(targetX - this.pos.x, targetY - this.pos.y).limit(this.maxAcc));
        };

        repel(targetX, targetY) {
            const xDist = p.abs(targetX - this.pos.x);
            const yDist = p.abs(targetY - this.pos.y);

            if (xDist < 300 && yDist < 300) {
                this.acc.add(p.createVector(targetX + this.pos.x, targetY + this.pos.y).limit(this.maxAcc));
            }
        };

        // Check if the ball is colliding with another object
        checkEdgeCollide() {
            // Left
            if (this.pos.x < this.r) {
                this.pos.x = this.r;
                this.vel.x *= -0.8;
            }
            // Right
            if (this.pos.x > p.width - this.r) {
                this.pos.x = p.width - this.r;
                this.vel.x *= -0.8;
            }
            // Top
            if (this.pos.y < this.r) {
                this.pos.y = this.r;
                this.vel.y *= -0.8;
            }
            // Bottom
            if (this.pos.y > p.height - this.r) {
                this.pos.y = p.height - this.r;
                this.vel.y *= -0.8;
            }
        };
    };
};

export const sketch = (p) => {
    let canvas;
    let redraw  = true;
    let started = false;

    // For particles
    let walkers    = [];
    let numWalkers = 100;

    // For video
    let video;
    let videoReady  = false;
    let videoElement;
    let constraints = {
        video: {
            mandatory: {
                minWidth:  1280,
                minHeight: 720
            },
            optional:  [{maxFrameRate: 30}]
        },
        audio: false
    };

    // For tensorflow
    let model;
    let landmarks;
    let handCenter;
    let modelReady = false;

    const Walker = createWalker({p});

    const SCALE = 0.5;

    p.setup = () => {
        canvas = p.createCanvas(1920 * SCALE, 1080 * SCALE);
        canvas.mouseClicked(startSketch);
        p.frameRate(30);
        p.textAlign(p.CENTER, p.CENTER);

    };

    p.draw = () => {
        // Basic canvas display
        if (!started) {
            redrawBackground(p);
            p.fill(255);
            p.text("Click to start", p.width / 2, p.height / 2);
        } else if (started && !modelReady) {
            p.background(p.frameCount % 255);
            p.fill(255);
            p.text("Loading model...", p.width / 2, p.height / 2);
        } else if (modelReady && redraw) redrawBackground(p);

        // If started and everything is ready
        if (started && videoReady && modelReady) {

            // Get predictions
            getPredictions().then(() => {


                // Draw camera
                // p.image(video, 0, 0);

                drawKeypoints();

                // Update and draw walkers
                for (let i = 0; i < walkers.length; i++) {
                    walkers[i].attract(p.width / 2, p.height / 2);
                    if (handCenter) {
                        walkers[i].repel(handCenter[0], handCenter[1]);
                    }
                    walkers[i].update();
                    walkers[i].draw();
                }
            });
        }
    };

    p.keyPressed = () => {
        const key = p.key.toLowerCase();
        if (key === "s") p.save(`${getGifName()}.png`);
    };

    let startSketch = async () => {

        if (!started) {
            started = true;

            // Set up video
            video = p.createCapture(constraints, 1920 * SCALE, 1080 * SCALE, () => {
                videoReady   = true;
                videoElement = document.querySelector("video");
            });
            video.hide();

            // Start tensorflow
            model      = await handpose.load();
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

    let getPredictions = async () => {
        // if (p.frameCount % 15 === 0) {
        const predictions = await model.estimateHands(videoElement);
        onPredict(predictions);
        // }
    };

    let onPredict = (hands) => {
        if (hands.length > 0) {
            handCenter = [
                (hands[0].boundingBox.topLeft[0] + hands[0].boundingBox.bottomRight[0]) / 2,
                (hands[0].boundingBox.topLeft[1] + hands[0].boundingBox.bottomRight[1]) / 2
            ];
            landmarks  = hands[0].landmarks;
        } else {
            handCenter = null;
        }
    };

// A function to draw ellipses over the detected keypoints
    let drawKeypoints = () => {
        if (!landmarks) return;
        for (const keypoint of landmarks) {
            p.fill(255, 204, 0);
            p.stroke(255, 150, 0);
            p.ellipse(keypoint[0], keypoint[1], 10, 10);
        }
    };
};