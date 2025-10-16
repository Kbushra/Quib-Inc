let masthead = document.getElementsByClassName("masthead")[0];
masthead.addEventListener("keydown", (inp) => { if (inp.key == "Enter" || inp.key == " ") { masthead.onclick(); } });

let stylesheet = document.styleSheets[0];
let length = stylesheet.cssRules.length;
let lightMode = true;

function swapCol(light = !lightMode)
{
    if (!window.matchMedia) { exit; }

    if (stylesheet.cssRules.length > length + 2)
    {
        stylesheet.deleteRule(length + 2);
        stylesheet.deleteRule(length + 1);
        stylesheet.deleteRule(length);
    }

    if (!light)
    {
        stylesheet.insertRule(".header { background: rgb(43, 43, 43); box-shadow: inset 0px 0px 0px 5px rgba(20, 20, 20, 1); }", stylesheet.cssRules.length);
        stylesheet.insertRule(".main { background: linear-gradient(rgba(20, 20, 20, 1), rgb(43, 43, 43) 10%); }", stylesheet.cssRules.length);
        stylesheet.insertRule("p { color: white; }", stylesheet.cssRules.length);

        lightMode = false;
    }
    else
    {
        stylesheet.insertRule(".header { background: white; box-shadow: inset 0px 0px 0px 5px rgb(219, 219, 219); }", stylesheet.cssRules.length);
        stylesheet.insertRule(".main { background: linear-gradient(rgb(219, 219, 219), white 10%); }", stylesheet.cssRules.length);
        stylesheet.insertRule("p { color: black; }", stylesheet.cssRules.length);

        lightMode = true;
    }
}

swapCol(window.matchMedia("(prefers-color-scheme: light)").matches);