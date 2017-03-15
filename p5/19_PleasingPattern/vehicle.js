function Vehicle(x,y,s) {

    this.iPos     = createVector(x,y);
    this.prevPos  = this.iPos.copy();
    this.pos      = this.iPos.copy();
    this.acc      = createVector(0,0);
    this.vel      = createVector(0,0);
    this.r        = 1;
    this.maxSpeed = 10;
    this.maxForce = 1;
    this.speed    = s || 1;
    this.clr      = color( random(255), random(255), random(255) );

    this.display = function (displayMode) {
        switch(displayMode) {
            case 0  : this.displayLine();   break;
            case 1  : this.displayCirlce(); break;
            default : this.displayLine();
        }
        this.updatePrev();
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
        if(COLORFUL) {
            stroke(this.clr);
            fill(this.clr);

        } else {
            stroke(0, 0, 255);
            fill(0, 0, 255);
        }
        strokeWeight(STROKE_WEIGHT);
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        pop();
    }//---------------------------------------------------------------------------------------------

    // Updates the previous position
    this.updatePrev = function() {
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
    }//---------------------------------------------------------------------------------------------

    this.update = function(angle) {
        angle *= this.speed;
        angle = radians(angle);

        let myCos = cos(angle);
        let mySin = sin(angle);
        let rotationRadius = this.distToCenter();

        this.pos.x = (width/2)  + (myCos * rotationRadius);
        this.pos.y = (height/2) + (mySin * rotationRadius);
    }//---------------------------------------------------------------------------------------------

    this.distToCenter = function() {
        return dist(this.pos.x, this.pos.y, width/2, height/2);
    }//---------------------------------------------------------------------------------------------
}//-------------------------------------------------------------------------------------------------