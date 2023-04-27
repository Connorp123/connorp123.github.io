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
import {OrbitControls} from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js";
import {Particle, ParticleTrail} from "./Particle.js";

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
    const fov    = 55;
    const aspect = window.innerWidth / window.innerHeight;
    const near   = 0.1;
    const far    = 10000;

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
    const renderer = createRenderer({THREE: THREE, canvas: canvas});

    // Create camera and move it back slightly
    const camera      = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.x = 300;
    camera.position.y = 100;
    camera.position.z = 300;

    // Create controls
    const controls = new OrbitControls(camera, canvas);

    // Add the container
    // const axesHelper = new THREE.AxesHelper(150);
    // scene.add(axesHelper);

    // Create the objects
    const objects = [];
    createParticles();

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
    let frameCount = 0;

    function render(time) {

        // Get the time in seconds
        time *= 0.001;
        frameCount += 1;

        // Set the cube rotation to the time in seconds
        objects.forEach(object => {
            object.update(frameCount);

            // if (frameCount % 100 === 0 && objects.length <= 20) {
            //     // object.duplicate();
            // }
        });

        // Update the scene
        renderer.render(scene, camera);

        // Get the next frame and restart the loop
        requestAnimationFrame(render);
    }

    // Start the render loop
    requestAnimationFrame(render);


    function createParticles(n = 10) {
        const radius         = 5;
        const objectGeometry = new THREE.SphereGeometry(radius, 16, 16);

        for (let layer = 0; layer < n; layer++) {
            for (let col = 0; col < n; col++) {
                const hueMap      = (col / n) * 360;
                const newParticle = new Particle({
                    scene:     scene,
                    geometry:  objectGeometry,
                    radius:    radius,
                    x:         15 + (col * 15),
                    y:         15,
                    z:         15 + (layer * 15),
                    color:     new THREE.Color(`hsl(${hueMap}, 100%, 50%)`),
                    speedMult: 1 + (col * 0.01) + (layer * 0.01)
                });
                objects.push(new ParticleTrail({particle: newParticle}));
            }
        }
    }
}


main();

