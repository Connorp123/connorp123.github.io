const mmWidth      = 278;
const mmHeight     = 420;
const scale        = 4;
const baseFileName = "p5svg";
let canvas;

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

function setup() {
    canvas = createCanvas(mmWidth * scale, mmHeight * scale);
}

function draw() {
    background(0);
    beginRecordSVG(this, `${baseFileName}-${getTime()}.svg`);

    circle(width / 2, height / 2, 100);

    noLoop();
}

function keyPressed() {
    if (key === "S" || key === "s") {
        endRecordSVG();
    }
}

