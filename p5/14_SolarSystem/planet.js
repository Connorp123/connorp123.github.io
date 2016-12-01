// The "Planet" constructor

function Planet(x, y, r, m, v) {

    // Planet properties
    this.pos = createVector(x,y);
    this.acc = createVector(0,0);
    this.vel = v || createVector(0,0);
    // this.r = random(10,100);
    this.r = r || 30;
    this.mass = this.m || this.r * 10000;

    // Color
    this.R = random(0,255);
    this.G = random(0,255);
    this.B = random(0,255);
    this.alpha = 100;

    // Control variables
    this.beingDragged = false;

    this.maxVel = 10000000;
    this.maxForce = 100000000;
    //----------------------------------------------------------------------------------------------

    // This function should be called in draw()
    this.run = function() {
        this.display();
        this.update();
        // this.borders();
    }//---------------------------------------------------------------------------------------------

    // Apply a force to the planet
    this.applyForce = function(force) {

        // var newForce = force.div(this.mass);
        // force.limit(this.maxForce);
        this.acc.add(force);
    }//---------------------------------------------------------------------------------------------


    // Calculates and applies an attraction force towards the target
    this.attract = function (target, mass) {

        var G = .0000000000667;
        var rVector = p5.Vector.sub(target, this.pos);
        var rAngle = rVector.heading();
        var rX = rVector.x;
        var rY = rVector.y;
        var r = p5.Vector.dist(target, this.pos) * .5;

        console.log("r is: " + r);

        // Find m & M
        var m;
        var M;
        if(this.mass > mass) {
            M = this.mass;
            m = mass;
        }
        else {
            M = mass;
            m = this.mass;
        }

        // Calculate the force of gravity
        var gmm = G * m * M;
        var rSquared = r * r;
        var fGrav = gmm / rSquared;


        // Create an acceleration vector caused by gravity
        // var fGravity = createVector(fGrav, 0);
        // var fGravity = createVector(0, 0);
        // fGravity.setMag(fGrav);
        var fGravity = rVector.copy();
        fGravity.normalize();
        fGravity.setMag(fGrav);
        // fGravity.rotate(rAngle);

        console.log("fGravity is: " + fGravity);

        // Apply the force of gravity to the planet
        this.applyForce(fGravity);

    }//---------------------------------------------------------------------------------------------

    // Method to update location
    this.update = function () {

        // Update velocity
        if (this.beingDragged) {
            this.drag();
        }
        else {
            this.vel.add(this.acc);
            this.vel.limit(this.maxVel);

        }

        // Update position
        this.pos.add(this.vel);

        // Reset acceleration to 0 each cycle
        this.acc.mult(0);
    }//---------------------------------------------------------------------------------------------


    this.display = function () {
        // Draw a triangle rotated in the direction of velocity
        // var theta = this.velocity.heading() + PI / 2;
        fill(this.R, this.G, this.B, this.alpha);
        stroke(this.R, this.G, this.B);
        // noStroke();
        strokeWeight(1);
        push();
        translate(this.pos.x, this.pos.y);
        ellipse(0, 0, this.r, this.r);
        pop();

        if(debug) {

            // Draw the velocity vector
            stroke(0,0,255,120);
            line(this.pos.x ,this.pos.y, this.pos.x+this.vel.x*5, this.pos.y+this.vel.y*5);

            // Draw the acceleration vector
            stroke(255,0,0,120);
            line(this.pos.x, this.pos.y, this.pos.x+this.acc.x*100, this.pos.y+this.acc.y*100 );

        }



        // this.acc.mult(0);


    }//---------------------------------------------------------------------------------------------

    // Wraparound
    this.borders = function () {
        if (this.pos.x < -this.r) this.pos.x = width + this.r;
        if (this.pos.y < -this.r) this.pos.y = height + this.r;
        if (this.pos.x > width + this.r) this.pos.x = -this.r;
        if (this.pos.y > height + this.r) this.pos.y = -this.r;
    }//---------------------------------------------------------------------------------------------


    // Create a velocity vector towards the mouse when the planet is being clicked
    this.drag = function () {


        // Create the velocity vector towards the mouse
        mVec = createVector(mouseX, mouseY);
        this.vel = p5.Vector.sub(mVec, this.pos);
        stroke(0, 120);
        line(this.pos.x, this.pos.y, mouseX, mouseY);
    }//--------------------------------------------------------------------------------------------

    this.SetColor = function(r, g, b) {
        this.R = r;
        this.G = g;
        this.B = b;
    }


}