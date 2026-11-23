"use client";

import { useState } from "react";
import GameCard from "@/components/game-card";
import type { Game } from "@/lib/site";

const filters = [
  { id: "all", label: "all games" },
  { id: "jam", label: "jam games" },
  { id: "prototype", label: "prototypes" },
  { id: "team", label: "team projects" },
  { id: "school", label: "school projects" },
] as const;

type FilterId = (typeof filters)[number]["id"];

function matches(game: Game, filter: FilterId) {
  switch (filter) {
    case "jam":
      return /jam/i.test(game.tag);
    case "prototype":
      return /prototype/i.test(game.tag);
    case "team":
      return game.studio === "mediaocre";
    case "school":
      return /school/i.test(game.tag);
    default:
      return true;
  }
}

export default function GameGrid({ games }: { games: Game[] }) {
  const [active, setActive] = useState<FilterId>("all");
  const shown = games.filter((game) => matches(game, active));

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-3" role="group" aria-label="Filter games">
        {filters.map((filter) => {
          const selected = active === filter.id;
          return (
            <button
              key={filter.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(filter.id)}
              className={`min-h-11 border-2 border-ink px-4 py-2 text-sm lowercase shadow-[3px_3px_0_0_var(--color-line)] transition-[transform,background-color] duration-150 hover:-translate-y-0.5 active:translate-y-0 ${selected ? "bg-accent text-ink" : "bg-paper text-ink"}`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((game, index) => (
          <GameCard key={game.slug} game={game} priority={index === 0} />
        ))}
      </div>
      <p aria-live="polite" className="mt-8 text-sm lowercase text-muted">
        showing {shown.length} of {games.length} games
      </p>
    </div>
  );
}
