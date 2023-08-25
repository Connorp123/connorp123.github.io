const actions = {
    "00-dont-use.js": () => alert("bad!")
};

const getJsonFiles = async () => {
    const response = await fetch("/jsfiles.json");
    const jsFiles  = await response.json();


    const selector = document.getElementById("sketch-selector");
    jsFiles.forEach(file => {
        const option       = document.createElement("option");
        option.value       = file;
        option.textContent = file;
        selector.appendChild(option);
    });

    selector.addEventListener("change", function () {
        const selectedFile = this.value; // Get the selected filename
        const action       = actions[selectedFile];
        if (action) {
            action(); // Calls the function mapped to the selected file
        } else {
            console.log("No action defined for this file");
        }
    });
};

await getJsonFiles();
