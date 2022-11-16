import * as THREE from "https://threejs.org/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js";

function main() {

  // Start by creating a scene
  const scene = new THREE.Scene();
  const canvas = document.querySelector("#canvas");

  // Mouse controls
  // let mouse = [0, 0, 0];
  // canvas.addEventListener("mousemove", (event) => {
  //   mouse[0] = event.clientX;
  //   mouse[1] = event.clientY;
  // }, false);

  /**
   * ______               _    _        _
   * | ___ \             | |  (_)      | |
   * | |_/ /  __ _  _ __ | |_  _   ___ | |  ___
   * |  __/  / _` || '__|| __|| | / __|| | / _ \
   * | |    | (_| || |   | |_ | || (__ | ||  __/
   * \_|     \__,_||_|    \__||_| \___||_| \___|
   *
   */

  class Particle {

    constructor(geometry, x, y = 0, z = 0) {

      // Physical properties
      this.pos = [x, y, z];
      this.color = new THREE.Color(
        Math.random(), Math.random(), Math.random(),
      );
      console.log(this.color.getHex());
      this.material = new THREE.MeshPhongMaterial({ color: this.color });
      this.mesh = new THREE.Mesh(geometry, this.material);
      this.setMeshPos();
      scene.add(this.mesh);

      // Physics properties
      this.vel = [0, 0, 0];
      this.acc = [0, 0, 0];
      this.maxVel = 3;
      this.maxAcc = 0.01;
    }

    update(t = 3) {

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

  /**
   *  _____                     _                  _
   * /  __ \                   | |                | |
   * | /  \/  ___   _ __   ___ | |_   __ _  _ __  | |_  ___
   * | |     / _ \ | '_ \ / __|| __| / _` || '_ \ | __|/ __|
   * | \__/\| (_) || | | |\__ \| |_ | (_| || | | || |_ \__ \
   *  \____/ \___/ |_| |_||___/ \__| \__,_||_| |_| \__||___/
   *
   */

    // Camera
  const fov = 75;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 10000;
  const cameraDistance = 100;

  // Geometry
  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;

  // Mesh
  // const materialColor = 0x44aa88;

  // Light
  const lightColor = 0xFFFFFF;
  const lightIntensity = 1;

  /**
   *  _____                            _____        _
   * /  ___|                          /  ___|      | |
   * \ `--.   ___   ___  _ __    ___  \ `--.   ___ | |_  _   _  _ __
   *  `--. \ / __| / _ \| '_ \  / _ \  `--. \ / _ \| __|| | | || '_ \
   * /\__/ /| (__ |  __/| | | ||  __/ /\__/ /|  __/| |_ | |_| || |_) |
   * \____/  \___| \___||_| |_| \___| \____/  \___| \__| \__,_|| .__/
   *                                                           | |
   *                                                           |_|
   */

    // Create canvas
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Create camera and move it back slightly
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
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
    cubes.push(new Particle(
      geometry,
      Math.floor(Math.random() * 100) - 50,
      Math.floor(Math.random() * 100) - 50,
      Math.floor(Math.random() * 100) - 50,
    ));
  }

  // Create a light
  const light = new THREE.DirectionalLight(lightColor, lightIntensity);
  light.position.set(2, 2, 5);
  scene.add(light);

  /**
   * ______                   _
   * | ___ \                 | |
   * | |_/ /  ___  _ __    __| |  ___  _ __
   * |    /  / _ \| '_ \  / _` | / _ \| '__|
   * | |\ \ |  __/| | | || (_| ||  __/| |
   * \_| \_| \___||_| |_| \__,_| \___||_|
   */
  function render(time) {

    // Get the time in seconds
    time *= 0.001;

    // Set the cube rotation to the time in seconds
    cubes.forEach((cube, i) => {
      cube.update();
    });

    // Update the scene
    renderer.render(scene, camera);

    // Get the next frame and restart the loop
    requestAnimationFrame(render);
  }

  // Start the render loop
  requestAnimationFrame(render);

  /**
   *  _   _        _
   * | | | |      | |
   * | |_| |  ___ | | _ __    ___  _ __  ___
   * |  _  | / _ \| || '_ \  / _ \| '__|/ __|
   * | | | ||  __/| || |_) ||  __/| |   \__ \
   * \_| |_/ \___||_|| .__/  \___||_|   |___/
   *                 | |
   *                 |_|
   */
  function vectorSub(v1, v2) {
    if (v1.length < 3 || v2.length < 3) return v1;

    return [
      v1[0] - v2[0],
      v1[1] - v2[1],
      v1[2] - v2[2],
    ];
  }

  function vectorAdd(v1, v2) {
    if (v1.length < 3 || v2.length < 3) return v1;

    return [
      v1[0] + v2[0],
      v1[1] + v2[1],
      v1[2] + v2[2],
    ];
  }

  function vectorLimit(v, limit) {
    if (v.length < 3) return v;

    v[0] = v[0] > limit ? limit : v[0] < (-1 * limit) ? (-1 * limit) : v[0];
    v[1] = v[1] > limit ? limit : v[1] < (-1 * limit) ? (-1 * limit) : v[1];
    v[2] = v[2] > limit ? limit : v[2] < (-1 * limit) ? (-1 * limit) : v[2];

    return v;
  }
}

main();