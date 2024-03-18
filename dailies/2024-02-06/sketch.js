import { getGifName } from "../../helpers/modules/display-helpers-modules.js";

const createSandTank = ({p}) => {
    return class SandTank {
        constructor({resolution = 10}) {
            this.resolution = resolution;
            this.width      = p.floor(p.width / resolution);
            this.height     = p.floor(p.height / resolution);
            this.grid       = this.createNewGrid();
            this.nextGrid   = this.createNewGrid();
        }

        createSand(x, y) {
            let {col, row} = this.canvasToGrid(x, y);
            let width      = 2;
            let height     = 2;

            for (let rowOff = -height; rowOff <= height; rowOff++) {
                for (let colOff = -width; colOff <= width; colOff++) {
                    if (p.random([0, 0, 1])) {
                        this.grid[row + rowOff][col + colOff] = 1;
                    }
                }
            }
        }

        draw() {
            for (let row = 0; row < this.height; row++) {
                for (let col = 0; col < this.width; col++) {
                    if (this.grid[row][col]) {
                        p.fill(255, 255, 255);
                        p.circle(col * this.resolution, row * this.resolution, this.resolution);
                    } else {
                        p.fill(0, 0, 0);
                        p.square(col * this.resolution, row * this.resolution, this.resolution);
                    }

                }
            }
        }

        canvasToGrid(x, y) {
            return {
                col: p.floor(x / this.resolution),
                row: p.floor(y / this.resolution)
            };
        }

        createNewGrid() {
            let grid = [];
            for (let i = 0; i < this.height; i++) {
                grid.push([]);
                for (let j = 0; j < this.width; j++) {
                    grid[i].push(0);
                }
            }
            return grid;
        }

        stay(grid, currentRow, currentCol) {
            grid[currentRow][currentCol] = 1;
        }

        moveDown(grid, currentRow, currentCol) {
            grid[currentRow + 1][currentCol] = 1;
            grid[currentRow][currentCol]     = 0;
        }


        update() {
            for (let row = 0; row < this.height; row++) {
                for (let col = 0; col < this.width; col++) {
                    const isBottom = row + 1 >= this.height;

                    if (this.grid[row][col]) {
                        if (!isBottom && !this.grid[row + 1][col]) {
                            this.moveDown(this.nextGrid, row, col);
                        } else {
                            this.stay(this.nextGrid, row, col);
                        }

                    }
                }
            }

            this.grid     = this.nextGrid;
            this.nextGrid = this.createNewGrid();
        }
    };
};

export const sketch = (p) => {

    // Basics
    let canvas;
    let state = {
        debug:            false,
        redrawBackground: true,
        frameRate:        p.frameRate()
    };
    // let gui   = createGui({state});

    // Class creators
    const SandTank = createSandTank({p});

    // Global vars
    let grid;


    p.setup = () => {
        canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        p.frameRate(60);
        grid = new SandTank({resolution: 10});
    };

    p.draw = () => {
        grid.draw();
        grid.update();
        state.frameRate = p.floor(p.frameRate());
    };

    p.mouseDragged = () => {
        grid.createSand(p.mouseX, p.mouseY);
    };

    p.keyPressed = () => {
        const key = p.key.toLowerCase();
        if (key === "s") p.save(`${getGifName()}.png`);
    };
};