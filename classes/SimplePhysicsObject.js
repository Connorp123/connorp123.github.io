const smallerCanvasDimension = (p) => {
    return Math.min(p.width, p.height);
};

export const createSimplePhysicsObject = ({p}) => {
    return class SimplePhysicsObject {
        constructor({x, y, radius, beforeUpdate, displayFunction}) {

            // Physics
            this.pos    = p.createVector(x || p.random() * p.width, y || p.random() * p.height);
            this.acc    = p.createVector(0, 0);
            this.vel    = p.createVector(0, 0);
            this.maxVel = 1;
            this.maxAcc = 0.01;

            this.size = Math.floor(radius * 2) || Math.floor(smallerCanvasDimension(p) * (1 / 3));
            this.r    = radius || Math.ceil(this.size / 2);

            // Default draw
            this.rgb = [p.random() * 255, p.random() * 255, p.random() * 255];

            // Overrides
            this.beforeUpdate    = beforeUpdate;
            this.displayFunction = displayFunction;
        }

        update() {
            if (this.beforeUpdate) this.beforeUpdate(this);
            else {
                this.vel.add(this.acc);
                this.vel.limit(this.maxVel);
                this.pos.add(this.vel);

                this.acc.set();

                this.checkBounds();
            }
        }

        checkBounds() {
            if (this.pos.x < -this.r) this.pos.x = p.width + this.r;
            if (this.pos.y < -this.r) this.pos.y = p.height + this.r;
            if (this.pos.x > p.width + this.r) this.pos.x = -this.r;
            if (this.pos.y > p.height + this.r) this.pos.y = -this.r;
        }

        display() {
            if (this.displayFunction) this.displayFunction(this);
            else {
                p.fill(...this.rgb);
                p.stroke(0);
                p.circle(this.pos.x, this.pos.y, this.size);
            }
        }

        // ---

        follow(flow) {
            const desired = flow.lookup(this.pos);
            desired.mult(this.maxVel);
            const steer = desired.sub(this.vel).limit(this.maxAcc);
            this.addForce({vec: steer});
        }

        addForce({vec, x, y}) {
            if (!vec) {
                vec = p.createVector(x, y);
            }
            this.acc.add(vec);
        };

    };
};