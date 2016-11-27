// The "Planet" constructor

function Planet(x, y) {

    // Planet properties
    this.pos = createVector(x,y);
    this.acc = createVector(0,0);
    this.velocity = createVector(2,1);
    this.r = 30;
    this.m = 100;

    // Color
    this.R = random(0,255);
    this.G = random(0,255);
    this.B = random(0,255);

    // this.maxspeed = 15;
    // this.maxforce = 0.5;
    //----------------------------------------------------------------------------------------------

    // This function should be called in draw()
    this.run = function() {
        this.update();
        this.borders();
        this.display();
    }//---------------------------------------------------------------------------------------------

    // Apply a force to the planet
    this.applyForce = function(force) {
        // We could add mass here if we want A = F / M
        this.acc.add(force);
    }//---------------------------------------------------------------------------------------------


    this.attract = function (target) {

        // Points the acceleration towards the target
        this.acc.add(p5.Vector.sub(target, this.pos));
        this.acc.limit(1);

        // Acceleration changes velocity
        this.velocity.add(this.acc);

        // Velocity changes pos
        this.pos.add(this.velocity);
    }//---------------------------------------------------------------------------------------------

    // Method to update location
    this.update = function () {
        // Update velocity
        this.velocity.add(this.acc);
        // Limit speed
        this.velocity.limit(this.maxspeed);
        this.pos.add(this.velocity);
        // Reset acceleration to 0 each cycle
        this.acc.mult(0);
    }//---------------------------------------------------------------------------------------------


    this.display = function () {
        // Draw a triangle rotated in the direction of velocity
        // var theta = this.velocity.heading() + PI / 2;
        fill(this.R, this.G, this.B);
        // stroke(200);
        noStroke();
        strokeWeight(2);
        push();
        translate(this.pos.x, this.pos.y);
        ellipse(0, 0, this.r, this.r);
        pop();
    }//---------------------------------------------------------------------------------------------

    // Wraparound
    this.borders = function () {
        if (this.pos.x < -this.r) this.pos.x = width + this.r;
        if (this.pos.y < -this.r) this.pos.y = height + this.r;
        if (this.pos.x > width + this.r) this.pos.x = -this.r;
        if (this.pos.y > height + this.r) this.pos.y = -this.r;
    }//---------------------------------------------------------------------------------------------

}