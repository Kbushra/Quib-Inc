import { useState } from "react";
import ReactDOM from "react-dom/client";

function NewsArticle({ name, tagline, children })
{
    return (<>
        <h1 className="title large-width" style={{ textAlign: "center", margin: "0px" }}>
            {name}
        </h1>
        <p className="caption large-width" style={{ textAlign: "center", margin: "0px", fontSize: "2.5rem" }}>
            {tagline}
        </p>
        <div className="column-flex" style={{gap: "1rem"}}>{children}</div>
    </>);
}

function NewsRow({ style, children })
{
    return (
        <div className="news-row row-flex" style={{ flexWrap: "wrap", gap: "2rem", width: "calc(var(--real-media-factor) * var(--scale-width))", ...style }}>
            {children}
        </div>
    );
}

function expandedArticle(article)
{
    return (
        <NewsArticle name={article.name} tagline={article.tagline}>
            {article.content}
        </NewsArticle>
    );
}

function ExpandableArticle({ article })
{
    const [expanded, expand] = useState(false);

    if (expanded)
    {
        return (<div class="column-flex" style={{gap: "1rem"}}>
            {expandedArticle(article)}
            <p className="hover-darken clickable" onClick={() => expand(false)} style={{ textAlign: "center", marginTop: "1rem", marginBottom: "1rem", fontSize: "1.5rem" }} tabIndex="0">
                Click to unexpand
            </p>
        </div>);
    }

    return (<div class="column-flex" style={{gap: "1rem"}}>
        <h1 className="title large-width" style={{ textAlign: "center", margin: "0px" }}>
            {article.name}
        </h1>
        <p className="caption large-width" style={{ textAlign: "center", margin: "0px", fontSize: "2.5rem" }}>
            {article.tagline}
        </p>
        <p className="hover-darken clickable" onClick={() => expand(true)} style={{ textAlign: "center", marginTop: "1rem", marginBottom: "1rem", fontSize: "1.5rem" }} tabIndex="0">
            Click to expand
        </p>
    </div>);
}

let newsContainer = document.getElementById("news-container");

if (newsContainer)
{
    let latestArticle =
    {
        name: "April 1st Update",
        tagline: "Undertem Ruins Demo!",
        content:
        (<>
            <NewsRow>
                <p className="medium-width">You heard that right! The Undertem Ruins Demo is finally out!</p>
            </NewsRow>
            <NewsRow>
                <img className="rounded" src="/assets/images/undertemtitle.png" style={{height: "25rem"}} />
            </NewsRow>
            <NewsRow>
                <p className="medium-width" style={{textAlign: "right"}}>Explore the Ruins 100 years later as Frisk and Chara wander through decayed halls covered in Tem graffiti.</p>
                <img className="rounded" src="/assets/images/realdemo1.png" style={{width: "min(100%, 20rem)"}} />
            </NewsRow>
            <NewsRow>
                <img className="rounded" src="/assets/images/realdemo2.png" style={{width: "min(100%, 20rem)"}} />
                <p className="medium-width" style={{textAlign: "left"}}>The Tems patrol relentlessly. No mercy, no allies, just survival.</p>
            </NewsRow>
            <NewsRow>
                <p className="medium-width" style={{textAlign: "right"}}>So play the game now! Available at
                <a href="https://keepchatting.itch.io/realundertem" style={{"--main-color": "var(--muted-accent-color)"}}> Itch.io </a>
                or on <a href="https://gamejolt.com/games/undertem/1059876" style={{"--main-color": "var(--muted-accent-color)"}}>GameJolt</a>.</p>
                <img className="rounded" src="/assets/images/realdemo3.png" style={{width: "min(100%, 20rem)"}} />
            </NewsRow>
        </>)
    };

    if (newsContainer.getAttribute("amount") == "all")
    {
        ReactDOM.createRoot(newsContainer).render(<>
            <ExpandableArticle article={latestArticle} />
            <ExpandableArticle article={{
                name: "Jan/Feb 2026 Update",
                tagline: "Undertem progress and So Polarising redo",
                content:
                (<>
                    <NewsRow style={{ columnGap: "0.5rem" }}>
                        <p>Yes, there is progress.</p>
                        <img
                            src="/assets/images/temaddle.png"
                            style={{
                                height: "2rem",
                                display: "inline-block",
                                verticalAlign: "middle",
                            }}
                        />
                    </NewsRow>
                    <NewsRow>
                        <p className="large-width">
                            For those of you who don't know what Undertem is, it's an Undertale
                            fangame being worked on by both Quib Inc. and Mediaocre Games,
                            focusing on the species called the Temmies as the Underground goes
                            through a revolution.
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
                            We have 2 actual artists on our team (way more than the 0 we had
                            before for sure) and the entire Ruins has been fixed! I even got a
                            bit of pathfinding in there for when we do the guards.
                        </p>
                    </NewsRow>
                    <NewsRow>
                        <p className="large-width">
                            The lore has became much more well-established than the more jokey
                            and loose story that we had before. The artstyle is also getting
                            sorted out.
                        </p>
                    </NewsRow>
                    <NewsRow>
                        <p className="large-width">Right, some teasers.</p>
                    </NewsRow>
                    <NewsRow>
                        <video className="medium-width rounded" controls>
                            <source src="/assets/videos/ruins-intro.mp4" type="video/mp4" />
                            Video not supported.
                        </video>
                        <p className="medium-width" style={{textAlign: "left"}}>
                            Here is a clip of the Ruins entrance in-game. Everything is subject
                            to change.
                        </p>
                    </NewsRow>
                    <NewsRow>
                        <p className="medium-width" style={{textAlign: "right"}}>
                            Here is another clip of wander and pathfinding AI in the game. Note
                            that the sprites are not permanent (the AI also just reuses a
                            different sprite as a placeholder).
                        </p>
                        <video className="medium-width rounded" controls>
                            <source src="/assets/videos/pathfinding.mp4" type="video/mp4" />
                            Video not supported.
                        </video>
                    </NewsRow>
                    <NewsRow>
                        <p className="large-width">And as for So Polarising...</p>
                    </NewsRow>
                    <NewsRow>
                        <p className="large-width">
                            Although I love the concept, I cannot make it on my own. I'll be
                            doing a small redo to some of the art and might add some more
                            movement, but I do need some other people if I want to actually make
                            the entire thing.
                        </p>
                    </NewsRow>
                    <NewsRow>
                        <p className="large-width">
                            As of now, it's simply a concept. Any help is appreciated!
                        </p>
                    </NewsRow>
                    <NewsRow style={{ columnGap: "0.5rem" }}>
                        <p>Sneezing off.</p>
                        <img src="/assets/images/sneeze.gif" style={{ height: "2rem" }} />
                    </NewsRow>
                </>)
            }} />
        </>);
    }
    else
    {
        ReactDOM.createRoot(newsContainer).render(expandedArticle(latestArticle));
    }
}