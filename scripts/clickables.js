function clickableClick(ev)
{
    if (ev.key != "Enter" && ev.key != " ") { return; }
    if (document.activeElement != ev.currentTarget) { return; }
    
    ev.currentTarget.click();
}

export function clickableListeners()
{
    const clickables = document.getElementsByClassName("clickable");

    for (let i = 0; i < clickables.length; i++)
        {
        clickables[i].removeEventListener("keydown", clickableClick);
        clickables[i].addEventListener("keydown", clickableClick);
    }
}