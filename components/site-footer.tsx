import Link from "next/link";
import { navLinks, socials } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t-2 border-ink bg-night text-paper">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-5xl leading-none">quib inc.</p>
            <div className="mt-6 flex flex-wrap gap-4">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={social.label}
                  className="inline-flex h-11 w-11 items-center justify-center border-2 border-paper/40 bg-paper/5 transition-[transform,background-color] duration-150 hover:-translate-y-0.5 hover:bg-paper/15"
                >
                  <img src={social.icon} alt="" width={24} height={24} draggable={false} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <ul className="mt-5 flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm lowercase text-paper/80 no-underline transition-colors duration-150 hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ul className="mt-5 flex flex-col gap-3">
              <li>
                <Link href="/mediaocre" className="text-sm lowercase text-paper/80 no-underline transition-colors duration-150 hover:text-accent">mediaocre games</Link>
              </li>
              <li>
                <Link href="/team-thorn" className="text-sm lowercase text-paper/80 no-underline transition-colors duration-150 hover:text-accent">team thorn</Link>
              </li>
              <li>
                <a href="mailto:aaqibchoudhury3@gmail.com" className="text-sm lowercase text-paper/80 no-underline transition-colors duration-150 hover:text-accent">email quib inc.</a>
              </li>
              <li>
                <a href="mailto:undertemtheshitpost@gmail.com" className="text-sm lowercase text-paper/80 no-underline transition-colors duration-150 hover:text-accent">email mediaocre</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t-2 border-paper/20 pt-6 text-xs text-paper/60">
          <p>&copy; {new Date().getFullYear()} Quib Inc.</p>
        </div>
      </div>
    </footer>
  );
}
