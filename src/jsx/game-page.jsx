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
            <img
                className="clickable fullscreen"
                style={{position: "absolute", bottom: "0", right: "0", padding: "0.5rem", width: "min(15%, 8rem)"}}
                src="/assets/images/fullscreen.png"
                tabIndex="0"
            />
        </div>
    </>);
}

function GamePage({ title, icon, desc, pageLink = "", pageIcon = "/assets/images/itch.png", embedLink = "", downloadLink = "", children = <></>, })
{
    return (<>
        <div className="row-flex panel wrap-when-small" style={{gap: "1rem", justifyContent: "flex-start", alignItems: "flex-start"}}>
            <img className="rounded" src={icon} style={{width: "min(100%, 30rem)"}}/>
            <div className="column-flex" style={{alignItems: "flex-start"}}>
                <div className="row-flex" style={{justifyContent: "flex-start", gap: "1rem"}}>
                    {
                        (pageLink == "") ? <></> :
                        <a href={pageLink}>
                            <img style={{width: "4rem"}} draggable={false} src={pageIcon} />
                        </a>
                    }

                    {
                        (downloadLink == "") ? <></> :
                        <a href={downloadLink}>
                            <img style={{width: "4rem"}} draggable={false} src="/assets/images/download.png" />
                        </a>
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
                    embedLink="/local-games/polydraws/"
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
                    embedLink="/local-games/chargecycle/"
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
                    embedLink="/local-games/nestkeeping/"
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
                    embedLink="/local-games/polarising/"
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
        
        case gameIds.theThreeBoxes:
            ReactDOM.createRoot(gamePageContainer).render(
                <GamePage
                    title="The Three Boxes"
                    icon="/assets/images/threeboxestitle.png"
                    desc=
                    {
                        <p style={{textAlign: "left"}}>
                            Game made as a school project.
                            <br />
                            Navigate through various escape rooms, using three boxes as clues to success. Traverse through aged rooms and find your way to the surface.
                        </p>
                    }
                    pageLink="https://keepchatting.itch.io/the-three-boxes"
                    downloadLink="/local-games/thethreeboxes/thethreeboxes.zip"
                    embedLink="/local-games/thethreeboxes/"
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
                    embedLink="/local-games/darkness/"
                />,
            );
            break;
        case gameIds.undertemModeSelector:
            ReactDOM.createRoot(gamePageContainer).render(
                <GamePage
                    title="Undertem Mode Selector"
                    icon="/assets/images/undertemmodes.png"
                    desc=
                    {
                        <p style={{textAlign: "left"}}>
                            Holds every Undertem April Fools mode currently released!
                            <br />
                            Funddertem: A charming clicker game where you fund Tems so that they can finally go to Colleg and Universitat!
                            Includes various unique characters from different games and AUs!
                            <br />
                            More coming next year...
                        </p>
                    }
                    embedLink="/local-games/undertemmodes/"
                />,
            );
            break;
    }
}