import { createGui } from "../../helpers/gui-helpers.js";
import { WordManager } from "../../classes/module/WordManager.js";

export const word_vomit = (p) => {
    let state = {
        frameRate: 1,
        maxVelX:   2,
        maxVelY:   5,
        maxRotVel: 0.01
    };

    let gui = createGui({
        state: state,
        name:  "daily"
    });

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
    const regexSplitter = /( |\\n|\n|[!-(-:-@[-`{-~&[^']])+/;

    p.setup = () => {
        canvas      = createSquareCanvas(p);
        wordManager = new WordManager({
            p:            p,
            state:        state,
            words:        text.split(regexSplitter),
            canvasHeight: p.height
        });
    };

    p.draw = () => {
        redrawBackground(p);
        state.frameRate = p.frameRate();

        if (p.mouseIsPressed && p.frameCount % 20 === 0) {
            wordManager.newWord({x: p.mouseX, y: p.mouseY});
        }

        wordManager.update();
        wordManager.draw();
    };

    p.keyPressed = () => {
        if (p.key === "S" || p.key === "s") p.save(`${getGifName()}.svg`);
    };
};

export const home_word_vomit = (p) => {
    let state = {
        frameRate: 1,
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
    const regexSplitter = /( |\\n|\n|[!-(-:-@[-`{-~&[^']])+/;

    p.setup = () => {
        canvas      = createInstanceCanvas(p);
        wordManager = new WordManager({
            p:            p,
            state:        state,
            words:        text.split(regexSplitter),
            canvasHeight: p.height
        });
    };

    p.draw = () => {
        redrawBackground(p);

        if (p.frameCount % 10 === 0) {
            wordManager.newWord({x: p.width / 2, y: p.height / 2});
        }

        wordManager.update();
        wordManager.draw();
    };
};