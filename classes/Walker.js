export const createWalker = ({p}) => {
    return class Walker {
        constructor(x, y, r) {
            this.pos    = p.createVector(x, y);
            this.vel    = p.createVector(20, 20);
            this.acc    = p.createVector(0, 0);
            this.r      = r;
            this.maxVel = 50;
            this.maxAcc = 3;
            this.R      = p.random(0, 255);
            this.G      = p.random(0, 255);
            this.B      = p.random(0, 255);
        }

        // Check if the ball is colliding with another object
        checkEdgeCollide() {
            // If the ball is hitting the left side of the screen
            if (this.pos.x < this.r) {
                // Places the ball at the border
                this.pos.x = this.r;
                // Makes the ball bounce off @ 80% velocity
                this.vel.x *= -0.8;
            }
            // If the ball is hitting the right side of the screen
            if (this.pos.x > p.width - this.r) {
                // Places the ball at the border
                this.pos.x = p.width - this.r;
                // Makes the ball bounce off @ 80% velocity
                this.vel.x *= -0.8;
            }
            // If the ball is hitting the top of the screen
            if (this.pos.y < this.r) {
                // Places the ball at the border
                this.pos.y = this.r;
                // Makes the ball bounce off @ 80% velocity
                this.vel.y *= -0.8;
            }
            // If the ball is hitting the bottom of the screen
            if (this.pos.y > p.height - this.r) {
                // Places the ball at the border
                this.pos.y = p.height - this.r;
                // Makes the ball bounce off @ 80% velocity
                this.vel.y *= -0.8;
            }
        };

        // Makes it walk randomly around the screen
        update() {

            // Gets the mouse position
            const mouse = p.createVector(p.mouseX, p.mouseY);

            // Points the acceleration towards the mouse
            this.acc = p5.Vector.sub(mouse, this.pos);

            // Controls the max size of the acceleration
            this.acc.limit(this.maxAcc);

            // Acceleration changes velocity
            this.vel.add(this.acc);
            this.vel.limit(this.maxVel);

            // Velocity changes position
            this.pos.add(this.vel);

            // Checks for collisions
            this.checkEdgeCollide();
        };

        // Draws the walker
        display() {
            p.fill(this.R, this.G, this.B);
            p.ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
        };
    };
};