import GameOf2048 from "./2048.js";

export const sketch = (p) => {


    let canvas;
    let state = {
        debug: false
    };
    let game;


    p.setup = () => {
        canvas = createInstanceCanvas(p);
        game   = new GameOf2048(p);
    };


    p.draw = () => {
        // redrawBackground(p);

        game.display();
    };

    p.keyPressed = () => {
        if (p.keyCode === p.UP_ARROW) {
            if (game) game.moveUp();
        }
    }
};
