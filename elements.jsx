function updateWidth()
{
    var newWidth = Math.min(window.screen.width, 1905);
    document.documentElement.style.setProperty("--media-width", `${newWidth}px`);
    requestAnimationFrame(updateWidth);
}

updateWidth();
requestAnimationFrame(updateWidth);

function swapCol(light)
{
    let rootStyle = document.documentElement.style;

    if (!light)
    {
        rootStyle.setProperty("--black", "white");
        rootStyle.setProperty("--white-darkerer", "rgb(150, 150, 150)");
        rootStyle.setProperty("--white-darker", "rgb(43, 43, 43)");
        rootStyle.setProperty("--white", "rgb(20, 20, 20)");

        localStorage.setItem("lightMode", "disabled");
    }
    else
    {
        rootStyle.setProperty("--black", "black");
        rootStyle.setProperty("--white-darkerer", "rgb(90, 90, 90)");
        rootStyle.setProperty("--white-darker", "rgb(219, 219, 219)");
        rootStyle.setProperty("--white", "white");

        localStorage.setItem("lightMode", "enabled");
    }
}

let mode = localStorage.getItem("lightMode");
swapCol(mode != null ? mode == "enabled" : window.matchMedia("(prefers-color-scheme: light)").matches);

function Dropdown({ mainName, categoryNames, categoryUrls })
{
    return (
    <div className="dropdown" tabIndex="0">
        <p style={{top: "calc(var(--media-width) * -20/1905)", fontSize: "2rem"}}>{mainName}</p>
        <p className="subdrop clickable" onClick={() => window.location.href = categoryUrls[0]} style={{"--targ-top": "calc(var(--media-width) * 55/1905)", fontSize: "2rem"}} tabIndex="0">{categoryNames[0]}</p>
        <p className="subdrop clickable" onClick={() => window.location.href = categoryUrls[1]} style={{"--targ-top": "calc(var(--media-width) * 125/1905)", fontSize: "2rem"}} tabIndex="0">{categoryNames[1]}</p>
        <p className="subdrop clickable" onClick={() => window.location.href = categoryUrls[2]} style={{"--targ-top": "calc(var(--media-width) * 195/1905)", fontSize: "2rem"}} tabIndex="0">{categoryNames[2]}</p>
    </div>);
}

function Header()
{
    return (
    <div id="header">
        <div id="header-left">
            <div className="masthead clickable" onClick={() => window.location.href = '/'} tabIndex="0">
                <p style={{position: "relative", fontSize: "2.5rem", top: "calc(var(--media-width) * -40/1905)", left: "calc(var(--media-width) * 30/1905)"}}>Quib Inc.</p>
                <p style={{position: "relative", fontSize: "0.8rem", top: "calc(var(--media-width) * -90/1905)", left: "calc(var(--media-width) * 45/1905)"}}>Games, Music, Websites</p>
            </div>

            <div className="mode clickable" onClick={() => swapCol(localStorage.getItem("lightMode") == "disabled")} tabIndex="0"></div>
            <p style={{position: "relative", left: "calc(var(--media-width) * 30/1905)", fontSize: "1.5rem"}}>(Light/Dark) Mode</p>
        </div>

        <div id="header-right">
            <Dropdown mainName="Oth. Orgs" categoryNames={["Info", "Content", "Contact"]} categoryUrls={['/otherorgs/info', '/otherorgs/content', '/otherorgs/contact']}/>
            <Dropdown mainName="Projects" categoryNames={["Games", "Music", "Websites"]} categoryUrls={['/projs/games', '/projs/music', '/projs/websites']}/>
            <Dropdown mainName="Info" categoryNames={["Main", "Team", "Contact"]} categoryUrls={['/', '/info/team', '/info/contact']}/>
        </div>
    </div>);
}

let headerContainer = document.getElementById("header-container");
ReactDOM.render(<Header />, headerContainer);

let clickables = document.getElementsByClassName("clickable");

for (let i = 0; i < clickables.length; i++)
{
    clickables[i].addEventListener("keydown", (ev) =>
    {
        if (ev.key != "Enter" && ev.key != " ") { return; }
        if (document.activeElement != ev.currentTarget) { return; }
        ev.currentTarget.click();
    });
}

let dropdowns = document.getElementsByClassName("dropdown");

for (let i = 0; i < dropdowns.length; i++)
{
    //Just focus one of the subdrops doesn't matter which one
    dropdowns[i].addEventListener("pointerup", (ev) => { ev.currentTarget.children[1].focus(); });

    dropdowns[i].addEventListener("pointerleave", (ev) =>
    {
        for (let i = 0; i < ev.currentTarget.children.length; i++)
        {
            ev.currentTarget.children[i].blur();
        }
    });
}

function subdropTransition(ev)
{
    if (ev.propertyName != "top") { return; }
    let el = ev.currentTarget;
    let top = parseFloat(getComputedStyle(el).top);

    let dummy = document.createElement("div");
    dummy.style.position = "absolute";
    dummy.style.top = getComputedStyle(el).getPropertyValue("--targ-top");
    document.body.appendChild(dummy);

    let toTarget = Math.floor(top) == Math.floor(parseFloat(getComputedStyle(dummy).top));
    el.style.pointerEvents = toTarget ? "auto" : "none";

    document.body.removeChild(dummy);
}

let subdrops = document.getElementsByClassName("subdrop");

for (let i = 0; i < subdrops.length; i++)
{
    subdrops[i].addEventListener("transitionend", subdropTransition);
}

let iframeDivs = document.getElementsByClassName("iframe");

for (let i = 0; i < iframeDivs.length; i++)
{
    iframeDivs[i].addEventListener("click", () =>
    {
        let div = iframeDivs[i];
        let ind = div.ind;
        let frame = document.getElementsByTagName("iframe")[ind];

        if (frame.src != window.getComputedStyle(div).getPropertyValue("--src"))
        {
            frame.style.left = div.style.left;
            frame.style.top = div.style.top;
            frame.src = window.getComputedStyle(div).getPropertyValue("--src");
            
            frame.focus();
            frame.contentWindow.focus();
        }

        frame.requestFullscreen();
        
        for (let c = div.childNodes.length - 1; c >= 0; c--)
        {
            div.childNodes[c].remove();
        }
    });

    iframeDivs[i].ind = i;
}