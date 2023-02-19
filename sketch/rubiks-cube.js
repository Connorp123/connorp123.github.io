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
import * as THREE from "./../lib/three.module.js";
import {OrbitControls} from "../lib/OrbitControls.js";
import {RubiksCube} from "../classes/RubiksCube.js";
import * as lilGui from "https://esm.run/lil-gui";

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
    const fov          = 75;
    const aspect       = window.innerWidth / window.innerHeight;
    const near         = 0.1;
    const far          = 10000;
    const CAMERA_START = {
        x: -80,
        y: 30,
        z: -10
    };

    // Light
    const lightColor     = 0xFFFFFF;
    const lightIntensity = 1;

    // Debug
    const DEBUG = false;

    /***
     *
     *      ,ad8888ba,   88        88  88
     *     d8"'    `"8b  88        88  88
     *    d8'            88        88  88
     *    88             88        88  88
     *    88      88888  88        88  88
     *    Y8,        88  88        88  88
     *     Y8a.    .a88  Y8a.    .a8P  88
     *      `"Y88888P"    `"Y8888Y"'   88
     *
     *
     */

    const gui = new lilGui.GUI();

    const guiControlString = localStorage.getItem("guiControls");
    let preset             = JSON.parse(guiControlString);
    const guiControls      = {
        debug:             false,
        random:            false,
        fileName:          "vertical-stripes.json",
        framesPerRotation: 60,
        saveControls() {
            // save current values to an object
            preset = gui.save();
            let s  = JSON.stringify(preset);
            localStorage.setItem("guiControls", s);
        }
    };
    gui.add(guiControls, "debug");
    gui.add(guiControls, "random");
    gui.add(guiControls, "fileName");
    gui.add(guiControls, "framesPerRotation", 0, 120, 1);
    gui.add(guiControls, "saveControls");
    if (preset) {
        gui.load(preset);
    }

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

    // Create a light
    const light = new THREE.AmbientLight(lightColor, lightIntensity);
    scene.add(light);

    // Axis help
    if (guiControls.debug) {
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
    let initialState;
    let actions;
    let cube;
    fetch(`./../resources/rubiks/${guiControls.fileName}`)
        .then(res => res.json())
        .then(data => {
            initialState = data["initial_state"];
            actions      = data["actions"];
            cube         = new RubiksCube({
                state:    initialState,
                scene:    scene,
                controls: guiControls,
                actions:  actions
            });
        })
        .catch(err => console.log(err));


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

        // Update the cube
        if (cube) {
            cube.update();

            // Randomly rotate the cube
            if (Math.round(time) % 1 === 0) {
                if (guiControls.random) {
                    cube.randomRotation();
                } else {
                    cube.doNextAction();
                }
                gui.save();
            }
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