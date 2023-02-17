// import * as THREE from "https://threejs.org/build/three.module.js";
// import * as THREE from "https://threejs.org/build/three.module.js";
import * as THREE from "./../lib/three.module.js";

const FRONT_LAYER = 0;
const MID_LAYER   = 1;
const BACK_LAYER  = 2;

const BACK_SIDE  = 0;
const FRONT_SIDE = 1;
const UP_SIDE    = 2;
const DOWN_SIDE  = 3;
const RIGHT_SIDE = 4;
const LEFT_SIDE  = 5;

const B = BACK_SIDE;
const G = FRONT_SIDE;
const W = UP_SIDE;
const Y = DOWN_SIDE;
const O = RIGHT_SIDE;
const R = LEFT_SIDE;

const NUM_SQUARES = 54;

const FRONT_SIDE_CENTER_INDEX = 4;

const PINK = 6;
const GREY = 7;

let ROTATION_STEP       = 0.1;
let FRAMES_PER_ROTATION = 30 * 2;

const COLORS = new Array(7);
COLORS[Y]    = new THREE.Color(0xFFFF00);
COLORS[B]    = new THREE.Color(0x0000FF);
COLORS[R]    = new THREE.Color(0xFF0000);
COLORS[G]    = new THREE.Color(0x00FF00);
COLORS[O]    = new THREE.Color(0xFF6600);
COLORS[W]    = new THREE.Color(0xFFFFFF);
COLORS[PINK] = new THREE.Color(0xFFC0CB);
COLORS[GREY] = new THREE.Color(0x111111);

const PIECE_SIZE = 10.0;
const GAP        = 1.0;
const OFFSET     = PIECE_SIZE + GAP;

const SIDE_OFFSET_MAP = {
    0: [OFFSET, 0, 0],
    1: [-OFFSET, 0, 0],
    2: [0, OFFSET, 0],
    3: [0, -OFFSET, 0],
    4: [0, 0, OFFSET],
    5: [0, 0, -OFFSET]
};

const OFFSETS = [-OFFSET, 0, OFFSET];

let stringToMaterial = (str) => {
    if (str.toUpperCase() === "B") return new THREE.MeshBasicMaterial({color: COLORS[B]});
    if (str.toUpperCase() === "G") return new THREE.MeshBasicMaterial({color: COLORS[G]});
    if (str.toUpperCase() === "W") return new THREE.MeshBasicMaterial({color: COLORS[W]});
    if (str.toUpperCase() === "Y") return new THREE.MeshBasicMaterial({color: COLORS[Y]});
    if (str.toUpperCase() === "O") return new THREE.MeshBasicMaterial({color: COLORS[O]});
    if (str.toUpperCase() === "R") return new THREE.MeshBasicMaterial({color: COLORS[R]});
    if (str.toUpperCase() === "P") return new THREE.MeshBasicMaterial({color: COLORS[PINK]});
    return new THREE.MeshBasicMaterial({color: COLORS[GREY]});
};

export class Cube {

    constructor({scene, geometry, state}) {
        if (!state) alert("Cube initialized with no state");

        this.numSquares = NUM_SQUARES;
        this.state      = state;
        this.scene      = scene;
        this.geometry   = geometry;
        this.pieces     = [[], [], []];

        this.core = null;

        this.rotating = {
            active: false
        };

        this.createCube();
    }

    createCube() {
        if (this.numSquares !== NUM_SQUARES) return;
        this.pieces     = [[], [], []];
        let pieceNumber = 0;
        let layerIndex  = 0;
        let newPiece;
        let sqNumber;

        // Create the core first
        this.core = new Piece({
            parent:   this.scene,
            geometry: this.geometry,
            x:        0,
            y:        0,
            z:        0,
            mesh:     this.getMaterialsForPiece({
                layerIndex: -1,
                sqNumber:   -1
            })
        });

        // Finally create outer pieces and add them of children of each side

        OFFSETS.forEach(x => {
            OFFSETS.forEach(z => {
                OFFSETS.forEach(y => {
                    sqNumber = pieceNumber % 9;
                    if (x !== 0 || y !== 0 || z !== 0) {

                        console.log("NewPiecePos:", [x, y, z]);

                        newPiece = new Piece({
                            parent:   this.core.mesh,
                            geometry: this.geometry,
                            x:        x,
                            y:        y,
                            z:        z,
                            mesh:     this.getMaterialsForPiece({
                                layerIndex: layerIndex,
                                sqNumber:   sqNumber
                            })
                        });
                        this.pieces[layerIndex].push(newPiece);
                    } else {
                        this.pieces[layerIndex].push(this.core);
                    }

                    pieceNumber++;
                });
            });
            layerIndex++;
        });
    }

    getPiecesForSide = ({sideNumber}) => {

        // Get the core
        if (!this.core) return [];

        // Get the offset for that side
        let offset = SIDE_OFFSET_MAP[sideNumber];
        console.log("offset", offset);
        if (!offset) return [];

        // Get all children of the core that match that offset
        let center = this.core.getChildWithVector({
            vec: new THREE.Vector3(offset[0], offset[1], offset[2])
        });
        console.log(center);

        // Select the child for the given side
        let aaa = this.core.getChildrenWithOffset({
            x: offset[0],
            y: offset[1],
            z: offset[2]
        });
        console.log("OuterPieces", aaa);

        //
    };

    getMaterialsForPiece = ({layerIndex, sqNumber}) => {

        let mats = [
            stringToMaterial(""),
            stringToMaterial(""),
            stringToMaterial(""),
            stringToMaterial(""),
            stringToMaterial(""),
            stringToMaterial("")
        ];

        let LEFT_SQUARES  = new Set([0, 1, 2]);
        let UP_SQUARES    = new Set([2, 5, 8]);
        let RIGHT_SQUARES = new Set([6, 7, 8]);
        let DOWN_SQUARES  = new Set([0, 3, 6]);

        if (layerIndex === 0) {

            mats[FRONT_SIDE] = stringToMaterial(this.state[FRONT_SIDE][sqNumber]);

            if (LEFT_SQUARES.has(sqNumber)) {
                mats[LEFT_SIDE] = stringToMaterial(this.state[LEFT_SIDE][sqNumber]);
            }
            if (UP_SQUARES.has(sqNumber)) {
                mats[UP_SIDE] = stringToMaterial(this.state[UP_SIDE][sqNumber - 2]);
            }
            if (RIGHT_SQUARES.has(sqNumber)) {
                mats[RIGHT_SIDE] = stringToMaterial(this.state[RIGHT_SIDE][sqNumber - 6]);
            }
            if (DOWN_SQUARES.has(sqNumber)) {
                mats[DOWN_SIDE] = stringToMaterial(this.state[DOWN_SIDE][sqNumber]);
            }
        } else if (layerIndex === 1) {
            if (LEFT_SQUARES.has(sqNumber)) {
                mats[LEFT_SIDE] = stringToMaterial(this.state[LEFT_SIDE][sqNumber + 3]);
            }
            if (UP_SQUARES.has(sqNumber)) {
                mats[UP_SIDE] = stringToMaterial(this.state[UP_SIDE][sqNumber - 1]);
            }
            if (RIGHT_SQUARES.has(sqNumber)) {
                mats[RIGHT_SIDE] = stringToMaterial(this.state[RIGHT_SIDE][sqNumber - 3]);
            }
            if (DOWN_SQUARES.has(sqNumber)) {
                mats[DOWN_SIDE] = stringToMaterial(this.state[DOWN_SIDE][sqNumber + 1]);
            }
        } else if (layerIndex === 2) {
            mats[BACK_SIDE] = stringToMaterial(this.state[BACK_SIDE][sqNumber]);

            if (LEFT_SQUARES.has(sqNumber)) {
                mats[LEFT_SIDE] = stringToMaterial(this.state[LEFT_SIDE][sqNumber + 6]);
            }
            if (UP_SQUARES.has(sqNumber)) {
                mats[UP_SIDE] = stringToMaterial(this.state[UP_SIDE][sqNumber]);
            }
            if (RIGHT_SQUARES.has(sqNumber)) {
                mats[RIGHT_SIDE] = stringToMaterial(this.state[RIGHT_SIDE][sqNumber]);
            }
            if (DOWN_SQUARES.has(sqNumber)) {
                mats[DOWN_SIDE] = stringToMaterial(this.state[DOWN_SIDE][sqNumber + 2]);
            }
        }

        return mats;
    };

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
            }
        }

        this.createCube();
    }

    // linkPieceBackToScene({child}) {
    //     // Temp save current position
    //     let pos = child.getWorldPosition();
    //     pos.x   = Math.round(pos.x);
    //     pos.y   = Math.round(pos.y);
    //     pos.z   = Math.round(pos.z);
    //
    //     // Add this piece back to the scene
    //     this.scene.add(child);
    //
    //     // Update the position and rotation
    //     child.position.x = pos.x;
    //     child.position.y = pos.y;
    //     child.position.z = pos.z;
    //     child.rotateOnAxis(this.rotating.axis, this.rotating.toRotate);
    // }

    startRotation({side, numRotations}) {

        if (this.rotating.active || side < 0 || side > 5 || numRotations % 4 === 0) {
            return;
        }

        // Find the center piece for the side
        let centerPieceMesh;
        let axis;
        if (side === FRONT_SIDE) {
            console.log(this.core.mesh.children);
            // centerPieceMesh = this.centers.get(`${FRONT_LAYER},${4}`)?.mesh;
        }

        // Find other 8 pieces for that side and attach them as children to the center
        if (side === FRONT_SIDE) {
            let sidePieces = this.pieces[FRONT_LAYER];
            for (let pieceIndex = 0; pieceIndex < 9; pieceIndex++) {
                if (pieceIndex !== FRONT_SIDE_CENTER_INDEX) {
                    sidePieces[pieceIndex].mesh.position.x -= OFFSETS[0];
                    // centerPieceMesh.add(sidePieces[pieceIndex].mesh);
                }
            }
            axis = new THREE.Vector3(1, 0, 0);
        }

        // Start rotating the center
        this.rotating = {
            active:       true,
            center:       centerPieceMesh,
            axis:         axis,
            numRotations: numRotations,
            toRotate:     (numRotations / 4) * Math.PI * 2,
            rotated:      0
        };
    }

    stopRotation({center}) {

        // Ungroup all the pieces from the center
        const children = Array.from(center.children);
        // children.forEach(child => {
        //     this.linkPieceBackToScene({child});
        // });

        // Reset rotation object
        this.rotating = {
            active:       false,
            center:       null,
            axis:         null,
            numRotations: 0,
            toRotate:     0,
            rotated:      0
        };
    }

    rotateStep({center, axis, toRotate, rotated, numRotations}) {

        // Rotate
        let rad = toRotate / FRAMES_PER_ROTATION / numRotations;
        if (rad + rotated > toRotate) {
            rad = toRotate - rotated;
        }
        // center.rotateOnAxis(axis, rad);

        // Update progress
        return rotated + rad;
    }

    update() {
        if (this.rotating.active) {
            this.rotating.rotated = this.rotateStep(this.rotating);
            if (this.rotating.rotated === this.rotating.toRotate) {
                this.stopRotation(this.rotating);
            }
        }

        this.pieces.forEach(layer => {
            layer.forEach(piece => {
                if (piece) piece.update();
            });
        });
    }
}

/**
 *
 * 88888888ba                                    88              88
 * 88      "8b                            ,d     ""              88
 * 88      ,8P                            88                     88
 * 88aaaaaa8P'  ,adPPYYba,  8b,dPPYba,  MM88MMM  88   ,adPPYba,  88   ,adPPYba,
 * 88""""""'    ""     `Y8  88P'   "Y8    88     88  a8"     ""  88  a8P_____88
 * 88           ,adPPPPP88  88            88     88  8b          88  8PP"""""""
 * 88           88,    ,88  88            88,    88  "8a,   ,aa  88  "8b,   ,aa
 * 88           `"8bbdP"Y8  88            "Y888  88   `"Ybbd8"'  88   `"Ybbd8"'
 *
 */

export class Piece {

    constructor({parent, geometry, x = 0, y = 0, z = 0, color, mesh}) {
        console.log(x, y, z);

        // Physical properties
        this.initPos  = [x, y, z];
        this.color    = color || 0xFFFFFF;
        this.material = mesh || new THREE.MeshBasicMaterial({color: this.color});
        this.mesh     = new THREE.Mesh(geometry, this.material);
        this.setMeshPos({x, y, z});
        parent.add(this.mesh);
    }

    rotate({axis, rad}) {
        this.mesh.rotateOnAxis(axis, rad);
    }

    update() {
        this.setMeshPos({});
    }

    getPosAsVector() {
        return this.mesh.position;
    }

    setMeshPos({x, y, z}) {
        if (x) this.mesh.position.x = x;
        if (y) this.mesh.position.y = y;
        if (z) this.mesh.position.z = z;
    }

    getChildren() {
        return Array.from(this.mesh.children);
    }

    getChildWithVector({vec}) {
        return this.getChildren().find(child => child.position.equals(vec));
    }

    getChildrenWithComponents({x, y, z}) {
        return this.getChildren().filter(child => {
            return (x === 0 ? true : child.position.getComponent(0) === x) &&
                (y === 0 ? true : child.position.getComponent(1) === y) &&
                (z === 0 ? true : child.position.getComponent(2) === z);
        });
    }

    getChildrenWithOffset({x, y, z}) {
        if (x) {
            console.log(this.getChildren().filter(child => child.position.getComponent(0) === x));
            return this.getChildren().filter(child => child.position.getComponent(0) === x);
        } else if (y) {
            return this.getChildren().filter(child => child.position.getComponent(1) === y);
        } else if (z) {
            return this.getChildren().filter(child => child.position.getComponent(2) === z);

        }
        return null;
    }

    getChildrenWithZeroComponents({xIsZero, yIsZero, zIsZero}) {
        return this.getChildren().filter(child => {
            return (xIsZero ? child.position.getComponent(0) === 0 : child.position.getComponent(0) !== 0) &&
                (yIsZero ? child.position.getComponent(1) === 0 : child.position.getComponent(1) !== 0) &&
                (zIsZero ? child.position.getComponent(2) === 0 : child.position.getComponent(2) !== 0);
        });
    }
}