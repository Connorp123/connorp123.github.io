import {CubeVisualizer} from "../classes/CubeVisualizer.js";

function main() {

    // Create the cube visualizer
    const visualizer = new CubeVisualizer({
        numCubes: 1,
        random:   false,
        loadFromFile: true,
        fileName: "vertical-stripes.json"
    });

    function render() {
        visualizer.render();
        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

main();