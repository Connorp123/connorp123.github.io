/***
 * Useful info:
 *
 *     const NUM_CUBES   = 27;
 *     const NUM_CENTERS = 6;
 *     const NUM_EDGES   = 12;
 *     const NUM_CORNERS = 8;
 *
 *
 *         Possible validations
 *             Edge can't have two colors next to each other
 *             Only 9 of each color
 */

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

// import * as THREE from "https://threejs.org/build/three.module.js";
// import {OrbitControls} from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js";
import * as THREE from "./../lib/three.module.js";
import { OrbitControls } from "../lib/OrbitControls.js";
import { Cube } from "../classes/Cube.js";

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
  const fov          = 50;
  const aspect       = window.innerWidth / window.innerHeight;
  const near         = 0.1;
  const far          = 10000;
  const CAMERA_START = {
    x: -80,
    y: 30,
    z: -10
  };

  // Geometry
  const boxWidth  = 10;
  const boxHeight = 10;
  const boxDepth  = 10;

  // Light
  const lightColor     = 0xFFFFFF;
  const lightIntensity = 1;

  const DEBUG = false;

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
  const renderer = createRenderer({THREE: THREE, canvas: canvas, AA: true});

  // Create camera and move it back slightly
  const camera      = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.x = CAMERA_START.x;
  camera.position.y = CAMERA_START.y;
  camera.position.z = CAMERA_START.z;

  // Create controls
  const controls = new OrbitControls(camera, canvas);

  // Create a Geometry
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  // Create a light
  const light = new THREE.AmbientLight(lightColor, lightIntensity);
  scene.add(light);

  // Axis help
  if(DEBUG){
    const axesHelper = new THREE.AxesHelper(500);
    scene.add(axesHelper);
  }


  /***
   *
   *    88           ,ad8888ba,         db         88888888ba,
   *    88          d8"'    `"8b       d88b        88      `"8b
   *    88         d8'        `8b     d8'`8b       88        `8b
   *    88         88          88    d8'  `8b      88         88
   *    88         88          88   d8YaaaaY8b     88         88
   *    88         Y8,        ,8P  d8""""""""8b    88         8P
   *    88          Y8a.    .a8P  d8'        `8b   88      .a8P
   *    88888888888  `"Y8888Y"'  d8'          `8b  88888888Y"'
   *
   *
   */

    // Read JSON
  let runs              = [];
  let states            = [];
  let currentStateIndex = 0;
  let cube;
  fetch("./../resources/rubiks-states.json")
    .then(res => res.json())
    .then(data => {
      runs = data["runs"];
      states = runs[0];
      cube = new Cube({
        state: states[0],
        scene: scene,
        geometry: geometry,
      });
      cube.startRotation({
        side: 1,
        numRotations: 3,
      });
    }).catch(err => {
    alert(err);
  });


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
    if (cube) {
      cube.update();
    }

    // Update the scene
    renderer.render(scene, camera);

    // Get the next frame and restart the loop
    requestAnimationFrame(render);
  }

  // Start the render loop
  requestAnimationFrame(render);
}

main();