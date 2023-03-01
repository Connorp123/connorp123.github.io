export class GeneticController {
    constructor({gui}) {
        this.populationSize = 0;
        this.population     = [];
        this.matingPool     = [];
        this.dnaLength      = 0;
        this.generation     = 0;
        this.totalFitness   = 0;
        this.avgFitness     = 0;
        this.maxFitness     = 0;

        this.gui = gui;
        if (gui) {
            this.gui.add(this, "generation");
            this.gui.add(this, "avgFitness");
            this.gui.add(this, "maxFitness");
        }
    }

    getRandomAction() {
        let POSSIBLE_ACTIONS = ["B", "F", "U", "D", "R", "L"];
        return POSSIBLE_ACTIONS[Math.floor(Math.random() * POSSIBLE_ACTIONS.length)];
    }

    // Part 1: Ceate a population of N elements, each with randomly generated DNA.
    createInitialPopulation({populationSize, dnaLength}) {
        this.populationSize = populationSize;
        this.dnaLength      = dnaLength;

        // Create the population
        this.population = new Array(populationSize);
        for (let n = 0; n < populationSize; n++) {

            // Create the DNA
            let dna = new Array(dnaLength);
            for (let action = 0; action < dnaLength; action++) {
                dna[action] = this.getRandomAction();
            }

            // Add the dna to the population
            this.population[n] = dna;
        }

        return this.population;
    }

    // Part 2: Evaluate the fitness of each element of the population and build a mating pool.
    evaluatePopulation({scoredPopulation}) {
        this.totalFitness = 0;

        scoredPopulation.forEach(monkey => {
            this.totalFitness += monkey.fitness;
            let wholeNumberScore = Math.round(monkey.fitness * 100);
            for (let n = 0; n < wholeNumberScore; n++) {
                this.matingPool.push(monkey.dna);
            }
        });

        let justScores  = scoredPopulation.map(i => Number(i.fitness));
        this.avgFitness = (this.totalFitness / scoredPopulation.length);
        this.maxFitness = Math.max(...justScores);

        console.log("Generation:", this.generation);
        console.log("Total Fitness:", this.totalFitness.toFixed(3));
        console.log("Average Fitness:", this.avgFitness.toFixed(3));
        console.log("Best:", this.maxFitness.toFixed(3));
        console.log("---------------------------------------------------------------------------");
    }

    crossOver({parentA, parentB}) {
        const midpoint      = Math.floor(Math.random() * parentA.length);
        const combinedArray = [];

        for (let i = 0; i < midpoint; i++) {
            combinedArray.push(parentA[i]);
        }

        for (let i = midpoint; i < parentB.length; i++) {
            combinedArray.push(parentB[i]);
        }

        return combinedArray;
    }

    // Mate
    breedNextPopulation() {
        this.population    = [];
        this.generation++;
        let parentA;
        let parentB;
        let child;
        let randomParent = () => Math.round(Math.random() * this.matingPool.length);
        for (let n = 0; n < this.populationSize; n++) {
            parentA = this.matingPool[randomParent()];
            parentB = this.matingPool[randomParent()];
            child   = this.crossOver({
                parentA: parentA,
                parentB: parentB
            });

            // Add a chance of mutating
            let rand;
            for (let i = 0; i < this.dnaLength; i++) {
                rand = Math.random();
                if (rand < 0.05) {
                    child[i] = this.getRandomAction();
                }
            }
            this.population.push(child);
        }

        return this.population;
    }

}