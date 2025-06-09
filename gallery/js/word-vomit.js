import { WordManager } from "../../classes/module/WordManager.js";
import { createGalleryCanvas } from "../../helpers/gallery-page-helper.js";

export const word_vomit = (p) => {
    let state = {
        maxVelX:   2,
        maxVelY:   5,
        maxRotVel: 0.01
    };

    let canvas;
    let text = "It's a beautiful day in this neighborhood,\n" +
        "A beautiful day for a neighbor,\n" +
        "Would you be mine?\n" +
        "Could you be mine?\n" +
        "It's a neighborly day in this beautywood,\n" +
        "A neighborly day for a beauty,\n" +
        "Would you be mine?\n" +
        "Could you be mine?\n" +
        "I have always wanted to have a neighbor just like you,\n" +
        "I've always wanted to live in a neighborhood with you.\n" +
        "So let's make the most of this beautiful day,\n" +
        "Since we're together, we might as well say,\n" +
        "Would you be mine?\n" +
        "Could you be mine?\n" +
        "Won't you be my neighbor?\n" +
        "Won't you please,\n" +
        "Won't you please,\n" +
        "Please won't you be my neighbor?\n";

    let wordManager;
    const words = text.match(/[a-zA-Z]+(?:'[a-zA-Z]+)?/g);

    p.setup = () => {
        canvas      = createGalleryCanvas(p);
        wordManager = new WordManager({
            p:            p,
            state:        state,
            words:        words,
            canvasHeight: p.height
        });
    };

    p.draw = () => {
        p.background(0);
        wordManager.update();
        wordManager.draw();
    };

    p.mouseClicked = () => {
        wordManager.newWord({x: p.mouseX, y: p.mouseY});
    };

    p.keyPressed = () => {
        if (p.key === "S" || p.key === "s") p.save(`${getGifName()}.svg`);
    };
};
