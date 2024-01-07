export const getGifName = () => {
    let time = Math.floor(Date.now() / 1000);
    let path = window.location.pathname.replaceAll("/", "_")
        .replace(".html", "")
        .replace("_index", "");
    return `${path}--${time}`;
};