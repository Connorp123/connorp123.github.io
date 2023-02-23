import {CubeVisualizer} from "../classes/CubeVisualizer.js";

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

    // Part 0: Decide on problem state
    let PROBLEM_STATE = []

    // Part 1: Create a population of N elements, each with randomly generated DNA.
    let N                = 100;
    let DNA_LENGTH       = 100;
    let POSSIBLE_ACTIONS = ["B", "F", "U", "D", "R", "L"];

    // Create the population
    let population = new Array(N);
    for (let n = 0; n < N; n++) {

        // Create the DNA
        let dna = new Array(DNA_LENGTH);
        for (let action = 0; action < DNA_LENGTH; action++) {
            dna[action] = POSSIBLE_ACTIONS[Math.floor(Math.random() * POSSIBLE_ACTIONS.length)];
        }

        // Add the dna to the population
        population[n] = dna;
    }

    // Create the actual cubes from the population
    visualizer.createCubesFromPopulation({
        population: population
    });


    // ---> Part 2: Evaluate the fitness of each element of the population and build a mating pool.

    // Part 3: Create a mating pool (Repeat N times)

    // Part 3a: Pick two parents with probability according to relative fitness.

    // Part 3b: Crossover—create a “child” by combining the DNA of these two parents.

    // Part 3c: Mutation—mutate the child’s DNA based on a given probability.

    // Part 3d: Add the new child to a new population.

    // Part 4: Replace the old population & return to step 2  --->


    function render(time) {
        visualizer.render(time);
        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

main();