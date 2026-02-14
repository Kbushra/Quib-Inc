import { useState } from "react";
import ReactDOM from "react-dom/client";

/////////////////////CSS UPDATING/////////////////////

function updateWidth() {
  const scrollWidth =
    document.documentElement.scrollHeight >
    document.documentElement.clientHeight
      ? 30
      : 0;
  const width = window.innerWidth - scrollWidth;
  const posBound = 1600;
  const scaleMin = 900;
  const scaleWidth = Math.min(posBound, Math.max(scaleMin, width));

  document.documentElement.style.setProperty(
    "--scale-media-width",
    `${scaleWidth}px`,
  );
  document.documentElement.style.setProperty(
    "--pos-media-width",
    `${Math.min(width, posBound)}px`,
  );
  document.documentElement.style.setProperty(
    "--real-media-width",
    `${width}px`,
  );
}

updateWidth();
setTimeout(updateWidth, 1000); //Sometimes it doesn't update width properly idk how
window.addEventListener("resize", updateWidth);

function swapCol(light) {
  let rootStyle = document.documentElement.style;

  if (!light) {
    // Dark Mode (Mineral Design)
    rootStyle.setProperty("--black", "#fafafa");
    rootStyle.setProperty("--white-darkerer", "#3f3f46");
    rootStyle.setProperty("--white-darker", "#27272a");
    rootStyle.setProperty("--white", "#09090b");

    rootStyle.setProperty("--bg-color", "#09090b");
    rootStyle.setProperty("--card-bg", "rgba(24, 24, 27, 0.6)");
    rootStyle.setProperty("--border-color", "#27272a");
    rootStyle.setProperty("--text-color", "#fafafa");

    localStorage.setItem("lightMode", "disabled");
  } else {
    // Light Mode (Mineral Design)
    rootStyle.setProperty("--black", "#18181b");
    rootStyle.setProperty("--white-darkerer", "#d4d4d8");
    rootStyle.setProperty("--white-darker", "#e4e4e7");
    rootStyle.setProperty("--white", "#ffffff");

    rootStyle.setProperty("--bg-color", "#ffffff");
    rootStyle.setProperty("--card-bg", "rgba(24, 24, 27, 0.05)");
    rootStyle.setProperty("--border-color", "#e4e4e7");
    rootStyle.setProperty("--text-color", "#18181b");

    localStorage.setItem("lightMode", "enabled");
  }

  let dropdowns = document.getElementsByClassName("dropdown");
  for (let i = 0; i < dropdowns.length; i++) {
    dropdowns[i].style.transition = "height 0.2s cubic-bezier(0.1, 0.9, 1, 1)";
    requestAnimationFrame(
      () =>
        (dropdowns[i].style.transition =
          "background-color 0.2s cubic-bezier(0.1, 0.9, 1, 1), height 0.2s cubic-bezier(0.1, 0.9, 1, 1)"),
    );
  }
}

let mode = localStorage.getItem("lightMode");
swapCol(
  mode
    ? mode == "enabled"
    : window.matchMedia("(prefers-color-scheme: light)").matches,
);

/////////////////////ELEMENTS AND RENDERING/////////////////////

function Dropdown({ mainName, categoryNames, categoryUrls }) {
  return (
    <div className="dropdown" tabIndex="0">
      <p
        style={{
          top: "calc(var(--scale-media-width) * -15/var(--scale-width))",
          fontSize: "1.8rem",
        }}
      >
        {mainName}
      </p>
      <p
        className="subdrop clickable"
        onClick={() => (window.location.href = categoryUrls[0])}
        style={{
          "--targ-top":
            "calc(var(--scale-media-width) * 60/var(--scale-width))",
          fontSize: "1.8rem",
        }}
        tabIndex="0"
      >
        {categoryNames[0]}
      </p>
      <p
        className="subdrop clickable"
        onClick={() => (window.location.href = categoryUrls[1])}
        style={{
          "--targ-top":
            "calc(var(--scale-media-width) * 130/var(--scale-width))",
          fontSize: "1.8rem",
        }}
        tabIndex="0"
      >
        {categoryNames[1]}
      </p>
      <p
        className="subdrop clickable"
        onClick={() => (window.location.href = categoryUrls[2])}
        style={{
          "--targ-top":
            "calc(var(--scale-media-width) * 200/var(--scale-width))",
          fontSize: "1.8rem",
        }}
        tabIndex="0"
      >
        {categoryNames[2]}
      </p>
    </div>
  );
}

function Header() {
  return (
    <div id="header">
      <div id="header-left">
        <div
          className="masthead clickable"
          onClick={() => (window.location.href = "/")}
          tabIndex="0"
        >
          <p style={{ margin: "0px", fontSize: "1.8rem", fontWeight: "600" }}>
            Quib Inc.
          </p>
          <p
            style={{
              margin: "0px",
              fontSize: "0.8rem",
              color: "var(--text-muted)",
            }}
          >
            Games, Music, Websites
          </p>
        </div>

        <div
          className="mode clickable"
          tabIndex="0"
        ></div>
        <p className="mode-label">
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

if (headerContainer) {
  ReactDOM.createRoot(headerContainer).render(<Header />);
}

function Footer() {
  return (
    <>
      <div className="break-line"></div>
      <p style={{ fontSize: "1.5rem", color: "var(--text-muted)" }}>
        {new Date().getUTCFullYear()} © Quib Inc.
      </p>
      <div id="footer-contents">
        <img
          className="clickable content-img"
          src="/assets/images/discord.png"
          onClick={() =>
            (window.location.href =
              "https://discordapp.com/users/1209583285215436871")
          }
          style={{ borderRadius: "16px" }}
          tabIndex="0"
        />
        <img
          className="clickable content-img"
          src="/assets/images/gmail.png"
          onClick={() =>
            (window.location.href =
              "https://mail.google.com/mail/u/?authuser=aaqibchoudhury3@gmail.com")
          }
          style={{ borderRadius: "16px" }}
          tabIndex="0"
        />
        <img
          className="clickable content-img"
          src="/assets/images/youtube.png"
          onClick={() =>
            (window.location.href = "https://www.youtube.com/@keepmaking-ane")
          }
          style={{ borderRadius: "16px" }}
          tabIndex="0"
        />
        <img
          className="clickable content-img"
          src="/assets/images/itch.png"
          onClick={() =>
            (window.location.href = "https://keepchatting.itch.io/")
          }
          style={{ borderRadius: "16px" }}
          tabIndex="0"
        />
      </div>
    </>
  );
}

let footerContainer = document.getElementById("footer-container");

if (footerContainer) {
  ReactDOM.createRoot(footerContainer).render(<Footer />);
}

function NewsArticle({ name, tagline, children }) {
  return (
    <>
      <div className="break-line"></div>
      <p
        className="large-width"
        style={{ marginBottom: "0px", fontSize: "3.5rem", fontWeight: "700" }}
      >
        {name}
      </p>
      <p
        className="large-width"
        style={{
          marginTop: "0px",
          fontSize: "2.5rem",
          color: "var(--text-muted)",
        }}
      >
        {tagline}
      </p>
      <div>{children}</div>
    </>
  );
}

function NewsRow({ style, children }) {
  return (
    <div className="row-flex news-row" style={{ ...{ gap: "2rem" }, ...style }}>
      {children}
    </div>
  );
}

function expandedArticle(article) {
  return (
    <NewsArticle name={article.name} tagline={article.tagline}>
      {article.content}
    </NewsArticle>
  );
}

function ExpandableArticle({ article }) {
  const [expanded, expand] = useState(false);

  if (expanded) {
    return (
      <>
        {expandedArticle(article)}
        <div
          className="row-flex clickable"
          onClick={() => expand(false)}
          style={{ width: "fit-content", marginBottom: "1rem" }}
        >
          <p
            className="hover-darken clickable"
            style={{ margin: "0px", fontSize: "1.5rem" }}
            tabIndex="0"
          >
            Click to unexpand
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="break-line"></div>
      <p
        className="large-width"
        style={{ marginBottom: "0px", fontSize: "3.5rem", fontWeight: "700" }}
      >
        {article.name}
      </p>
      <p
        className="large-width"
        style={{
          marginTop: "0px",
          fontSize: "2.5rem",
          color: "var(--text-muted)",
        }}
      >
        {article.tagline}
      </p>
      <div
        className="row-flex clickable"
        onClick={() => expand(true)}
        style={{ width: "fit-content", marginBottom: "1rem" }}
      >
        <p
          className="hover-darken clickable"
          style={{ margin: "0px", fontSize: "1.5rem" }}
          tabIndex="0"
        >
          Click to expand
        </p>
      </div>
    </>
  );
}

let newsContainer = document.getElementById("news-container");

if (newsContainer) {
  let latestArticle = {
    name: "Jan/Feb 2026 Update",
    tagline: "Undertem progress and So Polarising redo",
    content: (
      <>
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
      </>
    ),
  };

  if (newsContainer.getAttribute("amount") == "all") {
    ReactDOM.createRoot(newsContainer).render(
      <>
        <ExpandableArticle article={latestArticle} />
        {/*More articles go here, with their structs set directly*/}
      </>,
    );
  } else {
    ReactDOM.createRoot(newsContainer).render(expandedArticle(latestArticle));
  }
}

function MusicEmbed({ name, link }) {
  return (
    <div className="column-flex media-card media-card-music">
      <p className="media-card-title">{name}</p>
      <div className="column-flex iframe-container iframe-container-music">
        <iframe
          className="iframe-small"
          allowFullScreen
          scrolling="no"
          src={link}
        ></iframe>
      </div>
    </div>
  );
}

let musicContainer = document.getElementById("music");

if (musicContainer) {
  ReactDOM.createRoot(musicContainer).render(
    <>
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
    </>,
  );
}

function LinkedImage({ name, icon, link }) {
  return (
    <div className="column-flex media-card">
      <p className="media-card-title">{name}</p>
      <img
        className="clickable linked-image-height content-img"
        src={icon}
        alt={name}
        onClick={() => (window.location.href = link)}
        tabIndex="0"
      />
    </div>
  );
}

let websiteContainer = document.getElementById("website");

if (websiteContainer) {
  ReactDOM.createRoot(websiteContainer).render(
    <>
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
    </>,
  );
}

let gameContainer = document.getElementById("games");

if (gameContainer) {
  ReactDOM.createRoot(gameContainer).render(
    <>
      <LinkedImage
        name="Polydraws (Mini Jam 177)"
        icon="/assets/images/polydrawstitle.png"
        link={"/game-page?game-id=polydraws"}
      />
      <LinkedImage
        name="Charge Cycle (Mini Jam 179)"
        icon="/assets/images/chargecycletitle.png"
        link={"/game-page?game-id=chargecycle"}
      />
      <LinkedImage
        name="Nestkeeping (Mini Jam 184)"
        icon="/assets/images/nestkeepingtitle.png"
        link={"/game-page?game-id=nestkeeping"}
      />
      <LinkedImage
        name="Black Hole White Hole (Mini Jam 187)"
        icon="/assets/images/bhwhtitle.png"
        link={"/game-page?game-id=bhwh"}
      />
      <LinkedImage
        name="So Polarising! (PROTOTYPE)"
        icon="/assets/images/polarisingtitle.png"
        link={"/game-page?game-id=polarising"}
      />
      <LinkedImage
        name="The Metal Forge"
        icon="/assets/images/metalforgetitle.png"
        link={"/game-page?game-id=metalforge"}
      />
    </>,
  );
}

let contentMediaocreContainer = document.getElementById("content-mediaocre");

if (contentMediaocreContainer) {
  ReactDOM.createRoot(contentMediaocreContainer).render(
    <>
      <LinkedImage
        name="Into the Darkness (Micro Jam 046)"
        icon="/assets/images/darkness.png"
        link="/game-page?game-id=darkness"
      />
      <MusicEmbed
        name="Into the Darkness - Isolation (Aaqib)"
        link="https://www.youtube.com/embed/wlpSJbSUSRQ"
      />
    </>,
  );
}

function Contact({ icon, content }) {
  return (
    <div className="row-flex contact-row">
      <img className="contact-image content-img" src={icon} />
      <p className="contact-row-content">{content}</p>
    </div>
  );
}

let contactContainer = document.getElementById("contacts");

if (contactContainer) {
  ReactDOM.createRoot(contactContainer).render(
    <>
      <Contact
        content={
          <>
            Aaqib: @keepchatting_nooneexplodes
            <br />
            Dylan: @sifud808
          </>
        }
        icon="/assets/images/discord.png"
      />
      <Contact
        content={<>Aaqib: aaqibchoudhury3@gmail.com</>}
        icon="/assets/images/gmail.png"
      />
      <Contact
        content={
          <>
            Quib Inc: <a href="https://www.youtube.com/@keepmaking-ane">YT</a>
          </>
        }
        icon="/assets/images/youtube.png"
      />
      <Contact
        content={
          <>
            Aaqib: <a href="https://keepchatting.itch.io/">Account</a>
          </>
        }
        icon="/assets/images/itch.png"
      />
    </>,
  );
}

let contactMediaocreContainer = document.getElementById("contacts-mediaocre");

if (contactMediaocreContainer) {
  ReactDOM.createRoot(contactMediaocreContainer).render(
    <>
      <Contact
        content={
          <>
            Aaqib: @keepchatting_nooneexplodes
            <br />
            Krys: @ricekryspiez_
            <br />
            Jayden: @im_ruben
            <br />
            Ava: @sekairotted
          </>
        }
        icon="/assets/images/discord.png"
      />
      <Contact
        content={<>Undertem: undertemtheshitpost@gmail.com</>}
        icon="/assets/images/gmail.png"
      />
      <Contact
        content={
          <>
            Mediaocre Games:{" "}
            <a href="https://www.youtube.com/@MediaocreUT">YT</a>
          </>
        }
        icon="/assets/images/youtube.png"
      />
    </>,
  );
}

function Form({ email }) {
  return (
    <form id="request-form" className="contact-form">
      <div className="column-flex form-fields">
        <div className="row-flex large-width form-meta">
          <p className="form-destination">Email {email}</p>
          <p id="result" className="form-result">
            Result: None
          </p>
        </div>

        <input
          className="large-width form-input"
          maxLength="100"
          name="email"
          type="email"
          placeholder="Your email (optional)"
        />
        <input
          className="large-width form-input"
          maxLength="100"
          required
          name="subject"
          type="text"
          placeholder="Subject"
        />
        <textarea
          className="large-width form-textarea"
          maxLength="1500"
          required
          name="content"
          placeholder="Content"
        ></textarea>
        <button type="submit" className="form-submit clickable">
          Send Message
        </button>
      </div>
    </form>
  );
}

let formContainer = document.getElementById("form");

if (formContainer) {
  ReactDOM.createRoot(formContainer).render(
    <Form email={formContainer.getAttribute("email")} />,
  );
}

function GameEmbed({ link }) {
  return (
    <>
      <div className="column-flex iframe-container">
        <iframe allow="autoplay" scrolling="no" allowFullScreen></iframe>
        <div
          className="iframe clickable"
          style={{ "--src": link }}
          tabIndex="0"
        ></div>
      </div>
      <img
        className="clickable fullscreen content-img"
        src="/assets/images/fullscreen.png"
        onClick={iframeFullscreen}
        tabIndex="0"
      />
    </>
  );
}

function GamePage({
  title,
  icon,
  desc,
  pageLink,
  pageIcon = "/assets/images/itch.png",
  embedLink = "",
  downloadLink = "",
  children = <></>,
}) {
  return (
    <>
      <div className="row-flex game-hero">
        <img className="game-hero-image content-img" src={icon} />
        <div className="column-flex game-hero-copy">
          <div className="row-flex game-hero-actions">
            <img
              className="clickable content-img game-action-icon"
              src={pageIcon}
              onClick={() => (window.location.href = pageLink)}
              tabIndex="0"
            />
            {downloadLink != "" ? (
              <img
                className="clickable content-img game-action-icon"
                src="/assets/images/download.png"
                onClick={() => (window.location.href = downloadLink)}
                tabIndex="0"
              />
            ) : (
              <></>
            )}
          </div>

          <p className="game-hero-title">{title}</p>
          {desc}
        </div>
      </div>
      {embedLink != "" ? <GameEmbed link={embedLink} /> : <></>}
      {children}
    </>
  );
}

let gamePageContainer = document.getElementById("game-page");

if (gamePageContainer) {
  let page = new URLSearchParams(window.location.search).get("game-id");

  switch (page) {
    case "polydraws":
      ReactDOM.createRoot(gamePageContainer).render(
        <GamePage
          title="Polydraws"
          icon="/assets/images/polydrawstitle.png"
          desc={
            <p className="game-hero-description">
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

    case "chargecycle":
      ReactDOM.createRoot(gamePageContainer).render(
        <GamePage
          title="Charge Cycle"
          icon="/assets/images/chargecycletitle.png"
          desc={
            <p className="game-hero-description">
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

    case "nestkeeping":
      ReactDOM.createRoot(gamePageContainer).render(
        <GamePage
          title="Nestkeeping"
          icon="/assets/images/nestkeepingtitle.png"
          desc={
            <p className="game-hero-description">
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

    case "bhwh":
      ReactDOM.createRoot(gamePageContainer).render(
        <GamePage
          title="Black Hole White Hole"
          icon="/assets/images/bhwhtitle.png"
          desc={
            <p className="game-hero-description">
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

    case "polarising":
      ReactDOM.createRoot(gamePageContainer).render(
        <GamePage
          title="So Polarising!"
          icon="/assets/images/polarisingtitle.png"
          desc={
            <p className="game-hero-description">
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

    case "metalforge":
      ReactDOM.createRoot(gamePageContainer).render(
        <GamePage
          title="The Metal Forge"
          icon="/assets/images/metalforgetitle.png"
          desc={
            <p className="game-hero-description">
              Game made as a school project.
              <br />
              Though metal lusts for destruction, you lust for profit. Massacre
              metal with their harvested materials, and profit from your
              endeavours.
            </p>
          }
          pageLink="https://keepchatting.itch.io/the-metal-forge"
          downloadLink="/local-games/metalforge/metalforge.zip"
          embedLink="/local-games/metalforge/index.html"
        />,
      );
      break;

    case "darkness":
      ReactDOM.createRoot(gamePageContainer).render(
        <GamePage
          title="Into the Darkness"
          icon="/assets/images/darkness.png"
          desc={
            <p className="game-hero-description">
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

/////////////////////EVENT LISTENERS/////////////////////

function clickableClick(ev) {
  if (ev.key != "Enter" && ev.key != " ") {
    return;
  }
  if (document.activeElement != ev.currentTarget) {
    return;
  }
  ev.currentTarget.click();
}

function dropdownFocus(ev) {
  let targ = ev.currentTarget;
  targ.children[1].focus();
  setTimeout(() => targ.children[1].focus(), 100);
}

function dropdownBlur(ev) {
  for (let i = 0; i < ev.currentTarget.children.length; i++) {
    ev.currentTarget.children[i].blur();
  }
}

function subdropTransition(ev) {
  if (ev.propertyName != "top") {
    return;
  }
  let el = ev.currentTarget;
  let top = parseFloat(getComputedStyle(el).top);

  let dummy = document.createElement("div");
  dummy.style.position = "absolute";
  dummy.style.top = getComputedStyle(el).getPropertyValue("--targ-top");
  document.body.appendChild(dummy);

  let toTarget =
    Math.floor(top) == Math.floor(parseFloat(getComputedStyle(dummy).top));
  el.style.pointerEvents = toTarget ? "auto" : "none";

  document.body.removeChild(dummy);
}

function iframeFocus(ev) {
  let targ = ev.currentTarget;
  let ind = targ.ind;

  let div = document.getElementsByClassName("iframe")[ind];
  let frame = document.getElementsByTagName("iframe")[ind];

  if (frame.src != window.getComputedStyle(div).getPropertyValue("--src")) {
    frame.src = window.getComputedStyle(div).getPropertyValue("--src");
  }

  frame.focus();
  frame.contentWindow.focus();

  for (let c = div.childNodes.length - 1; c >= 0; c--) {
    div.childNodes[c].remove();
  }
}

function iframeFullscreen(ev) {
  let targ = ev.currentTarget;
  let ind = targ.ind;
  let frame = document.getElementsByTagName("iframe")[ind];

  iframeFocus(ev);
  frame.requestFullscreen();
}

async function formRequest(ev) {
  ev.preventDefault();

  let form = document.getElementById("request-form");
  let result = document.getElementById("result");

  let dat = new FormData(form);
  const formJSON = Object.fromEntries(dat.entries());
  const dest = formContainer?.getAttribute("email") || "";

  result.innerText = "...";

  let response = await fetch("/api/email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...formJSON, dest }),
  });

  result.innerText =
    response.status == 200
      ? "Result: Successful!"
      : response.status == 413
        ? "Result: Message too long!"
        : response.status == 429
          ? "Result: Slow down!"
          : response.status == 503
            ? "Result: No more tokens."
            : response.status == 400
              ? "Result: Invalid request"
              : "Result: Internal Server Error.";
}

const observer = new MutationObserver(() => {
  updateWidth();

  let clickables = document.getElementsByClassName("clickable");

  for (let i = 0; i < clickables.length; i++) {
    clickables[i].removeEventListener("keydown", clickableClick);
    clickables[i].addEventListener("keydown", clickableClick);
  }

  let dropdowns = document.getElementsByClassName("dropdown");

  for (let i = 0; i < dropdowns.length; i++) {
    //Just focus one of the subdrops doesn't matter which one
    dropdowns[i].removeEventListener("pointerup", dropdownFocus);
    dropdowns[i].addEventListener("pointerup", dropdownFocus);

    dropdowns[i].removeEventListener("pointerleave", dropdownBlur);
    dropdowns[i].addEventListener("pointerleave", dropdownBlur);
  }

  let subdrops = document.getElementsByClassName("subdrop");

  for (let i = 0; i < subdrops.length; i++) {
    subdrops[i].removeEventListener("transitionend", subdropTransition);
    subdrops[i].addEventListener("transitionend", subdropTransition);
  }

  let iframeDivs = document.getElementsByClassName("iframe");
  let iframeButtons = document.getElementsByClassName("fullscreen");

  for (let i = 0; i < iframeDivs.length; i++) {
    iframeDivs[i].removeEventListener("click", iframeFocus);
    iframeDivs[i].addEventListener("click", iframeFocus);
    iframeDivs[i].ind = i;
    if (iframeButtons[i]) {
      iframeButtons[i].ind = i;
    }
  }

  let form = document.getElementById("request-form");
  let result = document.getElementById("result");

  if (form && result) {
    form.removeEventListener("submit", formRequest);
    form.addEventListener("submit", formRequest);
  }
});

observer.observe(document.body, { childList: true, subtree: true });
