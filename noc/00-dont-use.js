const getJsonFiles = async () => {
    const response = await fetch("/noc/jsfiles.json");
    const jsFiles  = await response.json();


    const selector = document.getElementById("sketch-selector");
    jsFiles.forEach(file => {
        const option       = document.createElement("option");
        option.value       = file;
        option.textContent = file;
        selector.appendChild(option);
    });
};

await getJsonFiles();
