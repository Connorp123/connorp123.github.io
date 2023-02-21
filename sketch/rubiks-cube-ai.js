import {CubeVisualizer} from "../classes/CubeVisualizer.js";

function main() {

    // Create the cube visualizer
    const visualizer = new CubeVisualizer({
        numCubes:     10,
        showControls: false
    });

    function render(time) {
        visualizer.render(time);
        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

main();