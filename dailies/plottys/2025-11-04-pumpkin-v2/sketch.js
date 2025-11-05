/// <reference types="p5" />

/*
Create a looping animation where dozens of triangles orbit a center point, each rotating at slightly different speeds. Their edges fade in and out, forming ever-shifting kaleidoscopic patterns that pulse rhythmically with a gentle easing effect.
*/
p5.disableFriendlyErrors = true; // hush

const mmWidth      = 278;
const mmHeight     = 420;
const scale        = 4;
const baseFileName = "p5svg";

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

class Tri {
    constructor(radius) {
        this.startOrbit  = random(TWO_PI);
        this.tOrbit      = this.startOrbit;
        this.tRotate     = 0;
        // this.color       = color(random(pal));
        this.color       = 255;
        this.orbitSpeed  = random(0.05, 0.07) * random([-1, 1]);
        this.rotateSpeed = random(0.05, 0.1) * random([-1, 1]);
        this.size        = 100;
        // this.size        = randomGaussian(80, 20);
        // this.radius      = randomGaussian(radius, 100);
        this.radius = radius;
    }

    update() {
        this.tOrbit += this.orbitSpeed;
        this.tRotate += this.rotateSpeed;
    }

    display() {
        if (abs(this.tOrbit) > abs(this.startOrbit) + TWO_PI) {
            console.log("stopping", this.tOrbit, this.startOrbit);
            return;
        }

        push();

        const x = width / 2 + cos(this.tOrbit) * this.radius;
        const y = height / 2 + sin(this.tOrbit) * this.radius;

        translate(x, y);
        rotate(this.tRotate);

        const l = this.size;
        const h = (sqrt(3) / 2) * l;

        stroke(255);
        strokeWeight(1);
        noFill();
        // fill(this.color);
        triangle(0, -h / 2, -l / 2, h / 2, l / 2, h / 2);

        pop();
    }
}

const pal = ["#ff5964", "#ffe74c", "#329f5b", "#35a7ff", "#ffffff"];

const triangles = [];

function setup() {
    createCanvas(mmWidth * scale, mmHeight * scale);
    frameRate(60);
    textAlign(CENTER, CENTER);
    textSize(48);
    background(0);
    // textFont('Courier New')

    // triangles.push(new Tri(30));
    for (let r = 200; r < 1200; r += 100) {
        triangles.push(new Tri(r));

        // for (let i = 0; i < 1; i++) {
        // }
    }

    beginRecordSVG(this, `${baseFileName}-${getTime()}.svg`);

}

function draw() {

    triangles.forEach(tri => {
        tri.update();
        tri.display();
    });

    if (frameCount > 200) {
        noLoop();
    }
}

function drawText(version) {
    stroke(0);
    strokeWeight(2);
    fill(color(pal[0]));
    text(`v${version}`, width / 2, height / 2);
}

function keyPressed() {
    if (key === "S" || key === "s") {
        endRecordSVG();
    }
}
