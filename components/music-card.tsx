"use client";

import { useState } from "react";
import type { Track } from "@/lib/site";

export default function MusicCard({ track }: { track: Track }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="border-2 border-ink bg-paper shadow-pixel transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-pixel-lg">
      <div className="flex items-center justify-between gap-3 border-b-2 border-ink px-3 py-2">
        <span className="truncate font-display text-base leading-none">{track.title}</span>
        <span className="shrink-0 text-[10px] lowercase text-muted">{track.composer}</span>
      </div>
      <div className="aspect-video overflow-hidden bg-night">
        {loaded ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${track.youtube}?autoplay=1`}
            title={`${track.title} from ${track.game}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setLoaded(true)}
            className="group flex h-full w-full flex-col items-center justify-center gap-3 text-paper transition-colors duration-150 hover:bg-night/80"
          >
            <span className="flex h-12 w-12 items-center justify-center border-2 border-paper bg-accent text-ink transition-transform duration-150 group-hover:scale-110">
              <svg viewBox="0 0 12 12" className="ml-0.5 h-4 w-4" style={{ fill: "currentColor", shapeRendering: "crispEdges" }} aria-hidden="true">
                <path d="M2 0h3v12H2zM6 2h3v8H6zM10 4h2v4h-2z" />
              </svg>
            </span>
            <span className="font-display text-lg lowercase">listen</span>
            <span className="sr-only">{track.title} from {track.game}</span>
          </button>
        )}
      </div>
    </div>
  );
}
