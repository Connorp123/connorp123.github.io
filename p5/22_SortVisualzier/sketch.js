let BG_COLOR = 0;

let List = [];
let indexWidth;
let IS_SORTED = false;
let STEP_FAST = false;

// For the Border / Controls
let SIDEBAR_WIDTH = 0;
let DISPLAY_WIDTH;
let LIST_SIZE;


// For the bubble sort
let I = 0;
let J = 0;


// To track operations
let NUM_ASSIGNS = 0;
let NUM_COMPARES = 0;

/***********************************************************************************************************************
 *  Future Options
 *
 *  Slow/Fast - Choose if the list re-draws for every swap, or for every time a value makes it to the end
 *  Show the Number of operations on the side
 *  Reset
 *  Pause/Play
 *  Change number of values
 */

function setup() {
    // Creates the canvas
    DISPLAY_WIDTH = windowWidth - SIDEBAR_WIDTH;
    var myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.parent('canvas');

    rectMode(CORNERS);
    textSize(14);
    textAlign(CENTER, TOP);

    LIST_SIZE = ceil(DISPLAY_WIDTH / 5);
    indexWidth = DISPLAY_WIDTH/LIST_SIZE;

    // Initialize List
    for (let i = 0; i < LIST_SIZE; i++) {
        List.push(random(height));
    }

    frameRate(60);
}

function draw() {

    background(BG_COLOR); // Set background

    // Sort until sorted
    if(!IS_SORTED) {
        if(STEP_FAST) {
            stepFast();
        } else {
            stepSlow();
        }
    }

    // Display array
    displayList(List);

    // Display stats
    displayStats();

}


function swap(list, index1, index2) {
    let temp = list[index1];
    list[index1] = list[index2];
    list[index2] = temp;

    NUM_ASSIGNS += 3;
}

function displayList(list) {
    for(let i = 0; i < list.length; i++) {
        noStroke();
        let shade = (list[i]/height) * 255;
        fill(shade, 0, 50);
        rect(indexWidth*i, height, (indexWidth*i) + indexWidth, height-list[i]);
    }
}

function displayStats() {

    // Set font properties
    stroke(255);
    fill(255);

    // Display assigns
    let x = DISPLAY_WIDTH / 10;
    textSize(16);
    text("# of assignments", x, 10);
    textSize(40);
    text(NUM_ASSIGNS, x, 30);

    // Display compares
    x = DISPLAY_WIDTH / 3;
    textSize(16);
    text("# of compares", x, 10);
    textSize(40);
    text(NUM_COMPARES, x, 30);
}



function stepFast() {
    if(I < LIST_SIZE) {
        NUM_COMPARES++;

        for(let j = 0; j < LIST_SIZE - I - 1; j++) {
            NUM_ASSIGNS++;
            NUM_COMPARES++;

            let a = List[j];
            NUM_ASSIGNS++;

            let b = List[j + 1];
            NUM_ASSIGNS++;

            if (a > b) {
                NUM_COMPARES++;

                swap(List, j, j + 1);
            }
        }
        I++;
        NUM_ASSIGNS++;
    } else {
        console.log("Sort finished!");
        IS_SORTED = true;
    }
}

function stepSlow() {
    let a = List[J];
    NUM_ASSIGNS++;

    let b = List[J + 1];
    NUM_ASSIGNS++;

    if (a > b) {
        NUM_COMPARES++;

        swap(List, J, J + 1);
    }

    if(I < LIST_SIZE) {
        NUM_COMPARES++;

        J++;
        NUM_ASSIGNS++;

        if (J >= LIST_SIZE - I - 1) {
            NUM_COMPARES++;

            J = 0;
            NUM_ASSIGNS++;

            I++;
            NUM_ASSIGNS++;
        }
    } else {
        console.log("Finished");
        IS_SORTED = true;
    }
}

function keyTyped() {
    switch(key.toUpperCase()) {
        case "S":
            STEP_FAST = false;
            break;
        case "F":
            STEP_FAST = true;
            break;
        default: console.log("Keypress didn't do anything");

    }
}

function touchMoved() {
    STEP_FAST = !STEP_FAST;
    return false;
}