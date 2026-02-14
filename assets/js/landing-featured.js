(() => {
  const featuredContainer = document.getElementById("featured-games");
  if (!featuredContainer) {
    return;
  }

  const games = [
    {
      name: "Polydraws",
      image: "/assets/images/polydrawstitle.png",
      href: "/game-page?game-id=polydraws",
    },
    {
      name: "Charge Cycle",
      image: "/assets/images/chargecycletitle.png",
      href: "/game-page?game-id=chargecycle",
    },
    {
      name: "Nestkeeping",
      image: "/assets/images/nestkeepingtitle.png",
      href: "/game-page?game-id=nestkeeping",
    },
    {
      name: "Black Hole White Hole",
      image: "/assets/images/bhwhtitle.png",
      href: "/game-page?game-id=bhwh",
    },
    {
      name: "So Polarising!",
      image: "/assets/images/polarisingtitle.png",
      href: "/game-page?game-id=polarising",
    },
    {
      name: "The Metal Forge",
      image: "/assets/images/metalforgetitle.png",
      href: "/game-page?game-id=metalforge",
    },
    {
      name: "Into the Darkness",
      image: "/assets/images/darkness.png",
      href: "/game-page?game-id=darkness",
    },
  ];

  const shuffled = [...games];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const featuredGames = shuffled.slice(0, 4);

  featuredContainer.innerHTML = featuredGames
    .map(
      (game) => `
        <a class="landing-card" href="${game.href}">
          <img src="${game.image}" alt="${game.name}">
          <span>${game.name}</span>
        </a>
      `,
    )
    .join("");
})();
