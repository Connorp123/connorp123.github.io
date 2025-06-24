import { galleryPages } from "../gallery-pages.js";

const showSketchControlsId = "show-sketch-controls";
const backButtonId         = "back";
const forwardButtonId      = "forward";

export const createGalleryPageHelpButton = (controls) => {
    const showSketchControls = /** @type {HTMLButtonElement} */ document.getElementById(showSketchControlsId);
    if (!Array.isArray(controls) || !controls?.length || !showSketchControls) {
        if (showSketchControls) showSketchControls.hidden = true;
        return;
    }
    const sketchControls = createAndReturnControlDialog(controls);
    showSketchControls.addEventListener("click", () => sketchControls.showModal());
};

export const setGalleryButtonUrls = () => {
    const currentPage   = window.location.pathname.split("/").pop().replace(/\.html$/, "");
    const isIndex       = currentPage === "" || currentPage === "index";
    const currentIndex  = isIndex ? 0 : galleryPages.indexOf(currentPage);
    const backButton    = /** @type {HTMLButtonElement} */ document.getElementById(backButtonId);
    const forwardButton = /** @type {HTMLButtonElement} */ document.getElementById(forwardButtonId);

    if (currentIndex === -1) {
        disableButtons(backButton, forwardButton);
        console.error("Current page not found in galleryPages array.");
        return;
    }

    const prevPageUrl = galleryPages[currentIndex - 1] || null;
    const nextPageUrl = galleryPages[currentIndex + 1] || null;

    setupButton(backButton, prevPageUrl);
    setupButton(forwardButton, nextPageUrl);
};

export const createGalleryCanvas = (p, smallWidth = 600, mediumWidth = 1000) => {
    const SMALL_SIZE  = 250;
    const MEDIUM_SIZE = 350;
    const LARGE_SIZE  = 500;
    return p.windowWidth < smallWidth
           ? p.createCanvas(SMALL_SIZE, SMALL_SIZE)
           : p.windowWidth < mediumWidth
             ? p.createCanvas(LARGE_SIZE, MEDIUM_SIZE)
             : p.createCanvas(LARGE_SIZE, LARGE_SIZE);
};

export const toggleFullscreenStyles = (p, isFullscreen, fullscreenButton) => {
    let canvas;
    if (isFullscreen) {
        canvas = createGalleryCanvas(p);
        canvas.style("position", "unset");
        fullscreenButton.style("position", "absolute");
    } else {
        canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.position(0, 0, "fixed");
        fullscreenButton.style("position", "fixed");
    }
};

export const setupFullscreenButton = (p, onToggle) => {
    const button     = p.select("button#fullscreen");
    let isFullscreen = false;
    button.mousePressed(() => {
        toggleFullscreenStyles(p, isFullscreen, button);
        isFullscreen = !isFullscreen;
        p.background(0);
        if (onToggle) onToggle();
    });
    button.elt.addEventListener("mousedown", (e) => e.stopPropagation());
};


/** Helpers **/

const createAndReturnControlDialog = (controls) => {
    const sketchControls = /** @type {HTMLDialogElement} */ document.createElement("dialog");
    document.body.appendChild(sketchControls);
    controls.forEach(control => {
        sketchControls.appendChild(document.createElement("p")).innerText = control;
    });
    sketchControls.addEventListener("click", (event) => {
        if (isClickOutsideDialog(event, sketchControls)) {
            sketchControls.close();
        }
    });
    return sketchControls;
};

const isClickOutsideDialog = (event, dialog) => {
    const rect = dialog.getBoundingClientRect();
    return (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
    );
};

const disableButtons = (backButton, forwardButton) => {
    if (backButton) backButton.disabled = true;
    if (forwardButton) forwardButton.disabled = true;
};

const setupButton = (button, url) => {
    button.disabled = !url;
    button.onclick  = url ? () => window.location.href = url : null;
};


