function iframeFocus(ev)
{
    let targ = ev.currentTarget;
    let ind = targ.ind;

    let div = document.getElementsByClassName("iframe")[ind];
    let frame = document.getElementsByTagName("iframe")[ind];

    if (frame.src != window.getComputedStyle(div).getPropertyValue("--src"))
    {
        frame.src = window.getComputedStyle(div).getPropertyValue("--src");
    }

    frame.focus();
    frame.contentWindow.focus();

    for (let c = div.childNodes.length - 1; c >= 0; c--)
    {
        div.childNodes[c].remove();
    }
}

function iframeFullscreen(ev)
{
    let targ = ev.currentTarget;
    let ind = targ.ind;
    let frame = document.getElementsByTagName("iframe")[ind];

    iframeFocus(ev);
    frame.requestFullscreen();
}

export function iframeListeners()
{
    const iframeDivs = document.getElementsByClassName("iframe");
    const iframeButtons = document.getElementsByClassName("fullscreen");

    for (let i = 0; i < iframeDivs.length; i++)
    {
        iframeDivs[i].removeEventListener("click", iframeFocus);
        iframeDivs[i].addEventListener("click", iframeFocus);
        iframeDivs[i].ind = i;
        if (iframeButtons[i])
        {
            iframeButtons[i].removeEventListener("click", iframeFullscreen);
            iframeButtons[i].addEventListener("click", iframeFullscreen);
            iframeButtons[i].ind = i;
        }
    }
}