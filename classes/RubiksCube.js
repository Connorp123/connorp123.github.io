import * as THREE from "./../lib/three.module.js";
import {RubiksPiece} from "./RubiksPiece.js";

// Display constants
const PIECE_SIZE          = 10.0;
const GAP                 = 1.0;
const OFFSET              = PIECE_SIZE + GAP;
const FRAMES_PER_ROTATION = 60;

// Cube constants
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

const NUM_SQUARES   = 54;
const LEFT_SQUARES  = new Set([0, 1, 2]);
const UP_SQUARES    = new Set([2, 5, 8]);
const RIGHT_SQUARES = new Set([6, 7, 8]);
const DOWN_SQUARES  = new Set([0, 3, 6]);

const PINK   = 6;
const GREY   = 7;
const COLORS = new Array(7);
COLORS[Y]    = new THREE.Color(0xFFFF00);
COLORS[B]    = new THREE.Color(0x0000FF);
COLORS[R]    = new THREE.Color(0xFF0000);
COLORS[G]    = new THREE.Color(0x00FF00);
COLORS[O]    = new THREE.Color(0xFF6600);
COLORS[W]    = new THREE.Color(0xFFFFFF);
COLORS[PINK] = new THREE.Color(0xFFC0CB);
COLORS[GREY] = new THREE.Color(0x111111);

const SIDE_OFFSET_MAP = {
    0: [OFFSET, 0, 0],
    1: [-OFFSET, 0, 0],
    2: [0, OFFSET, 0],
    3: [0, -OFFSET, 0],
    4: [0, 0, OFFSET],
    5: [0, 0, -OFFSET]
};

const OFFSETS = [-OFFSET, 0, OFFSET];

export class RubiksCube {

    constructor({scene, state}) {
        if (!state) alert("RubiksCube initialized with no state");


        this.numSquares = NUM_SQUARES;
        this.state      = state;
        this.scene      = scene;
        this.geometry   = new THREE.BoxGeometry(PIECE_SIZE, PIECE_SIZE, PIECE_SIZE);
        this.pieces     = [];
        this.core       = null;
        this.rotating   = {
            active: false
        };

        this.createCube();
    }

    /***
     *
     *      ,ad8888ba,   88888888ba   88888888888         db    888888888888  88888888888
     *     d8"'    `"8b  88      "8b  88                 d88b        88       88
     *    d8'            88      ,8P  88                d8'`8b       88       88
     *    88             88aaaaaa8P'  88aaaaa          d8'  `8b      88       88aaaaa
     *    88             88""""88'    88"""""         d8YaaaaY8b     88       88"""""
     *    Y8,            88    `8b    88             d8""""""""8b    88       88
     *     Y8a.    .a8P  88     `8b   88            d8'        `8b   88       88
     *      `"Y8888Y"'   88      `8b  88888888888  d8'          `8b  88       88888888888
     *
     *
     */

    createCube() {
        if (this.numSquares !== NUM_SQUARES) return;
        let pieceNumber = 0;
        let layerIndex  = 0;
        let newPiece;
        let sqNumber;

        // Create the core first
        this.core = new RubiksPiece({
            scene:    this.scene,
            geometry: this.geometry,
            x:        0,
            y:        0,
            z:        0,
            mats:     getMaterialsForPiece({
                state:      this.state,
                layerIndex: -1,
                sqNumber:   -1
            })
        });

        // Then create all the other pieces
        OFFSETS.forEach(x => {
            OFFSETS.forEach(z => {
                OFFSETS.forEach(y => {
                    sqNumber = pieceNumber % 9;
                    if (x !== 0 || y !== 0 || z !== 0) {
                        newPiece = new RubiksPiece({
                            parentPiece: this.core,
                            geometry:    this.geometry,
                            x:           x,
                            y:           y,
                            z:           z,
                            mats:        getMaterialsForPiece({
                                state:      this.state,
                                layerIndex: layerIndex,
                                sqNumber:   sqNumber
                            })
                        });
                        this.pieces.push(newPiece);
                    }
                    pieceNumber++;
                });
            });
            layerIndex++;
        });
    }

    /***
     *
     *    88        88  88888888ba   88888888ba,         db    888888888888  88888888888
     *    88        88  88      "8b  88      `"8b       d88b        88       88
     *    88        88  88      ,8P  88        `8b     d8'`8b       88       88
     *    88        88  88aaaaaa8P'  88         88    d8'  `8b      88       88aaaaa
     *    88        88  88""""""'    88         88   d8YaaaaY8b     88       88"""""
     *    88        88  88           88         8P  d8""""""""8b    88       88
     *    Y8a.    .a8P  88           88      .a8P  d8'        `8b   88       88
     *     `"Y8888Y"'   88           88888888Y"'  d8'          `8b  88       88888888888
     *
     *
     */

    update() {
        if (this.rotating.active) {
            this.rotating.rotated = this.rotateStep(this.rotating);
            if (this.rotating.rotated === this.rotating.toRotate) {
                this.stopRotation();
            }
        }

        this.pieces.forEach(piece => {
            if (piece) piece.update();
        });
    }

    /***
     *
     *           db         ,ad8888ba,  888888888888  88    ,ad8888ba,    888b      88   ad88888ba
     *          d88b       d8"'    `"8b      88       88   d8"'    `"8b   8888b     88  d8"     "8b
     *         d8'`8b     d8'                88       88  d8'        `8b  88 `8b    88  Y8,
     *        d8'  `8b    88                 88       88  88          88  88  `8b   88  `Y8aaaaa,
     *       d8YaaaaY8b   88                 88       88  88          88  88   `8b  88    `"""""8b,
     *      d8""""""""8b  Y8,                88       88  Y8,        ,8P  88    `8b 88          `8b
     *     d8'        `8b  Y8a.    .a8P      88       88   Y8a.    .a8P   88     `8888  Y8a     a8P
     *    d8'          `8b  `"Y8888Y"'       88       88    `"Y8888Y"'    88      `888   "Y88888P"
     *
     *
     */

    randomRotation() {
        if (this.rotating.active) {
            return;
        }
        let side         = Math.round(Math.random() * 100) % 6;
        let numRotations = Math.round(Math.random() * 100) % 3 + 1;
        console.log(numRotations);
        this.startRotation({side, numRotations});
    }

    /***
     *
     *    88888888ba     ,ad8888ba,  888888888888    db    888888888888  88    ,ad8888ba,    888b      88
     *    88      "8b   d8"'    `"8b      88        d88b        88       88   d8"'    `"8b   8888b     88
     *    88      ,8P  d8'        `8b     88       d8'`8b       88       88  d8'        `8b  88 `8b    88
     *    88aaaaaa8P'  88          88     88      d8'  `8b      88       88  88          88  88  `8b   88
     *    88""""88'    88          88     88     d8YaaaaY8b     88       88  88          88  88   `8b  88
     *    88    `8b    Y8,        ,8P     88    d8""""""""8b    88       88  Y8,        ,8P  88    `8b 88
     *    88     `8b    Y8a.    .a8P      88   d8'        `8b   88       88   Y8a.    .a8P   88     `8888
     *    88      `8b    `"Y8888Y"'       88  d8'          `8b  88       88    `"Y8888Y"'    88      `888
     *
     *
     */

    startRotation({side, numRotations}) {

        if (this.rotating.active || side < 0 || side > 5 || numRotations % 4 === 0) {
            return;
        }

        // Find the center piece for the side
        let offset      = SIDE_OFFSET_MAP[side];
        let centerPiece = this.core.getChildWithVector({
            x: offset[0],
            y: offset[1],
            z: offset[2]
        });

        // Get outer pieces for the side
        let outerPieces;
        if (side === 0 || side === 1) {
            outerPieces = this.core.getChildrenWithXOff({
                xOff: offset[0]
            });
        } else if (side === 2 || side === 3) {
            outerPieces = this.core.getChildrenWithYOff({
                yOff: offset[1]
            });
        } else {
            outerPieces = this.core.getChildrenWithZOff({
                zOff: offset[2]
            });
        }

        // Filter out the center piece
        outerPieces = outerPieces.filter(piece => !piece.equals(centerPiece));

        // Attach outer pieces to center
        outerPieces.forEach(piece => {
            this.groupToCenter({
                center: centerPiece,
                child:  piece
            });
        });

        // Start the rotation
        this.rotating = {
            active:       true,
            center:       centerPiece,
            axis:         getRotationAxis(side),
            numRotations: numRotations,
            toRotate:     (numRotations / 4) * Math.PI * 2,
            rotated:      0
        };
    }

    rotateStep({center, axis, toRotate, rotated, numRotations}) {
        // Rotate
        let rad = toRotate / FRAMES_PER_ROTATION / numRotations;
        if (rad + rotated > toRotate) {
            rad = toRotate - rotated;
        }
        center.rotate({
            axis: axis,
            rad:  rad
        });

        // Update progress
        return rotated + rad;
    }

    stopRotation() {

        // Ungroup all the pieces from the centerPiece & move them back to the core
        const children = this.rotating.center.getChildren();
        children.forEach(child => {
            this.saveAndUngroup({
                child: child
            });
        });

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

    /***
     *
     *      ,ad8888ba,   88888888ba     ,ad8888ba,    88        88  88888888ba   88  888b      88    ,ad8888ba,
     *     d8"'    `"8b  88      "8b   d8"'    `"8b   88        88  88      "8b  88  8888b     88   d8"'    `"8b
     *    d8'            88      ,8P  d8'        `8b  88        88  88      ,8P  88  88 `8b    88  d8'
     *    88             88aaaaaa8P'  88          88  88        88  88aaaaaa8P'  88  88  `8b   88  88
     *    88      88888  88""""88'    88          88  88        88  88""""""'    88  88   `8b  88  88      88888
     *    Y8,        88  88    `8b    Y8,        ,8P  88        88  88           88  88    `8b 88  Y8,        88
     *     Y8a.    .a88  88     `8b    Y8a.    .a8P   Y8a.    .a8P  88           88  88     `8888   Y8a.    .a88
     *      `"Y88888P"   88      `8b    `"Y8888Y"'     `"Y8888Y"'   88           88  88      `888    `"Y88888P"
     *
     *
     */

    groupToCenter({center, child}) {
        // Remove child from current parent
        child.detachSelf();

        // Attach child to the center
        center.attach(child);
    }

    saveAndUngroup({child}) {
        let pos = child.getWorldPosition();
        let rot = child.getWorldQuaternion();
        pos.x   = Math.round(pos.x);
        pos.y   = Math.round(pos.y);
        pos.z   = Math.round(pos.z);

        // Remove the child from the parent
        child.detachSelf();

        // Add the piece back to the core
        this.core.attach(child);

        // Update the position and rotation
        child.setPosition(pos);
        child.setRotationFromQuaternion(rot);
    }
}

/***
 *
 *    88        88  88888888888  88           88888888ba   88888888888  88888888ba    ad88888ba
 *    88        88  88           88           88      "8b  88           88      "8b  d8"     "8b
 *    88        88  88           88           88      ,8P  88           88      ,8P  Y8,
 *    88aaaaaaaa88  88aaaaa      88           88aaaaaa8P'  88aaaaa      88aaaaaa8P'  `Y8aaaaa,
 *    88""""""""88  88"""""      88           88""""""'    88"""""      88""""88'      `"""""8b,
 *    88        88  88           88           88           88           88    `8b            `8b
 *    88        88  88           88           88           88           88     `8b   Y8a     a8P
 *    88        88  88888888888  88888888888  88           88888888888  88      `8b   "Y88888P"
 *
 *
 */

const stringToMaterial = (str) => {
    if (str.toUpperCase() === "B") return new THREE.MeshBasicMaterial({color: COLORS[B]});
    if (str.toUpperCase() === "G") return new THREE.MeshBasicMaterial({color: COLORS[G]});
    if (str.toUpperCase() === "W") return new THREE.MeshBasicMaterial({color: COLORS[W]});
    if (str.toUpperCase() === "Y") return new THREE.MeshBasicMaterial({color: COLORS[Y]});
    if (str.toUpperCase() === "O") return new THREE.MeshBasicMaterial({color: COLORS[O]});
    if (str.toUpperCase() === "R") return new THREE.MeshBasicMaterial({color: COLORS[R]});
    if (str.toUpperCase() === "P") return new THREE.MeshBasicMaterial({color: COLORS[PINK]});
    return new THREE.MeshBasicMaterial({color: COLORS[GREY]});
};

const getRotationAxis = (N) => {
    let x = (SIDE_OFFSET_MAP[N][0] * -1) / OFFSET;
    let y = (SIDE_OFFSET_MAP[N][1] * -1) / OFFSET;
    let z = (SIDE_OFFSET_MAP[N][2] * -1) / OFFSET;
    return new THREE.Vector3(x, y, z);
};

const getMaterialsForPiece = ({state, layerIndex, sqNumber}) => {

    let mats = [
        stringToMaterial(""),
        stringToMaterial(""),
        stringToMaterial(""),
        stringToMaterial(""),
        stringToMaterial(""),
        stringToMaterial("")
    ];

    if (layerIndex === 0) {

        mats[FRONT_SIDE] = stringToMaterial(state[FRONT_SIDE][sqNumber]);

        if (LEFT_SQUARES.has(sqNumber)) {
            mats[LEFT_SIDE] = stringToMaterial(state[LEFT_SIDE][sqNumber]);
        }
        if (UP_SQUARES.has(sqNumber)) {
            mats[UP_SIDE] = stringToMaterial(state[UP_SIDE][sqNumber - 2]);
        }
        if (RIGHT_SQUARES.has(sqNumber)) {
            mats[RIGHT_SIDE] = stringToMaterial(state[RIGHT_SIDE][sqNumber - 6]);
        }
        if (DOWN_SQUARES.has(sqNumber)) {
            mats[DOWN_SIDE] = stringToMaterial(state[DOWN_SIDE][sqNumber]);
        }
    } else if (layerIndex === 1) {
        if (LEFT_SQUARES.has(sqNumber)) {
            mats[LEFT_SIDE] = stringToMaterial(state[LEFT_SIDE][sqNumber + 3]);
        }
        if (UP_SQUARES.has(sqNumber)) {
            mats[UP_SIDE] = stringToMaterial(state[UP_SIDE][sqNumber - 1]);
        }
        if (RIGHT_SQUARES.has(sqNumber)) {
            mats[RIGHT_SIDE] = stringToMaterial(state[RIGHT_SIDE][sqNumber - 3]);
        }
        if (DOWN_SQUARES.has(sqNumber)) {
            mats[DOWN_SIDE] = stringToMaterial(state[DOWN_SIDE][sqNumber + 1]);
        }
    } else if (layerIndex === 2) {
        mats[BACK_SIDE] = stringToMaterial(state[BACK_SIDE][sqNumber]);

        if (LEFT_SQUARES.has(sqNumber)) {
            mats[LEFT_SIDE] = stringToMaterial(state[LEFT_SIDE][sqNumber + 6]);
        }
        if (UP_SQUARES.has(sqNumber)) {
            mats[UP_SIDE] = stringToMaterial(state[UP_SIDE][sqNumber]);
        }
        if (RIGHT_SQUARES.has(sqNumber)) {
            mats[RIGHT_SIDE] = stringToMaterial(state[RIGHT_SIDE][sqNumber]);
        }
        if (DOWN_SQUARES.has(sqNumber)) {
            mats[DOWN_SIDE] = stringToMaterial(state[DOWN_SIDE][sqNumber + 2]);
        }
    }

    return mats;
};