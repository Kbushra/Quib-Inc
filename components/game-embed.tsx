"use client";

import { useRef, useState } from "react";
import { PixelScene } from "@/components/pixel-decor";

export default function GameEmbed({ src, title }: { src: string; title: string }) {
  const [loaded, setLoaded] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);

  return (
    <div>
      <div className="relative aspect-[16/9] w-full overflow-hidden border-2 border-ink bg-night shadow-pixel">
        {loaded ? (
          <iframe
            ref={frame}
            src={src}
            title={`${title}, playable in your browser`}
            allow="autoplay; fullscreen"
            allowFullScreen
            className="h-full w-full border-0 bg-night"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-night p-6 text-center text-paper">
            <PixelScene className="h-24 w-40 border-2 border-paper/30" />
            <p className="font-display text-xl">Play</p>
            <button
              type="button"
              onClick={() => setLoaded(true)}
              className="border-2 border-paper bg-accent px-5 py-3 font-display text-base text-ink shadow-[4px_4px_0_0_var(--color-paper)] transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_0_var(--color-paper)] active:translate-y-0"
            >
              play in browser
            </button>
          </div>
        )}
      </div>
      {loaded && (
        <button
          type="button"
          onClick={() => frame.current?.requestFullscreen?.()}
          className="mt-3 border-2 border-ink bg-paper px-4 py-2 text-sm lowercase shadow-pixel transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 active:translate-y-0"
        >
          fullscreen
        </button>
      )}
    </div>
  );
}
