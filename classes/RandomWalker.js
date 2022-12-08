/**
 * Provides a faux mouseX and mouseY position
 */
export class RandomWalker {

  constructor(p, {maxX, maxY}) {
    this.MAX_X = maxX || p.width;
    this.MAX_Y = maxY || p.height;
    this.t1    = 0;
    this.t2    = 5;
    this.p     = p;
  }

  getNextPos(timestep = 0.01) {
    this.t1 += timestep;
    this.t2 += timestep;

    return [
      this.p.noise(this.t1) * this.MAX_X,
      this.p.noise(this.t2) * this.MAX_Y
    ];
  }
}