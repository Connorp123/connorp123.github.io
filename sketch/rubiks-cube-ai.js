import {CubeVisualizer} from "../classes/CubeVisualizer.js";
import {GeneticController} from "../classes/GeneticController.js";
import * as lilGui from "https://esm.run/lil-gui";


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
    constructor({controls={}, name="guiControls", showControls=false}) {
        this.gui = new lilGui.GUI();
        this.name = name + '-gui';
        this.showControls = showControls;
        this.controls = {
            ...controls,
            saveControls:      () => this.saveControls(),
            unSaveControls:    () => this.unSaveControls()
        }

        this.add("saveControls");
        this.add("unSaveControls");

        const guiControlString = localStorage.getItem(this.name);
        let preset             = JSON.parse(guiControlString);

        // Load preset
        if (preset) {
            this.gui.load(preset);
        }
    }

    add(property, $1, max, step ) {
        this.gui.add(this.controls, property, $1, max, step);
    }

    saveControls() {
        if (this.showControls) {
            // save current values to an object
            const controls      = this.gui.save();
            const controlString = JSON.stringify(controls);
            localStorage.setItem(this.name, controlString);
            alert("Controls saved -- refresh to apply");
        }
    }

    unSaveControls() {
        if (this.showControls) {
            localStorage.removeItem(this.name);
            alert("Controls reset -- refresh to apply");
        }
    }
}

function main() {

    let controls = {
        debug:             false,
        framesPerRotation: 5,
        autoContinue: false,
        examineGen: () => {},
        nextGen: () => {},
        avgFitness: "",
        maxFitness: "",
    };

    const gui = new Gui({
        name: 'rubiks-cube-ai',
        controls: controls,
        showControls: true,
    })

    gui.add("examineGen");
    gui.add("nextGen");
    gui.add("autoContinue");
    gui.add("debug");
    gui.add("framesPerRotation", 0, 240, 1);
    gui.add("avgFitness");
    gui.add("maxFitness");

    // Create the cube visualizer
    const visualizer = new CubeVisualizer({
        showControls: gui.showControls,
        debug: gui.controls.debug,
        framesPerRotation: controls.framesPerRotation,
        cameraStart:  {
            x: -300,
            y: 30,
            z: -10
        }
    });

    let controller = new GeneticController({
        cubeVisualizer: visualizer
    });

    // Part 0: Decide on problem state
    let PROBLEM_STATE = [];

    // Part 1: Create a population of N elements, each with randomly generated DNA.
    controller.createPopulation({
        populationSize: 100,
        dnaLength:      100
    });


    // ---> Part 2: Evaluate the fitness of each element of the population and build a mating pool.


    // Part 3: Create a mating pool (Repeat N times)

    // Part 3a: Pick two parents with probability according to relative fitness.

    // Part 3b: Crossover—create a “child” by combining the DNA of these two parents.

    // Part 3c: Mutation—mutate the child’s DNA based on a given probability.

    // Part 3d: Add the new child to a new population.

    // Part 4: Replace the old population & return to step 2  --->


    function render() {

        if (controller.isDoneRunning) {

            // Part 2: Evaluate fitness + build mating pool
            controller.evaluatePopulation();
            controls.maxFitness = controller.getMaxFitness();
            controls.avgFitness = controller.getAvgFitness();

            // Part 3:
            controller.breedNextPopulation();


        } else {

            // Update the cube
            controller.keepLiving();

            
        }
        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

main();