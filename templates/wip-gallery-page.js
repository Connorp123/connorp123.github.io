export const setButtonUrls = () => {

    // galleryPages.js
    let galleryPages = [
        "wip-gallery-page.html",

        "abstract-art.html",
        "landscape-painting.html",
        "modern-sculpture.html",


        "renaissance-masterpiece.html",
        "impressionist-work.html"
    ];

    let currentPage  = window.location.pathname.split("/").pop();
    let currentIndex = galleryPages.indexOf(currentPage);

    let backButton    = document.getElementById("back");
    let forwardButton = document.getElementById("forward");

    // Check if the current page is found in the galleryPages array
    if (currentIndex !== -1) {
        // Determine previous and next pages
        let prevPageUrl = galleryPages[currentIndex - 1] || null;
        let nextPageUrl = galleryPages[currentIndex + 1] || null;

        // Update back button
        if (prevPageUrl) {
            backButton.addEventListener("click", function () {
                window.location.href = prevPageUrl;
            });
        } else {
            // Disable back button if there is no previous page
            backButton.style.display = "none";
        }

        // Update forward button
        if (nextPageUrl) {
            forwardButton.disabled = false;
            forwardButton.addEventListener("click", function () {
                window.location.href = nextPageUrl;
            });
        } else {
            // Disable forward button if there is no next page
            forwardButton.disabled = true;
        }
    } else {
        // If the current page isn't in the array, disable both buttons
        backButton.disabled    = true;
        forwardButton.disabled = true;
        console.error("Current page not found in galleryPages array.");
    }
};

export const createGalleryCanvas = (p, smallWidth = 600, mediumWidth = 1000) => {
    return p.windowWidth < smallWidth
           ? p.createCanvas(250, 250)
           : p.windowWidth < mediumWidth
             ? p.createCanvas(350, 350)
             : p.createCanvas(500, 500);

};

export const wipGalleryPage = (p) => {
    let canvas;

    p.setup = () => {
        canvas = createGalleryCanvas(p);
        p.fill(255);
        setButtonUrls();
    };

    p.draw = () => {
        p.background(0);
        p.circle(p.mouseX, p.mouseY, 30);
    };
};