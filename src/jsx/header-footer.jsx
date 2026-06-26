import ReactDOM from "react-dom/client";
import { toggleTheme } from "../../scripts/theme-toggle";

function Dropdown({ mainName, categoryNames, categoryUrls })
{
    return (
        <div className="dropdown" tabIndex="0">
            <p style={{ fontSize: "1.8em" }}>
                {mainName}
            </p>
            <p className="subdrop clickable" onClick={() => (window.location.href = categoryUrls[0])} style={{ "--targ-top": "2.5em", fontSize: "1.8em" }} tabIndex="0">
                {categoryNames[0]}
            </p>
            <p className="subdrop clickable" onClick={() => (window.location.href = categoryUrls[1])} style={{ "--targ-top": "5em", fontSize: "1.8em" }} tabIndex="0">
                {categoryNames[1]}
            </p>
            <p className="subdrop clickable" onClick={() => (window.location.href = categoryUrls[2])} style={{ "--targ-top": "7.5em", fontSize: "1.8em" }} tabIndex="0">
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
                    <p style={{ margin: "0px", fontSize: "1.8em", fontWeight: "600" }}>
                        Quib Inc.
                    </p>
                    <p style={{ margin: "0px", fontSize: "0.8em", color: "var(--text-muted)" }}>
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

function FooterIcon({ src, link })
{
    return (
        <a href={link}>
            <img
                className="clickable rounded"
                src={src}
                draggable={false}
                tabIndex="0"
            />
        </a>
    );
}

function Footer() {
    return (<>
        <div className="break-line"></div>
        <p style={{ fontSize: "1.5em", color: "var(--text-muted)" }}>
            {new Date().getUTCFullYear()} © Quib Inc.
        </p>
        <div id="footer-contents">
            <FooterIcon
                src="/assets/images/discord.png"
                link="https://discordapp.com/users/1209583285215436871"
            />
            <FooterIcon
                src="/assets/images/gmail.png"
                link="https://mail.google.com/mail/u/?authuser=aaqibchoudhury3@gmail.com"
            />
            <FooterIcon
                src="/assets/images/youtube.png"
                link="https://www.youtube.com/@keepmaking-ane"
            />
            <FooterIcon
                src="/assets/images/itch.png"
                link="https://keepchatting.itch.io/"
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
    const targ = ev.currentTarget;
    targ.open = true;

    targ.children[1].focus();
    setTimeout(() => targ.children[1].focus(), 100);
}

function dropdownBlur(ev)
{
    const targ = ev.currentTarget;
    targ.open = false;

    for (let i = 0; i < targ.children.length; i++)
    {
        targ.children[i].blur();
    }
}

function subdropTransition(ev)
{
    if (ev.propertyName !== "top") { return; }

    const targ = ev.currentTarget;
    targ.style.pointerEvents = targ.parentElement.open ? "auto" : "none";
}

export function dropdownListeners()
{
    const dropdowns = document.getElementsByClassName("dropdown");
    
    for (let i = 0; i < dropdowns.length; i++)
    {
        dropdowns[i].open = false;

        //Just focus one of the subdrops doesn't matter which one
        dropdowns[i].removeEventListener("pointerup", dropdownFocus);
        dropdowns[i].addEventListener("pointerup", dropdownFocus);
        dropdowns[i].removeEventListener("pointerover", (ev) => ev.currentTarget.open = true);
        dropdowns[i].addEventListener("pointerover", (ev) => ev.currentTarget.open = true);

        dropdowns[i].removeEventListener("pointerleave", dropdownBlur);
        dropdowns[i].addEventListener("pointerleave", dropdownBlur);
    }

    const subdrops = document.getElementsByClassName("subdrop");

    for (let i = 0; i < subdrops.length; i++)
    {
        subdrops[i].removeEventListener("transitionend", subdropTransition);
        subdrops[i].addEventListener("transitionend", subdropTransition);
        
        subdrops[i].removeEventListener("focusin", (ev) => ev.currentTarget.parentElement.open = true);
        subdrops[i].addEventListener("focusin", (ev) => ev.currentTarget.parentElement.open = true);
        subdrops[i].removeEventListener("focusout", (ev) => ev.currentTarget.parentElement.open = false);
        subdrops[i].addEventListener("focusout", (ev) => ev.currentTarget.parentElement.open = false);
    }
}