import { getGifName } from "../../helpers/display-helpers-modules.js";

export const sketch = (p) => {

    // Basics
    let canvas;
    let pumpkin;


    p.preload = () => {
        pumpkin = p.loadImage("pumpkin.png");
    };


    p.setup = () => {
        // canvas = p.createCanvas(1000, 1000, p.SVG);
        canvas = p.createCanvas(1000, 1000);

    };

    p.draw = () => {
        p.background(100);
        p.image(pumpkin, 0, 0, p.width, p.height, 0, 0, pumpkin.width, pumpkin.height, p.CONTAIN);

        p.loadPixels();
        p.clear();

        // Read all the pixels and draw them back to the screen
        const avgDist = 20;
        p.stroke(0);
        p.strokeWeight(1);
        // p.fill(0);
        p.noFill();
        p.rectMode(p.CENTER);

        beginRecordSVG(p, "myOutput.svg");

        for (let y = 0; y < p.height; y += avgDist) {
            for (let x = 0; x < p.width; x += avgDist) {
                const pixelAboveCount = y * p.width;
                const i               = (pixelAboveCount + x) * 4;

                // Average the pixels and clear them after averaging
                let totalSat = 0;
                for (let j = 0; j < avgDist; j++) {
                    const k    = i + (j * 4);
                    const r    = p.pixels[k];
                    const g    = p.pixels[k + 1];
                    const b    = p.pixels[k + 2];
                    const alph = p.pixels[k + 3];

                    const sat = p.saturation(p.color(r, g, b, alph));
                    totalSat += sat;

                    p.pixels[k]     = 0;
                    p.pixels[k + 1] = 0;
                    p.pixels[k + 2] = 0;
                    p.pixels[k + 3] = 0;
                }
                const avgSat = totalSat / avgDist;
                const radius = p.int(p.map(avgSat, 0, 100, 1, avgDist));
                console.log(radius);
                const midX = x + p.int(avgDist / 2);
                const midY = y + p.int(avgDist / 2);
                if (avgSat > 0) {
                    p.circle(midX, midY, radius);
                    // p.square(midX, midY, radius);
                    // p.rect(midX, midY, radius, 0);
                    // p.line(midX, midY, midX + radius, midY);
                    // p.line(midX, y, midX + radius, y);

                }
                // const midX = x + int(avgDist / 2);
                // const midIndex = (y * width + midX) * 4;
                //
                // p.pixels[i]     = avgSat;
                // p.pixels[i + 1] = avgSat;
                // p.pixels[i + 2] = avgSat;
                // p.pixels[i + 3] = avgSat;
            }
        }

        console.log("hi");
        // p.updatePixels();
        endRecordSVG();

        p.noLoop();
    };

    p.keyPressed = () => {
        const key = p.key.toLowerCase();
        if (key === "s") p.save(`${getGifName()}.svg`);
    };
};
