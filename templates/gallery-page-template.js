import { createGalleryCanvas, setGalleryButtonUrls } from "./galleryPageHelper.js";

export const galleryPageTemplate = (p) => {
    let canvas;

    p.setup = () => {
        canvas = createGalleryCanvas(p);
        p.fill(255);
        setGalleryButtonUrls();
    };

    p.draw = () => {
        p.background(0);
        p.circle(p.mouseX, p.mouseY, 30);
    };
};