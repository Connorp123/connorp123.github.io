import { createGalleryCanvas, setGalleryButtonUrls } from "../../helpers/galleryPageHelper.js";

export const flow_field = (p) => {
    let flowField;      // flowField object
    let vehicles     = [];  // List of Vehicle objects
    let NUM_VEHICLES = 100;
    let myCanvas;

    p.setup = () => {
        // Creates the canvas
        myCanvas = createGalleryCanvas(p);
        setGalleryButtonUrls();

        // Makes a new flowField
        flowField = new FlowField(p, 30);

        // Makes a bunch of vehicles with random values
        for (let i = 0; i < NUM_VEHICLES; i++) {
            vehicles.push(new Vehicle(p, p.random(p.width), p.random(p.height), p.random(2, 5), p.random(0.1, 0.5)));
        }
    };

    p.draw = () => {

        // Re-draw the background
        p.background(250, 250, 248);

        // Tell all the vehicles to follow the flow field
        for (let i = 0; i < vehicles.length; i++) {
            vehicles[i].follow(flowField);
            vehicles[i].run();
        }
    };

    // When the mouse is pressed
    p.mousePressed = () => {
        // Create a new flow field
        flowField.init();
    };
};

function FlowField(p, r) {
    this.p          = p;
    this.resolution = r; // The size of each "cell"
    this.cols       = this.p.width / this.resolution;
    this.rows       = this.p.height / this.resolution;

    // Makes a 2d array
    this.make2Darray = function (n) {
        let array = [];
        for (let i = 0; i < n; i++) {
            array[i] = [];
        }
        return array;
    };

    // Creates the FlowField
    this.field = this.make2Darray(this.cols);


    this.init = function () {
        // Reseed the noise so that we get a new flow every time
        // Need to get noise working
        this.p.noiseSeed(Math.floor(this.p.random(10000)));
        let xoff = 0;
        for (let i = 0; i < this.cols; i++) {
            let yoff = 0;
            for (let j = 0; j < this.rows; j++) {

                let theta = this.p.map(this.p.noise(xoff, yoff), 0, 1, 0, this.p.TWO_PI);

                // Polar to cartesian coordinate transformation to get x and y components of the vector
                this.field[i][j] = this.p.createVector(this.p.cos(theta), this.p.sin(theta));

                // Increment yoff
                yoff += 0.1;
            }
            // Increment xoff
            xoff += 0.1;
        }
    };
    this.init();

    this.lookup = function (lookup) {
        let column = Math.floor(this.p.constrain(lookup.x / this.resolution, 0, this.cols - 1));
        let row    = Math.floor(this.p.constrain(lookup.y / this.resolution, 0, this.rows - 1));

        return this.field[column][row].copy();
    };
}

function Vehicle(p, x, y, ms, mf) {
    this.p            = p;
    this.position     = this.p.createVector(x, y);
    this.acceleration = this.p.createVector(0, 0);
    this.velocity     = this.p.createVector(0, 0);
    this.r            = 4;
    this.maxspeed     = ms || 4;
    this.maxforce     = mf || 0.1;
    this.R            = this.p.random(0, 255);
    this.G            = this.p.random(0, 255);
    this.B            = this.p.random(0, 255);

    this.run = function () {
        this.update();
        this.borders();
        this.display();
    };

    // Implementing Reynolds' flow field following algorithm
    // http://www.red3d.com/cwr/steer/FlowFollow.html
    this.follow = function (flow) {
        // What is the vector at that spot in the flow field?
        let desired = flow.lookup(this.position);
        // Scale it up by maxspeed
        desired.mult(this.maxspeed);
        // Steering is desired minus velocity
        desired.sub(this.velocity.x, this.velocity.y);
        // var steer = this.p.p5.Vector.sub(desired, this.velocity);
        desired.limit(this.maxforce);  // Limit to maximum steering force
        this.applyForce(desired);
    };

    this.applyForce = function (force) {
        // We could add mass here if we want A = F / M
        this.acceleration.add(force);
    };

    // Method to update location
    this.update = function () {
        // Update velocity
        this.velocity.add(this.acceleration);
        // Limit speed
        this.velocity.limit(this.maxspeed);
        this.position.add(this.velocity);
        // Reset accelerationelertion to 0 each cycle
        this.acceleration.mult(0);
    };

    // Wraparound
    this.borders = function () {
        if (this.position.x < -this.r) this.position.x = this.p.width + this.r;
        if (this.position.y < -this.r) this.position.y = this.p.height + this.r;
        if (this.position.x > this.p.width + this.r) this.position.x = -this.r;
        if (this.position.y > this.p.height + this.r) this.position.y = -this.r;
    };

    this.display = function () {
        // Draw a triangle rotated in the direction of velocity
        var theta = this.velocity.heading() + this.p.PI / 2;
        this.p.fill(this.R, this.G, this.B);
        this.p.noStroke();
        this.p.push();
        this.p.translate(this.position.x, this.position.y);
        this.p.rotate(theta);
        this.p.beginShape();
        this.p.vertex(0, -this.r * 2);
        this.p.vertex(-this.r, this.r * 2);
        this.p.vertex(this.r, this.r * 2);
        this.p.endShape(this.p.CLOSE);
        this.p.pop();
    };
}