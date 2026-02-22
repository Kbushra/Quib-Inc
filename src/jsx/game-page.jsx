import ReactDOM from "react-dom/client";
import { gameIds } from "../../scripts/game-ids";

function GameEmbed({ link })
{
    return (<>
        <div className="column-flex iframe-container" style={{marginTop: "2rem", marginBottom: "1rem"}}>
            <iframe className="iframe-hoverable" allow="autoplay" scrolling="no" allowFullScreen></iframe>
            <div
                className="iframe clickable"
                style={{ "--src": link }}
                tabIndex="0"
            ></div>
        </div>
        <img
            className="clickable fullscreen content-image"
            style={{width: "8rem", marginBottom: "1rem"}}
            src="/assets/images/fullscreen.png"
            tabIndex="0"
        />
    </>);
}

function GamePage({ title, icon, desc, pageLink, pageIcon = "/assets/images/itch.png", embedLink = "", downloadLink = "", children = <></>, })
{
    return (<>
        <div className="row-flex panel wrap-when-small" style={{gap: "1rem", justifyContent: "flex-start", alignItems: "flex-start"}}>
            <img className="content-image" src={icon} style={{width: "min(100%, 30rem)", height: "20rem"}}/>
            <div className="column-flex" style={{alignItems: "flex-start"}}>
                <div className="row-flex" style={{justifyContent: "flex-start", gap: "1rem"}}>
                    <img className="clickable content-image" style={{borderRadius: "1rem", width: "4rem"}} src={pageIcon} onClick={() => (window.location.href = pageLink)} tabIndex="0"/>

                    {
                        (downloadLink == "") ? <></> :
                        <img className="clickable content-image" style={{borderRadius: "1rem", width: "4rem"}} src="/assets/images/download.png"
                        onClick={() => (window.location.href = downloadLink)} tabIndex="0"/>
                    }
                </div>

                <p className="title">{title}</p>
                {desc}
            </div>
        </div>
        {embedLink != "" ? <GameEmbed link={embedLink} /> : <></>}
        {children}
    </>);
}

let gamePageContainer = document.getElementById("game-page");

if (gamePageContainer)
{
    let page = new URLSearchParams(window.location.search).get("game-id");

    switch (page)
    {
        case gameIds.polydraws:
            ReactDOM.createRoot(gamePageContainer).render(
                <GamePage
                    title="Polydraws"
                    icon="/assets/images/polydrawstitle.png"
                    desc=
                    {
                        <p style={{textAlign: "left"}}>
                            Game made for the Mini Jam 177: Paper.
                            <br />A platformer where you morph through 3 shapes. Takes around
                            15 minutes to finish.
                        </p>
                    }
                    pageLink="https://keepchatting.itch.io/polydraws"
                    downloadLink="/local-games/polydraws/polydraws.zip"
                    embedLink="https://html-classic.itch.zone/html/13767402/index.html"
                />,
            );
            break;

        case gameIds.chargeCycle:
            ReactDOM.createRoot(gamePageContainer).render(
                <GamePage
                    title="Charge Cycle"
                    icon="/assets/images/chargecycletitle.png"
                    desc=
                    {
                        <p style={{textAlign: "left"}}>
                            Game made for the Mini Jam 179: Energy.
                            <br />
                            The CPU's having a bit of a meltdown and its your job to repair
                            it! You have limited power though, and so does the CPU it seems...
                        </p>
                    }
                    pageLink="https://keepchatting.itch.io/charge-cycle"
                    downloadLink="/local-games/chargecycle/chargecycle.zip"
                    embedLink="https://html-classic.itch.zone/html/13767261/index.html"
                />,
            );
            break;

        case gameIds.nestkeeping:
            ReactDOM.createRoot(gamePageContainer).render(
                <GamePage
                    title="Nestkeeping"
                    icon="/assets/images/nestkeepingtitle.png"
                    desc=
                    {
                        <p style={{textAlign: "left"}}>
                            Game made for the Mini Jam 184: Birds.
                            <br />
                            You're a bird, and you want to do bird things, but those pesky
                            ravens want to eat your eggs for breakfast! You have to do
                            everything in under one minute so they dont take away your
                            children forever.
                        </p>
                    }
                    pageLink="https://keepchatting.itch.io/nestkeeping"
                    downloadLink="/local-games/nestkeeping/nestkeeping.zip"
                    embedLink="https://html-classic.itch.zone/html/13686725/index.html"
                />,
            );
            break;

        case gameIds.blackHoleWhiteHole:
            ReactDOM.createRoot(gamePageContainer).render(
                <GamePage
                    title="Black Hole White Hole"
                    icon="/assets/images/bhwhtitle.png"
                    desc=
                    {
                        <p style={{textAlign: "left"}}>
                            Game made for Mini Jam 187: Polarity.
                            <br />
                            You're a black hole, linked with a white hole in a parallel
                            dimension.
                            <br />
                            With limited energy resource, you have to repair the holes in your
                            universe.
                            <br />
                            Swap between you and your parallel, fix holes and gather
                            materials, and charge up the center of everything.
                        </p>
                    }
                    pageLink="https://keepchatting.itch.io/black-hole-white-hole"
                    downloadLink="/local-games/bhwh/bhwh.zip"
                    embedLink="https://html-classic.itch.zone/html/14113049/index.html"
                />,
            );
            break;

        case gameIds.soPolarising:
            ReactDOM.createRoot(gamePageContainer).render(
                <GamePage
                    title="So Polarising!"
                    icon="/assets/images/polarisingtitle.png"
                    desc=
                    {
                        <p style={{textAlign: "left"}}>
                            Game inspired by Pizza Tower
                            <br />
                            Propel yourself with magnets to fling through rooms and wind
                            through the course into freedom.
                        </p>
                    }
                    pageLink="https://keepchatting.itch.io/so-polarising"
                    downloadLink="/local-games/polarising/polarising.zip"
                    embedLink="https://html-classic.itch.zone/html/14683992/index.html"
                />,
            );
            break;

        case gameIds.theMetalForge:
            ReactDOM.createRoot(gamePageContainer).render(
                <GamePage
                    title="The Metal Forge"
                    icon="/assets/images/metalforgetitle.png"
                    desc=
                    {
                        <p style={{textAlign: "left"}}>
                            Game made as a school project.
                            <br />
                            Though metal lusts for destruction, you lust for profit. Massacre
                            metal with their harvested materials, and profit from your
                            endeavours.
                        </p>
                    }
                    pageLink="https://keepchatting.itch.io/the-metal-forge"
                    downloadLink="/local-games/metalforge/metalforge.zip"
                    embedLink="/local-games/metalforge/"
                />,
            );
            break;

        case gameIds.intoTheDarkness:
            ReactDOM.createRoot(gamePageContainer).render(
                <GamePage
                    title="Into the Darkness"
                    icon="/assets/images/darkness.png"
                    desc=
                    {
                        <p style={{textAlign: "left"}}>
                            Game made for the Micro Jam 046: Night.
                            <br />
                            You can only feel light; The dark is known to cause mirages...
                        </p>
                    }
                    pageLink="https://kryspigames.itch.io/into-the-darkness"
                    downloadLink="/local-games/darkness/darkness.zip"
                    embedLink="https://html-classic.itch.zone/html/14903577/index.html"
                />,
            );
            break;
    }
}