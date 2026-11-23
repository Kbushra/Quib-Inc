import type { Metadata } from "next";
import Link from "next/link";
import GameCard from "@/components/game-card";
import MusicCard from "@/components/music-card";
import SectionHeading from "@/components/section-heading";
import { games, tracks } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mediaocre Games",
  description: "Quib Inc. collaborates with Mediaocre Games on larger team projects, including original concepts and indie fangames.",
};

const teamImages = [
  { src: "/assets/images/undertem-ruins-cover.webp", alt: "Undertem Ruins soundtrack cover" },
  { src: "/assets/images/funddertem-cover.png", alt: "Funddertem artwork" },
  { src: "/assets/images/undertem-guards.png", alt: "Undertem guards artwork" },
];

export default function MediaocrePage() {
  const teamGames = games.filter((game) => game.studio === "mediaocre");
  const teamTracks = tracks.filter((track) => track.studio === "mediaocre");

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <div className="mb-12 border-b-2 border-ink pb-9">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl">Mediaocre Games</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          Quib Inc. collaborates with Mediaocre Games on larger team projects, including original concepts and indie fangames.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
        <div>
          <h2 className="text-3xl">Undertem</h2>
          <p className="mt-5 text-base text-muted">
            The team includes Krystal, Jayden, Ava and Aaqib. Together we focus on game development, art direction and interactive storytelling.
          </p>
          <p className="mt-5 text-base text-muted">
            Our main project is Undertem, a take on the RPG Undertale where the Temmies revolt against monsterkind after oppression, and turn the Underground into a dictatorship.
          </p>
          <p className="mt-5 text-base text-muted">
            The Undertem team is all of Mediaocre, as well as pixel artists Krispy (@kr_spy), Sha (@youk_owjak), Skater (@skaterfc), and promotional and high resolution artist Bendy (@mrbendyfeathers).
          </p>
          <p className="mt-5 text-base text-muted">
            Undertem currently has a Ruins theme and the entirety of the Ruins is coded. It is going through a rewrite, with the goal of balancing politics and humour while keeping the current events mostly similar.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {teamImages.map((image) => (
            <div key={image.src} className="border-2 border-ink bg-paper shadow-pixel">
              <img src={image.src} alt={image.alt} loading="lazy" className="aspect-square w-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20">
        <SectionHeading note="Current games includes released jam entries and in-progress projects such as Into the Darkness and Undertem.">
          Project Games
        </SectionHeading>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teamGames.map((game) => (
            <GameCard key={game.slug} game={game} />
          ))}
        </div>
      </div>

      <div className="mt-20">
        <SectionHeading note="Current music consists only of jam entries, with the current Undertem OST set to release in the near future.">
          Project Music
        </SectionHeading>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teamTracks.map((track) => (
            <MusicCard key={track.youtube} track={track} />
          ))}
        </div>
      </div>

      <div className="mt-20 border-2 border-ink bg-accent-soft p-8 shadow-pixel sm:p-12">
        <h2 className="text-3xl sm:text-4xl">Contact Mediaocre Games</h2>
        <p className="mt-4 max-w-xl text-base text-muted">
          Reach the team through social channels or use the direct email form for enquiries into our projects.
        </p>
        <Link
          href="/contact"
          className="mt-7 inline-flex min-h-12 items-center justify-center border-2 border-ink bg-accent px-6 py-3 font-display text-base text-ink shadow-pixel transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-pixel-lg active:translate-y-0"
        >
          contact mediaocre
        </Link>
      </div>
    </section>
  );
}
