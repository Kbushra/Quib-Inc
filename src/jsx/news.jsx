import { useState } from "react";
import ReactDOM from "react-dom/client";

function NewsArticle({ name, tagline, children })
{
    return (<>
        <p className="large-width" style={{ marginBottom: "0px", fontSize: "3.5rem", fontWeight: "700" }}>
            {name}
        </p>
        <p className="large-width" style={{ marginTop: "0px", fontSize: "2.5rem", color: "var(--text-muted)" }}>
            {tagline}
        </p>
        <div>{children}</div>
    </>);
}

function NewsRow({ style, children })
{
    return (
        <div className="row-flex news-row" style={{ gap: "5rem", ...style }}>
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
        return (<div class="column-flex page-section page-news-section">
            {expandedArticle(article)}
            <div className="row-flex clickable" onClick={() => expand(false)} style={{ width: "fit-content", marginBottom: "1rem" }}>
                <p className="hover-darken clickable" style={{ margin: "0px", fontSize: "1.5rem" }} tabIndex="0">
                    Click to unexpand
                </p>
            </div>
        </div>);
    }

    return (<div class="column-flex page-section page-news-section">
        <p className="large-width" style={{ marginBottom: "0px", fontSize: "3.5rem", fontWeight: "700" }}>
            {article.name}
        </p>
        <p className="large-width" style={{ marginTop: "0px", fontSize: "2.5rem", color: "var(--text-muted)" }}>
            {article.tagline}
        </p>
        <div className="row-flex clickable" onClick={() => expand(true)} style={{ width: "fit-content", marginBottom: "1rem" }}>
            <p className="hover-darken clickable" style={{ margin: "0px", fontSize: "1.5rem" }} tabIndex="0">
                Click to expand
            </p>
        </div>
    </div>);
}

let newsContainer = document.getElementById("news-container");

if (newsContainer)
{
    let latestArticle =
    {
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
                <video
                    className="large-width content-img"
                    style={{ aspectRatio: "3/2" }}
                    controls
                >
                    <source src="/assets/videos/ruins-intro.mp4" type="video/mp4" />
                    Video not supported.
                </video>
                <p className="medium-width">
                    Here is a clip of the Ruins entrance in-game. Everything is subject
                    to change.
                </p>
            </NewsRow>
            <NewsRow>
                <p className="medium-width">
                    Here is another clip of wander and pathfinding AI in the game. Note
                    that the sprites are not permanent (the AI also just reuses a
                    different sprite as a placeholder).
                </p>
                <video
                    className="large-width content-img"
                    style={{ aspectRatio: "3/2" }}
                    controls
                >
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
        </>),
    };

    if (newsContainer.getAttribute("amount") == "all")
    {
        ReactDOM.createRoot(newsContainer).render(<>
            <div className="break-line"></div>
            <ExpandableArticle article={latestArticle} />
            {/*More expandable articles go here, with their structs set directly*/}
        </>);
    }
    else
    {
        ReactDOM.createRoot(newsContainer).render(expandedArticle(latestArticle));
    }
}