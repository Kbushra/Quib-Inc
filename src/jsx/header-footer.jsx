import ReactDOM from "react-dom/client";
import { toggleTheme } from "../../scripts/theme-toggle";

function Dropdown({ mainName, categoryNames, categoryUrls })
{
    return (
        <div className="dropdown" tabIndex="0">
            <p style={{ fontSize: "1.8rem" }}>
                {mainName}
            </p>
            <p className="subdrop clickable" onClick={() => (window.location.href = categoryUrls[0])} style={{ "--targ-top": "5rem", fontSize: "1.8rem" }} tabIndex="0">
                {categoryNames[0]}
            </p>
            <p className="subdrop clickable" onClick={() => (window.location.href = categoryUrls[1])} style={{ "--targ-top": "10rem", fontSize: "1.8rem" }} tabIndex="0">
                {categoryNames[1]}
            </p>
            <p className="subdrop clickable" onClick={() => (window.location.href = categoryUrls[2])} style={{ "--targ-top": "15rem", fontSize: "1.8rem" }} tabIndex="0">
                {categoryNames[2]}
            </p>
        </div>
    );
}

function Header()
{
    return (
        <div id="header">
            <div id="header-left">
                <div id="masthead" className="clickable" onClick={() => (window.location.href = "/")} tabIndex="0">
                    <p style={{ margin: "0px", fontSize: "1.8rem", fontWeight: "600" }}>
                        Quib Inc.
                    </p>
                    <p style={{ margin: "0px", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                        Games, Music, Websites
                    </p>
                </div>

                <div id="mode" className="clickable" onClick={toggleTheme} tabIndex="0"></div>
                <p id="mode-label">
                    (Light/Dark) Mode
                </p>
            </div>

            <div id="header-right">
                <Dropdown
                    mainName="Oth. Orgs"
                    categoryNames={["Info", "Content", "Contact"]}
                    categoryUrls={[
                        "/otherorgs/info",
                        "/otherorgs/content",
                        "/otherorgs/contact",
                    ]}
                />
                <Dropdown
                    mainName="Projects"
                    categoryNames={["Games", "Music", "Websites"]}
                    categoryUrls={["/projs/games", "/projs/music", "/projs/websites"]}
                />
                <Dropdown
                    mainName="Info"
                    categoryNames={["Main", "News", "Contact"]}
                    categoryUrls={["/", "/info/news", "/info/contact"]}
                />
            </div>
        </div>
    );
}

let headerContainer = document.getElementById("header-container");

if (headerContainer)
{
    ReactDOM.createRoot(headerContainer).render(<Header />);
}

function Footer() {
    return (<>
        <div className="break-line"></div>
        <p style={{ fontSize: "1.5rem", color: "var(--text-muted)" }}>
            {new Date().getUTCFullYear()} © Quib Inc.
        </p>
        <div id="footer-contents">
            <img
                className="clickable content-img"
                src="/assets/images/discord.png"
                onClick={() =>
                    (window.location.href =
                        "https://discordapp.com/users/1209583285215436871")
                }
                style={{ borderRadius: "16px" }}
                tabIndex="0"
            />
            <img
                className="clickable content-img"
                src="/assets/images/gmail.png"
                onClick={() =>
                    (window.location.href =
                        "https://mail.google.com/mail/u/?authuser=aaqibchoudhury3@gmail.com")
                }
                style={{ borderRadius: "16px" }}
                tabIndex="0"
            />
            <img
                className="clickable content-img"
                src="/assets/images/youtube.png"
                onClick={() =>
                    (window.location.href = "https://www.youtube.com/@keepmaking-ane")
                }
                style={{ borderRadius: "16px" }}
                tabIndex="0"
            />
            <img
                className="clickable content-img"
                src="/assets/images/itch.png"
                onClick={() =>
                    (window.location.href = "https://keepchatting.itch.io/")
                }
                style={{ borderRadius: "16px" }}
                tabIndex="0"
            />
        </div>
    </>);
}

let footerContainer = document.getElementById("footer-container");

if (footerContainer)
{
    ReactDOM.createRoot(footerContainer).render(<Footer />);
}

function dropdownFocus(ev)
{
    let targ = ev.currentTarget;
    targ.children[1].focus();
    setTimeout(() => targ.children[1].focus(), 100);
}

function dropdownBlur(ev)
{
    for (let i = 0; i < ev.currentTarget.children.length; i++)
    {
        ev.currentTarget.children[i].blur();
    }
}

function subdropTransition(ev)
{
    if (ev.propertyName !== "top") { return; }

    let el = ev.currentTarget;
    let top = parseFloat(getComputedStyle(el).top);

    let dummy = document.createElement("div");
    dummy.style.position = "absolute";
    dummy.style.top = getComputedStyle(el).getPropertyValue("--targ-top");
    document.body.appendChild(dummy);

    let toTarget = Math.floor(top) === Math.floor(parseFloat(getComputedStyle(dummy).top));
    el.style.pointerEvents = toTarget ? "auto" : "none";

    document.body.removeChild(dummy);
}

export function dropdownListeners()
{
    const dropdowns = document.getElementsByClassName("dropdown");
    
    for (let i = 0; i < dropdowns.length; i++)
    {
        //Just focus one of the subdrops doesn't matter which one
        dropdowns[i].removeEventListener("pointerup", dropdownFocus);
        dropdowns[i].addEventListener("pointerup", dropdownFocus);

        dropdowns[i].removeEventListener("pointerleave", dropdownBlur);
        dropdowns[i].addEventListener("pointerleave", dropdownBlur);
    }

    const subdrops = document.getElementsByClassName("subdrop");

    for (let i = 0; i < subdrops.length; i++)
    {
        subdrops[i].removeEventListener("transitionend", subdropTransition);
        subdrops[i].addEventListener("transitionend", subdropTransition);
    }
}