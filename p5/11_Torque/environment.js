
// Creates a Physics environment
function Environment() {

    console.log('Creating environment');

    this.hasGravity = false;   // True if there should be downward acceleration
    this.pixelsPerMeter = 100;         // Ratio of pixels to meters
    this.friction = 0;
    this.gravity = createVector(0, 9.8/this.pixelsPerMeter); // Sets the gravity

    // Initializes the environment
    this.init = function() {


        //

    }


    // Applies gravity to an object
    this.applyGravity = function (object) {
        if(this.hasGravity ) {
            object.applyForce(this.gravity);
        }
    }

    // Apply the boundaries of the environemnt
    this.applyBoundaries = function (object) {
        // If the object is hitting the left wall
        if (object.pos.x < object.r) {
            object.pos.x = 0;
            object.pos.x = object.r;
            object.vel.x *= -1;
        } 
        // If the object is hitting the right wall
        if (object.pos.x > width-object.r) {
            object.pos.x = width-object.r;
            // object.pos.x = width-object.r;
            object.vel.x *= -8;
        } 
        // If the object is hitting the ceiling
        if (object.pos.y < object.r) {
            object.pos.y = object.r;
            object.vel.y *= -8;
        } 
        // If the object is hitting/touching the floor
        if (object.pos.y > height-object.r) {
            object.pos.y = height-object.r;
            object.vel.y *= 0;
            if(object.vel.x < .001) object.vel.x = 0;
            object.vel.x *= 1;
        }
    }
}