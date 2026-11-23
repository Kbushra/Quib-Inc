import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Team Thorn",
  description: "Team Thorn is a recent organisation that members of Quib Inc. has joined, working mainly on Floweytale.",
};

const images = [
  { src: "/assets/images/floweytale-banner.png", alt: "Floweytale key art" },
  { src: "/assets/images/floweytale-battle.png", alt: "A Floweytale battle" },
  { src: "/assets/images/floweytale-castle.png", alt: "Floweytale's castle garden" },
];

export default function TeamThornPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <div className="mb-12 border-b-2 border-ink pb-9">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl">Team Thorn</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          A recent organisation that members of Quib Inc. have joined, working mainly on Floweytale.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <div>
          <h2 className="text-3xl">Floweytale</h2>
          <p className="mt-5 text-base text-muted">
            Team Thorn is a relatively large indie team, with a variety of talented artists, musicians and programmers.
          </p>
          <p className="mt-5 text-base text-muted">
            Their main project is Floweytale, a take on the RPG Undertale that acts as a prequel to the game. It follows Flowey, once the prince of the kingdom, as they slowly turn from a scared, lonely flower into a masochistic murderer who kills just to see what happens.
          </p>
          <p className="mt-5 text-base text-muted">
            Through their power of Determination, they cannot die, and so as the days pass they become more curious about what they can inflict upon the world until their morality is gone.
          </p>
          <p className="mt-5 text-base text-muted">
            Only current work available for show are small sneak-peaks into Floweytale.
          </p>
          <a
            href="https://floweytale.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-12 items-center justify-center border-2 border-ink bg-accent px-6 py-3 font-display text-base text-ink shadow-pixel transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-pixel-lg active:translate-y-0"
          >
            visit floweytale
          </a>
        </div>
        <div className="flex flex-col gap-5">
          {images.map((image) => (
            <div key={image.src} className="border-2 border-ink bg-paper shadow-pixel">
              <img src={image.src} alt={image.alt} loading="lazy" className="w-full" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 flex flex-col gap-6 border-t-2 border-ink pt-12 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/mediaocre" className="inline-flex min-h-11 items-center border-b-2 border-ink text-sm lowercase no-underline transition-colors duration-150 hover:border-accent hover:text-accent-ink">
          Mediaocre Games
        </Link>
      </div>
    </section>
  );
}
