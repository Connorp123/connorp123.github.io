/***
 *
 *     ad88888ba   88      a8P   88888888888  888888888888  ,ad8888ba,   88        88
 *    d8"     "8b  88    ,88'    88                88      d8"'    `"8b  88        88
 *    Y8,          88  ,88"      88                88     d8'            88        88
 *    `Y8aaaaa,    88,d88'       88aaaaa           88     88             88aaaaaaaa88
 *      `"""""8b,  8888"88,      88"""""           88     88             88""""""""88
 *            `8b  88P   Y8b     88                88     Y8,            88        88
 *    Y8a     a8P  88     "88,   88                88      Y8a.    .a8P  88        88
 *     "Y88888P"   88       Y8b  88888888888       88       `"Y8888Y"'   88        88
 *
 *
 */
export const dfs = (p) => {
    let canvas;
    let originalMaze;
    let displayMaze;
    let dfs;
    let FRAME_RATE = 1;

    p.setup = () => {
        canvas = createInstanceCanvas(p);
        p.frameRate(FRAME_RATE);
        init();
        p.noLoop();
    };

    p.draw = () => {
        dfs.display();

        if (dfs.nextMove()) {
            redrawBackground(p);
            dfs.display();
        } else {
            init();
        }
    };

    p.mousePressed = () => {
        p.redraw();
    }

    const init = () => {
        originalMaze = new Maze({
            _p: p,
        })

        displayMaze = new Maze({
            _p:    p,
            _x:    100,
            _y:    100,
            _size: 20,
        })
        displayMaze.randomizePacman();

        dfs = new DFS({
            _p:    p,
            _maze: displayMaze,
        })
        dfs.init();
        dfs.display();
    }
};

/**
 * DFS(start_node)
 *     stack = [start_node]
 *     while stack is not empty:
 *         current_node = stack.pop()
 *         if current_node is not visited:
 *             mark current_node as visited
 *             for each neighbor in current_node's neighbors:
 *                 stack.push(neighbor)
 *
 * source: ChatGPT
 */
class DFS {

    constructor({_p, _maze}) {
        this.p       = _p;
        this.maze    = _maze;
        this.x       = 100;
        this.y       = 400;
        this.running = false;
        this.storage = [[1, 1]]; // Stack!
        this.current = [];
        this.visited = [];
    }

    init() {
        // stack = [start_node]
        let start = this.maze.getPacman();
        if (!start) {
            alert('Pacman not found in the maze!');
        }
        this.storage = [start];
    }

    isVisited(pos) {
        return this.visited.find(e => e.toString() === pos.toString()) !== undefined;
    }


    // 0 - Create maze, dfs
    // 1 - Show maze as-is
    // 2 - Move pacman, display new location, set last location as visited, display last location as visited

    nextMove() {

        // While stack is not empty
        if (this.storage.length === 0) {
            return false;
        }

        // If current is not null, mark it as visited before we move to the next location
        if (this.current.length > 0) {
            this.maze.markVisited(this.current[0], this.current[1]);
        }

        // current_node = stack.pop()
        this.current = this.storage.pop();

        // if current_node is goal
        if (this.maze.isDot(this.current[0], this.current[1])) {
            return false;
        }

        // if current_node is not visited
        if (!this.isVisited(this.current)) {
            this.maze.markVisited(this.current[0], this.current[1]);
            this.maze.movePacman(this.current[0], this.current[1]);

            // Mark current_node as visited
            this.visited.push(this.current);

            // For each neighbor is current_node's neighbors
            let neighbors = this.maze.getNeighbors(this.current[0], this.current[1]);
            neighbors.forEach(neighbor => {

                // stack.push(neighbor)
                if (!this.isVisited(neighbor)) {
                    this.storage.push(neighbor);
                }
            })
        } else {
            console.log('Already visited', this.current);
        }

        return true;
    }

    display() {

        // Display maze
        this.maze.display();

        this.p.stroke(255);
        this.p.fill(255);
        this.p.textSize(18);
        this.p.textFont('Courier New');
        this.p.textWrap(this.p.CHAR);

        // Display movement order
        this.p.text(`Movement order: right, left, down, up`, this.x, this.y, 800);

        // Display current
        this.p.text(`Current: [${this.current.toString()}]`, this.x, this.y + 40, 800);

        // Display storage
        this.p.text(`Storage: ${JSON.stringify(this.storage)}`, this.x, this.y + 80, 800);

        // Display visited
        this.p.text(`Visited: [${JSON.stringify(this.visited)}]`, this.x, this.y + 160, 800);
    }
}

class Maze {
    constructor({_p, _size, _x, _y}) {
        this.p = _p;

        this.cellSize    = _size || 20;
        this.cellPadding = 5;
        this.x           = _x || 10;
        this.y           = _y || 10;

        this.wall    = '%';
        this.pacman  = 'P';
        this.dot     = '.';
        this.path    = ' ';
        this.visited = 'X';

        this.wallColor    = _p.color(255);
        this.pacmanColor  = _p.color(255, 255, 0);
        this.dotColor     = _p.color(0, 255, 0);
        this.pathColor    = _p.color(0);
        this.visitedColor = _p.color(150);

        this.grid = [
            ['%', '%', '%', '%', '%', '%', '%', '%', '%', '%', '%', '%', '%', '%', '%', '%', '%', '%', '%', '%', '%', '%'],
            ['%', ' ', '%', '%', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '%', ' ', '%', ' ', ' ', ' ', ' ', ' ', ' ', '%'],
            ['%', ' ', ' ', ' ', ' ', '%', '%', '%', '%', '%', '%', ' ', '%', ' ', '%', '%', '%', '%', '%', '%', ' ', '%'],
            ['%', '%', '%', '%', '%', '%', ' ', ' ', ' ', ' ', ' ', 'P', ' ', ' ', '%', ' ', ' ', ' ', ' ', ' ', ' ', '%'],
            ['%', ' ', ' ', ' ', ' ', '%', ' ', '%', '%', '%', '%', '%', '%', ' ', '%', '%', ' ', '%', '%', '%', '%', '%'],
            ['%', ' ', '%', '%', '%', '%', ' ', '%', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '%', ' ', ' ', ' ', '%'],
            ['%', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '%', '%', '%', ' ', '%', '%', '%', ' ', ' ', ' ', '%', ' ', '%'],
            ['%', '%', '%', '%', '%', '%', '%', '%', '%', '%', ' ', ' ', ' ', ' ', '%', '%', '%', '%', '%', '%', ' ', '%'],
            ['%', '.', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '%', '%', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '%'],
            ['%', '%', '%', '%', '%', '%', '%', '%', '%', '%', '%', '%', '%', '%', '%', '%', '%', '%', '%', '%', '%', '%']
        ]
    }

    getPacman() {
        return this.findFirstVal(this.pacman);
    }

    getNeighbors(row, col) {
        let neighbors = [];
        let r;
        let c;

        // Check up
        r = row - 1;
        c = col;
        if (this.isValidPos(r, c)) {
            neighbors.push([r, c])
        }

        // Check down
        r = row + 1;
        c = col;
        if (this.isValidPos(r, c)) {
            neighbors.push([r, c])
        }

        // Check left
        r = row;
        c = col - 1;
        if (this.isValidPos(r, c)) {
            neighbors.push([r, c])
        }

        // Check right
        r = row;
        c = col + 1;
        if (this.isValidPos(r, c)) {
            neighbors.push([r, c])
        }

        return neighbors;
    }

    findFirstVal(val) {
        for (let row = 0; row < this.grid.length; row++) {
            for (let col = 0; col < this.grid[row].length; col++) {
                if (this.grid[row][col] === val) {
                    return [row, col];
                }
            }
        }
        return null;
    }

    isValidPos(row, col) {
        return row >= 0 && col >= 0 && row < this.grid.length && col < this.grid[row].length && !this.isWall(row, col);
    }

    isPacman(row, col) {
        return this.grid[row][col] === this.pacman;
    }

    isWall(row, col) {
        return this.grid[row][col] === this.wall;
    }

    isPath(row, col) {
        return this.grid[row][col] === this.path;
    }

    isDot(row, col) {
        return this.grid[row][col] === this.dot;
    }

    isVisited(row, col) {
        return this.grid[row][col] === this.visited;
    }

    setCellFill(row, col) {
        if (this.isWall(row, col)) {
            this.p.fill(this.wallColor);
        } else if (this.isDot(row, col)) {
            this.p.fill(this.dotColor);
        } else if (this.isPacman(row, col)) {
            this.p.fill(this.pacmanColor);
        } else if (this.isPath(row, col)) {
            this.p.fill(this.pathColor);
        } else if (this.isVisited(row, col)) {
            this.p.fill(this.visitedColor);
        }
    }

    display() {
        let x = this.x;
        let y = this.y;
        this.p.stroke(255);
        this.p.strokeWeight(1);

        for (let row = 0; row < this.grid.length; row++) {
            for (let col = 0; col < this.grid[row].length; col++) {

                // Draw cell
                this.setCellFill(row, col);
                this.p.square(x, y, this.cellSize);

                x += this.cellSize + this.cellPadding;
            }
            x = this.x;
            y += this.cellSize + this.cellPadding;
        }
    }

    markPath(row, col) {
        this.grid[row][col] = this.path;
    }

    markVisited(row, col) {
        this.grid[row][col] = this.visited;
    }

    movePacman(row, col) {
        this.grid[row][col] = this.pacman;
    }

    randomizePacman() {

        // Delete old pacman
        let pac = this.getPacman();
        this.markPath(...pac);

        // Find new location
        let randomX = Math.round(this.p.random(0, this.grid.length));
        let randomY = Math.round(this.p.random(0, this.grid.length));
        while (!this.isValidPos(randomX, randomY)) {
            randomX = Math.round(this.p.random(0, this.grid.length));
            randomY = Math.round(this.p.random(0, this.grid[0].length));
        }

        // Save pacman in the grid
        this.movePacman(randomX, randomY);
    }
}

/***
 *
 *    88        88    ,ad8888ba,    88b           d88  88888888888
 *    88        88   d8"'    `"8b   888b         d888  88
 *    88        88  d8'        `8b  88`8b       d8'88  88
 *    88aaaaaaaa88  88          88  88 `8b     d8' 88  88aaaaa
 *    88""""""""88  88          88  88  `8b   d8'  88  88"""""
 *    88        88  Y8,        ,8P  88   `8b d8'   88  88
 *    88        88   Y8a.    .a8P   88    `888'    88  88
 *    88        88    `"Y8888Y"'    88     `8'     88  88888888888
 *
 *
 */
export const home_dfs = (p) => {
    let canvas;
    let originalMaze;
    let displayMaze;
    let dfs;
    let FRAME_RATE = 1;

    p.setup = () => {
        canvas = createInstanceCanvas(p);
        p.frameRate(FRAME_RATE);
        originalMaze = new Maze({
            _p: p,
        })

        displayMaze = new Maze({
            _p:    p,
            _size: 10,
        })

        dfs = new DFS({
            _p:    p,
            _maze: displayMaze,
        })
        dfs.init();
    };

    p.draw = () => {
        dfs.display();

        if (dfs.nextMove()) {
            redrawBackground(p);
            dfs.display();
        } else {
            p.noLoop();
        }
    };
};