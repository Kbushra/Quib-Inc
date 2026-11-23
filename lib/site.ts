export type Studio = "quib" | "mediaocre";

export type Game = {
  slug: string;
  name: string;
  studio: Studio;
  tag: string;
  description: string;
  cover: string;
  gallery?: string[];
  itch?: string;
  download?: string;
  embed?: string;
  featured?: boolean;
};

export type Track = {
  title: string;
  game: string;
  composer: string;
  youtube: string;
  studio: Studio;
};

export type Project = {
  name: string;
  image: string;
  href: string;
  external: boolean;
};

export type DevlogBlock =
  | { type: "text"; content: string }
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; caption: string }
  | { type: "link"; before: string; label: string; href: string; after?: string };

export type DevlogPost = {
  slug: string;
  date: string;
  title: string;
  tagline: string;
  blocks: DevlogBlock[];
};

export const games: Game[] = [
  {
    slug: "polydraws",
    name: "Polydraws",
    studio: "quib",
    tag: "mini jam 177, paper",
    description:
      "Game made for the Mini Jam 177: Paper. A platformer where you morph through 3 shapes. Takes around 15 minutes to finish.",
    cover: "/assets/images/polydrawstitle.png",
    itch: "https://keepchatting.itch.io/polydraws",
    download: "/games/polydraws/polydraws.zip",
    embed: "/games/polydraws/index.html",
    featured: true,
  },
  {
    slug: "chargecycle",
    name: "Charge Cycle",
    studio: "quib",
    tag: "mini jam 179, energy",
    description:
      "Game made for the Mini Jam 179: Energy. The CPU's having a bit of a meltdown and its your job to repair it! You have limited power though, and so does the CPU it seems...",
    cover: "/assets/images/chargecycletitle.png",
    itch: "https://keepchatting.itch.io/charge-cycle",
    download: "/games/chargecycle/chargecycle.zip",
    embed: "/games/chargecycle/index.html",
    featured: true,
  },
  {
    slug: "nestkeeping",
    name: "Nestkeeping",
    studio: "quib",
    tag: "mini jam 184, birds",
    description:
      "Game made for the Mini Jam 184: Birds. You're a bird, and you want to do bird things, but those pesky ravens want to eat your eggs for breakfast! You have to do everything in under one minute so they dont take away your children forever.",
    cover: "/assets/images/nestkeepingtitle.png",
    itch: "https://keepchatting.itch.io/nestkeeping",
    download: "/games/nestkeeping/nestkeeping.zip",
    embed: "/games/nestkeeping/index.html",
    featured: true,
  },
  {
    slug: "sweetechos",
    name: "Sweet Echos",
    studio: "quib",
    tag: "autumn jam 2026, scare",
    description:
      "A game made for the NHS Private Autumn Jam 2026, following the theme of Scare and limitation of Cutting. You play as a cute poltergeist scaring (and possibly murdering) people in the physical realm for their echos, which can be traded for items in the spiritual realm that other eager ghosts may want.",
    cover: "/assets/images/sweetechos.png",
    itch: "https://keepchatting.itch.io/sweet-echos",
    download: "/games/sweetechos/sweetechos.zip",
    embed: "/games/sweetechos/index.html",
    featured: true,
  },
  {
    slug: "polarising",
    name: "So Polarising!",
    studio: "quib",
    tag: "prototype, pizza tower inspired",
    description:
      "Game inspired by Pizza Tower. Propel yourself with magnets to fling through rooms and wind through the course into freedom. Still a concept — extra hands very welcome.",
    cover: "/assets/images/polarisingtitle.png",
    itch: "https://keepchatting.itch.io/so-polarising",
    download: "/games/polarising/polarising.zip",
    embed: "/games/polarising/index.html",
  },
  {
    slug: "metalforge",
    name: "The Metal Forge",
    studio: "quib",
    tag: "school project, arcade",
    description:
      "Game made as a school project. Though metal lusts for destruction, you lust for profit. Massacre metal with their harvested materials, and profit from your endeavours.",
    cover: "/assets/images/metalforgetitle.png",
    itch: "https://keepchatting.itch.io/the-metal-forge",
    download: "/games/metalforge/metalforge.zip",
    embed: "/games/metalforge/index.html",
  },
  {
    slug: "thethreeboxes",
    name: "The Three Boxes",
    studio: "quib",
    tag: "school project, escape rooms",
    description:
      "Game made as a school project. Navigate through various escape rooms, using three boxes as clues to success. Traverse through aged rooms and find your way to the surface.",
    cover: "/assets/images/threeboxestitle.png",
    itch: "https://keepchatting.itch.io/the-three-boxes",
    download: "/games/thethreeboxes/thethreeboxes.zip",
    embed: "/games/thethreeboxes/index.html",
  },
  {
    slug: "dropem",
    name: "Drop Em",
    studio: "quib",
    tag: "prototype, online party",
    description:
      "An online party game where you try to push your friends into the rising lava! Use your vast moveset as well as powerups to weave around your friends and be the first to the top. Prototype — not many things are implemented yet.",
    cover: "/assets/images/dropem.png",
    itch: "https://keepchatting.itch.io/drop-em",
    download: "/games/dropem/dropem.zip",
    embed: "/games/dropem/index.html",
  },
  {
    slug: "darkness",
    name: "Into the Darkness",
    studio: "mediaocre",
    tag: "micro jam 046, night",
    description:
      "Game made for the Micro Jam 046: Night. You can only feel light; The dark is known to cause mirages...",
    cover: "/assets/images/darkness.png",
    itch: "https://kryspigames.itch.io/into-the-darkness",
    download: "/games/darkness/darkness.zip",
    embed: "/games/darkness/index.html",
  },
  {
    slug: "undertemmodes",
    name: "Undertem Mode Selector",
    studio: "mediaocre",
    tag: "fangame, april fools",
    description:
      "Holds every Undertem April Fools mode currently released! Funddertem: A charming clicker game where you fund Tems so that they can finally go to Colleg and Universitat! Includes various unique characters from different games and AUs! More coming next year...",
    cover: "/assets/images/undertemmodes.png",
    gallery: [
      "/assets/images/funddertem-cover.png",
      "/assets/images/undertem-guards.png",
      "/assets/images/undertemtitle.png",
      "/assets/images/undertem-ruins-cover.webp",
    ],
    embed: "/games/undertemmodes/index.html",
  },
];

export const tracks: Track[] = [
  {
    title: "Paper",
    game: "Polydraws",
    composer: "Dylan",
    youtube: "Rsk8uy1KByU",
    studio: "quib",
  },
  {
    title: "Charging",
    game: "Charge Cycle",
    composer: "Dylan",
    youtube: "KpCpu4bzeLA",
    studio: "quib",
  },
  {
    title: "Day, Night, Migration",
    game: "Nestkeeping",
    composer: "Dylan",
    youtube: "KUwOUs33suI",
    studio: "quib",
  },
  {
    title: "Void, Polarity",
    game: "Black Hole White Hole",
    composer: "Aaqib",
    youtube: "hoYnwby-qZ4",
    studio: "quib",
  },
  {
    title: "Bit Mental",
    game: "The Metal Forge",
    composer: "Dylan",
    youtube: "5IAEQNjjDwI",
    studio: "quib",
  },
  {
    title: "Land of the Spirits",
    game: "Sweet Echos",
    composer: "YupamLT",
    youtube: "vA6jFMNnsRQ",
    studio: "quib",
  },
  {
    title: "Polterheist",
    game: "Sweet Echos",
    composer: "YupamLT",
    youtube: "pJ6i4EYCpko",
    studio: "quib",
  },
  {
    title: "Isolation",
    game: "Into the Darkness",
    composer: "Aaqib",
    youtube: "wlpSJbSUSRQ",
    studio: "mediaocre",
  },
  {
    title: "Ruins [wip]",
    game: "Undertem",
    composer: "Krys",
    youtube: "4a7et55J8xk",
    studio: "mediaocre",
  },
];

export const projects: Project[] = [
  {
    name: "Newhome Studios",
    image: "/assets/images/newhomestudios.png",
    href: "https://newhomestudios.neocities.org/",
    external: true,
  },
  {
    name: "Floweytale",
    image: "/assets/images/floweytale-website.png",
    href: "https://floweytale.org/",
    external: true,
  },
  {
    name: "User Manager",
    image: "/assets/images/user-manager.png",
    href: "https://quib-inc-user-manager.vercel.app/",
    external: true,
  },
  {
    name: "Screensaver",
    image: "/assets/images/screensaver.png",
    href: "/showcase/screensaver/index.html",
    external: false,
  },
];

export const devlog: DevlogPost[] = [
  {
    slug: "july-august-2026",
    date: "july/august 2026",
    title: "Floweytale venture",
    tagline: "Guess who's that about.",
    blocks: [
      {
        type: "text",
        content:
          "Recently, I've joined a new project called Floweytale. Guess who's that about.",
      },
      {
        type: "text",
        content:
          "It's an extremely ambitious project that aims to have multiple sections just for the demo alone. The full game will span multiple playthroughs and slowly give you more access to routes that you can play through as Flowey.",
      },
      {
        type: "image",
        src: "/assets/images/floweytale-battle.png",
        alt: "A black and white Floweytale battle against a skeletal knight",
      },
      {
        type: "text",
        content:
          "It features a variety of new mechanics to differentiate it from just an RPG, and working on the team has been a blast, given their kindness and the amount of progress that was so quickly done throughout just a few months.",
      },
      {
        type: "text",
        content:
          "We'll soon be sending out a teaser, but if you want to see their",
      },
      {
        type: "link",
        before: "",
        label: "Gamejolt page",
        href: "https://gamejolt.com/games/Determination/922941",
        after: "or their most recent",
      },
      {
        type: "link",
        before: "",
        label: "Reddit post",
        href: "https://www.reddit.com/r/Undertale/comments/1uablum/introducing_the_new_era_of_floweytale/",
        after: ", you can do so here. We've been having a lot of fun messing around on a certain cutscene...",
      },
      {
        type: "text",
        content:
          "On an unrelated note, not much development has happened on Undertem as we've been aiming to start writing our entire game doc for once, but Krys is developing a tool that will hopefully speed up development in some way.",
      },
      {
        type: "text",
        content:
          "Furthermore, I've started working on a new multiplayer game to test my skills with Gamemaker's networking functions and hopefully make a fun party game.",
      },
      { type: "video", src: "/assets/videos/dropem.mp4", caption: "Drop Em, in motion" },
      { type: "text", content: "Wow this has literally only one teaser." },
    ],
  },
  {
    slug: "april-2026",
    date: "april 1st 2026",
    title: "Undertem Ruins demo!",
    tagline: "You heard that right.",
    blocks: [
      {
        type: "text",
        content: "You heard that right! The Undertem Ruins Demo is finally out!",
      },
      {
        type: "image",
        src: "/assets/images/undertemtitle.png",
        alt: "The Undertem wordmark",
      },
      {
        type: "text",
        content:
          "Explore the Ruins 100 years later as Frisk and Chara wander through decayed halls covered in Tem graffiti.",
      },
      {
        type: "image",
        src: "/assets/images/realdemo1.png",
        alt: "Undertem Ruins demo screenshot",
      },
      {
        type: "image",
        src: "/assets/images/realdemo2.png",
        alt: "Undertem Ruins demo screenshot",
      },
      {
        type: "text",
        content: "The Tems patrol relentlessly. No mercy, no allies, just survival.",
      },
      {
        type: "image",
        src: "/assets/images/realdemo3.png",
        alt: "Undertem Ruins demo screenshot",
      },
      {
        type: "text",
        content: "So play the game now! Available at",
      },
      {
        type: "link",
        before: "",
        label: "Itch.io",
        href: "https://keepchatting.itch.io/realundertem",
        after: "or on",
      },
      {
        type: "link",
        before: "",
        label: "GameJolt",
        href: "https://gamejolt.com/games/undertem/1059876",
        after: ".",
      },
    ],
  },
  {
    slug: "jan-feb-2026",
    date: "jan/feb 2026",
    title: "Undertem progress and So Polarising redo",
    tagline: "Yes, there is progress.",
    blocks: [
      {
        type: "text",
        content:
          "For those of you who don't know what Undertem is, it's an Undertale fangame being worked on by both Quib Inc. and Mediaocre Games, focusing on the species called the Temmies as the Underground goes through a revolution.",
      },
      {
        type: "text",
        content:
          "Though the UNDEREVENT deadline is slowly creeping up behind us, there's surprisingly quite a lot of content that we have in store, especially after a half-year stagnation.",
      },
      {
        type: "text",
        content:
          "We have 2 actual artists on our team (way more than the 0 we had before for sure) and the entire Ruins has been fixed! I even got a bit of pathfinding in there for when we do the guards.",
      },
      {
        type: "text",
        content:
          "The lore has became much more well-established than the more jokey and loose story that we had before. The artstyle is also getting sorted out.",
      },
      { type: "text", content: "Right, some teasers." },
      {
        type: "video",
        src: "/assets/videos/ruins-intro.mp4",
        caption: "The Ruins entrance, in-game",
      },
      {
        type: "text",
        content:
          "Here is a clip of the Ruins entrance in-game. Everything is subject to change.",
      },
      {
        type: "text",
        content:
          "Here is another clip of wander and pathfinding AI in the game. Note that the sprites are not permanent (the AI also just reuses a different sprite as a placeholder).",
      },
      {
        type: "video",
        src: "/assets/videos/pathfinding.mp4",
        caption: "Wander and pathfinding AI",
      },
      { type: "text", content: "And as for So Polarising..." },
      {
        type: "text",
        content:
          "Although I love the concept, I cannot make it on my own. I'll be doing a small redo to some of the art and might add some more movement, but I do need some other people if I want to actually make the entire thing.",
      },
      { type: "text", content: "As of now, it's simply a concept. Any help is appreciated!" },
      { type: "text", content: "Sneezing off." },
    ],
  },
];

export const socials = [
  { name: "discord", label: "Discord", href: "https://discordapp.com/users/1209583285215436871", icon: "/assets/images/discord.png" },
  { name: "youtube", label: "YouTube", href: "https://www.youtube.com/@keepmaking-ane", icon: "/assets/images/youtube.png" },
  { name: "itch", label: "itch.io", href: "https://keepchatting.itch.io/", icon: "/assets/images/itch.png" },
  { name: "gmail", label: "Email", href: "mailto:aaqibchoudhury3@gmail.com", icon: "/assets/images/gmail.png" },
];

export const emails = {
  quib: "aaqibchoudhury3@gmail.com",
  mediaocre: "undertemtheshitpost@gmail.com",
};

export const navLinks = [
  { label: "games", href: "/games" },
  { label: "music", href: "/music" },
  { label: "projects", href: "/projects" },
  { label: "devlog", href: "/devlog" },
  { label: "about", href: "/about" },
  { label: "contact", href: "/contact" },
];

export function getGame(slug: string) {
  return games.find((game) => game.slug === slug);
}
