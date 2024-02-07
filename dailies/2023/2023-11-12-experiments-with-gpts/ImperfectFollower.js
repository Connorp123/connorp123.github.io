// File: dailies/YYYY-MM-DD/ImperfectFollower.js
import { createSimplePhysicsObject } from "../../../classes/module/SimplePhysicsObject.js";

export const createImperfectFollower = ({p}) => {
    return class ImperfectFollower extends createSimplePhysicsObject({p}) {
        constructor(options) {
            super(options);
            // Additional properties for imperfect following
            this.followingDelay = options.followingDelay || 5;
        }

        update() {
            // Create a vector towards the mouse with some delay
            let mouse = p.createVector(p.mouseX, p.mouseY);
            let dir   = p5.Vector.sub(mouse, this.pos).div(this.followingDelay);
            this.addForce({vec: dir});

            // Call the original update method
            super.update();
        }
    };
};
