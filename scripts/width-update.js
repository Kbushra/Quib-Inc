export function updateWidth()
{
    const scrollWidth = (document.documentElement.scrollHeight > document.documentElement.clientHeight) ? 30 : 0;
    const width = window.innerWidth - scrollWidth;
    const posBound = 1600;
    const scaleBound = 900;
    const scaleWidth = Math.min(posBound + width - scaleBound, posBound);
    const posWidth = Math.min(width, posBound);

    const cssScale = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--scale-width"));

    document.documentElement.style.setProperty(
        "--scale-media-factor",
        `${scaleWidth / cssScale}px`
    );

    document.documentElement.style.setProperty(
        "--pos-media-factor",
        `${posWidth / cssScale}px`
    );
    
    document.documentElement.style.setProperty(
        "--real-media-factor",
        `${width / cssScale}px`
    );
}

updateWidth();
setTimeout(updateWidth, 1000); //Sometimes it doesn't update width properly idk how
window.addEventListener("resize", updateWidth);