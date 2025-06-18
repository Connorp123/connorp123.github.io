import { createGalleryCanvas, setupFullscreenButton } from "../../helpers/gallery-page-helper.js";

export const tiles = (p, isMini = false) => {
    let redraw      = false;
    let NUM_SQUARES = 100;
    let ROW_LENGTH  = 10;
    let squares     = [];
    let current     = 0;
    let drawing     = true;
    let t           = 0;
    let tStep       = 0.005;
    let canvas;

    const recreateSquares = () => {
        // Create each square
        let w   = p.width / ROW_LENGTH;
        let x   = 0;
        let y   = 0;
        squares = [];
        current = 0;
        drawing = true;
        t       = 0;

        // Create each square
        for (let row = 0; row < ROW_LENGTH; row++) {
            for (let col = 0; col < ROW_LENGTH; col++) {
                squares.push(new Square(p, x, y, w));
                x += w;
            }
            x = 0;
            y += w;
        }
    };

    p.setup = () => {
        canvas = createGalleryCanvas(p);
        setupFullscreenButton(p, () => recreateSquares());
        p.frameRate(45);
        p.background(0);

        recreateSquares();
    };

    p.draw = () => {
        if (redraw) p.background(0);

        // At each frame, show the next square
        if (current >= NUM_SQUARES) {
            current = 0;
            drawing = !drawing;
        }

        if (drawing) {
            squares[current].draw(t);
        } else {
            squares[current].hide();
        }

        current++;
        t += tStep;
    };
};

class Square {

    constructor(p, x, y, w) {
        this.p = p;
        this.x = x;
        this.y = y;
        this.w = w;
    }

    draw = (t) => {
        this.color = [
            this.p.noise(t) * 255,
            this.p.noise(t + 1) * 255,
            this.p.noise(t + 2) * 255
        ];
        this.p.fill(this.color[0], this.color[1], this.color[2]);
        this.p.square(this.x, this.y, this.w);
    };

    hide = () => {
        this.p.fill(0);
        this.p.square(this.x, this.y, this.w);
    };
}
