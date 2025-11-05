export const sketch = (p) => {

    const mmWidth      = 278;
    const mmHeight     = 420;
    const scale        = 3.4;
    const baseFileName = "p5svg";
    let canvas;

    const getTime = () => {
        const date  = new Date();
        const year  = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day   = date.getDate().toString().padStart(2, "0");
        const hour  = date.getHours().toString().padStart(2, "0");
        const min   = date.getMinutes().toString().padStart(2, "0");
        const sec   = date.getSeconds().toString().padStart(2, "0");
        return `${year}-${month}-${day}-${hour}-${min}-${sec}`;
    };

    p.setup = () => {
        canvas = p.createCanvas(mmWidth * scale, mmHeight * scale);
    };

    p.draw = () => {
        p.background(0);
        beginRecordSVG(p, `${baseFileName}-${getTime()}.svg`);

        p.circle(p.width / 2, p.height / 2, 100);

        p.noLoop();
    };

    p.keyPressed = () => {
        if (p.key === "S" || p.key === "s") {
            endRecordSVG();
        }
    };
};
