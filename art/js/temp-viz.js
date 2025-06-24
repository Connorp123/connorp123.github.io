import { createGalleryCanvas, setupFullscreenButton } from "../../helpers/gallery-page-helper.js";

export const temp_viz = (p) => {
    let canvas;

    let input;
    let tempData;
    let years    = [];
    let numYears = 0;

    let maxTemp = 124;
    let minTemp = 0;
    let border;

    let allAtOnce = false;

    p.preload = () => {
        input = p.loadStrings("../../static/resources/boeing_temps_1948_2022.csv");
    };

    p.setup = async () => {
        canvas = createGalleryCanvas(p);
        setupFullscreenButton(p);
        canvas.mouseClicked(() => allAtOnce = !allAtOnce);
        tempData = splitIntoYears(input);
        console.log(tempData);

        border = {
            top:    100,
            left:   50,
            bottom: p.height - 50,
            right:  p.width - 50
        };

        p.strokeWeight(2);
        p.noFill();
        p.frameRate(2);
        p.textAlign(p.RIGHT, p.TOP);
    };

    p.draw = () => {
        p.background(0);
        drawBorder();

        // Draw lines for each year
        if (allAtOnce) {
            for (let y in tempData) {
                drawLines(tempData[y]);
            }
        } else {
            let year = years[p.frameCount % years.length];
            drawLines(tempData[year]);

            // Write the year at the top
            p.stroke(255);
            p.fill(255);
            p.textSize(64);
            p.text(year, border.right, border.top);
            p.noFill();
        }
    };

    let drawBorder = () => {

        // Draw x/y
        p.stroke(150);
        p.line(border.left, border.top, border.left, border.bottom);
        p.line(border.left, border.bottom, border.right, border.bottom);

        // Draw guides
        p.stroke(150, 50);
        p.textSize(48);
        p.fill(150);
        p.textAlign(p.RIGHT, p.BOTTOM);

        let top = p.map(100, minTemp, maxTemp, border.bottom, border.top);
        let mid = p.map(32, minTemp, maxTemp, border.bottom, border.top);
        let bot = p.map(0, minTemp, maxTemp, border.bottom, border.top);

        p.line(border.left, top, border.right, top);
        p.line(border.left, mid, border.right, mid);
        p.line(border.left, bot, border.right, bot);

        p.text("100ºF", border.right, top);
        p.text("32ºF", border.right, mid);
        p.text("0ºF", border.right, bot);
        p.noFill();
    };

    let drawLines = (yearData) => {
        let x;
        let y;

        // Draw high --
        p.stroke(255, 0, 0);
        p.beginShape();
        yearData.forEach((day, index) => {

            if (day[0]) {

                // Calc x position
                x = p.map(index, 0, 364, border.left, border.right);

                // Calc y position
                y = p.map(day[0], minTemp, maxTemp, border.bottom, border.top);

                // Draw vertex
                p.vertex(x, y);
            }
        });
        p.endShape();

        // Draw low --
        p.stroke(0, 0, 255);
        p.beginShape();
        yearData.forEach((day, index) => {
            if (day[1]) {
                // Calc x position
                x = p.map(index, 0, 364, border.left, border.right);

                // Calc y position
                y = p.map(day[1], minTemp, maxTemp, border.bottom, border.top);

                // Draw vertex
                p.vertex(x, y);
            }
        });
        p.endShape();
    };

    let splitIntoYears = (twoDimensionalArray) => {
        let result = {};
        twoDimensionalArray.forEach(row => {
            row      = row.split(",");
            let date = row[0].split("-");
            if (date.length === 3) {
                let year = date[0];

                // Create year if it doesn't exist
                if (!result[year]) {
                    result[year] = [];
                }

                // Add the high/low to the year
                result[year].push([row[1], row[2]]);
            }
        });

        // Remove all years with less than 365 days
        for (let key in result) {
            if (result[key].length < 364) {
                console.log(`Dropping ${key}, only ${result[key].length} days found`);
                delete result[key];
            } else {
                numYears += 1;
                years.push(key);
            }
        }

        console.log(years);

        return result;
    };
};
