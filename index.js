function updateView()
{
    let isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isMobile)
    {
        document.documentElement.style.setProperty("--vw", window.innerWidth + "px"); //document.documentElement.clientWidth
        document.documentElement.style.setProperty("--vh", window.innerHeight + "px"); //document.documentElement.clientHeight 
    }
    else
    {
        document.documentElement.style.setProperty("--vw", document.documentElement.clientWidth + "px");
        document.documentElement.style.setProperty("--vh", document.documentElement.clientHeight + "px");
    }

    requestAnimationFrame(updateView);
}

updateView();