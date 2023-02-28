import {CubeVisualizer} from "../classes/CubeVisualizer.js";
import {GeneticController} from "../classes/GeneticController.js";
import GUI from "https://cdn.jsdelivr.net/npm/lil-gui@0.18/+esm";


/***
 *
 *      ,ad8888ba,   88        88  88
 *     d8"'    `"8b  88        88  88
 *    d8'            88        88  88
 *    88             88        88  88
 *    88      88888  88        88  88
 *    Y8,        88  88        88  88
 *     Y8a.    .a88  Y8a.    .a8P  88
 *      `"Y88888P"    `"Y8888Y"'   88
 *
 *
 */
class Gui {
    constructor({name = "guiControls"}) {
        this.gui  = new GUI();
        this.name = name + "-gui";

        this.add(this, "saveControls");
        this.add(this, "unSaveControls");
    }

    add(object, property, $1, max, step) {
        this.gui.add(object, property, $1, max, step).listen().decimals(2);
    }

    loadPreset() {
        const guiControlString = localStorage.getItem(this.name);
        let preset             = JSON.parse(guiControlString);

        // Load preset
        if (preset) {
            this.gui.load(preset);
        }
    }

    saveControls() {
        const controls      = this.gui.save();
        const controlString = JSON.stringify(controls);
        localStorage.setItem(this.name, controlString);
        console.log("Saving controls at " + this.name, controlString);
        alert("Controls saved -- refresh to apply");

    }

    unSaveControls() {
        localStorage.removeItem(this.name);
        alert("Controls reset -- refresh to apply");
    }
}

function main() {
    let step        = 1;
    let examineMode = false;


    let mainControls = {
        debug:        false,
        autoContinue: false,
        examineGen:   () => {
            examineMode = true;
        },
        nextGen:      () => {
            step = 3;
            console.log(step);
        }
    };

    const gui = new Gui({
        name:         "rubiks-cube-ai",
        showControls: true
    });
    gui.add(mainControls, "nextGen");
    gui.add(mainControls, "examineGen");
    gui.add(mainControls, "autoContinue");
    gui.add(mainControls, "debug");
    gui.loadPreset();

    // Create the cube visualizer
    const visualizer  = new CubeVisualizer({
        debug:             mainControls.debug,
        framesPerRotation: 5,
        cameraStart:       {
            x: -300,
            y: 30,
            z: -10
        }
    });
    let startingState = visualizer.getScrambledState({numRotations: 25});

    let controller = new GeneticController({
        cubeVisualizer: visualizer,
        gui:            gui,
        startingState:  startingState
    });

    // Part 1: Create a population of N elements, each with randomly generated DNA.
    controller.createPopulation({
        populationSize: 100,
        dnaLength:      100
    });

    // Load old settings


    function render() {

        if (examineMode) {

            // Show best cube

        } else {
            switch (step) {
                case 1:
                    if (controller.isDoneRunning) {
                        step++;
                    } else {
                        controller.keepLiving();
                    }
                    break;
                case 2:
                    controller.evaluatePopulation();
                    if (mainControls.autoContinue) {
                        step++;
                    } else {
                        step = -1;
                    }
                    break;
                case 3:
                    controller.breedNextPopulation();
                    step = 1;
                    break;
            }
        }

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

main();