import { CubeVisualizer } from "../classes/CubeVisualizer.js";
import { GeneticController } from "../classes/GeneticController.js";
import { Gui } from "../classes/Gui.js";
import * as THREE from "../static/lib/three.module.js";

let SCRAMBLED_STATE = [
    ["R", "R", "R", "B", "B", "B", "O", "O", "O"],
    ["R", "R", "R", "G", "G", "G", "O", "O", "O"],
    ["W", "W", "W", "W", "W", "W", "W", "W", "W"],
    ["Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y"],
    ["B", "B", "B", "O", "O", "O", "G", "G", "G"],
    ["B", "B", "B", "R", "R", "R", "G", "G", "G"]
];

function main() {

    const POP_SIZE   = 100;
    const DNA_LENGTH = 30;

    let state = {
        shared: {
            startingState:     SCRAMBLED_STATE,
            generations:       [],
            currentGeneration: -1,
            currentAction:     -1
        }
    };
    let gui;
    let visualizer;
    let controller;

    createGui();
    createController();
    createVisualizer();

    visualizer.createCubesFromPopulation({
        population:    state.shared.generations[state.shared.currentGeneration],
        startingState: state.shared.startingState
    });

    function render() {

        if (visualizer.isDone()) {

            // Evaluate and breed
            controller.evaluatePopulation({
                scoredPopulation: visualizer.getAllFitnessScores()
            });
            controller.breedNextPopulation();

            // Reset view
            visualizer.createCubesFromPopulation({
                population:    state.shared.generations[state.shared.currentGeneration],
                startingState: state.shared.startingState
            });
            visualizer.play();
        }

        controller.render();
        visualizer.render();
        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);


    //------------------------------------------------------------------------------------------------------------------
    // Setup
    //------------------------------------------------------------------------------------------------------------------

    function createGui() {
        state.controls = {
            debug:        false,
            autoContinue: true,
            rewatchBest:  () => {
                moveCameraToBest();
                state.ai.step = 2.5;
                replayGeneration();
            },
            nextGen:      () => {
                state.ai.step = 3;
            }
        };

        gui = new Gui({
            name:         "rubiks-cube-ai",
            showControls: true
        });
        gui.add(state.controls, "rewatchBest");
        gui.add(state.controls, "nextGen");
        gui.add(state.controls, "autoContinue");
        gui.add(state.controls, "debug");
        gui.loadPreset();
    }

    function createVisualizer() {
        visualizer = new CubeVisualizer({
            debug:             state.controls.debug,
            framesPerRotation: 5,
            cameraStart:       {
                x: -300,
                y: 30,
                z: -10
            }
        });
    }

    function createController() {
        controller = new GeneticController({
            gui:         gui,
            globalState: state
        });
        controller.createInitialPopulation({
            populationSize: POP_SIZE,
            dnaLength:      DNA_LENGTH
        });
    }

    //------------------------------------------------------------------------------------------------------------------
    // Helpers
    //------------------------------------------------------------------------------------------------------------------
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
}

main();
