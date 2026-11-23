import type { ReactNode } from "react";

export default function SectionHeading({ children, note }: { children: ReactNode; note?: string }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3">
        <span className="block h-3 w-3 shrink-0 bg-accent" aria-hidden="true" />
        <h2 className="text-3xl sm:text-4xl lg:text-5xl">{children}</h2>
      </div>
      {note && <p className="mt-4 max-w-2xl text-base text-muted">{note}</p>}
    </div>
  );
}
