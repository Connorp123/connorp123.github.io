/*
This would be a P5 sketch that kind of simulate traffic specifically how moving to the left lane if you’re faster looks so imagining like a bunch of you know vehicles like moving from right to left for example or let’s just say bottom to top so they move bottom to top And if a car notices the car in front of it going slower than it I would trigger a plane change and we don’t need to worry about collisions I think and they would all have a trail and then the lanes wouldn’t be it. They wouldn’t be perfect lane so they all have like a little bit of like natural variability within the lanes and then I think you would get kind of a nice looking visual With some like slightly squiggle or like you know during the light changes there’s squiggle lines
*/

const pal = ["#35a7ff", "#329f5b", "#ffe74c", "#ff5964"];

const LANE_SIZE = 25;
const CAR_SIZE = 20;
const CAR_SPACING = 75;
const OUT_OF_SIGHT_CUTOFF = 100;

const ACCELERATIONS = [1, 2, 3, 4];
const SPEED_LIMITS = [55, 65, 75, 85];

const WRAP_MARGIN = CAR_SIZE;
let loopSize;

let lanes = [];

const DEBUG = false;

export const sketch = (p) => {

    class Car {
        constructor({x, y, laneIndex, carIndex}) {
            this.pos = p.createVector(x, y);
            this.w = CAR_SIZE;
            this.h = CAR_SIZE;
            this.speedIndex = p.random([0, 1, 2, 3]);
            this.color = pal[this.speedIndex];

            this.speedLimit = SPEED_LIMITS[this.speedIndex] / 10;
            this.vel = p.createVector(0, 0);

            this.baseAcc = p.createVector(0, (ACCELERATIONS[this.speedIndex] * -1) / 10);
            this.acc = this.baseAcc.copy();

            this.accelerating = false;

            this.laneIndex = laneIndex;
            this.index = carIndex;
        }

        respawn() {
            this.pos.y = p.height + this.h;
            this.speedIndex = p.random([0, 1, 2, 3]);
            this.color = pal[this.speedIndex];

            this.speedLimit = SPEED_LIMITS[this.speedIndex] / 10;
            this.vel = p.createVector(0, 0);

            this.baseAcc = p.createVector(0, (ACCELERATIONS[this.speedIndex] * -1) / 10);
            this.acc = this.baseAcc.copy();

            this.accelerating = false;
        }

        update() {
            this.acc = this.baseAcc.copy();
            this.color = pal[this.speedIndex];

            const prevVel = this.vel.mag();

            if (this.checkCarInFront()) {
                this.acc.set(0, 0);
            }

            this.vel.add(this.acc);
            this.vel.limit(this.speedLimit);

            this.pos.add(this.vel);

            if (this.pos.y < -OUT_OF_SIGHT_CUTOFF) {
                this.respawn();
            }

            this.accelerating = prevVel !== this.vel.mag();
        }

        wrap() {
            if (this.pos.y < -this.h) {
                this.pos.y = p.height + this.h;
            }
        }

        drawTrail() {
            if (this.accelerating) {
                p.stroke(255);
                p.strokeWeight(1);

                p.line(-5, 0, -5, 15);
                p.line(0, 0, 0, this.h);
                p.line(5, 0, 5, 15);
            }
        }

        checkCarInFront() {
            const carInFrontIndex = (this.index + 1) % lanes[this.laneIndex].length;
            const carInFront = lanes[this.laneIndex][carInFrontIndex];

            const my = loopY(this.pos.y);
            const fr = loopY(carInFront.pos.y);
            const distance = (my - fr + loopSize) % loopSize;
            if (distance > 0 && distance <= 50) {
                this.acc.set(0, 0);
                this.vel.y = p.max(this.vel.y, carInFront.vel.y);
                return true;
            }

            return false;
        }

        display() {
            p.push();
            p.translate(this.pos.x, this.pos.y);

            this.drawTrail();

            p.stroke(0);
            p.strokeWeight(2);
            p.fill(this.color);
            p.circle(0, 0, this.w);

            if (DEBUG) {
                p.translate(0, CAR_SIZE);
                p.stroke(255);
                p.strokeWeight(2);
                p.fill(255);
                p.text(`${this.speedIndex}`, 0, 0);
            }

            p.pop();
        }
    }

    function loopY(y) {
        return (y + WRAP_MARGIN + loopSize) % loopSize;
    }

    p.setup = () => {
        p.createCanvas(432, 768);
        p.textSize(40);
        loopSize = p.height + WRAP_MARGIN * 2;

        p.frameRate(60);
        let laneIndex = 0;
        for (let x = LANE_SIZE / 2; x < p.width - LANE_SIZE / 2; x += LANE_SIZE) {
            lanes.push([]);
            for (let y = p.height - CAR_SIZE - CAR_SIZE; y > CAR_SIZE; y -= CAR_SPACING) {
                lanes[laneIndex].push(
                    new Car({x, y, laneIndex, carIndex: lanes[laneIndex].length})
                );
            }
            laneIndex++;
        }
    }

    p.draw = () => {
        p.background(0);

        drawLanes();

        lanes.forEach((lane) => {
            lane.forEach((car) => {
                car.update();
            });
        });

        lanes.forEach((lane) => {
            lane.sort((a, b) => loopY(b.pos.y) - loopY(a.pos.y));
            lane.forEach((car, i) => (car.index = i));
        });

        lanes.forEach((lane) => {
            lane.forEach((car) => {
                car.display();
            });
        });
    }

    function drawLanes() {
        p.stroke(255);
        p.strokeWeight(1);
        for (let x = 0; x < p.width; x += LANE_SIZE) {
            p.line(x, 0, x, p.height);
        }
    }
}
