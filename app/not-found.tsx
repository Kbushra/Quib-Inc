import Link from "next/link";
import { PixelScene } from "@/components/pixel-decor";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70svh] max-w-3xl flex-col items-start justify-center px-5 py-20 sm:px-8">
      <PixelScene className="h-36 w-64 border-2 border-ink" />
      <h1 className="mt-8 text-5xl sm:text-6xl">Page not found!</h1>
      <p className="mt-4 text-lg text-muted">
        Use the menubar to go back to an existing page.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link href="/" className="inline-flex min-h-12 items-center justify-center border-2 border-ink bg-accent px-6 py-3 font-display text-base text-ink shadow-pixel transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-pixel-lg active:translate-y-0">
          Home
        </Link>
        <Link href="/games" className="inline-flex min-h-12 items-center justify-center border-2 border-ink bg-paper px-6 py-3 font-display text-base text-ink shadow-pixel transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-pixel-lg active:translate-y-0">
          Project Games
        </Link>
      </div>
    </section>
  );
}
