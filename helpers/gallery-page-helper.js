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
    const currentPage   = window.location.pathname.split("/").pop();
    const currentIndex  = galleryPages.indexOf(currentPage);
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
    return p.windowWidth < smallWidth
           ? p.createCanvas(250, 250)
           : p.windowWidth < mediumWidth
             ? p.createCanvas(350, 350)
             : p.createCanvas(500, 500);
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


