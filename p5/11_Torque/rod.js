function Rod(x, y, l, h, ang, v, a, m) {

    // Initializes dimensional properties
    this.center = createVector(x, y);
    this.l = l || 200;
    this.h = h || 10;
    this.m = m || 10;
    this.angle = ang || 0;

    // Initializes forces
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);

    // Initializes the other properties
    this.color = color(random(0, 255), random(0, 255), random(0, 255), 100);

    //---------------------------------------------------------------------------------------------

    /***************************
     * display - Draws the rod *
     ***************************/
    this.display = function () {

        push();

        // Draw the Rod
        translate(this.center.x, this.center.y);
        rotate(this.angle);
        fill(this.color);
        // rectMode(CENTER);
        // rect(this.center.x, this.center.y, this.l, this.h);
        rect(-this.l / 2, -this.h / 2, this.l, this.h);

        // Draw the center point
        stroke(255, 0, 0);
        fill(255, 0, 0);
        ellipse(0, 0, 5, 5);

        pop();
    }//--------------------------------------------------------------------------------------------

    /*******************************************
     * applyForce - Applies a force to the rod *
     *******************************************/
    this.applyForce = function (force) {
        var f = p5.Vector.div(force, this.mass);
        this.acc.add(f);
    }//--------------------------------------------------------------------------------------------

    /*********************************
     * update - Updates the position *
     *********************************/
    this.update = function () {

        // Acceleration changes velocity
        this.vel.add(this.acc);

        // Velocity changes position
        this.center.add(this.vel);

        // Reset acceleration
        this.acc.mult(0);

    }//--------------------------------------------------------------------------------------------

    /****************************************
     * spin - Rotates the rod at its center *
     ****************************************/
    this.spin = function () {
        this.angle += PI / 64;
    }//--------------------------------------------------------------------------------------------

    /*********************************************************
     * edges - Checks if the rod is colliding with the edges *
     *********************************************************/
    this.edges = function () {
        if (this.center.x > width) {
            this.center.x = width;
            this.vel.x *= -1;
        }
        if (this.center.x < 0) {
            this.center.x = 0;
            this.vel.x *= -1;
        }
        if (this.center.y > height) {
            this.center.y = height;
            this.vel.y *= -1;
        }
        if (this.center.y < 0) {
            this.center.y = 0;
            this.vel.y *= -1;
        }

    }//--------------------------------------------------------------------------------------------
}