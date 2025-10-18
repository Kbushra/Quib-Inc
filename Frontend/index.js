let clickables = document.getElementsByClassName("clickable");

for (let i = 0; i < clickables.length; i++)
{
    clickables[i].addEventListener("keydown", (inp) => { if (inp.key == "Enter" || inp.key == " ") { clickables[i].dispatchEvent(new Event("click")); }});
};

let stylesheet = document.styleSheets[0];
let length = stylesheet.cssRules.length;

function swapCol(light = localStorage.getItem("lightMode") == "disabled")
{
    if (!window.matchMedia) { exit; }

    if (stylesheet.cssRules.length > length + 5)
    {
        stylesheet.deleteRule(length + 5);
        stylesheet.deleteRule(length + 4);
        stylesheet.deleteRule(length + 3);
        stylesheet.deleteRule(length + 2);
        stylesheet.deleteRule(length + 1);
        stylesheet.deleteRule(length);
    }

    if (!light)
    {
        stylesheet.insertRule(".header { background: rgb(43, 43, 43); box-shadow: inset 0px 0px 0px 5px rgba(20, 20, 20, 1); }", stylesheet.cssRules.length);
        stylesheet.insertRule(".main { background: linear-gradient(rgba(20, 20, 20, 1), rgb(43, 43, 43) 10%); }", stylesheet.cssRules.length);
        stylesheet.insertRule(".mode { background: white; box-shadow: inset 0px 0px 0px 3px rgb(197, 197, 197); }", stylesheet.cssRules.length);
        stylesheet.insertRule("p { color: white; }", stylesheet.cssRules.length);
        stylesheet.insertRule(".dropdown { background-color: rgb(43, 43, 43); box-shadow: inset 0px 0px 0px 5px rgb(43, 43, 43); }", stylesheet.cssRules.length);
        stylesheet.insertRule(".dropdown:hover, .dropdown:has(:focus) { background-color: rgb(74, 74, 74); }", stylesheet.cssRules.length);

        localStorage.setItem("lightMode", "disabled");
    }
    else
    {
        stylesheet.insertRule(".header { background: white; box-shadow: inset 0px 0px 0px 5px rgb(219, 219, 219); }", stylesheet.cssRules.length);
        stylesheet.insertRule(".main { background: linear-gradient(rgb(219, 219, 219), white 10%); }", stylesheet.cssRules.length);
        stylesheet.insertRule(".mode { background: black; box-shadow: inset 0px 0px 0px 3px rgb(58, 58, 58); }", stylesheet.cssRules.length);
        stylesheet.insertRule("p { color: black; }", stylesheet.cssRules.length);
        stylesheet.insertRule(".dropdown { background-color: white; box-shadow: inset 0px 0px 0px 5px white; }", stylesheet.cssRules.length);
        stylesheet.insertRule(".dropdown:hover, .dropdown:has(:focus) { background-color: rgb(224, 224, 224); }", stylesheet.cssRules.length);

        localStorage.setItem("lightMode", "enabled");
    }
}

let mode = localStorage.getItem("lightMode");
swapCol(mode != null ? mode == "enabled" : window.matchMedia("(prefers-color-scheme: light)").matches);

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

let header = document.getElementsByClassName("header")[0];
let main = document.getElementsByClassName("main")[0];

function updateView()
{
    document.documentElement.style.setProperty("--vw", document.documentElement.clientWidth + "px");
    document.documentElement.style.setProperty("--vh", document.documentElement.clientHeight + "px");
}

updateView();
window.addEventListener("resize", updateView);