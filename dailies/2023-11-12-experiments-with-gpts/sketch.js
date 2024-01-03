import { createSimplePhysicsObject } from "../../classes/SimplePhysicsObject.js";

export const sketch = (p) => {
    let canvas;
    let circles               = [];
    const numberOfCircles     = 10;
    const SimplePhysicsObject = createSimplePhysicsObject({p});

    p.setup = () => {
        canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        for (let i = 0; i < numberOfCircles; i++) {
            circles.push(new SimplePhysicsObject({
                x:            p.random(p.width),
                y:            p.random(p.height),
                radius:       p.random(10, 30),
                beforeUpdate: (obj) => followMouseWithImperfection(obj, p)
            }));
        }
    };

    p.draw = () => {
        p.background(0);
        circles.forEach(circle => {
            circle.update();
            circle.display();
        });
    };

    function followMouseWithImperfection(obj, p) {
        const mouse = p.createVector(p.mouseX, p.mouseY);
        const dir   = p5.Vector.sub(mouse, obj.pos);
        dir.normalize();
        dir.mult(0.5); // Adjust speed
        dir.add(p.createVector(p.random(-1, 1), p.random(-1, 1))); // Imperfection
        obj.addForce({vec: dir});
    }

    // Optional: Add more circles on mouse click
    p.mouseClicked = () => {
        circles.push(new SimplePhysicsObject({
            x:            p.mouseX,
            y:            p.mouseY,
            radius:       p.random(10, 30),
            beforeUpdate: (obj) => followMouseWithImperfection(obj, p)
        }));
    };
};
