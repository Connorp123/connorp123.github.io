import { createGalleryCanvas, setupFullscreenButton } from "../../helpers/gallery-page-helper.js";

export const galleryPageTemplate = (p) => {
    let canvas;

    p.setup = () => {
        canvas = createGalleryCanvas(p);
        setupFullscreenButton(p);
        p.fill(255);
    };

    p.draw = () => {
        p.background(0);
        p.circle(p.mouseX, p.mouseY, 30);
    };
};
