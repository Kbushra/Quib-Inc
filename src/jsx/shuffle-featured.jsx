import ReactDOM from "react-dom/client";
import { gameIds } from "../../scripts/game-ids";

function FeaturedGame({ name, id, image })
{
    return (
        <a className="landing-card" href={`/game-page?game-id=${id}`}>
            <img src={image} alt={name}/>
            <span>{name}</span>
        </a>
    );
}

//To allow for early return
function getShuffledGames()
{
    const games =
    [
        <FeaturedGame
            name="Polydraws"
            id={gameIds.polydraws}
            key={gameIds.polydraws}
            image="/assets/images/polydrawstitle.png"
        />,
        <FeaturedGame
            name="Charge Cycle"
            id={gameIds.chargeCycle}
            key={gameIds.chargeCycle}
            image="/assets/images/chargecycletitle.png"
        />,
        <FeaturedGame
            name="Nestkeeping"
            id={gameIds.nestkeeping}
            key={gameIds.nestkeeping}
            image="/assets/images/nestkeepingtitle.png"
        />,
        <FeaturedGame
            name="Black Hole White Hole"
            id={gameIds.blackHoleWhiteHole}
            key={gameIds.blackHoleWhiteHole}
            image="/assets/images/bhwhtitle.png"
        />,
        <FeaturedGame
            name="So Polarising"
            id={gameIds.soPolarising}
            key={gameIds.soPolarising}
            image="/assets/images/polarisingtitle.png"
        />,
        <FeaturedGame
            name="The Metal Forge"
            id={gameIds.theMetalForge}
            key={gameIds.theMetalForge}
            image="/assets/images/metalforgetitle.png"
        />,
        <FeaturedGame
            name="Into the Darkness"
            id={gameIds.intoTheDarkness}
            key={gameIds.intoTheDarkness}
            image="/assets/images/darkness.png"
        />
    ];

    const shuffled = [...games];

    for (let i = shuffled.length - 1; i > 0; i--)
    {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, 4);
}

const featuredContainer = document.getElementById("featured-games");
if (featuredContainer)
{
    ReactDOM.createRoot(featuredContainer).render(getShuffledGames());
}