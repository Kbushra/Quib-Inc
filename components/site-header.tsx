"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks } from "@/lib/site";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="relative z-50 border-b-2 border-ink bg-paper">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="group flex items-center gap-3 no-underline"
        >
          <span className="block h-4 w-4 shrink-0 bg-accent transition-transform duration-150 group-hover:rotate-90" aria-hidden="true" />
          <span className="flex flex-col">
            <span className="font-display text-2xl leading-none">quib inc.</span>
            <span className="mt-1 text-xs leading-none text-muted">Games, Music, Websites</span>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative py-2 text-sm lowercase no-underline transition-colors duration-150 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-200 hover:after:scale-x-100 ${active ? "text-accent-ink after:scale-x-100" : "text-ink hover:text-accent-ink"}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-11 w-11 items-center justify-center border-2 border-ink bg-paper transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 lg:hidden"
        >
          <span className="relative block h-4 w-5" aria-hidden="true">
            <span className={`absolute left-0 block h-[2px] w-full bg-ink transition-transform duration-200 ${open ? "top-[7px] rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 top-[7px] block h-[2px] w-full bg-ink transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute left-0 block h-[2px] w-full bg-ink transition-transform duration-200 ${open ? "top-[7px] -rotate-45" : "top-[14px]"}`} />
          </span>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className="border-t-2 border-ink bg-canvas px-5 py-6 lg:hidden"
        >
          <ul className="mx-auto flex max-w-6xl flex-col gap-1">
            {navLinks.map((link, index) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-4 border-b-2 border-line py-3 font-display text-2xl no-underline transition-colors duration-150 hover:text-accent-ink"
                >
                  <span className="font-body text-xs text-accent-ink" aria-hidden="true">0{index + 1}</span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
