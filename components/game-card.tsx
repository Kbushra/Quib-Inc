import Link from "next/link";
import type { Game } from "@/lib/site";

export default function GameCard({ game, priority = false }: { game: Game; priority?: boolean }) {
  return (
    <Link
      href={`/games/${game.slug}`}
      className="group block border-2 border-ink bg-paper shadow-pixel transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-pixel-lg active:translate-y-0"
    >
      <div className="flex items-center justify-between gap-3 border-b-2 border-ink px-3 py-2">
        <span className="truncate font-display text-base leading-none">{game.name}</span>
        <span className="shrink-0 bg-accent-soft px-2 py-1 text-[10px] leading-none text-ink">
          {game.studio === "mediaocre" ? "team" : "solo"}
        </span>
      </div>
      <div className="aspect-[16/9] overflow-hidden bg-line">
        <img
          src={game.cover}
          alt={`${game.name} game art`}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          decoding={priority ? "sync" : "async"}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
    </Link>
  );
}
