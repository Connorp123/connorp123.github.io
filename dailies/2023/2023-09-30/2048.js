import Cell from "./Cell.js";

const CELL_SIZE    = 200;
const CELL_SPACING = 5;

export default class GameOf2048 {

    constructor(p) {
        this.p            = p;
        this.dimensions   = 4;
        this.cellValues   = [];
        this.cells        = [];
        this.pos          = [20, 20];
        this.size         = (this.dimensions * CELL_SIZE) + (this.dimensions + 1) * CELL_SPACING;
        this.score        = 0;
        this.colors       = [];
        this.isGameOver   = false;
        this.maxCellValue = 2048;
        this.init();
    }

    init() {
        this.initColors();
        this.initCellValues();
        this.newRandomCell();
    }

    initColors() {
        this.colors = [];
        for (let c = 255; c >= 0; c -= this.p.floor(255 / 12)) {
            this.colors.push(this.p.color(c));
        }
    }

    initCellValues() {
        this.cellValues = [];
        for (let y = 0; y < this.dimensions; y++) {
            this.cellValues.push([]);
            for (let x = 0; x < this.dimensions; x++) {
                this.cellValues[y].push(0);
                this.cells.push(new Cell({
                    p:      this.p,
                    colors: this.colors,
                    x:      CELL_SPACING + x * (CELL_SIZE + CELL_SPACING),
                    y:      CELL_SPACING + y * (CELL_SIZE + CELL_SPACING),
                    size:   CELL_SIZE,
                    power:  -1
                }));
            }
        }
    }

    display() {
        if (this.isGameOver) return false;

        // Display the grid
        const p = this.p;
        p.push();
        p.translate(...this.pos);
        p.fill(255, 255, 100);
        p.square(0, 0, this.size);


        // Display cells
        this.cells.forEach(cell => {
            cell.display();
        });

        p.pop();

    }


    isValidSpot(xCol, yRow) {
        return this.cellValues[yRow][xCol] === 0;
    }

    newRandomCell() {

        const xCol = this.p.floor(this.p.map(this.p.random(), 0, 1, 0, this.dimensions));
        const yRow = this.p.floor(this.p.map(this.p.random(), 0, 1, 0, this.dimensions));

        const newCell = new Cell({
            p:      this.p,
            colors: this.colors,
            x:      CELL_SPACING + xCol * (CELL_SIZE + CELL_SPACING),
            y:      CELL_SPACING + yRow * (CELL_SIZE + CELL_SPACING),
            size:   CELL_SIZE
        });

        if (this.isValidSpot(xCol, yRow)) {
            this.cellValues[yRow][xCol] = newCell.value();
            this.cells.push(newCell);
            this.value += newCell.value();
        }
    }

    moveUp() {
        let y = 0;
        let x = 0;

        while (y < this.dimensions) {

            while (x < this.dimensions) {
                if (y - 1 < 0) continue;

                // if x,y is empty, do nothing

                // if x,y has value and value below matches, merge, move others up 1

                // if x,y has value and value above is empty, move it up. Set x to start
                if (this.cellValues[y][x] && !this.cellValues[y - 1][x]) {
                    this.cellValues[y - 1][x] = this.cellValues[y][x];
                    this.cellValues[y][x]     = 0;
                }

            }

        }
    }
}