import ReactDOM from "react-dom/client";
import { Children } from "react";
import { toggleTheme } from "../../scripts/theme-toggle";

function DropdownPage({ name, link, index })
{
    return (
        <a className="subdrop clickable" href={link} style={{ fontSize: "1.8em" }} tabIndex="0">{name}</a>
    );
}

function Dropdown({ name, children })
{
    return (
        <div className="dropdown" tabIndex="0" style={{ "--targ-height": `${5 + 3.5 * Children.count(children)}em` }}>
            <p style={{ fontSize: "1.8em" }}>
                {name}
            </p>
            {children}
        </div>
    );
}

function Header()
{
    return (
        <div id="header">
            <div id="header-left">
                <a id="masthead" href="/">
                    <p style={{ margin: "0px", fontSize: "1.8em", fontWeight: "600" }}>
                        Quib Inc.
                    </p>
                    <p style={{ margin: "0px", fontSize: "0.8em", color: "var(--text-muted)" }}>
                        Games, Music, Websites
                    </p>
                </a>

                <div id="mode" className="clickable" onClick={toggleTheme} tabIndex="0"></div>
                <p id="mode-label">
                    (Light/Dark) Mode
                </p>
            </div>

            <div id="header-right">
                <Dropdown name="Team Thorn">
                    <DropdownPage name="Info" link="/team-thorn/info" index={0} />
                </Dropdown>
                <Dropdown name="Mediaocre Games">
                    <DropdownPage name="Info" link="/mediaocre-games/info" index={0} />
                    <DropdownPage name="Games" link="/mediaocre-games/games" index={1} />
                    <DropdownPage name="Music" link="/mediaocre-games/music" index={2} />
                </Dropdown>
                <Dropdown name="Quib Inc.">
                    <DropdownPage name="Info" link="/quib-inc/info" index={0} />
                    <DropdownPage name="Games" link="/quib-inc/games" index={1} />
                    <DropdownPage name="Music" link="/quib-inc/music" index={2} />
                    <DropdownPage name="Websites" link="/quib-inc/websites" index={3} />
                    <DropdownPage name="Newsletter" link="/quib-inc/newsletter" index={4} />
                </Dropdown>
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

function subdropTransition(ev)
{
    if (ev.propertyName !== "opacity") { return; }

    const targ = ev.currentTarget;
    targ.style.pointerEvents = parseFloat(getComputedStyle(targ).opacity) > 0.5 ? "auto" : "none";
    console.log(`${parseFloat(getComputedStyle(targ).opacity)}, ${targ.style.pointerEvents}`);
}

export function dropdownListeners()
{
    let subdrops = document.getElementsByClassName("subdrop");
    for (let i = 0; i < subdrops.length; i++)
    {
        subdrops[i].removeEventListener("transitionend", subdropTransition);
        subdrops[i].addEventListener("transitionend", subdropTransition);
    }
}