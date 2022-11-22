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
import { FlowField, Particle } from "./FlowField.js";

function main() {

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
  const canvasWidth  = isMobile() ? window.innerWidth : window.innerWidth - 400;
  const canvasHeight = window.innerHeight;
  const fov          = 70;
  const aspect       = canvasWidth / canvasHeight;
  const near         = 0.1;
  const far          = 10000;

  // Frame
  let X_MIN = 0;
  let X_MAX = 100;
  let Y_MIN = 0;
  let Y_MAX = 100;
  let Z_MIN = 0;
  let Z_MAX = 100;

  // Light
  const lightColor     = 0xFFFFFF;
  const lightIntensity = 0.8;

  // Scene
  const RANDOM_COLORS  = true;
  const PARTICLE_COLOR = 0xFFFFFF;
  const PARTICLE_SIZE  = 1;
  const FIELD_RES      = 1;
  const MIN_SPEED      = 0.1;
  const MAX_SPEED      = 0.5;
  const MIN_FORCE      = 0.01;
  const MAX_FORCE      = 0.1;
  const DRAW_FRAME     = true;

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

        // Start by creating a scene
  const scene  = new THREE.Scene();
  const canvas = document.querySelector("#canvas");

  // Create canvas
  const renderer = createRenderer({THREE: THREE, canvas: canvas, AA: true});

  // Create camera and move it back slightly
  const camera      = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.x = 500;
  camera.position.y = 300;
  camera.position.z = -1000;

  // Create controls
  const controls = new OrbitControls(camera, canvas);

  // Create a light
  const light = new THREE.AmbientLight(lightColor, lightIntensity);
  scene.add(light);

  /***
   *
   *    88888888888  88888888ba          db         88b           d88  88888888888
   *    88           88      "8b        d88b        888b         d888  88
   *    88           88      ,8P       d8'`8b       88`8b       d8'88  88
   *    88aaaaa      88aaaaaa8P'      d8'  `8b      88 `8b     d8' 88  88aaaaa
   *    88"""""      88""""88'       d8YaaaaY8b     88  `8b   d8'  88  88"""""
   *    88           88    `8b      d8""""""""8b    88   `8b d8'   88  88
   *    88           88     `8b    d8'        `8b   88    `888'    88  88
   *    88           88      `8b  d8'          `8b  88     `8'     88  88888888888
   *
   *
   */


        // Create a Geometry
  let points = [];
  points.push(new THREE.Vector3(X_MIN, Y_MIN, Z_MAX));
  points.push(new THREE.Vector3(X_MIN, Y_MAX, Z_MAX));
  points.push(new THREE.Vector3(X_MAX, Y_MAX, Z_MAX));
  points.push(new THREE.Vector3(X_MAX, Y_MIN, Z_MAX));
  points.push(new THREE.Vector3(X_MIN, Y_MIN, Z_MAX));

  points.push(new THREE.Vector3(X_MIN, Y_MIN, Z_MIN));
  points.push(new THREE.Vector3(X_MAX, Y_MIN, Z_MIN));
  points.push(new THREE.Vector3(X_MAX, Y_MIN, Z_MAX));

  points.push(new THREE.Vector3(X_MAX, Y_MAX, Z_MAX));
  points.push(new THREE.Vector3(X_MAX, Y_MAX, Z_MIN));
  points.push(new THREE.Vector3(X_MIN, Y_MAX, Z_MIN));
  points.push(new THREE.Vector3(X_MIN, Y_MAX, Z_MAX));

  points.push(new THREE.Vector3(X_MIN, Y_MIN, Z_MAX));
  points.push(new THREE.Vector3(X_MIN, Y_MIN, Z_MIN));
  points.push(new THREE.Vector3(X_MIN, Y_MAX, Z_MIN));
  points.push(new THREE.Vector3(X_MAX, Y_MAX, Z_MIN));
  points.push(new THREE.Vector3(X_MAX, Y_MIN, Z_MIN));

  let frame    = {
    points  : points,
    geometry: new THREE.BufferGeometry().setFromPoints(points)
  };
  frame.object = new THREE.Line(frame.geometry);
  if (DRAW_FRAME) scene.add(frame.object);

  /***
   *
   *     ad88888ba   88      a8P   88888888888  888888888888  ,ad8888ba,   88        88
   *    d8"     "8b  88    ,88'    88                88      d8"'    `"8b  88        88
   *    Y8,          88  ,88"      88                88     d8'            88        88
   *    `Y8aaaaa,    88,d88'       88aaaaa           88     88             88aaaaaaaa88
   *      `"""""8b,  8888"88,      88"""""           88     88             88""""""""88
   *            `8b  88P   Y8b     88                88     Y8,            88        88
   *    Y8a     a8P  88     "88,   88                88      Y8a.    .a8P  88        88
   *     "Y88888P"   88       Y8b  88888888888       88       `"Y8888Y"'   88        88
   *
   *
   */
  const circle = {
    geometry: new THREE.SphereGeometry(PARTICLE_SIZE, 64, 64),
  };

  let field = new FlowField({
    res   : FIELD_RES,
    width : X_MAX,
    height: Y_MAX,
    depth : Z_MAX,
  });

  let particles = [];
  for (let i = 0; i < 1000; i++) {
    particles.push(new Particle({
      scene   : scene,
      geometry: circle.geometry,
      x       : map(Math.random(), 0, 1, X_MIN, X_MAX),
      y       : map(Math.random(), 0, 1, Y_MIN, Y_MAX),
      z       : map(Math.random(), 0, 1, Z_MIN, Z_MAX),
      ms      : map(Math.random(), 0, 1, MIN_SPEED, MAX_SPEED),
      mf      : map(Math.random(), 0, 1, MIN_FORCE, MAX_FORCE),
      color   : RANDOM_COLORS ? null : PARTICLE_COLOR
    }));
  }

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
    particles.forEach(particle => {
      particle.follow(field);
      particle.update();
      particle.borders({
        xmin: X_MIN,
        xmax: X_MAX,
        ymin: Y_MIN,
        ymax: Y_MAX,
        zmin: Z_MIN,
        zmax: Z_MAX,
      });
    });

    // Update the scene + restart the loop
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  // Start the render loop
  requestAnimationFrame(render);
}

main();