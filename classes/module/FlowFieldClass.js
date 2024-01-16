export const createFlowField = ({p}) => {
    return class FlowField {

        constructor(r) {
            // Determines the number of columns
            this.resolution = r; // The size of each "cell"
            this.cols       = Math.floor(p.width / this.resolution);
            this.rows       = Math.floor(p.height / this.resolution);
            this.scale      = 25;

            // Creates the FlowField
            this.field = this.make2Darray(this.cols);
            this.init();
        }


        // Makes a 2d array
        make2Darray(n) {
            let array = [];
            for (let i = 0; i < n; i++) {
                array[i] = [];
            }
            return array;
        };

        init() {
            // Reseed the noise so that we get a new flow every time
            p.noiseSeed(Math.floor(p.random(10000)));
            let xoff = 0;
            for (let i = 0; i < this.cols; i++) {
                let yoff = 0;
                for (let j = 0; j < this.rows; j++) {

                    // let theta = PI / 2;
                    let theta = p.map(p.noise(xoff, yoff), 0, 1, 0, p.TWO_PI);
                    // let theta = map(sin(xoff)+cos(yoff), -2, 2, 0, TWO_PI);

                    // Polar to cartesian coordinate transformation to get x and y components of the vector
                    this.field[i][j] = p.createVector(p.cos(theta), p.sin(theta));

                    // Increment yoff
                    yoff += 0.1;
                }
                // Increment xoff
                xoff += 0.1;
            }
        };

        // Draw every vector
        display() {
            p.stroke(255);
            p.strokeWeight(1);
            for (let i = 0; i < this.cols; i++) {
                for (let j = 0; j < this.rows; j++) {
                    this.drawVector(this.field[i][j], i * this.resolution, j * this.resolution);
                }
            }
        };

        lookup(lookup) {
            const column = Math.floor(p.constrain(lookup.x / this.resolution, 0, this.cols - 1));
            const row    = Math.floor(p.constrain(lookup.y / this.resolution, 0, this.rows - 1));
            return this.field[column][row].copy();
        };

        drawVector(v, x, y) {
            // Renders a vector object 'v' as an arrow and a location 'x,y'drawVector(v, x, y, scayl) {

            // Start the transformation
            p.push();

            // Translate to location to render vector
            p.translate(x, y);

            // Call vector heading function to get direction (note that pointing to the right is a heading of 0) and rotate
            p.rotate(v.heading());

            // Calculate length of vector & scale it to be bigger or smaller if necessary
            const len = v.mag() * this.scale;

            // Draw three lines to make an arrow (draw pointing up since we've rotate to the proper direction)
            p.line(0, 0, len, 0);

            p.pop();
        }
    };
};