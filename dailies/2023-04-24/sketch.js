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

    constructor({scene, geometry, radius, color, startingVel, x = 0, y = 0, z = 0}) {

        // Physical properties
        this.pos      = [x, y, z];
        this.color    = color || new THREE.Color(Math.random(), Math.random(), Math.random());
        this.material = new THREE.MeshPhongMaterial({color: this.color});
        this.mesh     = new THREE.Mesh(geometry, this.material);
        this.setMeshPos();
        this.geometry = geometry;
        this.scene = scene;
        scene.add(this.mesh);

        // Physics properties
        this.vel    = startingVel || [1, 1, 0];
        this.radius = radius || 0;

        // Start them with some random vel

        this.max = {
            x: 100,
            y: 100,
            z: 0
        };
        this.min = {
            x: 0,
            y: 0,
            z: 0
        };

        this.trail = [];

    }

    checkCollision() {

        // Top or bot
        if (this.pos[1] >= this.max.y || this.pos[1] <= this.min.y) {
            this.vel[1] *= -1;
        }

        // Left or right
        if (this.pos[0] >= this.max.x || this.pos[0] <= this.min.x) {
            this.vel[0] *= -1;
        }
    }

    // Update position
    update() {
        this.checkCollision();
        this.pos = vectorAdd(this.pos, this.vel);
        this.setMeshPos();

        this.trail.forEach(historyParticle => {
            historyParticle.update();
        })
    }

    setMeshPos() {
        this.mesh.position.x = this.pos[0];
        this.mesh.position.y = this.pos[1];
        this.mesh.position.z = this.pos[2];
    }

    duplicate() {
        this.trail.push(new Particle({
            scene: this.scene,
            geometry: this.geometry.clone(),
            radius: this.radius,
            color: this.color,
            startingVel:  [...this.vel],
            x: this.pos[0],
            y: this.pos[1],
            z: this.pos[2],
        }));
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
    const cameraDistance = 200;

    // Sphere Geometry
    const radius         = 5;
    const widthSegments  = 16;
    const heightSegments = 16;

    // Container Geometry

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
    const renderer = createRenderer({THREE: THREE, canvas: canvas});

    // Create camera and move it back slightly
    const camera      = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.x = 50;
    camera.position.y = 50;
    camera.position.z = cameraDistance;

    // Create controls
    const controls = new OrbitControls(camera, canvas);

    // Create the geometries
    const objectGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

    // Add the container
    // const axesHelper = new THREE.AxesHelper(100);
    // scene.add(axesHelper);

    // Create the objects
    const objects = [];

    for (let i = 0; i < 10; i++) {
        const hueMap = (i / 10) * 360;
        objects.push(new Particle({
            scene:    scene,
            geometry: objectGeometry,
            radius:   radius,
            x:        5 + (i * 10),
            y:        10,
            z:        0,
            color:    new THREE.Color(`hsl(${hueMap}, 100%, 50%)`)
        }));
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
    let frameCount = 0;
    function render(time) {

        // Get the time in seconds
        time *= 0.001;
        frameCount += 1;

        // Set the cube rotation to the time in seconds
        objects.forEach(object => {
            object.update();

            if(frameCount % 100 === 0 && objects.length <= 20) {
                object.duplicate()
            }
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