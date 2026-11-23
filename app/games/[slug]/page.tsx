import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import GameEmbed from "@/components/game-embed";
import { PixelSpark } from "@/components/pixel-decor";
import { games, getGame } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return games.map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) return { title: "Game not found" };
  return { title: game.name, description: game.description, openGraph: { images: [game.cover] } };
}

function ActionLink({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="inline-flex min-h-12 items-center justify-center border-2 border-ink bg-paper px-5 py-3 font-display text-base text-ink shadow-pixel transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-pixel-lg active:translate-y-0"
    >
      {children}
    </a>
  );
}

export default async function GamePage({ params }: Params) {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) notFound();

  const related = games.filter((item) => item.slug !== game.slug).slice(0, 3);

  return (
    <article className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
      <Link href="/games" className="inline-flex min-h-11 items-center text-sm lowercase no-underline transition-colors duration-150 hover:text-accent-ink">
        Project Games
      </Link>

      <header className="mt-8 grid gap-9 border-b-2 border-ink pb-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <span className="inline-block bg-accent-soft px-3 py-1.5 text-xs lowercase">{game.tag}</span>
          <h1 className="mt-5 text-5xl sm:text-6xl lg:text-7xl">{game.name}</h1>
        </div>
        <div className="border-2 border-ink bg-paper shadow-pixel">
          <div className="aspect-[16/9] overflow-hidden">
            <img src={game.cover} alt={`${game.name} cover art`} fetchPriority="high" decoding="sync" className="h-full w-full object-cover" />
          </div>
        </div>
      </header>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="text-3xl">Game Details</h2>
          <div className="mt-6">
            {game.embed ? (
              <GameEmbed src={game.embed} title={game.name} />
            ) : (
              <p className="text-muted">No embed available.</p>
            )}
          </div>
        </div>
        <aside>
          <h2 className="text-3xl">About</h2>
          <p className="mt-6 text-base text-muted">{game.description}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            {game.itch && <ActionLink href={game.itch} external>itch.io page</ActionLink>}
            {game.download && <ActionLink href={game.download}>download .zip</ActionLink>}
          </div>
          {game.studio === "mediaocre" && (
            <p className="mt-8 border-l-4 border-accent pl-4 text-sm text-muted">
              Quib Inc. collaborates with <Link href="/mediaocre" className="text-ink underline decoration-accent decoration-2 underline-offset-4">Mediaocre Games</Link> on larger team projects, including original concepts and indie fangames.
            </p>
          )}
        </aside>
      </div>

      {game.gallery && game.gallery.length > 0 && (
        <section className="mt-16 border-t-2 border-ink pt-12">
          <h2 className="text-3xl">Screenshots</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {game.gallery.map((image) => (
              <div key={image} className="border-2 border-ink bg-paper shadow-pixel">
                <img src={image} alt={`${game.name} screenshot`} loading="lazy" className="aspect-[16/9] w-full object-cover" />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-16 border-t-2 border-ink pt-12">
        <div className="flex items-center gap-3">
          <PixelSpark className="h-4 w-4" />
          <h2 className="text-3xl">Project Games</h2>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {related.map((item) => (
            <Link
              key={item.slug}
              href={`/games/${item.slug}`}
              className="min-h-11 border-2 border-ink bg-paper px-4 py-2 font-display text-sm no-underline shadow-[3px_3px_0_0_var(--color-line)] transition-[transform,background-color] duration-150 hover:-translate-y-0.5 hover:bg-accent-soft active:translate-y-0"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
