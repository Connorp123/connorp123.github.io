const a3Dimension   = [297, 420];
const scale         = 3;
export const sketch = (p) => {
    let canvas;

    p.setup = () => {
        canvas = p.createCanvas(a3Dimension[0] * scale, a3Dimension[1] * scale, p.SVG);
        p.background(0);
        p.stroke(255);
        let s  = 5;
        let ns = 0.01;
        for (let y = 0; y < p.height; y += s) {
            p.beginShape();
            for (let x = 0; x < p.width; x += 1) {

                let nx = ns * x;
                let ny = ns * y;
                let c  = p.noise(nx, ny) * s;

                p.vertex(x, y + c);
            }
            p.endShape();
        }

    };

    p.keyPressed = () => {
        if (p.key === "S" || p.key === "s") p.save(`genuary-14.svg`);
    };
};