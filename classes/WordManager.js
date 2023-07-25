const GRAVITY = 9.8;

export class WordManager {
    constructor({p, state, words, canvasHeight, stopAtEnd}) {
        this.state          = state || {};
        this.p              = p;
        this.ORIGINAL_WORDS = words;
        this.words          = [];
        this.wordIndex      = 0;
        this.maxWordIndex   = this.ORIGINAL_WORDS.length;
        this.maxY           = canvasHeight + 100;
        this.stopAtEnd      = stopAtEnd || false;
    }

    newWord({x, y}) {
        if (this.stopAtEnd && this.wordIndex + 1 === this.maxWordIndex) return;
        this.words.push(new Word({
            p:      this.p,
            text:   this.ORIGINAL_WORDS[this.wordIndex],
            x:      x,
            y:      y,
            vel:    [
                this.p.random(-this.state.maxVelX, this.state.maxVelX),
                this.p.random(-this.state.maxVelY, 0)
            ],
            rotVel: this.p.random(-this.state.maxRotVel, this.state.maxRotVel)
        }));
        this.wordIndex = (this.wordIndex + 1) % this.maxWordIndex;
    }

    update() {
        this.words.forEach((word, i) => {
            word.update();
            if (this.wordShouldDie(word)) {
                this.words.splice(i, 1);
            }
        });
    }

    wordShouldDie(word) {
        return word.pos[1] > this.maxY;
    }

    draw() {
        this.words.forEach(word => {
            word.draw();
        });
    }
}

class Word {
    constructor({p, text, x, y, vel, rotVel, color}) {

        this.p     = p;
        this.text  = text;
        this.color = color || p.color(
            p.random(0, 255),
            p.random(0, 255),
            p.random(0, 255)
        );

        this.rotAcc = 0;
        this.rotVel = rotVel || 0;
        this.rot    = 0;

        this.acc = [0, 0];
        this.vel = vel || [0, 0];
        this.pos = [x, y];
    }

    update() {
        this.vel[0] += this.acc[0];
        this.pos[0] += this.vel[0];

        this.acc[1] += GRAVITY / 50000;
        this.vel[1] += this.acc[1];
        this.pos[1] += this.vel[1];

        this.rotAcc = 0;
        this.rotVel += this.rotAcc;
        this.rot += this.rotVel;
    }

    draw() {
        this.p.push();

        this.p.translate(this.pos[0], this.pos[1]);
        this.p.rotate(this.rot);

        this.p.stroke(0);
        this.p.fill(this.color);
        this.p.textSize(50);
        this.p.text(this.text, 0, 0);

        this.p.pop();
    }
}