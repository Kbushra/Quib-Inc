import type { Metadata } from "next";
import Link from "next/link";
import { PixelSpark } from "@/components/pixel-decor";
import { projects } from "@/lib/site";

export const metadata: Metadata = {
  title: "Web projects",
  description: "Interactive and experimental web projects, including design studies and community sites.",
};

export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <div className="mb-12 border-b-2 border-ink pb-9">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl">Project Websites</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          Interactive and experimental web projects, including design studies and community sites.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => {
          const inner = (
            <>
              <div className="flex items-start justify-between gap-3 border-b-2 border-ink px-4 py-3">
                <div>
                  <h2 className="text-xl">{project.name}</h2>
                </div>
                <PixelSpark className="mt-1 h-4 w-4 shrink-0" />
              </div>
              <div className="aspect-[16/9] overflow-hidden bg-line">
                <img
                  src={project.image}
                  alt={`${project.name} website`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
            </>
          );

          const classes = "group block border-2 border-ink bg-paper shadow-pixel transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-pixel-lg active:translate-y-0";

          return project.external ? (
            <a key={project.name} href={project.href} target="_blank" rel="noopener noreferrer" className={classes}>
              {inner}
            </a>
          ) : (
            <Link key={project.name} href={project.href} className={classes}>
              {inner}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
