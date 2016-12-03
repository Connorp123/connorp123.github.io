function Vehicle(x, y, m) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxspeed = 10;
    this.maxforce = 1;
    this.R = random(0,255);
    this.G = random(0,255);
    this.B = random(0,255);

    this.r = 6;

    this.applyForce = function(force) {
        this.acc.add(force);
    }

    this.arrive = function(target) {

        var desired = p5.Vector.sub(target, this.pos);

        // desired.setMag(this.maxspeed);

        // The arrive behavior!
        var d = desired.mag();

        if (d < 100) {
            // Map the desired magnitude according to distance
            var m = map(d, 0, 100, 0, this.maxspeed);
            desired.setMag(m);
        } else {
            desired.setMag(this.maxspeed);
        }

        var steering = p5.Vector.sub(desired, this.vel);
        steering.limit(this.maxforce);

        this.applyForce(steering);

    }

    this.update = function() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxspeed);
        this.pos.add(this.vel);
        this.acc.set(0, 0);
    }

    this.display = function() {
        // Draw a triangle rotated in the direction of velocity
        var theta = this.vel.heading() + PI / 2;
        fill(this.R, this.G, this.B);
        // stroke(200);
        noStroke();
        // strokeWeight(2);
        push();
        translate(this.pos.x, this.pos.y);
        rotate(theta);
        beginShape();
        vertex(0, -this.r * 2);
        vertex(-this.r, this.r * 2);
        vertex(this.r, this.r * 2);
        endShape(CLOSE);
        pop();
    }
}





