import * as THREE from "./../lib/three.module.js";
import {RubiksPiece} from "./RubiksPiece.js";

// Display constants
const PIECE_SIZE = 10.0;
const GAP        = 1.0;
const OFFSET     = PIECE_SIZE + GAP;

// Cube constants
const SOLVED_STATE = [
    ["B", "B", "B", "B", "B", "B", "B", "B", "B"],
    ["G", "G", "G", "G", "G", "G", "G", "G", "G"],
    ["W", "W", "W", "W", "W", "W", "W", "W", "W"],
    ["Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["R", "R", "R", "R", "R", "R", "R", "R", "R"]
];

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
const NUM_SIDES     = 6;
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

    constructor({scene, state, actions, position, debug = false, framesPerRotation = 60}) {
        // if (!state) alert("RubiksCube initialized with no state");

        this.numSquares        = NUM_SQUARES;
        this.state             = state || SOLVED_STATE;
        this.scene             = scene;
        this.geometry          = new THREE.BoxGeometry(PIECE_SIZE, PIECE_SIZE, PIECE_SIZE);
        this.pieces            = [];
        this.core              = null;
        this.actions           = actions || [];
        this.actionIndex       = 0;
        this.position          = position || new THREE.Vector3(0, 0, 0);
        this.debug             = debug;
        this.framesPerRotation = framesPerRotation;
        this.rotating          = {
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
        let newPiece;
        let sqNumber;

        // Create the core first
        this.core = new RubiksPiece({
            scene:    this.scene,
            geometry: this.geometry,
            x:        this.position.x,
            y:        this.position.y,
            z:        this.position.z,
            color:    this.debug ? 0xFFC0CB : COLORS[GREY]
        });

        let numLayers  = 3;
        let numColumns = 3;
        let numRows    = 3;

        // Then create all the other pieces
        for (let lay = 0; lay < numLayers; lay++) {
            for (let col = 0; col < numColumns; col++) {
                for (let row = 0; row < numRows; row++) {
                    sqNumber = pieceNumber % 9;
                    if (lay !== 1 || row !== 1 || col !== 1) {
                        newPiece = new RubiksPiece({
                            parentPiece: this.core,
                            geometry:    this.geometry,
                            x:           this.position.x + OFFSETS[lay],
                            y:           this.position.y + OFFSETS[row],
                            z:           this.position.z + OFFSETS[col],
                            mats:        getMaterialsForPiece({
                                state:      this.state,
                                layerIndex: lay,
                                sqNumber:   sqNumber
                            })
                        });
                        this.pieces.push(newPiece);
                    }
                    pieceNumber++;
                }
            }
        }
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
            return false;
        }
        let side         = Math.round(Math.random() * 100) % 6;
        let numRotations = Math.round(Math.random() * 100) % 3 + 1;
        this.startRotation({side, numRotations});
        return true;
    }

    /**
     * Single rotation actions can be: U,D,R,L,F,B
     * Multiple rotation actions can be: U2, U3, D2, D3, R2, R3, ...
     */
    doNextAction() {
        if (this.rotating.active || this.actionIndex >= this.actions.length) {
            return undefined;
        }
        let action = this.actions[this.actionIndex];
        this.actionIndex++;
        if (this.debug) console.log(action);
        if (action?.length < 1 || action?.length > 2) {
            console.log("Error, skipping action:", action);
        }
        this.startRotation({
            side:         charToSide(action.charAt(0)),
            numRotations: action.length > 1 ? parseInt(action.charAt(1)) : 1
        });
    }

    isDoneWithActions() {
        return !this.rotating.active && this.actionIndex >= this.actions.length;
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

    getPiecesForSide({side}) {
        const offset = this.getRawOffset(side);
        let pieces   = [];
        if (side === 0 || side === 1) {
            pieces = this.core.getChildrenWithXOff({
                xOff: offset[0]
            });
        } else if (side === 2 || side === 3) {
            pieces = this.core.getChildrenWithYOff({
                yOff: offset[1]
            });
        } else {
            pieces = this.core.getChildrenWithZOff({
                zOff: offset[2]
            });
        }
        return pieces;
    }

    startRotation({side, numRotations}) {

        if (this.rotating.active || side < 0 || side > 5 || numRotations % 4 === 0) {
            return;
        }

        // Find the center piece for the side
        const offset      = this.getRawOffset(side);
        const centerPiece = this.core.getChildWithVector({
            x: offset[0],
            y: offset[1],
            z: offset[2]
        });

        // Get outer pieces for the side
        let outerPieces = this.getPiecesForSide({
            side: side
        });

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
            axis:         this.getRotationAxis(side),
            numRotations: numRotations,
            toRotate:     (numRotations / 4) * Math.PI * 2,
            rotated:      0
        };
    }

    rotateStep({center, axis, toRotate, rotated, numRotations}) {
        // Rotate
        let rad = toRotate / this.framesPerRotation / numRotations;
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

    getAdjustedOffset(sideNumber) {
        const offsetMap = SIDE_OFFSET_MAP[sideNumber];
        return [
            this.position.x + offsetMap[0],
            this.position.y + offsetMap[1],
            this.position.z + offsetMap[2]
        ];
    }

    getRawOffset(sideNumber) {
        return SIDE_OFFSET_MAP[sideNumber];
    }

    getRotationAxis(N) {
        let x = (this.getRawOffset(N)[0] / OFFSET) * -1;
        let y = (this.getRawOffset(N)[1] / OFFSET) * -1;
        let z = (this.getRawOffset(N)[2] / OFFSET) * -1;
        return new THREE.Vector3(x, y, z);
    };

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
        let pos = child.getWorldPosition().round().sub(this.position);
        let rot = child.getWorldQuaternion().normalize();

        // Remove the child from the parent
        child.detachSelf();

        // Add the piece back to the core
        this.core.attach(child);

        // Update the position and rotation
        child.setPosition(pos);
        child.setRotationFromQuaternion(rot);
    }

    removeAllPieces() {
        this.pieces.forEach(() => {

        });
    }

    /***
     *
     *           db         88
     *          d88b        88
     *         d8'`8b       88
     *        d8'  `8b      88
     *       d8YaaaaY8b     88
     *      d8""""""""8b    88
     *     d8'        `8b   88
     *    d8'          `8b  88
     *
     *
     */

    countCorrect() {

        let correctCount = 0;

        for (let side = 0; side < NUM_SIDES; side++) {

            // Get pieces for side 0
            let sidePieces = this.getPiecesForSide({side: side});

            // Get correct color for side 0
            let correctColor = COLORS[side];

            // Get materials for side 0
            for (let p = 0; p < sidePieces.length; p++) {

                let mats      = sidePieces[p].getMaterials();
                let faceColor = mats[side];
                correctCount += faceColor.color.equals(correctColor) ? 1 : 0;
            }
        }

        return correctCount;
    }


    printState() {
        // for (let side = 0; side < NUM_SIDES; side++) {
        //     let sidePieces = this.getPiecesForSide({side: side});
        //     console.log(sidePieces);
        // }
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

const charToSide = (char) => {
    switch (char) {
        case "U":
            return UP_SIDE;
        case "D":
            return DOWN_SIDE;
        case "R":
            return RIGHT_SIDE;
        case "L":
            return LEFT_SIDE;
        case "F":
            return FRONT_SIDE;
        case "B":
            return BACK_SIDE;
        default:
            return undefined;
    }
};

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