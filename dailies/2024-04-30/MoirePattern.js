export const createMoirePattern = ({p}) => {
    return class MoirePattern {
        constructor(options) {
            // Default values for the pattern
            this.centerX     = options.centerX || p.width / 2;
            this.centerY     = options.centerY || p.height / 2;
            this.maxRadius   = options.maxRadius || p.width / 3;
            this.numLines    = options.numLines || 150;
            this.angleOffset = options.angleOffset || 0;
            this.lineWidth   = options.lineWidth || 1;
            this.lineColor   = options.lineColor || 255;
        }

        display() {
            p.push();
            p.translate(this.centerX, this.centerY);
            p.noFill();
            p.stroke(this.lineColor);
            p.strokeWeight(this.lineWidth);

            // Generate moire pattern by varying the number of lines and their positions
            for (let i = 0; i < this.numLines; i++) {
                let angle = p.map(i, 0, this.numLines, 0, p.TWO_PI) + this.angleOffset;
                let x     = this.maxRadius * p.cos(angle);
                let y     = this.maxRadius * p.sin(angle);
                p.line(0, 0, x, y);
            }
            p.pop();
        }

        update() {
            // Update properties like angleOffset to animate the pattern
            this.angleOffset += 0.01;
        }
    };
};


export const createMoirePatternRectangle = ({p}) => {
    return class MoirePattern {
        constructor(options) {
            this.width      = options.width || p.width;
            this.height     = options.height || p.height;
            this.lineCount  = options.lineCount || 50;
            this.frequency  = options.frequency || 0.1;
            this.amplitude  = options.amplitude || 20;
            this.phaseShift = options.phaseShift || 0;
            this.lineWidth  = options.lineWidth || 2;
            this.lineColor  = options.lineColor || 0;
        }

        display() {
            p.push();
            p.translate(p.width / 2 - this.width / 2, p.height / 2 - this.height / 2);
            p.noFill();
            p.stroke(this.lineColor);
            p.strokeWeight(this.lineWidth);

            // Generate moire pattern with sinusoidal lines
            for (let i = 0; i < this.lineCount; i++) {
                let y = p.map(i, 0, this.lineCount, 0, this.height);
                p.beginShape();
                for (let x = 0; x <= this.width; x++) {
                    let sineY = this.amplitude * p.sin(this.frequency * (x + this.phaseShift * i));
                    p.vertex(x, y + sineY);
                }
                p.endShape();
            }
            p.pop();
        }

        update() {
            // Increment phase shift to animate the pattern
            this.phaseShift += 0.05;
        }
    };
};

export const createMoirePatternNoise = ({p}) => {
    return class MoirePattern {
        constructor(options) {
            this.width      = options.width || p.width;
            this.height     = options.height || p.height;
            this.lineCount  = options.lineCount || 50;
            this.noiseScale = options.noiseScale || 0.06;  // Scale of noise to control the frequency of the waves
            this.amplitude  = options.amplitude || 25;  // Amplitude of the waves
            this.lineColor  = options.lineColor || 255;
        }

        display() {
            p.push();
            p.translate(p.width / 2 - this.width / 2, p.height / 2 - this.height / 2);
            p.noFill();
            p.stroke(this.lineColor);
            p.strokeWeight(2);

            for (let i = 0; i < this.lineCount; i++) {
                let y = p.map(i, 0, this.lineCount, 0, this.height);
                p.beginShape();
                for (let x = 0; x <= this.width; x += 10) {  // Increment x by 10 for performance and look
                    let noiseValue   = p.noise(x * this.noiseScale, y * this.noiseScale);
                    let displacement = p.map(noiseValue, 0, 1, -this.amplitude, this.amplitude);
                    p.vertex(x, y + displacement);
                }
                p.endShape();
            }
            p.pop();
        }
    };
};
