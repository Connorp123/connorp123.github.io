import {CubeVisualizer} from "../classes/CubeVisualizer.js";
import {GeneticController} from "../classes/GeneticController.js";
import GUI from "https://cdn.jsdelivr.net/npm/lil-gui@0.18/+esm";
import * as THREE from "./../lib/three.module.js";

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

    let state = {
        controls: {
            debug:        false,
            autoContinue: false,
            rewatchBest:  () => {
                moveCameraToBest();
                state.ai.step = 2.5;
                replayGeneration();
            },
            nextGen:      () => {
                state.ai.step = 3;
            }
        }
    };

    const gui = new Gui({
        name:         "rubiks-cube-ai",
        showControls: true
    });
    gui.add(state.controls, "rewatchBest");
    gui.add(state.controls, "nextGen");
    gui.add(state.controls, "autoContinue");
    gui.add(state.controls, "debug");
    gui.loadPreset();

    // Create the cube visualizer
    const visualizer  = new CubeVisualizer({
        debug:             state.controls.debug,
        framesPerRotation: 5,
        cameraStart:       {
            x: -300,
            y: 30,
            z: -10
        }
    });
    let startingState = visualizer.getScrambledState({numRotations: 25});

    let controller = new GeneticController({
        gui:         gui,
        globalState: state
    });

    // Part 1: Create a population of N elements, each with randomly generated DNA.
    controller.createInitialPopulation({
        populationSize: 100,
        dnaLength:      100
    });
    visualizer.createCubesFromPopulation({
        population:    state.ai.population,
        startingState: startingState
    });

    // Camera,animation,step
    const stepSize = 0.1;
    let progress   = 0;
    let distance;
    let direction;


    function moveCameraToBest() {

        // Get the position of the best cube
        let scoredPopulation = visualizer.getAllFitnessScores();
        const attribute      = "fitness";
        const bestCube       = scoredPopulation.reduce((prev, current) => {
            return (prev[attribute] > current[attribute]) ? prev : current;
        });
        let bestPos          = bestCube.position;
        console.log(bestPos);

        // Create a new vector for the target position
        const targetPosition = new THREE.Vector3(-100, 0, 0).add(bestPos);

        // Calculate the distance and direction from the current position to the target position
        distance  = visualizer.camera.position.distanceTo(targetPosition);
        direction = targetPosition.clone().sub(visualizer.camera.position).normalize();
    }

    function replayGeneration() {

    }


    function render() {
        switch (state.ai.step) {
            case 1:
                if (visualizer.isDone()) {
                    state.ai.step++;
                } else {
                    visualizer.render();
                }
                break;
            case 2:
                state.ai.fitnessScores = visualizer.getAllFitnessScores();
                controller.evaluatePopulation();
                if (state.controls.autoContinue) {
                    state.ai.step++;
                } else {
                    state.ai.step = -1;
                }
                break;
            case 2.5:

                // Increment the progress value
                progress += stepSize;

                // Calculate the new camera position
                const newPosition = visualizer.camera.position.clone().add(direction.clone().multiplyScalar(distance * stepSize));

                // Update the camera position
                visualizer.camera.position.copy(newPosition);
                break;

            case 3:
                controller.breedNextPopulation();

                // Delete old population
                visualizer.removeAllCubes();

                // Create population in viz
                visualizer.createCubesFromPopulation({
                    population:    state.ai.population,
                    startingState: startingState
                });

                state.ai.step = 1;
                break;
        }

        visualizer.render();
        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

main();