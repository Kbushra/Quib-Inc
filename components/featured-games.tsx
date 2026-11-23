"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PixelSpark } from "@/components/pixel-decor";
import type { Game } from "@/lib/site";

function shuffle<T>(items: T[]) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export default function FeaturedGames({ games }: { games: Game[] }) {
  const [shown, setShown] = useState(() => games.slice(0, 4));

  useEffect(() => {
    setShown(shuffle(games).slice(0, 4));
  }, [games]);

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-5">
      {shown.map((game) => (
        <Link
          key={game.slug}
          href={`/games/${game.slug}`}
          className="group block border-2 border-ink bg-paper shadow-pixel transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-pixel-lg active:translate-y-0"
        >
          <div className="flex items-center justify-between gap-2 border-b-2 border-ink px-2 py-2">
            <span className="truncate font-display text-xs leading-none sm:text-sm">{game.name}</span>
            <PixelSpark className="h-3 w-3 shrink-0" />
          </div>
          <div className="aspect-[16/9] overflow-hidden bg-line">
            <img
              src={game.cover}
              alt={`${game.name} game art`}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
