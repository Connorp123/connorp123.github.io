// import * as THREE from "https://threejs.org/build/three.module.js";
import * as THREE from "./../lib/three.module.js";

const FRONT_LAYER = 0;
const MID_LAYER = 1;
const BACK_LAYER = 2;

const BACK_SIDE = 0;
const FRONT_SIDE = 1;
const UP_SIDE = 2;
const DOWN_SIDE = 3;
const RIGHT_SIDE = 4;
const LEFT_SIDE = 5;

const B = BACK_SIDE;
const G = FRONT_SIDE;
const W = UP_SIDE;
const Y = DOWN_SIDE;
const O = RIGHT_SIDE;
const R = LEFT_SIDE;

const NUM_SQUARES = 54;

const P = 6;

let ROTATION_STEP = 0.1;

const COLORS = new Array(7);
COLORS[Y] = new THREE.Color(0xFFFF00);
COLORS[B] = new THREE.Color(0x0000FF);
COLORS[R] = new THREE.Color(0xFF0000);
COLORS[G] = new THREE.Color(0x00FF00);
COLORS[O] = new THREE.Color(0xFF6600);
COLORS[W] = new THREE.Color(0xFFFFFF);
COLORS[P] = new THREE.Color(0xFFC0CB);

const OFFSETS = [-11, 0, 11];

let stringToMaterial = (str) => {
  if (str.toUpperCase() === "B") return new THREE.MeshBasicMaterial({ color: COLORS[B] });
  if (str.toUpperCase() === "G") return new THREE.MeshBasicMaterial({ color: COLORS[G] });
  if (str.toUpperCase() === "W") return new THREE.MeshBasicMaterial({ color: COLORS[W] });
  if (str.toUpperCase() === "Y") return new THREE.MeshBasicMaterial({ color: COLORS[Y] });
  if (str.toUpperCase() === "O") return new THREE.MeshBasicMaterial({ color: COLORS[O] });
  if (str.toUpperCase() === "R") return new THREE.MeshBasicMaterial({ color: COLORS[R] });
  if (str.toUpperCase() === "P") return new THREE.MeshBasicMaterial({ color: COLORS[P] });
  return new THREE.MeshBasicMaterial({ color: new THREE.Color(0x000000) });
};

export class Cube {

  constructor({ scene, geometry, state }) {
    if (!state) alert("Cube initialized with no state");

    this.numSquares = NUM_SQUARES;
    this.state = state;
    this.scene = scene;
    this.geometry = geometry;
    this.pieces = [[], [], []];

    this.rotating = {
      active: false,
    };

    this.recreateCube();
  }

  getMaterialsForPiece = ({ layerIndex, sqNumber }) => {

    let mats = [
      stringToMaterial(""),
      stringToMaterial(""),
      stringToMaterial(""),
      stringToMaterial(""),
      stringToMaterial(""),
      stringToMaterial(""),
    ];

    let LEFT_SQUARES = new Set([0, 1, 2]);
    let UP_SQUARES = new Set([2, 5, 8]);
    let RIGHT_SQUARES = new Set([6, 7, 8]);
    let DOWN_SQUARES = new Set([0, 3, 6]);

    // let
    //
    // switch (layerIndex) {
    //
    //     case 0:
    //
    // }

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
      "R", "R", "R", "R", "R", "R", "R", "R", "R",
    ];

    this.numSquares = 0;
    this.state = [
      [],
      [],
      [],
      [],
      [],
      [],
    ];

    // For each side
    for (let c = 0; c < 6; c++) {

      // Get a random color
      for (let i = 0; i < 9; i++) {
        let nextIndex = Math.floor(Math.random() * squares.length);
        let next = squares[nextIndex];
        squares.splice(nextIndex, 1);
        this.state[c].push(next);
        this.numSquares++;
      }
    }

    this.recreateCube();
  }

  recreateCube() {
    if (this.numSquares !== NUM_SQUARES) return;
    this.pieces = [[], [], []];
    let pieceNumber = 0;
    let layerIndex = 0;
    OFFSETS.forEach(x => {
      OFFSETS.forEach(z => {
        OFFSETS.forEach(y => {
          this.pieces[layerIndex].push(new Piece({
            scene: this.scene,
            geometry: this.geometry,
            x: x,
            y: y,
            z: z,
            mesh: this.getMaterialsForPiece({
              layerIndex: layerIndex,
              sqNumber: pieceNumber % 9,
            }),
          }));
          pieceNumber++;
        });
      });
      layerIndex++;
    });
  }

  getPiecesForSide(side) {
    if (side < 0 || side > 5) {
      return [];
    }
    let sidePieces = [];
    switch (side) {
      case BACK_SIDE:
        sidePieces = [
          this.pieces[BACK_LAYER][0],
          this.pieces[BACK_LAYER][1],
          this.pieces[BACK_LAYER][2],
          this.pieces[BACK_LAYER][3],
          this.pieces[BACK_LAYER][4],
          this.pieces[BACK_LAYER][5],
          this.pieces[BACK_LAYER][6],
          this.pieces[BACK_LAYER][7],
          this.pieces[BACK_LAYER][8],
        ];
        break;
      case FRONT_SIDE:
        sidePieces = [
          this.pieces[FRONT_LAYER][0],
          this.pieces[FRONT_LAYER][1],
          this.pieces[FRONT_LAYER][2],
          this.pieces[FRONT_LAYER][3],
          this.pieces[FRONT_LAYER][4],
          this.pieces[FRONT_LAYER][5],
          this.pieces[FRONT_LAYER][6],
          this.pieces[FRONT_LAYER][7],
          this.pieces[FRONT_LAYER][8],
        ];
        break;
      case UP_SIDE:
        // sidePieces = [
        //   this.pieces[FRONT_LAYER][0],
        //   this.pieces[FRONT_LAYER][1],
        //   this.pieces[FRONT_LAYER][2],
        //   this.pieces[FRONT_LAYER][3],
        //   this.pieces[FRONT_LAYER][4],
        //   this.pieces[FRONT_LAYER][5],
        //   this.pieces[FRONT_LAYER][6],
        //   this.pieces[FRONT_LAYER][7],
        //   this.pieces[FRONT_LAYER][8],
        // ];
        break;
      case DOWN_SIDE:
        // startPos = this.pieces[FRONT_LAYER][0];
        break;
      case RIGHT_SIDE:
        // startPos = this.pieces[FRONT_LAYER][6];
        break;
      case LEFT_SIDE:
        // startPos = this.pieces[FRONT_LAYER][0];
        break;
      default:
        console.log("Can't get pieces for a side that isn't [0,5]: ", side);
    }

    return sidePieces;
  }

  // getRotationVectorForSide({side, numRotations}) {
  //
  // }

  startRotation({ side, numRotations }) {

    if (this.rotating.active || side < 0 || side > 5 || numRotations % 4 === 0) {
      return;
    }

    // Find the center piece for the side
    let centerPieceMesh;
    if(side === FRONT_SIDE) {
      centerPieceMesh = this.pieces[FRONT_LAYER][4].mesh;
    }

    console.log(centerPieceMesh);

    // Find other 8 pieces for that side and attach them as children to the center
    if(side === FRONT_SIDE) {
      centerPieceMesh.add(this.pieces[FRONT_LAYER][0].mesh);
      centerPieceMesh.add(this.pieces[FRONT_LAYER][1].mesh);
      centerPieceMesh.add(this.pieces[FRONT_LAYER][2].mesh);
      centerPieceMesh.add(this.pieces[FRONT_LAYER][3].mesh);
      centerPieceMesh.add(this.pieces[FRONT_LAYER][5].mesh);
      centerPieceMesh.add(this.pieces[FRONT_LAYER][6].mesh);
      centerPieceMesh.add(this.pieces[FRONT_LAYER][7].mesh);
      centerPieceMesh.add(this.pieces[FRONT_LAYER][8].mesh);
    }

    // Get the right axis
    let axis;
    if (side === FRONT_SIDE) {
      axis = new THREE.Vector3(1, 0, 0);
    } else if (side === BACK_SIDE) {
      axis = new THREE.Vector3(0, 0, -1);
    }

    // Start rotating the center
    this.rotating = {
      active: true,
      center: centerPieceMesh,
      axis: axis,
    }
    //
    // this.rotating = {
    //   active: true,
    //   center: centerPiece,
    //   // pieces: this.getPiecesForSide(side),
    //   // totalRad: (numRotations * (Math.PI / 2)),
    //   // axis: axis,
    //   // progress: 0,
    // };
    //
    // console.log(this.rotating);
  }

  update() {
    if (this.rotating.active) {

      // Rotate the center by 1 tick
      let center = this.rotating.center;
      let axis = this.rotating.axis;
      let rad = ROTATION_STEP;
      center.rotateOnAxis(axis, rad);

      // Rotate the piece
      // this.rotating.pieces.forEach(piece => {
      //   piece.rotate({
      //     // axis: this.rotating.axis,
      //     axis: this.pieces[BACK_LAYER][5].getPosAsVector(),
      //     rad: this.rotating.totalRad,
      //     progress: this.rotating.progress,
      //   });
      // });
      //
      // this.rotating.progress += ROTATION_STEP;
      // if(this.rotating.progress >= 1) {
      //   this.rotating = {
      //     active: false,
      //     totalRad: 0,
      //     progress: 0,
      //   };
      // }
    }


    this.pieces.forEach(layer => {
      layer.forEach(piece => {
        piece.update();
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

  constructor({ scene, geometry, x = 0, y = 0, z = 0, color, mesh }) {

    // Physical properties
    this.initPos = [x, y, z];
    this.color = color || 0xFFFFFF;
    this.material = mesh || new THREE.MeshBasicMaterial({ color: this.color });
    this.mesh = new THREE.Mesh(geometry, this.material);
    this.setMeshPos({x,y,z});
    scene.add(this.mesh);
  }

  rotate({axis, rad}) {
    this.mesh.rotateOnAxis(axis, rad);
  }

  // rotate({axis, rad, progress}) {
  //   this.rotateSlerp(this.mesh, rad, axis, progress)
  // }
  //
  // rotateSlerp( object, rad, axis, progress ) {
  //   let q = new THREE.Quaternion();
  //   console.log(rad);
  //   console.log(progress);
  //   q.setFromAxisAngle(axis, rad );
  //   // q.normalize();
  //   object.quaternion.slerp( q, progress );
  // }

  update() {
    this.setMeshPos({});
  }

  getPosAsVector() {
    return this.mesh.position;
  }

  setMeshPos({x,y,z}) {
    if(x) this.mesh.position.x = x;
    if(y) this.mesh.position.y = y;
    if(z) this.mesh.position.z = z;
  }
}