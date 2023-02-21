import * as lilGui from "https://esm.run/lil-gui";
import * as THREE from "./../lib/three.module.js";
import {OrbitControls} from "../lib/OrbitControls.js";
import {RubiksCube} from "./RubiksCube.js";

export class CubeVisualizer {


    constructor() {
        this.cubes = [];
        this.setupGui();
        this.basicSetup();
        this.loadCubeData();
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

    basicSetup() {
        this.scene  = new THREE.Scene();
        this.canvas = document.querySelector("#canvas");

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

        // Create canvas
        this.renderer = createRenderer({THREE: THREE, canvas: canvas, AA: true});

        // Create camera and move it back slightly
        this.camera            = new THREE.PerspectiveCamera(fov, aspect, near, far);
        this.camera.position.x = CAMERA_START.x;
        this.camera.position.y = CAMERA_START.y;
        this.camera.position.z = CAMERA_START.z;

        // Create controls
        this.controls = new OrbitControls(this.camera, this.canvas);

        // Create a light
        const light = new THREE.AmbientLight(lightColor, lightIntensity);
        this.scene.add(light);

        // Axis help
        if (this.guiControls.debug) {
            const axesHelper = new THREE.AxesHelper(500);
            this.scene.add(axesHelper);
        }
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

    loadCubeData() {
        fetch(`./../resources/rubiks/${this.guiControls.fileName}`)
            .then(res => res.json())
            .then(data => {
                const initialState = data["initial_state"];
                const actions      = data["actions"];
                this.addCube({
                    state:   initialState,
                    actions: actions
                });
            })
            .catch(err => console.log(err));
    }

    addCube({state, actions}) {
        this.cubes.push(new RubiksCube({
            state:    state,
            scene:    this.scene,
            controls: this.guiControls,
            actions:  actions
        }));
    }

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

    setupGui() {
        this.gui               = new lilGui.GUI();
        const guiControlString = localStorage.getItem("guiControls");
        let preset             = JSON.parse(guiControlString);

        // Define gui state
        this.guiControls = {
            debug:             false,
            random:            false,
            fileName:          "vertical-stripes.json",
            framesPerRotation: 60,
            saveControls() {
                // save current values to an object
                preset = this.gui.save();
                let s  = JSON.stringify(preset);
                localStorage.setItem("guiControls", s);
            }
        };

        // Define gui behavior
        this.gui.add(this.guiControls, "debug");
        this.gui.add(this.guiControls, "random");
        this.gui.add(this.guiControls, "fileName");
        this.gui.add(this.guiControls, "framesPerRotation", 0, 240, 1);
        this.gui.add(this.guiControls, "saveControls");

        // Load preset
        if (preset) {
            this.gui.load(preset);
        }
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

    render(time) {
        // Get the time in seconds
        time *= 0.001;

        // Update the cube
        this.cubes.forEach(cube => {

            cube.update();

            // Randomly rotate the cube
            if (Math.round(time) % 1 === 0) {
                if (this.guiControls.random) {
                    cube.randomRotation();
                } else {
                    cube.doNextAction();
                }
                this.gui.save();
            }
        });
        this.renderer.render(this.scene, this.camera);
    }
}