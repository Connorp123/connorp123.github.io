/*** Comments are Univers ASCII art
 *
 *    88  88b           d88  88888888ba     ,ad8888ba,    88888888ba  888888888888  ad88888ba
 *    88  888b         d888  88      "8b   d8"'    `"8b   88      "8b      88      d8"     "8b
 *    88  88`8b       d8'88  88      ,8P  d8'        `8b  88      ,8P      88      Y8,
 *    88  88 `8b     d8' 88  88aaaaaa8P'  88          88  88aaaaaa8P'      88      `Y8aaaaa,
 *    88  88  `8b   d8'  88  88""""""'    88          88  88""""88'        88        `"""""8b,
 *    88  88   `8b d8'   88  88           Y8,        ,8P  88    `8b        88              `8b
 *    88  88    `888'    88  88            Y8a.    .a8P   88     `8b       88      Y8a     a8P
 *    88  88     `8'     88  88             `"Y8888Y"'    88      `8b      88       "Y88888P"
 *
 *
 */

import * as THREE from "https://threejs.org/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js";


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

class Particle {

  constructor({ scene, geometry, x = 0, y = 0, z = 0, color, mesh }) {

    // Physical properties
    this.pos = [x, y, z];
    this.color = color || 0xFFFFFF;
    this.material = mesh || new THREE.MeshBasicMaterial({ color: this.color });
    this.mesh = new THREE.Mesh(geometry, this.material);
    this.setMeshPos();
    scene.add(this.mesh);

    // Physics properties
    this.vel = [0, 0, 0];
    this.acc = [0, 0, 0];
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

/***
 *
 *    88b           d88         db         88  888b      88
 *    888b         d888        d88b        88  8888b     88
 *    88`8b       d8'88       d8'`8b       88  88 `8b    88
 *    88 `8b     d8' 88      d8'  `8b      88  88  `8b   88
 *    88  `8b   d8'  88     d8YaaaaY8b     88  88   `8b  88
 *    88   `8b d8'   88    d8""""""""8b    88  88    `8b 88
 *    88    `888'    88   d8'        `8b   88  88     `8888
 *    88     `8'     88  d8'          `8b  88  88      `888
 *
 *
 */

// Read Run

// F

function main() {

  // Start by creating a scene
  const scene = new THREE.Scene();
  const canvas = document.querySelector("#canvas");

  /***
   *
   *      ,ad8888ba,    ,ad8888ba,    888b      88   ad88888ba  888888888888    db         888b      88  888888888888  ad88888ba
   *     d8"'    `"8b  d8"'    `"8b   8888b     88  d8"     "8b      88        d88b        8888b     88       88      d8"     "8b
   *    d8'           d8'        `8b  88 `8b    88  Y8,              88       d8'`8b       88 `8b    88       88      Y8,
   *    88            88          88  88  `8b   88  `Y8aaaaa,        88      d8'  `8b      88  `8b   88       88      `Y8aaaaa,
   *    88            88          88  88   `8b  88    `"""""8b,      88     d8YaaaaY8b     88   `8b  88       88        `"""""8b,
   *    Y8,           Y8,        ,8P  88    `8b 88          `8b      88    d8""""""""8b    88    `8b 88       88              `8b
   *     Y8a.    .a8P  Y8a.    .a8P   88     `8888  Y8a     a8P      88   d8'        `8b   88     `8888       88      Y8a     a8P
   *      `"Y8888Y"'    `"Y8888Y"'    88      `888   "Y88888P"       88  d8'          `8b  88      `888       88       "Y88888P"
   *
   *
   */

    // Camera
  const fov = 50;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 10000;
  const cameraDistance = 100;

  // Geometry
  const boxWidth = 10;
  const boxHeight = 10;
  const boxDepth = 10;

  // Mesh
  // const materialColor = 0x44aa88;

  // Light
  const lightColor = 0xFFFFFF;
  const lightIntensity = 1;

  // Rubix
  const B = 0;
  const R = 1;
  const W = 2;
  const O = 3;
  const Y = 4;
  const G = 5;

  const FRONT = 0;
  const LEFT = 1;
  const UP = 2;
  const RIGHT = 3;
  const DOWN = 4;
  const BACK = 5;

  const COLORS = new Array(6);
  COLORS[Y] = new THREE.Color(0xFFFF00);
  COLORS[B] = new THREE.Color(0x0000FF);
  COLORS[R] = new THREE.Color(0xFF0000);
  COLORS[G] = new THREE.Color(0x00FF00);
  COLORS[O] = new THREE.Color(0xFF6600);
  COLORS[W] = new THREE.Color(0xFFFFFF);

  const NUM_CUBES = 27;
  const NUM_CENTERS = 6;
  const NUM_EDGES = 12;
  const NUM_CORNERS = 8;

  /*
      Side:
          Corner  Edge    Corner
          Edge    Center  Edge
          Corner  Edge    Corner
   */

  /***
   *
   *     ad88888ba   88888888888  888888888888  88        88  88888888ba
   *    d8"     "8b  88                88       88        88  88      "8b
   *    Y8,          88                88       88        88  88      ,8P
   *    `Y8aaaaa,    88aaaaa           88       88        88  88aaaaaa8P'
   *      `"""""8b,  88"""""           88       88        88  88""""""'
   *            `8b  88                88       88        88  88
   *    Y8a     a8P  88                88       Y8a.    .a8P  88
   *     "Y88888P"   88888888888       88        `"Y8888Y"'   88
   *
   *
   */

    // Read JSON
  let runs = [];
  let states = [];
  let currentState = 0;
  fetch("./states.json")
    .then(res => res.json())
    .then(data => {
      runs = data["runs"];
      states = runs[0];
      console.log(states[currentState]);
    }).catch(err => {
    alert(err);
  });


  // Create canvas
  const renderer = createRenderer({ THREE: THREE, canvas: canvas });

  // Create camera and move it back slightly
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.x = -65;
  camera.position.y = 80;
  camera.position.z = -65;

  // Create controls
  const controls = new OrbitControls(camera, canvas);

  // Create a Geometry
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  // Create a mesh
  const cubes = [];

  // For each layer

  let OFFSET_1 = 0;
  let OFFSET_2 = 11;
  let OFFSET_3 = 22;

  let locations = [

    // Layer 1
    [OFFSET_1, OFFSET_1, OFFSET_1],
    [OFFSET_1, OFFSET_2, OFFSET_1],
    [OFFSET_1, OFFSET_3, OFFSET_1],
    [OFFSET_1, OFFSET_1, OFFSET_2],
    [OFFSET_1, OFFSET_2, OFFSET_2],
    [OFFSET_1, OFFSET_3, OFFSET_2],
    [OFFSET_1, OFFSET_1, OFFSET_3],
    [OFFSET_1, OFFSET_2, OFFSET_3],
    [OFFSET_1, OFFSET_3, OFFSET_3],

    // Layer 2
    [OFFSET_2, OFFSET_1, OFFSET_1],
    [OFFSET_2, OFFSET_2, OFFSET_1],
    [OFFSET_2, OFFSET_3, OFFSET_1],
    [OFFSET_2, OFFSET_1, OFFSET_2],
    [OFFSET_2, OFFSET_2, OFFSET_2],
    [OFFSET_2, OFFSET_3, OFFSET_2],
    [OFFSET_2, OFFSET_1, OFFSET_3],
    [OFFSET_2, OFFSET_2, OFFSET_3],
    [OFFSET_2, OFFSET_3, OFFSET_3],

    // Layer 3
    [OFFSET_3, OFFSET_1, OFFSET_1],
    [OFFSET_3, OFFSET_2, OFFSET_1],
    [OFFSET_3, OFFSET_3, OFFSET_1],
    [OFFSET_3, OFFSET_1, OFFSET_2],
    [OFFSET_3, OFFSET_2, OFFSET_2],
    [OFFSET_3, OFFSET_3, OFFSET_2],
    [OFFSET_3, OFFSET_1, OFFSET_3],
    [OFFSET_3, OFFSET_2, OFFSET_3],
    [OFFSET_3, OFFSET_3, OFFSET_3],
  ];


  // Center = (# - 4) % 9 == 0
  let isCenterSquare = (n) => (n - 4) % 9 === 0;

  let CENTER_CUBES = new Set([4, 10, 12, 14, 16, 22]);
  let EDGE_CUBES = new Set([1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25]);
  let CORNER_CUBES = new Set([0, 2, 6, 8, 18, 20, 24, 26]);

  let color, materials;

  // Draw each cube
  for (let c = 0; c < locations.length; c++) {

    let sideIndex = Math.floor(c / 9);

    if (sideIndex === 0) {

      // Square 0 size 0
      if (c % 9 === 2) {

        // Need to set side 0,1,2

        materials = [
          new THREE.MeshBasicMaterial({ color: 0x000000 }), // Side 5
          new THREE.MeshBasicMaterial({ color: 0xffffff }), // Side 0
          new THREE.MeshBasicMaterial({ color: 0xffffff }), // Side 2
          new THREE.MeshBasicMaterial({ color: 0x000000 }), // Side 4
          new THREE.MeshBasicMaterial({ color: 0x000000 }), // Side 3
          new THREE.MeshBasicMaterial({ color: 0xffffff }), // Side 1
        ];
      } else {
        materials = [
          new THREE.MeshBasicMaterial({ color: 0x000000 }),
          new THREE.MeshBasicMaterial({ color: 0xffffff }),
          new THREE.MeshBasicMaterial({ color: 0x000000 }),
          new THREE.MeshBasicMaterial({ color: 0x000000 }),
          new THREE.MeshBasicMaterial({ color: 0x000000 }),
          new THREE.MeshBasicMaterial({ color: 0x000000 }),
        ];
      }
      cubes.push(new Particle({
        scene: scene,
        geometry: geometry,
        x: locations[c][0],
        y: locations[c][1],
        z: locations[c][2],
        mesh: materials,
      }));

    } else {


      if (CENTER_CUBES.has(c)) {
        console.log(`Center: ${c}`);
        color = COLORS[Y];

      } else if (EDGE_CUBES.has(c)) {
        console.log(`Edge: ${c}`);
        color = COLORS[G];

      } else if (CORNER_CUBES.has(c)) {
        console.log(`Corner: ${c}`);
        color = COLORS[B];
      } else {
        console.log("Middle cell");
        color = COLORS[W];
      }

      // let materials = [
      //     new THREE.MeshBasicMaterial({color: 0xff0000}),
      //     new THREE.MeshBasicMaterial({color: 0x00ff00}),
      //     new THREE.MeshBasicMaterial({color: 0x0000ff}),
      //     new THREE.MeshBasicMaterial({color: 0xff00ff}),
      //     new THREE.MeshBasicMaterial({color: 0x00ffff}),
      //     new THREE.MeshBasicMaterial({color: 0xffff00})
      // ];

      cubes.push(new Particle({
        scene: scene,
        geometry: geometry,
        x: locations[c][0],
        y: locations[c][1],
        z: locations[c][2],
        color: color,
      }));
    }
  }

  // Create a light
  const light = new THREE.AmbientLight(lightColor, lightIntensity);
  scene.add(light);

  /***
   *
   *    88888888ba   88888888888  888b      88  88888888ba,    88888888888  88888888ba
   *    88      "8b  88           8888b     88  88      `"8b   88           88      "8b
   *    88      ,8P  88           88 `8b    88  88        `8b  88           88      ,8P
   *    88aaaaaa8P'  88aaaaa      88  `8b   88  88         88  88aaaaa      88aaaaaa8P'
   *    88""""88'    88"""""      88   `8b  88  88         88  88"""""      88""""88'
   *    88    `8b    88           88    `8b 88  88         8P  88           88    `8b
   *    88     `8b   88           88     `8888  88      .a8P   88           88     `8b
   *    88      `8b  88888888888  88      `888  88888888Y"'    88888888888  88      `8b
   *
   *
   */
  class CustomDelay {
    constructor() {
      this.timer = null;
    }

    Timeout(fun = () => {
    }, ms) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        fun();
      }, ms);
    }
  }

  const myDelay = new CustomDelay();
  window.addEventListener("click", function() {
    console.log("Clicked");
    myDelay.Timeout(() => {
      console.log("DELAY");
      console.log(camera.position);
    }, 1000);
  });

  function render(time) {

    // Get the time in seconds
    time *= 0.001;

    // Set the cube rotation to the time in seconds
    cubes.forEach(cube => {
      cube.update();
    });

    // myDelay.Timeout(() => {
    //     console.log('Orbit changed');
    // }, 1000);

    // Update the scene
    renderer.render(scene, camera);

    // Get the next frame and restart the loop
    requestAnimationFrame(render);
  }

  // Start the render loop
  requestAnimationFrame(render);
}

main();