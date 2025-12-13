/// <reference types="p5" />

/*
Create a looping animation where dozens of triangles orbit a center point, each rotating at slightly different speeds. Their edges fade in and out, forming ever-shifting kaleidoscopic patterns that pulse rhythmically with a gentle easing effect.
*/
p5.disableFriendlyErrors = true; // hush

const mmWidth      = 278;
const mmHeight     = 420;
const scale        = 4;
const baseFileName = "p5svg";

const spacing = 140;
const size    = 120;

const getTime = () => {
    const date  = new Date();
    const year  = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day   = date.getDate().toString().padStart(2, "0");
    const hour  = date.getHours().toString().padStart(2, "0");
    const min   = date.getMinutes().toString().padStart(2, "0");
    const sec   = date.getSeconds().toString().padStart(2, "0");
    return `${year}-${month}-${day}-${hour}-${min}-${sec}`;
};

const SHAPES = {
    triangle: 0,
    square: 2
}

const pal = ["#ff5964", "#ffe74c", "#329f5b", "#35a7ff", "#ffffff"];


class Rotator {
    constructor(radius, ringNumber, shape) {
        this.startOrbit  = random(TWO_PI);
        this.tOrbit      = this.startOrbit;
        this.tRotate     = 0;
        this.color       = 255;
        this.orbitSpeed  = random(-0.09, -0.06) + (ringNumber * 0.01);
        this.rotateSpeed = random(0.06, 0.8) - (ringNumber * 0.01);
        this.size        = size;
        this.t = 0;
        // this.size        = randomGaussian(80, 20);
        // this.radius      = randomGaussian(radius, 100);
        this.radius = radius;
        this.dead   = false;
        this.shape = shape;

        // 200	-0.054466628037602265	0.06603461093795668
        //200	-0.058164350533786394	0.07032405758620298
        // 200	-0.05503713824593187	0.06435558214252357

        console.log(`radius\torbitSpeed\trotateSpeed\n${this.radius}\t${this.orbitSpeed}\t${this.rotateSpeed}`);
    }

    update() {
        if (this.dead) return;

        this.t += 0.1;
        this.size += map(noise(this.t), 0, 1, -1, 1 )

        this.tOrbit += this.orbitSpeed;
        this.tRotate += this.rotateSpeed;
        if (abs(this.tOrbit - this.startOrbit - this.orbitSpeed) > TWO_PI) {
            this.dead = true;
        }
    }

    display() {
        if (this.dead) return;

        push();

        const x = width / 2 + cos(this.tOrbit) * this.radius;
        const y = height / 2 + sin(this.tOrbit) * this.radius;

        translate(x, y);
        rotate(this.tRotate);

        const l = this.size / 1.5;
        const h = (sqrt(3) / 2) * l;

        stroke(color(pal[this.shape]));
        strokeWeight(1);
        noFill();
        // fill(this.color);

        if(this.shape === SHAPES.triangle){
            triangle(0, -h / 2, -l / 2, h / 2, l / 2, h / 2);

        } else if (this.shape === SHAPES.square){
            square(0, 0, this.size);
        }


        pop();
    }
}


const shapes = [];

function setup() {
    createCanvas(mmWidth * scale, mmHeight * scale);
    frameRate(60);
    textAlign(CENTER, CENTER);
    textSize(48);
    background(0);
    rectMode(CENTER);

    let i = 1;
    for (let r = 200; r < 600; r += spacing) {
        shapes.push(new Rotator(r + (spacing / 2), i, SHAPES.triangle));
        shapes.push(new Rotator(r, i, SHAPES.square));
        i++;
    }

    beginRecordSVG(this, `${baseFileName}-${getTime()}.svg`);

}

function draw() {

    shapes.forEach(shapey => {
        shapey.update();
        shapey.display();
    });

    // stroke(255);
    // strokeWeight(1);
    // line(width / 2, 0, width / 2, height);
    // line(0, height / 2, width, height / 2);

}

function keyPressed() {
    if (key === "S" || key === "s") {
        endRecordSVG();
    }
    if (key === "B" || key === "b") {
        noLoop();
    }
}
