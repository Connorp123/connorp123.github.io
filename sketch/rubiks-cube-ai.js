import {CubeVisualizer} from "../classes/CubeVisualizer.js";
import {GeneticController} from "../classes/GeneticController.js";

function main() {
    // Create the cube visualizer
    const visualizer = new CubeVisualizer({
        numCubes:     0,
        showControls: true,
        cameraStart:  {
            x: -300,
            y: 30,
            z: -10
        }
        // loadFromFile: false,
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