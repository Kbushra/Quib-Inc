import Link from "next/link";
import GameCard from "@/components/game-card";
import FeaturedGames from "@/components/featured-games";
import MusicCard from "@/components/music-card";
import SectionHeading from "@/components/section-heading";
import { PixelScene, PixelSpark } from "@/components/pixel-decor";
import { devlog, games, tracks } from "@/lib/site";

const moreGames = games.filter((game) => !game.featured).slice(0, 4);

export default function HomePage() {
  const latest = devlog[0];

  return (
    <>
      <section className="flex min-h-[calc(100svh-80px)] items-center border-b-2 border-ink bg-canvas">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:py-20">
          <div className="enter">
            <div className="mb-7 flex items-center gap-2" aria-hidden="true">
              <span className="h-3 w-3 bg-accent" />
              <span className="h-3 w-3 bg-ink" />
              <span className="h-3 w-3 bg-sun" />
            </div>
            <h1 className="text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
              Games, Music, Websites
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted">
              Quib Inc. is an organisation managed by Aaqib Choudhury. We build jam games, original
              soundtracks, and interactive web projects with a focus on creativity and learning.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/games"
                className="inline-flex min-h-12 items-center justify-center border-2 border-ink bg-accent px-6 py-3 font-display text-base text-ink shadow-pixel transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-pixel-lg active:translate-y-0"
              >
                Explore Games
              </Link>
              <Link
                href="/music"
                className="inline-flex min-h-12 items-center justify-center border-2 border-ink bg-paper px-6 py-3 font-display text-base text-ink shadow-pixel transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-pixel-lg active:translate-y-0"
              >
                Listen to Music
              </Link>
            </div>
          </div>

          <div className="enter" style={{ animationDelay: "120ms" }}>
            <FeaturedGames games={games} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <SectionHeading note="Browse all playable game pages produced by Quib Inc. Most titles are desktop-first releases.">
          Project Games
        </SectionHeading>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {moreGames.map((game) => (
            <GameCard key={game.slug} game={game} />
          ))}
        </div>
        <Link
          href="/games"
          className="mt-10 inline-flex min-h-11 items-center border-b-2 border-ink text-sm lowercase no-underline transition-colors duration-150 hover:border-accent hover:text-accent-ink"
        >
          Explore Games
        </Link>
      </section>

      <section className="border-y-2 border-ink bg-accent">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-7 px-5 py-20 sm:px-8">
          <PixelSpark className="h-9 w-9" color="var(--color-ink)" />
          <p className="max-w-4xl font-display text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">
            A website to give updates on Quib Inc. and its affiliated Mediaocre Games, providing their content.
          </p>
          <PixelScene className="h-28 w-52 border-2 border-ink sm:h-36 sm:w-64" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <SectionHeading note="Tracks and OST pieces composed for Quib Inc. games. Each entry includes a direct embedded player.">
          Project Music
        </SectionHeading>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tracks.slice(0, 3).map((track) => (
            <MusicCard key={track.youtube} track={track} />
          ))}
        </div>
        <Link
          href="/music"
          className="mt-10 inline-flex min-h-11 items-center border-b-2 border-ink text-sm lowercase no-underline transition-colors duration-150 hover:border-accent hover:text-accent-ink"
        >
          Listen to Music
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <SectionHeading note="Project updates, progress checks and development logs from Quib Inc. and partner teams.">
          Most Recent Newsletter
        </SectionHeading>
        <Link
          href="/devlog"
          className="group block max-w-3xl border-2 border-ink bg-paper shadow-pixel transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-pixel-lg active:translate-y-0"
        >
          <div className="flex flex-wrap items-center gap-3 border-b-2 border-ink px-5 py-3">
            <span className="bg-accent-soft px-2 py-1 text-[11px] lowercase">{latest.date}</span>
            <span className="text-xs lowercase text-muted">Newsletter</span>
          </div>
          <div className="px-5 py-7">
            <h3 className="text-2xl sm:text-3xl">{latest.title}</h3>
            <p className="mt-2 font-display text-lg text-accent-ink">{latest.tagline}</p>
            <p className="mt-5 max-w-2xl text-base text-muted">{latest.blocks[0].type === "text" ? latest.blocks[0].content : ""}</p>
            <span className="mt-6 inline-flex min-h-11 items-center border-b-2 border-ink text-sm lowercase no-underline transition-colors duration-150 group-hover:border-accent group-hover:text-accent-ink">
              View All Updates
            </span>
          </div>
        </Link>
      </section>
    </>
  );
}
