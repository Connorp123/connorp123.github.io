function Vehicle(x,y,r) {

    this.iPos = createVector(x,y);
    this.pos  = this.iPos.copy();
    this.acc  = createVector(0,0);
    this.vel  = createVector(0,0);
    this.r = r || 3;
    this.maxSpeed = 15;
    this.maxForce = 0.5;
    this.clr = color( random(255), random(255), random(255) );

    // Call the methods required to update this vehicle
    this.run = function() {
        this.update();
        this.display();
    }//---------------------------------------------------------------------------------------------

    // Update the physics of this vehicle
    this.update = function () {
        // Update vel
        this.vel.add(this.acc);
        // Limit speed
        this.vel.limit(this.maxSpeed);
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
    }//---------------------------------------------------------------------------------------------

    // Apply a force to this vehicle
    this.applyForce = function(force) {
        this.acc.add(force);
        this.acc.limit(this.maxForce);
    }//---------------------------------------------------------------------------------------------

    // Steer this vehicle towards a target and slow down when it gets close
    this.arrive = function(target) {
        let desired = p5.Vector.sub(target, this.pos);
        let d = desired.mag();

        if (d < 100) {
            // Map the desired magnitude according to distance
            let m = map(d, 0, 100, 0, this.maxSpeed);
            desired.setMag(m);
        } else {
            desired.setMag(this.maxSpeed);
        }

        let steering = p5.Vector.sub(desired, this.vel);
        this.applyForce(steering);
    }//---------------------------------------------------------------------------------------------

    // Steer this vehicle towards it's initial position
    this.reset = function() {
        this.arrive(this.iPos);
    }//---------------------------------------------------------------------------------------------

    // Steer this vehicle away from a target
    this.repel = function(target) {

        let desired = p5.Vector.sub(this.pos, target);
        let d = desired.mag();

        if(d < 100) {
            let steering = p5.Vector.sub(desired, this.vel);
            this.applyForce(steering);
        }
    }//---------------------------------------------------------------------------------------------
}