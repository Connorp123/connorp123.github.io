var socket;
var myColor;

function setup() {
    var myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.parent('canvas');
    background(51);
    socket = io.connect('http://192.168.1.3:3000');
    socket.on('mouse', newDrawing);

    // Chooses a random color for the user
    myColor = {
        r: random(0,255),
        g: random(0,255),
        b: random(0,255),
        alpha: 255
    }
}//------------------------------------------------------------------------------------------------

function draw() {

}//------------------------------------------------------------------------------------------------

function mouseDragged() {
    console.log('Sending: ' + mouseX + ', ' + mouseY);

    // Set up & send the data to the server
    var data = {
        x: mouseX,
        y: mouseY,
        color: myColor
    }
    socket.emit('mouse', data);

    // Draw the ellipse on the client's screen
    noStroke();
    fill(myColor.r, myColor.g, myColor.b, myColor.alpha);
    ellipse(mouseX, mouseY, 36, 36);
}//------------------------------------------------------------------------------------------------

function newDrawing(data) {
    noStroke();
    fill(data.color.r, data.color.g, data.color.b, data.color.alpha);
    ellipse(data.x, data.y, 36, 36);
}//------------------------------------------------------------------------------------------------

function touchMoved() {
    return false;
}//------------------------------------------------------------------------------------------------
