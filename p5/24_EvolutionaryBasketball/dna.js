function Dna(x, y) {

  this.x = x || random(0, width);
  this.y = y || random(0, height);


  this.merge = function (otherDna) {
    return new Dna( (this.x + otherDna.x) / 2, (this.y + otherDna.y) / 2);
  };

  // Mutation chance should be a number between 0 and 1, with a precision of 1/100th
  this.mutate = function (mutationChance) {

    // Choose a number between 0 and 100 and see if it matches the mutation chance
    if(int(random(101)) === mutationChance*100) {
      this.x = random(0, width);
    }

    if(int(random(101)) === mutationChance*100) {
      this.y = random(0, height);
    }
  };
}