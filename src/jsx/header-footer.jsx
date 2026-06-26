import ReactDOM from "react-dom/client";
import { toggleTheme } from "../../scripts/theme-toggle";
import { useEffect, useState } from "react";

function DroptextPage({ name, link, enabled })
{
    return (
        <a className="droptext-page" href={link} tabIndex={enabled ? 0 : -1}>{name}</a>
    );
}

function DroptextCategory({ name, children })
{
    return (
        <div className="droptext-category">
            <p>{name}</p>
            {children}
        </div>
    );
}

function Header()
{
    const [isPanelOpen, openPanel] = useState(false);

    useEffect(() =>
    {
        const panel = document.getElementById("droptext-panel");
        if (!panel) { return; }

        panel.style.pointerEvents = isPanelOpen ? "all" : "none";
        panel.style.opacity = isPanelOpen ? "1" : "0";
        panel.style.top = isPanelOpen ? "0" : "-5rem";
    }, [isPanelOpen]);

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
                <img id="menubar" className="clickable" onClick={() => openPanel(!isPanelOpen)} src="/assets/images/menu.png" tabIndex={0}/>
                <div id="droptext-panel">
                    <DroptextCategory name="Mediaocre Games">
                        <DroptextPage name="Info" link="/otherorgs/info" enabled={isPanelOpen} />
                        <DroptextPage name="Content" link="/otherorgs/content" enabled={isPanelOpen} />
                        <DroptextPage name="Contact" link="/otherorgs/contact" enabled={isPanelOpen} />
                    </DroptextCategory>
                    <DroptextCategory name="Projects">
                        <DroptextPage name="Games" link="/projs/games" enabled={isPanelOpen} />
                        <DroptextPage name="Music" link="/projs/music" enabled={isPanelOpen} />
                        <DroptextPage name="Websites" link="/projs/websites" enabled={isPanelOpen} />
                    </DroptextCategory>
                    <DroptextCategory name="Updates">
                        <DroptextPage name="Main" link="/" enabled={isPanelOpen} />
                        <DroptextPage name="Newsletter" link="/info/news" enabled={isPanelOpen} />
                        <DroptextPage name="Contact" link="/info/contact" enabled={isPanelOpen} />
                    </DroptextCategory>
                </div>
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