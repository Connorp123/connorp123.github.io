const smallerCanvasDimension = (p) => {
    return Math.min(p.width, p.height);
};

/**
 * pos:             PVector
 * acc:             PVector
 * vel:             PVector
 * maxVel:          number (1)
 * maxAcc:          number (0.01)
 * size:            number (2x radius)
 * r:               number (radius)
 * rgb:             Array [number, number, number]
 * customPhysics:   (this) => {}
 * displayFunction: (this) => {}
 */
export const createSimplePhysicsObject = ({p}) => {

    return class SimplePhysicsObject {

        /**
         *
         * @param x
         * @param y
         * @param radius
         * @param customPhysics
         * @param displayFunction -- accepts this, should set fill, stroke, etc.
         * @param startAcc
         * @param startVel
         * @param maxVel
         * @param maxAcc
         * @param color -- Array [number, number, number]
         */
        constructor({
                        x,
                        y,
                        radius,
                        customPhysics,
                        displayFunction,
                        startAcc,
                        startVel,
                        maxVel,
                        maxAcc,
                        color
                    }) {

            // Physics
            this.pos    = p.createVector(x || p.random() * p.width, y || p.random() * p.height);
            this.acc    = startAcc || p.createVector(0, 0);
            this.vel    = startVel || p.createVector(0, 0);
            this.maxVel = maxVel || 1;
            this.maxAcc = maxAcc || 0.01;

            this.size = Math.floor(radius * 2) || Math.floor(smallerCanvasDimension(p) * (1 / 3));
            this.r    = radius || Math.ceil(this.size / 2);

            // Default draw
            this.rgb = color || [p.random() * 255, p.random() * 255, p.random() * 255];

            // Overrides
            this.beforeUpdate    = customPhysics;
            this.displayFunction = displayFunction;
        }

        update() {
            if (this.beforeUpdate) this.beforeUpdate(this);
            this.vel.add(this.acc);
            this.vel.limit(this.maxVel);
            this.pos.add(this.vel);

            this.acc.set();

            this.checkBounds();
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
                p.noStroke();
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

        attractTo({destinationVec, destinationX, destinationY}) {
            if (!destinationVec) {
                destinationVec = p.createVector(destinationX, destinationY);
            }

            // Get dif between this pos and destination
            const diff = destinationVec.sub(this.pos);
            this.addForce({vec: diff});
        }

        addForce({vec, x, y}) {
            if (!vec) {
                vec = p.createVector(x, y);
            }
            this.acc.add(vec).limit(this.maxAcc);
        };

    };
};