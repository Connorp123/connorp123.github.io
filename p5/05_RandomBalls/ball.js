var scale = 100; // 1 pixel = 100m

// The Ball constructor
function Ball(x, y, r, acc, vel) {

    this.pos = createVector(x,y);
    this.acc = acc || createVector(0,0);
    this.vel = vel || createVector(0,0);
    this.r = r || 30;
    this.maxVel = 10;
    this.maxForce = 0.5;
    this.R = random(0,255);
    this.G = random(0,255);
    this.B = random(0,255);

    // Runs all the methods required for each update of the ball
    this.run = function() {
        this.update();
        this.borders();
        this.display();
    }

    // Applies a force to the Vehicle
    this.applyForce = function(force) {
        // We could add mass here if we want A = F / M
        this.acc.add(force);
    }

    // Method to update location
    this.update = function () {
        // Update vel
        this.vel.add(this.acc);
        // Limit speed
        this.vel.limit(this.maxVel);
        this.pos.add(this.vel);
        // Reset acceleration to 0 each cycle
        this.acc.mult(0);
    }

    // Draws the ball
    this.display = function () {
        fill(this.R, this.G, this.B);
        // stroke(200);
        noStroke();
        // strokeWeight(2);
        push();
        translate(this.pos.x, this.pos.y);
        ellipse(0, 0, this.r, this.r);
        pop();
    }

    // Wraparound
    this.borders = function () {
        if (this.pos.x < -this.r) this.pos.x = width + this.r;
        if (this.pos.y < -this.r) this.pos.y = height + this.r;
        if (this.pos.x > width + this.r) this.pos.x = -this.r;
        if (this.pos.y > height + this.r) this.pos.y = -this.r;
    }

}
