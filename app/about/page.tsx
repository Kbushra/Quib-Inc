import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "A website to give updates on Quib Inc. and its affiliated Mediaocre Games, providing their content.",
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <div className="mb-14 grid gap-10 border-b-2 border-ink pb-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl">Quib Inc.</h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Quib Inc. is an organisation managed by Aaqib Choudhury. We build jam games, original soundtracks,
            and interactive web projects with a focus on creativity and learning.
          </p>
        </div>
        <div className="border-2 border-ink bg-paper shadow-pixel">
          <img src="/og-image.png" alt="Quib Inc. homepage" className="w-full" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Link href="/" className="group border-2 border-ink bg-paper p-6 shadow-pixel transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-pixel-lg">
          <h2 className="text-2xl">Quib Inc.</h2>
          <p className="mt-3 text-sm text-muted">Quib Inc. is an organisation managed by Aaqib Choudhury.</p>
        </Link>
        <Link href="/mediaocre" className="group border-2 border-ink bg-paper p-6 shadow-pixel transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-pixel-lg">
          <h2 className="text-2xl">Mediaocre Games</h2>
          <p className="mt-3 text-sm text-muted">Quib Inc. collaborates with Mediaocre Games on larger team projects, including original concepts and indie fangames.</p>
        </Link>
        <Link href="/team-thorn" className="group border-2 border-ink bg-paper p-6 shadow-pixel transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-pixel-lg">
          <h2 className="text-2xl">Team Thorn</h2>
          <p className="mt-3 text-sm text-muted">Team Thorn is a recent organisation that members of Quib Inc. has joined, working mainly on Floweytale.</p>
        </Link>
      </div>

      <div className="mt-20 border-2 border-ink bg-accent-soft p-8 shadow-pixel sm:p-12">
        <h2 className="text-3xl sm:text-4xl">Contact Quib Inc.</h2>
        <p className="mt-4 max-w-xl text-base text-muted">
          Reach out through social channels or send a direct message using the contact form.
        </p>
        <Link
          href="/contact"
          className="mt-7 inline-flex min-h-12 items-center justify-center border-2 border-ink bg-accent px-6 py-3 font-display text-base text-ink shadow-pixel transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-pixel-lg active:translate-y-0"
        >
          Contact Quib Inc.
        </Link>
      </div>
    </section>
  );
}
