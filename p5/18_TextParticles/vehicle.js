function Vehicle(x,y,r) {

    this.iPos     = createVector(x,y);
    this.prevPos  = this.iPos.copy();
    this.pos      = this.iPos.copy();
    this.acc      = createVector(0,0);
    this.vel      = createVector(0,0);
    this.r        = r || 1;
    this.maxSpeed = 10;
    this.maxForce = 1;
    this.clr      = color( random(255), random(255), random(255) );

    // Call the methods required to update this vehicle
    this.run = function() {
        this.update();
        this.display(displayMode);
        this.updatePrev();
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

    this.display = function (displayMode) {
        switch(displayMode) {
            case 0  : this.displayLine();   break;
            case 1  : this.displayCirlce(); break;
            default : this.displayLine();
        }
    }//---------------------------------------------------------------------------------------------

    this.displayCirlce = function () {
        push();
        fill(this.clr);
        noStroke();
        translate(this.pos.x, this.pos.y);
        ellipse(0, 0, this.r*2, this.r*2);
        pop();
    }//---------------------------------------------------------------------------------------------

    this.displayLine = function() {
        push();
        stroke(this.clr);
        strokeWeight(2);
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        pop();
    }//---------------------------------------------------------------------------------------------

    // Updates the previous position
    this.updatePrev = function() {
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
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