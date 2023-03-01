import * as THREE from "./../lib/three.module.js";
import {OrbitControls} from "../lib/OrbitControls.js";
import {RubiksCube} from "./RubiksCube.js";

export class CubeVisualizer {
    constructor({
                    cameraStart,
                    gui,
                    debug = false,
                    numCubes = 0,
                    fileName = "",
                    random = false,
                    loadFromFile = false,
                    framesPerRotation = 60
                }) {
        this.cubesToCreate     = numCubes;
        this.cubes             = [];
        this.finishedCubes     = [];
        this.fileName          = fileName;
        this.random            = random;
        this.debug             = debug;
        this.framesPerRotation = framesPerRotation;
        this.cameraStart       = cameraStart || {
            x: -70,
            y: 30,
            z: -10
        };

        this.gui = gui;
        if (gui) {
            this.gui.add(this, "framesPerRotation", 0, 240, 1);
        }

        this.basicSetup();
        if (loadFromFile) this.loadCubeDataFromFile();
        if (this.cubesToCreate) this.createCubes({});
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

        const fov    = 75;
        const aspect = window.innerWidth / window.innerHeight;
        const near   = 0.1;
        const far    = 10000;

        // Light
        const lightColor     = 0xFFFFFF;
        const lightIntensity = 1;

        // Create canvas
        this.renderer = createRenderer({THREE: THREE, canvas: canvas, AA: true});

        // Create camera and move it back slightly
        this.camera            = new THREE.PerspectiveCamera(fov, aspect, near, far);
        this.camera.position.x = this.cameraStart.x;
        this.camera.position.y = this.cameraStart.y;
        this.camera.position.z = this.cameraStart.z;

        // Create controls
        this.controls = new OrbitControls(this.camera, this.canvas);

        // Create a light
        const light = new THREE.AmbientLight(lightColor, lightIntensity);
        this.scene.add(light);

        // Axis help
        if (this.debug) {
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
    loadCubeDataFromFile() {
        fetch(`./../resources/rubiks/${this.fileName}`)
            .then(res => res.json())
            .then(data => {
                const initialState = data["initial_state"];
                const actions      = data["actions"];
                this.createCubes({
                    state:   initialState,
                    actions: actions
                });
            })
            .catch(err => console.log(err));
    }

    createCubes({state, actions}) {
        if (this.cubesToCreate <= 0) {
            return;
        }
        let cubeGap = 50;
        let minZ    = ((this.cubesToCreate - 1) / 2) * cubeGap * -1;

        let z = minZ;
        for (let i = 0; i < this.cubesToCreate; i++) {
            this.addCube({
                state:    state,
                actions:  actions,
                position: new THREE.Vector3(0, 0, z)
            });
            z += cubeGap;
        }
    }

    addCube({state, actions, position}) {
        this.cubes.push(new RubiksCube({
            state:             state,
            scene:             this.scene,
            actions:           actions,
            position:          position,
            debug:             this.debug,
            framesPerRotation: this.framesPerRotation
        }));
    }

    removeAllCubes() {
        while (this.scene.children.length) {
            this.scene.remove(this.scene.children[0]);
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

    render() {
        // Update the cube
        this.cubes.forEach((cube, index) => {

            cube.update();

            // Randomly rotate the cube
            if (this.random) {
                cube.randomRotation();
            } else {

                // Do action
                cube.doNextAction();

                // Check if done
                if (cube.isDoneWithActions()) {
                    this.finishedCubes.push(cube);
                    this.cubes.splice(index, 1);
                }
            }
        });
        this.renderer.render(this.scene, this.camera);
    }

    /***
     *
     *           db         88
     *          d88b        88
     *         d8'`8b       88
     *        d8'  `8b      88
     *       d8YaaaaY8b     88
     *      d8""""""""8b    88
     *     d8'        `8b   88
     *    d8'          `8b  88
     *
     *
     */

    createCubesFromPopulation({population, startingState}) {
        if (!population?.length > 0) {
            return;
        }
        this.cubes  = [];
        let cubeGap = 50;
        let minZ    = ((population.length - 1) / 2) * cubeGap * -1;
        let z       = minZ;
        for (let n = 0; n < population.length; n++) {
            this.addCube({
                state:    startingState,
                actions:  population[n],
                position: new THREE.Vector3(0, 0, z)
            });
            z += cubeGap;
        }
    }

    // Fitness = (correct - minCorrect) / (maxCorrect - minCorrect)
    getFitnessScore({cube}) {
        let minCorrect = 6; // For number of centers
        let maxCorrect = 54; // For number of squares
        return Number(cube.countCorrect() - minCorrect) / Number(maxCorrect - minCorrect);
    }

    getAllFitnessScores() {
        let allScores = [];
        this.finishedCubes.forEach(cube => {
            allScores.push({
                fitness:  this.getFitnessScore({cube}),
                dna:      cube.actions,
                position: cube.position
            });
        });
        return allScores;
    }

    isDone() {
        return this.cubes.length === 0;
    }

    getScrambledState({numRotations = 25}) {
        // Create cube
        // let cube = new RubiksCube({
        //     scene:             this.scene,
        //     position:          new THREE.Vector3(0, 0, 0),
        //     framesPerRotation: 0
        // });
        //
        // // Perform 25 random rotations
        // for (let i = 0; i < numRotations; i++) {
        //     cube.randomRotation();
        // }
        //
        // // Return the state
        // cube.printState();
        // return cube.state;
    }
}