// The Ball constructor
function Ball(x, y, r, acc, vel) {

    this.pos = createVector(x,y);
    this.acc = acc || createVector(0,0);
    this.vel = vel || createVector(0,0);
    this.r = r || 30;
    this.maxVel = 10;
    this.maxForce = 0.5;
    this.beingDragged = false;

    // Runs all the methods required for each update of the ball
    this.run = function() {
        this.update();
        // this.borders();
        this.display();
    }

    // REQUIRED TO APPLY GRAVITY
    // Applies a force to the Vehicle
    this.applyForce = function(force) {
        // We could add mass here if we want A = F / M
        this.acc.add(force);
        print(this.acc);
    }

    // Method to update location
    this.update = function () {
        if(this.beingDragged) {
            mouse = createVector(mouseX, mouseY);
            this.pos = mouse;
            this.vel.set(0,0);
            this.acc.set(0.0);
        }
        else{
            // Update vel
            this.vel.add(this.acc);
            // Update pos
            this.pos.add(this.vel);
            // Reset acceleration to 0 each cycle
            this.acc.mult(0);
        }

    }

    // Draws the ball
    this.display = function () {
        fill(127);
        stroke(200);
        strokeWeight(2);
        push();
        // translate(this.pos.x, this.pos.y);
        ellipse(this.pos.x,this.pos.y,this.r*2,this.r*2); // draw ellipse
        pop();
    }

    // // Wraparound
    // this.borders = function () {
    //     if (this.pos.x < -this.r) this.pos.x = width + this.r;
    //     if (this.pos.y < -this.r) this.pos.y = height + this.r;
    //     if (this.pos.x > width + this.r) this.pos.x = -this.r;
    //     if (this.pos.y > height + this.r) this.pos.y = -this.r;
    // }

}
