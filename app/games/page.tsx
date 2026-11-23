import type { Metadata } from "next";
import GameGrid from "@/components/game-grid";
import { games } from "@/lib/site";

export const metadata: Metadata = {
  title: "Games",
  description: "Browse all playable game pages produced by Quib Inc. Most titles are desktop-first releases.",
};

export default function GamesPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <div className="mb-12 border-b-2 border-ink pb-9">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl">Project Games</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          Browse all playable game pages produced by Quib Inc. Most titles are desktop-first releases.
        </p>
      </div>
      <GameGrid games={games} />
    </section>
  );
}
