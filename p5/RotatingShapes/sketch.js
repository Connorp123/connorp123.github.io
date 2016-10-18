function setup(){
    createCanvas(710, 400, WEBGL);
}

var img;
function preload() {
    img = loadImage("monkey.jpg");
}

function draw(){
    background(51);
    texture(img);
    translate(-250 * 2.5, 0, 0);
    // normalMaterial();
    texture(img);
    push();
    rotateZ((mouseX +mouseY) * 0.5 * 0.01);
    rotateX(mouseX * 0.01);
    rotateY(mouseY * 0.01);
    plane((mouseX + mouseY)/10);
    pop();
    translate(250, 0, 0);
    push();
    rotateZ((mouseX +mouseY) * 0.5 * 0.01);
    rotateX(mouseX * 0.01);
    rotateY(mouseY * 0.01);
    box((mouseX + mouseY)/10, (mouseX + mouseY)/10, (mouseX + mouseY)/10);
    pop();
    translate(250, 0, 0);
    push();
    rotateZ((mouseX +mouseY) * 0.5 * 0.01);
    rotateX(mouseX * 0.01);
    rotateY(mouseY * 0.01);
    cylinder((mouseX + mouseY)/10, (mouseX + mouseY)/10);
    pop();
    translate(250, 0, 0);
    push();
    rotateZ((mouseX +mouseY) * 0.5 * 0.01);
    rotateX(mouseX * 0.01);
    rotateY(mouseY * 0.01);
    cone((mouseX + mouseY)/10, (mouseX + mouseY)/10);
    pop();
    translate(250, 0, 0);
    push();
    rotateZ((mouseX +mouseY) * 0.5 * 0.01);
    rotateX(mouseX * 0.01);
    rotateY(mouseY * 0.01);
    torus((mouseX + mouseY)/10, 20);
    pop();
    translate(250, 0, 0);
    push();
    rotateZ((mouseX +mouseY) * 0.5 * 0.01);
    rotateX(mouseX * 0.01);
    rotateY(mouseY * 0.01);
    sphere((mouseX + mouseY)/10);
    pop();
}