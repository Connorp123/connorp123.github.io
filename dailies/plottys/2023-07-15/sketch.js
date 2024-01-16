import { createGui } from "../../../helpers/gui-helpers.js";

export const myP5 = new p5(
    (p) => {
        let state = {
            frameRate: 1

        };
        let gui   = createGui({
            state: state,
            name:  "daily"
        });

        let canvas;
        let wordList         = "It's a beautiful day in this neighborhood,\n" +
            "A beautiful day for a neighbor,\n" +
            "Would you be mine?\n" +
            "Could you be mine?\n" +

            "It's a neighborly day in this beautywood,\n" +
            "A neighborly day for a beauty,\n" +
            "Would you be mine?\n" +
            "Could you be mine?\n" +
            "I have always wanted to have a neighbor just like you,\n" +
            "I've always wanted to live in a neighborhood with you.\n" +
            "So let's make the most of this beautiful day,\n" +
            "Since we're together, we might as well say,\n" +
            "Would you be mine?\n" +
            "Could you be mine?\n" +
            "Won't you be my neighbor?\n" +
            "Won't you please,\n" +
            "Won't you please,\n" +
            "Please won't you be my neighbor?\n" +
            "Spoken*: Hi television neighbor, I'm glad we're together again....".split(" ");
        const MAX_WORD_INDEX = wordList.length;
        const GRAVITY        = 9.8;

        class WordManager {
            constructor({p, words, canvasHeight}) {
                this.p              = p;
                this.ORIGINAL_WORDS = words;
                this.words          = [];
                this.wordIndex      = 0;
                this.maxWordIndex   = this.ORIGINAL_WORDS.length;
                this.maxY           = canvasHeight + 100;
            }

            newWord({x, y}) {
                this.words.push(new Word({
                    p:    this.p,
                    text: this.ORIGINAL_WORDS[this.wordIndex],
                    x:    x,
                    y:    y
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
            constructor({p, text, x, y}) {

                console.log(text, x, y);

                this.p    = p;
                this.text = text;

                this.rotAcc = 0;
                this.rotVel = 0;
                this.rotPos = 0;

                this.acc = [0, 0];
                this.vel = [0, 0];
                this.pos = [x, y];

                this.t = 0;
            }

            update() {
                this.acc = [0, GRAVITY * (this.t / 10000)];
                this.vel[0] += this.acc[0];
                this.pos[0] += this.vel[0];

                this.vel[1] += this.acc[1];
                this.pos[1] += this.vel[1];

                this.t++;
            }

            draw() {
                this.p.stroke(0);
                this.p.fill(255);
                this.p.textSize(50);
                this.p.text(this.text, this.pos[0], this.pos[1]);
            }
        }

        let wordManager;

        p.setup = () => {
            canvas      = createSquareCanvas(p);
            wordManager = new WordManager({
                p:            p,
                words:        wordList,
                canvasHeight: p.height
            });
        };

        p.draw = () => {
            redrawBackground(p);
            state.frameRate = p.frameRate();

            if (p.mouseIsPressed) {
                wordManager.newWord({x: p.mouseX, y: p.mouseY});
            }

            wordManager.update();
            wordManager.draw();
        };

        p.keyPressed = () => {
            if (p.key === "S" || p.key === "s") p.save(`${getGifName()}.svg`);
        };
    });