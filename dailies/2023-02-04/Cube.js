import * as THREE from "https://threejs.org/build/three.module.js";

const BACK  = 0;
const FRONT = 1;
const UP    = 2;
const DOWN  = 3;
const RIGHT = 4;
const LEFT  = 5;

const B = BACK;
const G = FRONT;
const W = UP;
const Y = DOWN;
const O = RIGHT;
const R = LEFT;

const NUM_SQUARES = 54;

const P = 6;

const COLORS = new Array(7);
COLORS[Y]    = new THREE.Color(0xFFFF00);
COLORS[B]    = new THREE.Color(0x0000FF);
COLORS[R]    = new THREE.Color(0xFF0000);
COLORS[G]    = new THREE.Color(0x00FF00);
COLORS[O]    = new THREE.Color(0xFF6600);
COLORS[W]    = new THREE.Color(0xFFFFFF);
COLORS[P]    = new THREE.Color(0xFFC0CB);

const OFFSETS = [0, 11, 22];

export class Cube {

    constructor({scene, geometry, state}) {
        console.log(state);
        if (!state) alert("Cube initialized with no state");

        this.pieces     = [];
        this.numSquares = NUM_SQUARES;
        this.state      = state;
        this.scene      = scene;
        this.geometry   = geometry;

        this.recreateCube();
    }

    stringToMaterial = (str) => {
        if (str.toUpperCase() === "B") return new THREE.MeshBasicMaterial({color: COLORS[B]});
        if (str.toUpperCase() === "G") return new THREE.MeshBasicMaterial({color: COLORS[G]});
        if (str.toUpperCase() === "W") return new THREE.MeshBasicMaterial({color: COLORS[W]});
        if (str.toUpperCase() === "Y") return new THREE.MeshBasicMaterial({color: COLORS[Y]});
        if (str.toUpperCase() === "O") return new THREE.MeshBasicMaterial({color: COLORS[O]});
        if (str.toUpperCase() === "R") return new THREE.MeshBasicMaterial({color: COLORS[R]});
        if (str.toUpperCase() === "P") return new THREE.MeshBasicMaterial({color: COLORS[P]});
        return new THREE.MeshBasicMaterial({color: new THREE.Color(0x000000)});
    };

    getMaterialsForCube = (cubeIndex) => {

        let layerIndex = Math.floor(cubeIndex / 9);
        let sqNumber   = cubeIndex % 9;
        let mats       = [
            this.stringToMaterial(""),
            this.stringToMaterial(""),
            this.stringToMaterial(""),
            this.stringToMaterial(""),
            this.stringToMaterial(""),
            this.stringToMaterial("")
        ];

        let LEFT_SQUARES  = new Set([0, 1, 2]);
        let UP_SQUARES    = new Set([2, 5, 8]);
        let RIGHT_SQUARES = new Set([6, 7, 8]);
        let DOWN_SQUARES  = new Set([0, 3, 6]);

        // Set materials for the "sides"
        if (LEFT_SQUARES.has(sqNumber)) {
            mats[LEFT] = this.stringToMaterial(this.state[LEFT][sqNumber]);
        }
        if (UP_SQUARES.has(sqNumber)) {
            mats[UP] = this.stringToMaterial(this.state[UP][sqNumber]);
        }
        if (RIGHT_SQUARES.has(sqNumber)) {
            mats[RIGHT] = this.stringToMaterial(this.state[RIGHT][sqNumber]);
        }
        if (DOWN_SQUARES.has(sqNumber)) {
            mats[DOWN] = this.stringToMaterial(this.state[DOWN][sqNumber]);
        }

        // Set materials for the "faces"
        if (layerIndex === 0) {
            mats[FRONT] = this.stringToMaterial(this.state[FRONT][sqNumber]);
        } else if (layerIndex === 2) {
            mats[BACK] = this.stringToMaterial(this.state[BACK][sqNumber]);
        }

        return mats;
    };

    changeState(state) {
        this.state = state;
    }

    randomizeCube() {
        let squares = [
            "B", "B", "B", "B", "B", "B", "B", "B", "B",
            "G", "G", "G", "G", "G", "G", "G", "G", "G",
            "W", "W", "W", "W", "W", "W", "W", "W", "W",
            "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y",
            "O", "O", "O", "O", "O", "O", "O", "O", "O",
            "R", "R", "R", "R", "R", "R", "R", "R", "R"
        ];

        this.numSquares = 0;
        this.state      = [
            [],
            [],
            [],
            [],
            [],
            []
        ];

        // For each side
        for (let c = 0; c < 6; c++) {


            // Get a random color
            for (let i = 0; i < 9; i++) {
                let nextIndex = Math.floor(Math.random() * squares.length);
                let next      = squares[nextIndex];
                squares.splice(nextIndex, 1);
                this.state[c].push(next);
                this.numSquares++;
                console.log(this.numSquares);
            }

        }

        console.log(this.state);

        this.recreateCube();
    }

    recreateCube() {
        if (this.numSquares !== NUM_SQUARES) return;
        this.pieces     = [];
        let pieceNumber = 0;
        OFFSETS.forEach(x => {
            OFFSETS.forEach(z => {
                OFFSETS.forEach(y => {
                    this.pieces.push(new Particle({
                        scene:    this.scene,
                        geometry: this.geometry,
                        x:        x,
                        y:        y,
                        z:        z,
                        mesh:     this.getMaterialsForCube(pieceNumber)
                    }));
                    pieceNumber++;
                });
            });
        });
    }

    update() {
        return null;
    }
}

export class Particle {

    constructor({scene, geometry, x = 0, y = 0, z = 0, color, mesh}) {

        // Physical properties
        this.pos      = [x, y, z];
        this.color    = color || 0xFFFFFF;
        this.material = mesh || new THREE.MeshBasicMaterial({color: this.color});
        this.mesh     = new THREE.Mesh(geometry, this.material);
        this.setMeshPos();
        scene.add(this.mesh);

        // Physics properties
        this.vel    = [0, 0, 0];
        this.acc    = [0, 0, 0];
        this.maxVel = 3;
        this.maxAcc = 0.01;
    }

    update() {

        // Attraction point
        // let attractionPoint = [0, 0, 0];
        //
        // // Point acceleration
        // this.acc = vectorLimit(vectorSub(attractionPoint, this.pos), this.maxAcc);
        // // this.acc = vectorLimit(this.acc, this.maxAcc);
        //
        // // Update vel
        // this.vel = vectorLimit(vectorAdd(this.vel, this.acc), this.maxVel);
        // // this.vel = vectorLimit(this.vel, this.maxVel);
        //
        // // Update position
        // this.pos = vectorAdd(this.pos, this.vel);
        this.setMeshPos();
    }

    setMeshPos() {
        this.mesh.position.x = this.pos[0];
        this.mesh.position.y = this.pos[1];
        this.mesh.position.z = this.pos[2];
    }
}