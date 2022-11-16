import * as THREE from "https://threejs.org/build/three.module.js";

function main() {

  /*************
   * Constants *
   *************/

    // Camera
  const fov = 75;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 100;

  // Geometry
  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;

  // Mesh
  const materialColor = 0x44aa88;

  // Light
  const lightColor = 0xFFFFF;
  const lightIntensity = 1;


  /**
   * ____ ___ ____ ____ ____    ___ _  _ ____    ____ ____ ____ _  _ ____
   * [__   |  |__| | __ |___     |  |__| |___    [__  |    |___ |\ | |___
   * ___]  |  |  | |__] |___     |  |  | |___    ___] |___ |___ | \| |___
   */

    // Create canvas
  const canvas = document.querySelector("#canvas");
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Create camera and move it back slightly
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 10;

  // Create scene
  const scene = new THREE.Scene();

  // Create a Geometry
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  // Create a Material
  const material = new THREE.MeshPhongMaterial({ color: materialColor });

  // Create a mesh
  const cubes = [
    makeInstance(geometry, 0x44aa88, 0),
    makeInstance(geometry, 0x8844aa, -2),
    makeInstance(geometry, 0xaa8844, 2),
  ];

  // Create a light
  const light = new THREE.DirectionalLight(lightColor, lightIntensity);
  light.position.set(-1, 2, 4);
  scene.add(light);

  /* ____ ____ _  _ ___  ____ ____
   * |__/ |___ |\ | |  \ |___ |__/
   * |  \ |___ | \| |__/ |___ |  \
   */
  function render(time) {

    // Get the time in seconds
    time *= 0.001;

    // Set the cube rotation to the time in seconds
    cubes.forEach((cube, i) => {
      const speed = 1 + (i * 0.1);
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });

    // Update the scene
    renderer.render(scene, camera);

    // Get the next frame and restart the loop
    requestAnimationFrame(render);
  }

  // Start the render loop
  requestAnimationFrame(render);

  function makeInstance(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({ color });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    cube.position.x = x;
    return cube;
  }
}


main();
