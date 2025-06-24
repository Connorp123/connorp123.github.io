import { createSimplePhysicsObject } from "./SimplePhysicsObject.js";

export const createBigCircle = ({p}) => {
    class BigCircle extends createSimplePhysicsObject({p}) {
        constructor(options) {
            // Call the parent constructor with the options object
            super(options);
            // Additional properties specific to BigCircle can be set here
        }

        update() {
            // You can call the parent method if you want to retain the base behavior
            // super.update();

            // Custom update logic for BigCircle
            // ...

            // You must remember to call checkBounds if you are not calling super.update()
            super.update();
            // this.checkBounds();
        }

        display() {
            // Custom display logic for BigCircle
            // For example, let's make the BigCircle twice as big:
            p.fill(...this.rgb);
            p.stroke(0);
            p.circle(this.pos.x, this.pos.y, this.size * 2); // Size is doubled
        }
    }

    return BigCircle;
};