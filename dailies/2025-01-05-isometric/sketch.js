/**
 * Genuary Day 5 - Isometric Art (No vanishing points).
 *
 * ChatGPT helped me a lot with the math since that part is still pretty confusing to me
 */
export const sketch = (p) => {
    const ISO_ANGLE   = Math.PI / 6; // 30 degrees for isometric projection
    const tileSize    = 50; // Size of each face edge
    const TILE_WIDTH  = tileSize * Math.cos(ISO_ANGLE); // Projected width
    const TILE_HEIGHT = tileSize * Math.sin(ISO_ANGLE); // Projected height

    let GRID_COLS, GRID_ROWS;

    const BG_COLOR_DARK_PURPLE  = p.color("#797A9E");
    const BG_COLOR_PURPLE       = p.color("#9893DA");
    const BG_COLOR_LIGHT_PURPLE = p.color("#BBBDF6");


    p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);
        p.background(220);
        p.noLoop();

        // Calculate rows and columns dynamically
        GRID_COLS = Math.ceil(p.width / TILE_WIDTH) + 1;
        GRID_ROWS = Math.ceil(p.height / TILE_HEIGHT) + 1;
    };

    const drawCube = (x, y) => {
        p.push();
        p.translate(x, y);

        const CENTER    = {x: 0, y: 0};
        const TOP_RIGHT = {x: TILE_WIDTH, y: -TILE_HEIGHT};
        const TOP_BACK  = {x: 0, y: -tileSize};
        const TOP_LEFT  = {x: -TILE_WIDTH, y: -TILE_HEIGHT};

        const BOTTOM_CENTER = {x: 0, y: tileSize};
        const BOTTOM_LEFT   = {x: -TILE_WIDTH, y: TILE_HEIGHT};
        const BOTTOM_RIGHT  = {x: TILE_WIDTH, y: TILE_HEIGHT};

        // TOP FACE
        p.fill(BG_COLOR_DARK_PURPLE);
        p.quad(
            CENTER.x, CENTER.y,
            TOP_RIGHT.x, TOP_RIGHT.y,
            TOP_BACK.x, TOP_BACK.y,
            TOP_LEFT.x, TOP_LEFT.y
        );

        // LEFT FACE
        p.fill(BG_COLOR_PURPLE);
        p.quad(
            CENTER.x, CENTER.y,
            TOP_LEFT.x, TOP_LEFT.y,
            BOTTOM_LEFT.x, BOTTOM_LEFT.y,
            BOTTOM_CENTER.x, BOTTOM_CENTER.y
        );

        // RIGHT FACE
        p.fill(BG_COLOR_LIGHT_PURPLE);
        p.quad(
            CENTER.x, CENTER.y,
            TOP_RIGHT.x, TOP_RIGHT.y,
            BOTTOM_RIGHT.x, BOTTOM_RIGHT.y,
            BOTTOM_CENTER.x, BOTTOM_CENTER.y
        );

        p.pop();
    };

    p.draw = () => {
        p.background(0);
        p.translate(p.width / 2, p.height / 4);

        // Loop through rows and columns
        for (let i = -GRID_ROWS; i < GRID_ROWS; i++) {
            for (let j = -GRID_COLS; j < GRID_COLS; j++) {
                let x = (i - j) * TILE_WIDTH;
                let y = (i + j) * TILE_HEIGHT;
                let r = p.random();
                if (r < 0.55) {
                    drawCube(x, y);
                }
            }
        }
    };

    p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
        GRID_COLS = Math.ceil(p.width / TILE_WIDTH) + 1;
        GRID_ROWS = Math.ceil(p.height / TILE_HEIGHT) + 1;
        p.redraw();
    };

    p.mousePressed = () => {
        p.redraw();
    };
};

