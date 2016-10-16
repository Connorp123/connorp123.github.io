// The "Vehicle" constructor

function Vehicle(x,y) {

    this.position = createVector(x,y);
    this.acceleration = createVector(0,0);
    this.velocity = createVector(0,0);
    this.r = 30;
    this.maxspeed = 15;
    this.maxforce = 0.5;
    this.R = random(0,255);
    this.G = random(0,255);
    this.B = random(0,255);

    this.applyForce = function(force) {
        // We could add mass here if we want A = F / M
        this.acceleration.add(force);
    }

    this.run = function() {
        this.update();
        this.borders();
        this.display();
    }

    this.follow = function(flow) {
        // What is the vector at that spot in the flow field?
        var desired = flow.lookup(this.position);
        // Scale it up by maxspeed
        desired.mult(this.maxspeed);
        // Steering is desired minus velocity
        var steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxforce);  // Limit to maximum steering force
        this.applyForce(steer);
    }

    this.attract = function (target) {
        // Gets the mouse position
        var mouse = createVector(mouseX, mouseY);

        // Points the acceleration towards the mouse
        this.acceleration.add(p5.Vector.sub(mouse, this.position));

        // Controls the max size of the acceleration
        this.acceleration.limit(this.maxforce);
        // this.acc.normalize();

        // this.acc.mult(.5);
        // this.acc.setMag(0.1);

        // Create a vector from an angle
        // this.acc = p5.Vector.fromAngle(3*PI/2);

        // Rotates the velocity
        // this.vel.rotate(0.1);

        // Acceleration changes velocity
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxspeed);
        // Velocity changes position
        this.position.add(this.velocity);
    }

    this.separate = function (vehicles) {
        var desiredseparation = this.r*2;
        var sum = createVector();
        var count = 0;

        // For every ball in the system, check if its too close
        for (var i = 0; i < vehicles.length; i++) {
            var d = p5.Vector.dist(this.position, vehicles[i].position);

            // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
            if ((d > 0) && (d < desiredseparation)) {
                // Calculate vector pointing away from neighbor
                var diff = p5.Vector.sub(this.position, vehicles[i].position);
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
            var steer = p5.Vector.sub(sum, this.velocity);
            steer.limit(this.maxforce);
            this.applyForce(steer);
        }
    }

    // Method to update location
    this.update = function () {
        // Update velocity
        this.velocity.add(this.acceleration);
        // Limit speed
        this.velocity.limit(this.maxspeed);
        this.position.add(this.velocity);
        // Reset accelerationelertion to 0 each cycle
        this.acceleration.mult(0);
    }

    this.display = function () {
        // Draw a triangle rotated in the direction of velocity
        // var theta = this.velocity.heading() + PI / 2;
        fill(this.R, this.G, this.B);
        // stroke(200);
        noStroke();
        strokeWeight(2);
        push();
        translate(this.position.x, this.position.y);
        ellipse(0, 0, this.r, this.r);
        pop();
        // rotate(theta);
        // beginShape();
        // vertex(0, -this.r * 2);
        // vertex(-this.r, this.r * 2);
        // vertex(this.r, this.r * 2);
        // endShape(CLOSE);
    }

    // Wraparound
    this.borders = function () {
        if (this.position.x < -this.r) this.position.x = width + this.r;
        if (this.position.y < -this.r) this.position.y = height + this.r;
        if (this.position.x > width + this.r) this.position.x = -this.r;
        if (this.position.y > height + this.r) this.position.y = -this.r;
    }

}

// this.run = function() {
//     this.update();
//     this.borders();
//     this.display();
// }

// // Implementing Reynolds' flow field following algorithm
// // http://www.red3d.com/cwr/steer/FlowFollow.html
// this.follow = function(flow) {
//     // What is the vector at that spot in the flow field?
//     var desired = flow.lookup(this.position);
//     // Scale it up by maxspeed
//     desired.mult(this.maxspeed);
//     // Steering is desired minus velocity
//     var steer = p5.Vector.sub(desired, this.velocity);
//     steer.limit(this.maxforce);  // Limit to maximum steering force
//     this.applyForce(steer);
// }




// }

// MY CODE:

// function Vehicle(x, y, ms, mf) {
//
//     this.pos = createVector(x, y);
//     this.vel = createVector(0, 0);
//     this.acc = createVector(0, 0);
//     this.r = 4;
//     this.maxSpeed = ms || 4;     // Max speed
//     this.maxForce = mf || 0.1;  // Handling power
//
//     // Moves the Vehicle
//     this.run = function () {
//         this.update();
//         this.borders();
//         this.display();
//     };
//
//     // Reynolds' flow field algorithm
//     this.follow = function (flow) {
//         // What is the vector at the current position?
//         var desired = flow.lookup(this.position);
//
//         // Scale it up by maxSpeed
//         desired.mult(this.maxSpeed);
//
//         // Calculate the steering force (desired - velocity)
//         var steer = p5.Vector.sub(desired, this.velocity);
//         steer.limit(this.maxForce); // Limit the max steering force
//         this.applyForce(steer); // Steer the vehicle
//     };
//
//     this.applyForce = function (force) {
//         // var f = force.copy();
//         // f.div(this.mass);
//         this.acc.add(force);
//     };
//
//     // Update the location
//     this.update = function() {
//         // Update velocity
//         this.vel.add(this.acc);
//
//         // Limit the speed
//         this.vel.limit(this.maxSpeed);
//         this.pos.add(this.vel);
//
//         // Reset Acceleration to 0
//         this.acc.mult(0);
//     };
//
//     // Wraparound
//     this.borders = function () {
//         if (this.pos.x < -this.r) this.pos.x = width + this.r; // Moves from the left side to the right side
//         if (this.pos.x > width + this.r) this.pos.x = -this.r;       // Moves from the right side to the left
//         if (this.pos.y < this.pos.r) this.pos.y = height + this.r; // Moves from the top of the screen to the bottom
//         if (this.pos.y > height + this.pos.r) this.pos.y = -this.r; // Moves from the top of the screen to the bottom
//     };
//
//     this.display = function () {
//         // Draw a triangle rotated in the direction of velocity
//         var theta = this.vel.heading() + PI / 2;
//         fill(127);
//         stroke(200);
//         strokeWeight(1);
//         push();
//         translate(this.pos.x, this.pos.y);
//         rotate(theta);
//         beginShape();
//         vertex(0, -this.r * 2);
//         vertex(-this.r, this.r * 2);
//         vertex(this.r, this.r * 2);
//         endShape(CLOSE);
//         pop();
//     }
// }
