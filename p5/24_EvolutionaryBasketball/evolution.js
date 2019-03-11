/*
    INITIALIZE

    Create N shooters with random DNA
 */
var NUM_SHOOTERS = 1000;
var population = [];

function initialize() {
  for(var s = 0; s < NUM_SHOOTERS; s++) {
    population.push(new Shooter());
  }
}

/*
    SELECTION

    For each shooter:
      Shoot the ball
      Record the performance (how close did the ball get to the middle of the basket)
      Determine the fitness score

    Create a mating pool
 */
var matingPool = [];
function selection(pop) {
  for(var shooter = 0; shooter < pop.length; shooter++) {
    pop[shooter].launchBall();
  }
}

/*
    REPRODUCTION

    Repeat 100 times:
      Pick two parents
      Create a child
      Mutate the child
      Add child to new population

    Return to SELECTION
 */
var MUTATION_CHANCE = 0.05;
function reproduction(pop) {



}