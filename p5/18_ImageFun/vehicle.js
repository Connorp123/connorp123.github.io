// The "Vehicle" constructor

function Vehicle(x,y) {

    this.pos = createVector(x,y);
    this.acc = createVector(0,0);
    this.vel = createVector(0,0);
    this.r = 3;
    this.maxspeed = 15;
    this.maxforce = 0.5;
    this.clr = color( random(255), random(255), random(255) );
    // this.R = random(0,255
    // this.G = random(0,255);
    // this.B = random(0,255););

    this.applyForce = function(force) {
        // We could add mass here if we want A = F / M
        this.acc.add(force);
    }//---------------------------------------------------------------------------------------------

    this.run = function() {
        this.update();
        this.borders();
        this.display();
    }//---------------------------------------------------------------------------------------------

    this.follow = function(flow) {
        // What is the vector at that spot in the flow field?
        var desired = flow.lookup(this.pos);
        // Scale it up by maxspeed
        desired.mult(this.maxspeed);
        // Steering is desired minus velocity
        var steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxforce);  // Limit to maximum steering force
        this.applyForce(steer);
    }//---------------------------------------------------------------------------------------------

    this.attract = function (target) {
        // Gets the mouse pos
        var mouse = createVector(mouseX, mouseY);

        // Points the acceleration towards the mouse
        this.acc.add(p5.Vector.sub(mouse, this.pos));

        // Controls the max size of the acceleration
        this.acc.limit(this.maxforce);

        // Acceleration changes vel
        this.vel.add(this.acc);
        this.vel.limit(this.maxspeed);
        // Velocity changes position
        this.pos.add(this.vel);
    }//---------------------------------------------------------------------------------------------

    this.separate = function (vehicles) {
        var desiredseparation = this.r*2;
        var sum = createVector();
        var count = 0;

        // For every ball in the system, check if its too close
        for (var i = 0; i < vehicles.length; i++) {
            var d = p5.Vector.dist(this.pos, vehicles[i].pos);

            // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
            if ((d > 0) && (d < desiredseparation)) {
                // Calculate vector pointing away from neighbor
                var diff = p5.Vector.sub(this.pos, vehicles[i].pos);
                diff.normalize();
                diff.div(d);        // Weight by distance
                sum.add(diff);
                count++;            // Keep track of how many
            }
        }

        if (count > 0) {
            // Average -- divide by how many
            sum.div(count);
            // Our desired vector is the average scaled to maximum speed
            sum.normalize();
            sum.mult(this.maxspeed);
            // Implement Reynolds: Steering = Desired - Velocity
            var steer = p5.Vector.sub(sum, this.vel);
            steer.limit(this.maxforce);
            this.applyForce(steer);
        }
    }//---------------------------------------------------------------------------------------------

    // Method to update location
    this.update = function () {
        // Update vel
        this.vel.add(this.acc);
        // Limit speed
        this.vel.limit(this.maxspeed);
        this.pos.add(this.vel);
        // Reset acceleration to 0 each cycle
        this.acc.mult(0);
    }//---------------------------------------------------------------------------------------------

    this.display = function () {


        // COLOR
        fill(this.clr);
        noStroke();
        strokeWeight(2);

        // CIRCLE
        push();
        translate(this.pos.x, this.pos.y);
        ellipse(0, 0, this.r*2, this.r*2);
        pop();

        // TRIANGLE
        // var theta = this.vel.heading() + PI / 2;
        // push();
        // translate(this.pos.x,this.pos.y);
        // rotate(theta);
        // beginShape();
        // vertex(0, -this.r*2);
        // vertex(-this.r, this.r*2);
        // vertex(this.r, this.r*2);
        // endShape(CLOSE);
        // pop();
    }//---------------------------------------------------------------------------------------------

    // Wraparound
    this.borders = function () {
        if (this.pos.x < -this.r) this.pos.x = width + this.r;
        if (this.pos.y < -this.r) this.pos.y = height + this.r;
        if (this.pos.x > width + this.r) this.pos.x = -this.r;
        if (this.pos.y > height + this.r) this.pos.y = -this.r;
    }//---------------------------------------------------------------------------------------------

    // Set Color
    this.setColor = function() {



    }

}