import type { Metadata } from "next";
import DevlogArticle from "@/components/devlog-article";
import { devlog } from "@/lib/site";

export const metadata: Metadata = {
  title: "Devlog",
  description: "Project updates, progress checks and development logs from Quib Inc. and partner teams.",
};

export default function DevlogPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
      <div className="mb-12 border-b-2 border-ink pb-9">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl">Newsletter</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          Project updates, progress checks and development logs from Quib Inc. and partner teams.
        </p>
      </div>
      <div className="flex flex-col gap-10">
        {devlog.map((post) => (
          <DevlogArticle key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
