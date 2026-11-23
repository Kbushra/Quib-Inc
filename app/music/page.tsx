import type { Metadata } from "next";
import MusicCard from "@/components/music-card";
import { tracks } from "@/lib/site";

export const metadata: Metadata = {
  title: "Music",
  description: "Tracks and OST pieces composed for Quib Inc. games. Each entry includes a direct embedded player.",
};

export default function MusicPage() {
  const quib = tracks.filter((track) => track.studio === "quib");
  const team = tracks.filter((track) => track.studio === "mediaocre");

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <div className="mb-12 border-b-2 border-ink pb-9">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl">Project Music</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          Tracks and OST pieces composed for Quib Inc. games. Each entry includes a direct embedded player.
        </p>
      </div>

      <h2 className="text-3xl">Quib Inc.</h2>
      <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {quib.map((track) => (
          <MusicCard key={track.youtube} track={track} />
        ))}
      </div>

      <div className="mt-16 border-t-2 border-ink pt-12">
        <h2 className="text-3xl">Mediaocre Content</h2>
        <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((track) => (
            <MusicCard key={track.youtube} track={track} />
          ))}
        </div>
      </div>
    </section>
  );
}
