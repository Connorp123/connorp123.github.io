import {CubeVisualizer} from "../classes/CubeVisualizer.js";

function main() {

    // Create the cube visualizer
    const visualizer = new CubeVisualizer({
        numCubes:     1,
        showControls: true
    });

    function render(time) {
        visualizer.render(time);
        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

main();