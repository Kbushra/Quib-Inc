import { useState } from "react";
import ReactDOM from "react-dom/client";

/////////////////////CSS UPDATING/////////////////////

function updateWidth()
{
    const scrollWidth = (document.documentElement.scrollHeight > document.documentElement.clientHeight) ? 30 : 0;
    const width = window.outerWidth - scrollWidth;
    const posBound = 1600;
    const scaleBound = 1280;

    document.documentElement.style.setProperty("--scale-media-width", `${Math.min(posBound + width - scaleBound, posBound)}px`);
    document.documentElement.style.setProperty("--pos-media-width", `${Math.min(width, posBound)}px`);
    document.documentElement.style.setProperty("--real-media-width", `${width}px`);
}

updateWidth();
setTimeout(updateWidth, 1000); //Sometimes it doesn't update width properly idk how
window.addEventListener("resize", updateWidth);

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

    let dropdowns = document.getElementsByClassName("dropdown");
    for (let i = 0; i < dropdowns.length; i++)
    {
        dropdowns[i].style.transition = "height 0.2s cubic-bezier(0.1, 0.9, 1, 1)";
        requestAnimationFrame(() => dropdowns[i].style.transition = "background-color 0.2s cubic-bezier(0.1, 0.9, 1, 1), height 0.2s cubic-bezier(0.1, 0.9, 1, 1)");
    }
}

let mode = localStorage.getItem("lightMode");
swapCol(mode ? mode == "enabled" : window.matchMedia("(prefers-color-scheme: light)").matches);

/////////////////////ELEMENTS AND RENDERING/////////////////////

function Dropdown({ mainName, categoryNames, categoryUrls })
{
    return (
    <div className="dropdown" tabIndex="0">
        <p style={{top: "calc(var(--scale-media-width) * -15/var(--scale-width))", fontSize: "1.8rem"}}>{mainName}</p>
        <p className="subdrop clickable" onClick={() => window.location.href = categoryUrls[0]} style={{"--targ-top": "calc(var(--scale-media-width) * 60/var(--scale-width))", fontSize: "1.8rem"}} tabIndex="0">{categoryNames[0]}</p>
        <p className="subdrop clickable" onClick={() => window.location.href = categoryUrls[1]} style={{"--targ-top": "calc(var(--scale-media-width) * 130/var(--scale-width))", fontSize: "1.8rem"}} tabIndex="0">{categoryNames[1]}</p>
        <p className="subdrop clickable" onClick={() => window.location.href = categoryUrls[2]} style={{"--targ-top": "calc(var(--scale-media-width) * 200/var(--scale-width))", fontSize: "1.8rem"}} tabIndex="0">{categoryNames[2]}</p>
    </div>);
}

function Header()
{
    return (
    <div id="header">
        <div id="header-left">
            <div className="masthead clickable" onClick={() => window.location.href = '/'} tabIndex="0">
                <p style={{margin: "0px", fontSize: "1.8rem"}}>Quib Inc.</p>
                <p style={{margin: "0px", fontSize: "0.8rem"}}>Games, Music, Websites</p>
            </div>

            <div className="mode clickable" onClick={() => swapCol(localStorage.getItem("lightMode") == "disabled")} tabIndex="0"></div>
            <p style={{position: "relative", left: "calc(var(--pos-media-width) * 10/var(--scale-width))", fontSize: "1.2rem"}}>(Light/Dark) Mode</p>
        </div>

        <div id="header-right">
            <Dropdown mainName="Oth. Orgs" categoryNames={["Info", "Content", "Contact"]} categoryUrls={['/otherorgs/info', '/otherorgs/content', '/otherorgs/contact']}/>
            <Dropdown mainName="Projects" categoryNames={["Games", "Music", "Websites"]} categoryUrls={['/projs/games', '/projs/music', '/projs/websites']}/>
            <Dropdown mainName="Info" categoryNames={["Main", "News", "Contact"]} categoryUrls={['/', '/info/news', '/info/contact']}/>
        </div>
    </div>);
}

let headerContainer = document.getElementById("header-container");

if (headerContainer)
{
    ReactDOM.createRoot(headerContainer).render(<Header />);
}

function Footer()
{
    return (
        <>
            <div className="break-line"></div>
            <p style={{fontSize: "1.5rem"}}>{new Date().getUTCFullYear()} © Quib Inc.</p>
            <div id="footer-contents">
                <img className="clickable" src="/Images/discord.png" onClick={() => window.location.href = "https://discordapp.com/users/1209583285215436871"} style={{borderRadius: "2%"}} tabIndex="0"/>
                <img className="clickable" src="/Images/gmail.png" onClick={() => window.location.href = "https://mail.google.com/mail/u/?authuser=aaqibchoudhury3@gmail.com"} style={{borderRadius: "2%"}} tabIndex="0"/>
                <img className="clickable" src="/Images/youtube.png" onClick={() => window.location.href = "https://www.youtube.com/@keepmaking-ane"} style={{borderRadius: "2%"}} tabIndex="0"/>
                <img className="clickable" src="/Images/itch.png" onClick={() => window.location.href = "https://keepchatting.itch.io/"} style={{borderRadius: "2%"}} tabIndex="0"/>
            </div>
        </>
    );
}

let footerContainer = document.getElementById("footer-container");

if (footerContainer)
{
    ReactDOM.createRoot(footerContainer).render(<Footer />);
}

function NewsArticle({ name, tagline, children })
{
    return (
        <>
            <div className="break-line"></div>
            <p className="large-width" style={{marginBottom: "0px", fontSize: "3.5rem"}}>{name}</p>
            <p className="large-width" style={{marginTop: "0px", fontSize: "2.5rem"}}>{tagline}</p>
            <div>{children}</div>
        </>
    );
}

function NewsRow({ style, children })
{
    return (
        <div className="row-flex" style={{...{gap: "2rem"}, ...style}}>
            {children}
        </div>
    );
}

function expandedArticle(article)
{
    return (
    <NewsArticle name={article.name} tagline={article.tagline}>
        {article.content}
    </NewsArticle>);
}

function ExpandableArticle({ article })
{
    const [expanded, expand] = useState(false);

    if (expanded)
    {
        return (<>
            {expandedArticle(article)}
            <div className="row-flex clickable" onClick={() => expand(false)} style={{width: "fit-content", marginBottom: "1rem"}}>
                <p className="hover-darken clickable" style={{margin: "0px", fontSize: "1.5rem"}} tabIndex="0">Click to unexpand</p>
            </div>
        </>);
    }

    return (<>
        <div className="break-line"></div>
        <p className="large-width" style={{marginBottom: "0px", fontSize: "3.5rem"}}>{article.name}</p>
        <p className="large-width" style={{marginTop: "0px", fontSize: "2.5rem"}}>{article.tagline}</p>
        <div className="row-flex clickable" onClick={() => expand(true)} style={{width: "fit-content", marginBottom: "1rem"}}>
            <p className="hover-darken clickable" style={{margin: "0px", fontSize: "1.5rem"}} tabIndex="0">Click to expand</p>
        </div>
    </>);
}

let newsContainer = document.getElementById("news-container");

if (newsContainer)
{
    let latestArticle =
    {
        name: "Jan/Feb 2026 Update",
        tagline: "Undertem progress and So Polarising redo",
        content:
        <>
            <NewsRow style={{columnGap: "0.5rem"}}>
                <p>Yes, there is progress.</p>
                <img src="/Images/temaddle.png" style={{height: "2rem"}}/>
            </NewsRow>
            <NewsRow>
                <p className="large-width">
                    For those of you who don't know what Undertem is,
                    it's an Undertale fangame being worked on by both Quib Inc. and Mediaocre Games, focusing on
                    the species called the Temmies as the Underground goes through a revolution.
                </p>
            </NewsRow>
            <NewsRow>
                <p className="large-width">
                    Though the UNDEREVENT deadline is slowly creeping up behind us,
                    there's surprisingly quite a lot of content that we have in store,
                    especially after a half-year stagnation.
                </p>
            </NewsRow>
            <NewsRow>
                <p className="large-width">
                    We have 2 actual artists on our team (way more than the 0 we had before for sure)
                    and the entire Ruins has been fixed! I even got a bit of pathfinding in there for when we do the guards.
                </p>
            </NewsRow>
            <NewsRow>
                <p className="large-width">
                    The lore has became much more well-established than the more jokey and loose
                    story that we had before. The artstyle is also getting sorted out.
                </p>
            </NewsRow>
            <NewsRow>
                <p className="large-width">
                    Right, some teasers.
                </p>
            </NewsRow>
            <NewsRow>
                <video className="large-width" style={{aspectRatio: "3/2"}} controls>
                    <source src="/Videos/ruins-intro.mp4" type="video/mp4"/>
                    Video not supported.
                </video>
                <p className="medium-width">
                    Here is a clip of the Ruins entrance in-game.
                    Everything is subject to change.
                </p>
            </NewsRow>
            <NewsRow>
                <p className="medium-width">
                    Here is another clip of wander and pathfinding AI in the game.
                    Note that the sprites are not permanent (the AI also just reuses a different sprite as a placeholder).
                </p>
                <video className="large-width" style={{aspectRatio: "3/2"}} controls>
                    <source src="/Videos/pathfinding.mp4" type="video/mp4"/>
                    Video not supported.
                </video>
            </NewsRow>
            <NewsRow>
                <p className="large-width">
                    And as for So Polarising...
                </p>
            </NewsRow>
            <NewsRow>
                <p className="large-width">
                    Although I love the concept, I cannot make it on my own.
                    I'll be doing a small redo to some of the art and might add some more movement,
                    but I do need some other people if I want to actually make the entire thing.
                </p>
            </NewsRow>
            <NewsRow>
                <p className="large-width">
                    As of now, it's simply a concept.
                    Any help is appreciated!
                </p>
            </NewsRow>
            <NewsRow style={{columnGap: "0.5rem"}}>
                <p>Sneezing off.</p>
                <img src="/Images/sneeze.gif" style={{height: "2rem"}}/>
            </NewsRow>
        </>
    };

    if (newsContainer.getAttribute("amount") == "all")
    {
        ReactDOM.createRoot(newsContainer).render(
        <>
            <ExpandableArticle article={latestArticle}/>
            {/*More articles go here, with their structs set directly*/}
        </>);
    }
    else
    {
        ReactDOM.createRoot(newsContainer).render(expandedArticle(latestArticle));
    }
    
}

function GameEmbed({ name, icon, link })
{
    return (
        <div className="column-flex" style={{gap: "0px"}}>
            <p style={{fontSize: "1.5rem", width: "fit-content"}}>{name}</p>
            <div style={{height: "0px", width: "calc(var(--scale-media-width) * 800/var(--scale-width))", position: "relative"}}>
                <iframe allow="autoplay" scrolling="no" allowFullScreen></iframe>
                <div className="iframe clickable" style={{"--src": link}} tabIndex="0">
                    <img src={icon} style={{position: "relative", width: "calc(var(--scale-media-width) * 200/var(--scale-width))", left: "calc(var(----pos-media-width) * 5/var(--scale-width))"}}/>
                </div>
            </div>
        </div>
    );
}

let gameContainer = document.getElementById("games");

if (gameContainer)
{
    ReactDOM.createRoot(gameContainer).render(
    <>
        <GameEmbed name="Polydraws (Mini Jam 177)" icon="/Images/polydrawstitle.png" link="https://html-classic.itch.zone/html/13767402/index.html"/>
        <GameEmbed name="Charge Cycle (Mini Jam 179)" icon="/Images/chargecycletitle.png" link="https://html-classic.itch.zone/html/13767261/index.html"/>
        <GameEmbed name="Nestkeeping (Mini Jam 184)" icon="/Images/nestkeepingtitle.png" link="https://html-classic.itch.zone/html/13686725/index.html"/>
        <GameEmbed name="Black Hole White Hole (Mini Jam 187)" icon="/Images/bhwhtitle.png" link="https://html-classic.itch.zone/html/14113049/index.html"/>
        <GameEmbed name="So Polarising! (PROTOTYPE)" icon="/Images/polarising.png" link="https://html-classic.itch.zone/html/14683992/index.html"/>
    </>);
}

function MusicEmbed({ name, link })
{
    return (
        <div className="column-flex" style={{gap: "0px"}}>
            <p style={{fontSize: "1.5rem"}}>{name}</p>
            <div style={{height: "0px", width: "calc(var(--scale-media-width) * 800/var(--scale-width))", position: "relative"}}>
                <iframe allowFullScreen scrolling="no" src={link}></iframe>
            </div>
        </div>
    );
}

let musicContainer = document.getElementById("music");

if (musicContainer)
{
    ReactDOM.createRoot(musicContainer).render(
    <>
        <MusicEmbed name="Polydraws - Paper (Dylan)" link="https://www.youtube.com/embed/Rsk8uy1KByU"/>
        <MusicEmbed name="Charge Cycle - Charging (Dylan)" link="https://www.youtube.com/embed/KpCpu4bzeLA"/>
        <MusicEmbed name="Nestkeeping - Day, Night, Migration (Dylan)" link="https://www.youtube.com/embed/KUwOUs33suI"/>
        <MusicEmbed name="Black Hole White Hole - Void, Polarity (Aaqib)" link="https://www.youtube.com/embed/hoYnwby-qZ4"/>
    </>);
}

function WebsiteEmbed({ name, icon, link })
{
    return (
        <div className="column-flex" style={{gap: "0"}}>
            <p style={{fontSize: "1.5rem"}}>{name}</p>
            <img className="clickable medium-width" src={icon} onClick={() => window.location.href = link} style={{borderRadius: "2%"}} tabIndex="0"/>
        </div>
    );
}

let websiteContainer = document.getElementById("website");

if (websiteContainer)
{
    ReactDOM.createRoot(websiteContainer).render(
    <>
        <WebsiteEmbed name="Newhome Studios" icon="/Images/newhomestudios.png" link="https://newhomestudios.neocities.org/"/>
        <WebsiteEmbed name="Testimonial Slider" icon="/Images/testimonial.png" link="/showcase/testimonial"/>
        <WebsiteEmbed name="Progress Bar" icon="/Images/progressbar.png" link="/showcase/progress"/>
        <WebsiteEmbed name="Screensaver (Website game)" icon="/Images/screensaver.png" link="/showcase/screensaver"/>
    </>);
}

let contentMediaocreContainer = document.getElementById("content-mediaocre");

if (contentMediaocreContainer)
{
    ReactDOM.createRoot(contentMediaocreContainer).render(
    <>
        <GameEmbed name="Into the Darkness (Micro Jam 046)" icon="/Images/darkness.png" link="https://html-classic.itch.zone/html/14903577/index.html"/>
        <MusicEmbed name="Into the Darkness - Isolation (Aaqib)" link="https://www.youtube.com/embed/wlpSJbSUSRQ"/>
    </>);
}

function Contact({ icon, content })
{
    return (
        <div className="row-flex" style={{gap: "calc(var(--scale-media-width) * 20/var(--scale-width))"}}>
            <img src={icon} style={{borderRadius: "2%"}}/>
            <p style={{fontSize: "1.5rem", textAlign: "left"}}>{content}</p>
        </div>
    );
}

let contactContainer = document.getElementById("contacts");

if (contactContainer)
{
    ReactDOM.createRoot(contactContainer).render(
    <>
        <Contact content={<>Aaqib: @keepchatting_nooneexplodes<br/>Dylan: @sifud808</>} icon="/Images/discord.png"/>
        <Contact content={<>Aaqib: aaqibchoudhury3@gmail.com</>} icon="/Images/gmail.png"/>
        <Contact content={<>Quib Inc: <a href="https://www.youtube.com/@keepmaking-ane">YT</a></>} icon="/Images/youtube.png"/>
        <Contact content={<>Aaqib: <a href="https://keepchatting.itch.io/">Account</a></>} icon="/Images/itch.png"/>
    </>);
}

let contactMediaocreContainer = document.getElementById("contacts-mediaocre");

if (contactMediaocreContainer)
{
    ReactDOM.createRoot(contactMediaocreContainer).render(
    <>
        <Contact content={<>Aaqib: @keepchatting_nooneexplodes<br/>Krys: @ricekryspiez_<br/>Jayden: @im_ruben<br/>Ava: @sekairotted</>} icon="/Images/discord.png"/>
        <Contact content={<>Undertem: undertemtheshitpost@gmail.com</>} icon="/Images/gmail.png"/>
        <Contact content={<>Mediaocre Games: <a href="https://www.youtube.com/@MediaocreUT">YT</a></>} icon="/Images/youtube.png"/>
    </>);
}

function Form({ email })
{
    return (
        <form id="request-form" style={{position: "relative", left: "0px"}}>
            <div className="column-flex" style={{rowGap: "calc(var(--scale-media-width) * 20/var(--scale-width))"}}>
                <div className="row-flex large-width" style={{position: "relative", top: "calc(var(--scale-media-width) * 30/var(--scale-width))", justifyContent: "space-between"}}>
                    <p style={{fontSize: "1.5rem", width: "calc(var(--scale-media-width) * 600/var(--scale-width))", textAlign: "left"}}>Email {email}</p>
                    <p id="result" style={{fontSize: "1.5rem", width: "calc(var(--scale-media-width) * 500/var(--scale-width))", textAlign: "right"}}>Result: None</p>
                </div>

                <input className="large-width" maxLength="100" name="email" type="email" placeholder="Your email (optional)" style={{position: "relative", height: "calc(var(--scale-media-width) * 70/var(--scale-width))", fontSize: "calc(1.5rem * 4/3)"}}/>
                <input className="large-width" maxLength="100" required name="subject" type="text" placeholder="Subject" style={{position: "relative", height: "calc(var(--scale-media-width) * 70/var(--scale-width))", fontSize: "calc(1.5rem * 4/3)"}}/>
                <textarea className="large-width" maxLength="1500" required name="content" placeholder="Content" style={{position: "relative", height: "calc(var(--scale-media-width) * 300/var(--scale-width))", fontSize: "1.5rem"}}></textarea>
                <img src="/Images/arrow.png" style={{position: "relative", top: "calc(var(--scale-media-width) * -300/var(--scale-width))", left: "calc(var(--pos-media-width) * 450/var(--scale-width))", width: "calc(var(--scale-media-width) * 100/var(--scale-width))"}}/>
                <button style={{background: "transparent", border: "none", cursor: "pointer", position: "relative", top: "calc(var(--scale-media-width) * -400/var(--scale-width))", left: "calc(var(--pos-media-width) * 450/var(--scale-width))", width: "calc(var(--scale-media-width) * 100/var(--scale-width))", height: "calc(var(--scale-media-width) * 50/var(--scale-width))"}}></button>
            </div>
        </form>
    );
}

let formContainer = document.getElementById("form");

if (formContainer)
{
    ReactDOM.createRoot(formContainer).render(<Form email={formContainer.getAttribute("email")}/>);
}

/////////////////////EVENT LISTENERS/////////////////////

function clickableClick(ev)
{
    if (ev.key != "Enter" && ev.key != " ") { return; }
    if (document.activeElement != ev.currentTarget) { return; }
    ev.currentTarget.click();
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

function iframeFocus(ev)
{
    let div = ev.currentTarget;
    let ind = div.ind;
    let frame = document.getElementsByTagName("iframe")[ind];

    if (frame.src != window.getComputedStyle(div).getPropertyValue("--src"))
    {
        frame.src = window.getComputedStyle(div).getPropertyValue("--src");
        
        frame.focus();
        frame.contentWindow.focus();
    }

    frame.requestFullscreen();
    
    for (let c = div.childNodes.length - 1; c >= 0; c--)
    {
        div.childNodes[c].remove();
    }
}

async function formRequest(ev)
{
    ev.preventDefault();

    let form = document.getElementById("request-form");
    let result = document.getElementById("result");
    
    let dat = new FormData(form);
    const formJSON = Object.fromEntries(dat.entries());
    const destJSON = JSON.parse(`{"dest": "${formContainer.getAttribute("email")}"}`);

    result.innerText = "...";

    let response = await fetch("/api/email",
    {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formJSON, ...destJSON })
    });

    result.innerText = response.status == 200 ? "Result: Successful!" :
    response.status == 413 ? "Result: Message too long!" :
    response.status == 429 ? "Result: Slow down!" :
    response.status == 503 ? "Result: No more tokens." :
    response.status == 400 ? "Result: Invalid request" :
    "Result: Internal Server Error.";
}

const observer = new MutationObserver(() =>
{
    updateWidth();

    let clickables = document.getElementsByClassName("clickable");

    for (let i = 0; i < clickables.length; i++)
    {
        clickables[i].removeEventListener("keydown", clickableClick);
        clickables[i].addEventListener("keydown", clickableClick);
    }

    let dropdowns = document.getElementsByClassName("dropdown");

    for (let i = 0; i < dropdowns.length; i++)
    {
        //Just focus one of the subdrops doesn't matter which one
        dropdowns[i].removeEventListener("pointerup", dropdownFocus);
        dropdowns[i].addEventListener("pointerup", dropdownFocus);

        dropdowns[i].removeEventListener("pointerleave", dropdownBlur);
        dropdowns[i].addEventListener("pointerleave", dropdownBlur);
    }

    let subdrops = document.getElementsByClassName("subdrop");

    for (let i = 0; i < subdrops.length; i++)
    {
        subdrops[i].removeEventListener("transitionend", subdropTransition);
        subdrops[i].addEventListener("transitionend", subdropTransition);
    }

    let iframeDivs = document.getElementsByClassName("iframe");

    for (let i = 0; i < iframeDivs.length; i++)
    {
        iframeDivs[i].addEventListener("click", iframeFocus);
        iframeDivs[i].ind = i;
    }

    let form = document.getElementById("request-form");
    let result = document.getElementById("result");

    if (form && result)
    {
        form.addEventListener("submit", formRequest);
    }
});

observer.observe(document.body, { childList: true, subtree: true });