export const getGifName = () => {
    let time = Math.floor(Date.now() / 1000);
    let path = window.location.pathname.replaceAll("/", "_")
        .replace(".html", "")
        .replace("_index", "");
    return `${path}--${time}`;
};

export const getReelCanvas = (p, scale = 1) => {
    console.log("Creating canvas with dimensions: " + (9 * 50 * scale) + "x" + (16 * 50 * scale));
    return p.createCanvas(9 * 50 * scale, 16 * 50 * scale);
};

export const getFullscreenCanvas = (p) => {
    return p.createCanvas(p.windowWidth, p.windowHeight);
};

export const createSvgCanvas = (p, width, height) => {
    return p.createCanvas(width, height, p.SVG);
};