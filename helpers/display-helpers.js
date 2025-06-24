let quadrants = [
    //  0       1       2       3
    [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0}], // 0
    [{x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}], // 1
    [{x: 0, y: 2}, {x: 1, y: 2}, {x: 2, y: 2}, {x: 3, y: 2}], // 2
    [{x: 0, y: 3}, {x: 1, y: 3}, {x: 2, y: 3}, {x: 3, y: 3}]  // 3
];

function isMobile() {
    return window.innerWidth < 1024;
}

function initCanvas(parent) {
    let myCanvas = isMobile() ? createCanvas(windowWidth, windowHeight) : createCanvas(windowWidth - 400, windowHeight);
    myCanvas.parent(parent ?? "sketch");
    return myCanvas;
}

function initFullscreenCanvas(parent) {
    let myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.parent(parent ?? "sketch");
    return myCanvas;
}

const redrawBackground = (p) => {
    p.background(0);
};

const createInstanceCanvas = (p) => {
    return isMobile()
           ? p.createCanvas(p.windowWidth, p.windowHeight)
           : p.createCanvas(p.windowWidth - 400, p.windowHeight);
};

const createSquareCanvas = (p) => {
    if (p.windowWidth < 1000 && p.windowHeight > p.windowWidth) {
        return p.createCanvas(p.windowWidth, p.windowWidth);
    }

    if (p.windowHeight < 1000 && p.windowWidth > p.windowHeight) {
        return p.createCanvas(p.windowHeight, p.windowHeight);
    }

    return p.createCanvas(
        p.windowWidth < 1000 ? p.windowWidth : 1000,
        p.windowHeight < 1000 ? p.windowHeight : 1000
    );
};

const createSvgCanvas = (p, width, height) => {
    return p.createCanvas(width, height, p.SVG);
};

const createA3SvgCanvas = (p, scale = 1) => {
    return p.createCanvas(297 * scale, 420 * scale, p.SVG);
};

function getGifName() {
    let time = Math.floor(Date.now() / 1000);
    let path = window.location.pathname.replaceAll("/", "_")
        .replace(".html", "")
        .replace("_index", "");
    return `${path}--${time}`;
}