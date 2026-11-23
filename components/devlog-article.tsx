import type { DevlogPost } from "@/lib/site";

export default function DevlogArticle({ post }: { post: DevlogPost }) {
  return (
    <article className="border-2 border-ink bg-paper shadow-pixel">
      <header className="flex flex-wrap items-center gap-3 border-b-2 border-ink px-5 py-4 sm:px-8">
        <span className="bg-accent-soft px-2 py-1 text-[11px] lowercase">{post.date}</span>
        <span className="text-xs lowercase text-muted">Newsletter</span>
      </header>
      <div className="px-5 py-9 sm:px-8">
        <h2 className="text-3xl sm:text-4xl">{post.title}</h2>
        <p className="mt-3 font-display text-xl text-accent-ink">{post.tagline}</p>
        <div className="mt-8 flex max-w-3xl flex-col gap-6">
          {post.blocks.map((block, index) => {
            if (block.type === "text") {
              return <p key={index} className="text-base text-muted">{block.content}</p>;
            }
            if (block.type === "image") {
              return (
                <img
                  key={index}
                  src={block.src}
                  alt={block.alt}
                  loading="lazy"
                  className="w-full max-w-2xl border-2 border-ink bg-canvas"
                />
              );
            }
            if (block.type === "video") {
              return (
                <video
                  key={index}
                  controls
                  preload="none"
                  aria-label={block.caption}
                  className="w-full max-w-2xl border-2 border-ink bg-night"
                >
                  <source src={block.src} type="video/mp4" />
                  Video not supported.
                </video>
              );
            }
            return (
              <p key={index} className="text-base text-muted">
                {block.before}
                <a href={block.href} target="_blank" rel="noopener noreferrer" className="text-ink underline decoration-accent decoration-2 underline-offset-4">
                  {block.label}
                </a>
                {block.after}
              </p>
            );
          })}
        </div>
      </div>
    </article>
  );
}
