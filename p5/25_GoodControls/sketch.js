/*
        Global Variables
 */
var FRAME_RATE = 60;
var BG_COLOR = 0;
var REDRAW_BACKGROUND = true;

var connor;
//-------------------------------------------------------------------------------------------------
/*
        p5 Basic Functions
 */
function setup() {
    var myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.parent('canvas');

    background(BG_COLOR);
    frameRate(FRAME_RATE);

    connor = new Node("Connor Peace", width/2, height/2);

    var fred = new Node("Frederick Huntsberry", random(0, width), random(0, height));
    var owen  = new Node("Owen Peace", random(0, width), random(0, height));
    var rob = new Node("Robert Peace", random(0, width), random(0, height));
    var mon = new Node("Monica Peace", random(0, width), random(0, height));
    var kyle = new Node("Kyle Peace", random(0, width), random(0, height));

    fred.addEdge(mon);
    // fred.addEdge(owen);
    // fred.addEdge(connor);

    // owen.addEdge(connor);
    // owen.addEdge(fred);
    // owen.addEdge(rob);
    // owen.addEdge(mon);
    // owen.addEdge(kyle);

    rob.addEdge(owen);
    rob.addEdge(connor);
    rob.addEdge(kyle);
    rob.addEdge(mon);

    // mon.addEdge(connor);
    // mon.addEdge(fred);
    // mon.addEdge(owen);
    // mon.addEdge(rob);

    // kyle.addEdge(rob);
    // kyle.addEdge(connor);
    // kyle.addEdge(owen);

    connor.addEdge(owen);
    connor.addEdge(fred);
    connor.addEdge(rob);
    connor.addEdge(mon);
    connor.addEdge(kyle);

}
function draw() {

    // Refresh the background
    if(REDRAW_BACKGROUND)
        background(BG_COLOR);

    connor.display();
}//------------------------------------------------------------------------------------------------
/*
        Controls
 */
// Keyboard controls
function keyPressed() {
    if (key === "P" || key === "p") {
        alert("PAUSED");
    }
    if (key === "B" || key === "b") {
        REDRAW_BACKGROUND = !REDRAW_BACKGROUND;
    }
}//------------------------------------------------------------------------------------------------