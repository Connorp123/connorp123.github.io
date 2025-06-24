import { dynamicSketch1 } from "./sketch.js";

const actions = {
    "00-dont-use.js": () => alert("bad!"),
    "sketch.js":      () => new p5(dynamicSketch1, "sketch")
};

const getJsonFiles = () => {
    // jsfiles.json is populated by a github workflow action
    fetch("../jsfiles.json").then(async response => {
        const jsFileNames = await response.json();
        const selector    = document.getElementById("sketch-selector");

        jsFileNames.forEach(file => {
            const option       = document.createElement("option");
            option.value       = file;
            option.textContent = file;
            selector.appendChild(option);
        });

        selector.addEventListener("change", function () {
            const selectedFileName = this.value;
            const action           = actions[selectedFileName];
            if (action) action();
            else console.log("No action defined for this file");
        });
    });
};

getJsonFiles();
