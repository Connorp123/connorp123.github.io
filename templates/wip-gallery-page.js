export const wipGalleryPage = (p) => {
    let canvas;

    p.setup = () => {
        canvas = p.createCanvas(500, 500);
        p.fill(255);
    };

    p.draw = () => {
        p.background(0);
        p.circle(p.mouseX, p.mouseY, 30);
    };
};