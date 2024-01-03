// Load original SVG into DOM
const originalSvg = document.querySelector("svg");

// Create a new SVG element
const newSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
newSvg.setAttribute("width", originalSvg.getAttribute("width"));
newSvg.setAttribute("height", originalSvg.getAttribute("height"));

// Query filled objects from original SVG
const filledObjects = originalSvg.querySelectorAll("rect, circle, ellipse, polygon, path"); // Add more shapes if needed

filledObjects.forEach((obj) => {
    // Get bounding box
    const bbox = obj.getBBox();

    // Calculate lines
    for (let y = Math.ceil(bbox.y); y < (bbox.y + bbox.height); y += 3) {
        // Create line element
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", bbox.x);
        line.setAttribute("y1", y);
        line.setAttribute("x2", bbox.x + bbox.width);
        line.setAttribute("y2", y);
        line.setAttribute("stroke", "black"); // Or any other color
        line.setAttribute("stroke-width", "1");

        // Append line to new SVG
        newSvg.appendChild(line);
    }
});

// Append the new SVG to the DOM
document.body.appendChild(newSvg);

originalSvg.style.display = "none";
// originalSvg.style.zIndex = "200";