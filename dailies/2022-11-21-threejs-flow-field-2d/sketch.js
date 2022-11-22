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

/***
 *
 *    88888888888  88           ,ad8888ba,   I8,        8        ,8I     88888888888  88  88888888888  88           88888888ba,
 *    88           88          d8"'    `"8b  `8b       d8b       d8'     88           88  88           88           88      `"8b
 *    88           88         d8'        `8b  "8,     ,8"8,     ,8"      88           88  88           88           88        `8b
 *    88aaaaa      88         88          88   Y8     8P Y8     8P       88aaaaa      88  88aaaaa      88           88         88
 *    88"""""      88         88          88   `8b   d8' `8b   d8'       88"""""      88  88"""""      88           88         88
 *    88           88         Y8,        ,8P    `8a a8'   `8a a8'        88           88  88           88           88         8P
 *    88           88          Y8a.    .a8P      `8a8'     `8a8'         88           88  88           88           88      .a8P
 *    88           88888888888  `"Y8888Y"'        `8'       `8'          88           88  88888888888  88888888888  88888888Y"'
 *
 *
 */
class FlowField {

  constructor({res, width, height}) {
    this.resolution = res || 100;
    this.cols       = width / this.resolution;
    this.rows       = height / this.resolution;
    this.field      = this.make2Darray(this.cols);
    this.init();
  }

  make2Darray(n) {
    let array = [];
    for (let i = 0; i < n; i++) {
      array[i] = [];
    }
    return array;
  }

  init() {
    noiseSeed(100);

    let xoff = 0;
    for (let i = 0; i < this.cols; i++) {

      let yoff = 0;
      for (let j = 0; j < this.rows; j++) {

        let theta = map(noise(xoff, yoff), 0, 1, 1, Math.PI * 2);

        // Polar to cartesian coordinate transformation to get x and y components of the vector
        this.field[i][j] = new THREE.Vector3(Math.cos(theta), Math.sin(theta), 0);

        // Increment yoff
        yoff += 0.1;
      }

      // Increment xoff
      xoff += 0.1;
    }
  }

  lookup(lookup) {
    let column = Math.floor(constrain(lookup.x / this.resolution, 0, this.cols - 1));
    let row    = Math.floor(constrain(lookup.y / this.resolution, 0, this.rows - 1));
    return this.field[column][row];
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
class Particle {
  constructor({scene, geometry, x, y, ms, mf}) {
    // this.position     = THREE.Vector3(x, y, 0);
    this.acceleration = new THREE.Vector3();
    this.velocity     = new THREE.Vector3();
    this.r            = 4;
    this.maxSpeed     = ms || 4;
    this.maxForce     = mf || 0.1;

    // Create mesh
    this.color    = new THREE.Color(Math.random(), Math.random(), Math.random());
    this.material = new THREE.MeshBasicMaterial({color: this.color});
    this.mesh     = new THREE.Mesh(geometry, this.material);
    this.mesh.position.copy(new THREE.Vector3(x, y, 0));
    scene.add(this.mesh);
  }

  follow(flow) {
    let desired = flow.lookup(this.mesh.position);
    desired.multiplyScalar(this.maxSpeed);
    desired.sub(this.velocity);
    desired.clampLength(0, this.maxForce);
    this.acceleration.add(desired);
  }

  update() {
    this.velocity.add(this.acceleration);
    // this.velocity.clampLength(0, this.maxSpeed);

    this.mesh.position.add(this.velocity);

    this.acceleration.multiplyScalar(0);
  }

  borders({xmin, xmax, ymin, ymax}) {
    if (this.mesh.position.x < xmin) this.mesh.position.x = xmax;
    if (this.mesh.position.y < ymin) this.mesh.position.y = ymax;

    if (this.mesh.position.x > xmax) this.mesh.position.x = xmin;
    if (this.mesh.position.y > ymax) this.mesh.position.y = ymin;
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
  let X_MAX = 500;
  let Y_MIN = 0;
  let Y_MAX = 500;
  let Z_MIN = 0;
  let Z_MAX = 500;

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
  scene.add(frame.object);

  const circle = {
    geometry: new THREE.SphereGeometry(2, 16, 16),
  };

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
  let field = new FlowField({
    res   : 0.1,
    width : X_MAX,
    height: Y_MAX,
  });


  let particles = [];
  for (let i = 0; i < 200; i++) {
    particles.push(new Particle({
      scene   : scene,
      geometry: circle.geometry,
      x       : map(Math.random(), 0, 1, X_MIN, X_MAX),
      y       : map(Math.random(), 0, 1, Y_MIN, Y_MAX),
      ms      : map(Math.random(), 0, 1, 2, 8),
      mf      : map(Math.random(), 0, 1, 0.1, 1),
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

    // Get the time in seconds
    time *= 0.001;

    particles.forEach(particle => {
      particle.follow(field);
      particle.update();
      particle.borders({
        xmin: X_MIN,
        xmax: X_MAX,
        ymin: Y_MIN,
        ymax: Y_MAX,
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