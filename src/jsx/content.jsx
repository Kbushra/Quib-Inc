import ReactDOM from "react-dom/client";
import { gameIds } from "../../scripts/game-ids";

function MusicEmbed({ name, link })
{
    return (
        <div className="column-flex dark-panel music-panel">
            <p className="caption">{name}</p>
            <div className="column-flex iframe-container-small">
                <iframe className="iframe-small" allowFullScreen scrolling="no" src={link}></iframe>
            </div>
        </div>
    );
}

let musicContainer = document.getElementById("music");

if (musicContainer)
{
    ReactDOM.createRoot(musicContainer).render(<>
        <MusicEmbed
            name="Polydraws - Paper (Dylan)"
            link="https://www.youtube.com/embed/Rsk8uy1KByU"
        />
        <MusicEmbed
            name="Charge Cycle - Charging (Dylan)"
            link="https://www.youtube.com/embed/KpCpu4bzeLA"
        />
        <MusicEmbed
            name="Nestkeeping - Day, Night, Migration (Dylan)"
            link="https://www.youtube.com/embed/KUwOUs33suI"
        />
        <MusicEmbed
            name="Black Hole White Hole - Void, Polarity (Aaqib)"
            link="https://www.youtube.com/embed/hoYnwby-qZ4"
        />
    </>);
}

function LinkedImage({ name, icon, link })
{
    return (
        <a className="column-flex linked-panel clickable" href={link}>
            <p className="caption" style={{width: "100%", textAlign: "left"}}>{name}</p>
            <img className="linked-image-height" src={icon} alt={name} draggable={false}/>
        </a>
    );
}

let websiteContainer = document.getElementById("website");

if (websiteContainer)
{
    ReactDOM.createRoot(websiteContainer).render(<>
        <LinkedImage
            name="Newhome Studios"
            icon="/assets/images/newhomestudios.png"
            link="https://newhomestudios.neocities.org/"
        />
        <LinkedImage
            name="Testimonial Slider"
            icon="/assets/images/testimonial.png"
            link="/showcase/testimonial"
        />
        <LinkedImage
            name="Progress Bar"
            icon="/assets/images/progressbar.png"
            link="/showcase/progress"
        />
        <LinkedImage
            name="Screensaver (Website game)"
            icon="/assets/images/screensaver.png"
            link="/showcase/screensaver"
        />
    </>);
}

let gameContainer = document.getElementById("games");

if (gameContainer)
{
    ReactDOM.createRoot(gameContainer).render(<>
        <LinkedImage
            name="Polydraws (Mini Jam 177)"
            icon="/assets/images/polydrawstitle.png"
            link={`/game-page?game-id=${gameIds.polydraws}`}
        />
        <LinkedImage
            name="Charge Cycle (Mini Jam 179)"
            icon="/assets/images/chargecycletitle.png"
            link={`/game-page?game-id=${gameIds.chargeCycle}`}
        />
        <LinkedImage
            name="Nestkeeping (Mini Jam 184)"
            icon="/assets/images/nestkeepingtitle.png"
            link={`/game-page?game-id=${gameIds.nestkeeping}`}
        />
        <LinkedImage
            name="So Polarising! (PROTOTYPE)"
            icon="/assets/images/polarisingtitle.png"
            link={`/game-page?game-id=${gameIds.soPolarising}`}
        />
        <LinkedImage
            name="The Metal Forge"
            icon="/assets/images/metalforgetitle.png"
            link={`/game-page?game-id=${gameIds.theMetalForge}`}
        />
        <LinkedImage
            name="The Three Boxes"
            icon="/assets/images/threeboxestitle.png"
            link={`/game-page?game-id=${gameIds.theThreeBoxes}`}
        />
    </>);
}

let contentMediaocreContainer = document.getElementById("content-mediaocre");

if (contentMediaocreContainer)
{
    ReactDOM.createRoot(contentMediaocreContainer).render(<>
        <LinkedImage
            name="Into the Darkness (Micro Jam 046)"
            icon="/assets/images/darkness.png"
            link={`/game-page?game-id=${gameIds.intoTheDarkness}`}
        />
        <MusicEmbed
            name="Into the Darkness - Isolation (Aaqib)"
            link="https://www.youtube.com/embed/wlpSJbSUSRQ"
        />
        <LinkedImage
            name="Undertem Mode Selector"
            icon="/assets/images/undertemmodes.png"
            link={`/game-page?game-id=${gameIds.undertemModeSelector}`}
        />
    </>);
}