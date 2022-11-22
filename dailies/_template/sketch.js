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

  constructor({scene, geometry, x = 0, y = 0, z = 0}) {

    // Physical properties
    this.pos      = [x, y, z];
    this.color    = new THREE.Color(Math.random(), Math.random(), Math.random());
    this.material = new THREE.MeshPhongMaterial({color: this.color});
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
    let attractionPoint = [0, 0, 0];

    // Point acceleration
    this.acc = vectorLimit(vectorSub(attractionPoint, this.pos), this.maxAcc);
    // this.acc = vectorLimit(this.acc, this.maxAcc);

    // Update vel
    this.vel = vectorLimit(vectorAdd(this.vel, this.acc), this.maxVel);
    // this.vel = vectorLimit(this.vel, this.maxVel);

    // Update position
    this.pos = vectorAdd(this.pos, this.vel);
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

function main() {

  // Start by creating a scene
  const scene  = new THREE.Scene();
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
  const fov            = 75;
  const aspect         = window.innerWidth / window.innerHeight;
  const near           = 0.1;
  const far            = 10000;
  const cameraDistance = 100;

  // Geometry
  const boxWidth  = 1;
  const boxHeight = 1;
  const boxDepth  = 1;

  // Mesh
  // const materialColor = 0x44aa88;

  // Light
  const lightColor     = 0xFFFFFF;
  const lightIntensity = 1;

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

        // Create canvas
  const renderer = createRenderer({THREE: THREE});

  // Create camera and move it back slightly
  const camera      = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.x = 4;
  camera.position.y = 10;
  camera.position.z = cameraDistance;

  // Create controls
  const controls = new OrbitControls(camera, canvas);

  // Create a Geometry
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  // Create a mesh
  const cubes = [];

  for (let i = 0; i < 500; i++) {
    cubes.push(new Particle({
      scene   : scene,
      geometry: geometry,
      x       : Math.floor(Math.random() * 100) - 50,
      y       : Math.floor(Math.random() * 100) - 50,
      z       : Math.floor(Math.random() * 100) - 50,
    }));
  }

  // Create a light
  const light = new THREE.DirectionalLight(lightColor, lightIntensity);
  light.position.set(2, 2, 5);
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
  function render(time) {

    // Get the time in seconds
    time *= 0.001;

    // Set the cube rotation to the time in seconds
    cubes.forEach(cube => {
      cube.update();
    });

    // Update the scene
    renderer.render(scene, camera);

    // Get the next frame and restart the loop
    requestAnimationFrame(render);
  }

  // Start the render loop
  requestAnimationFrame(render);
}

main();