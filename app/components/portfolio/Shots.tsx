import Image from "next/image";
import type { Media } from "@/lib/projects";

/**
 * Screenshots for a case study.
 *
 * Renders nothing at all when a project has no `media`, so an unillustrated
 * case study shows no empty frames. To add screenshots:
 *   1. drop files in /public/assets/shots/
 *   2. add a `media: [...]` array to the project in lib/projects.ts
 * Intrinsic width/height are required so space is reserved before the image
 * loads — otherwise every caption below it shifts on load.
 */
export function Shots({ media, accentAlt }: { media?: Media[]; accentAlt?: string }) {
  if (!media?.length) return null;

  return (
    <section className="mb-14" aria-labelledby="screens">
      <div className="flex items-baseline gap-3 mb-5">
        <span aria-hidden className="font-mono text-[12px] text-muted-foreground tabular-nums">◆</span>
        <h2 id="screens" className="font-display font-bold text-[clamp(1.5rem,3.2vw,2rem)] text-foreground leading-tight">
          {accentAlt ?? "What it looks like"}
        </h2>
      </div>

      <div className="grid gap-8">
        {media.map((shot) => (
          <figure key={shot.src} className="min-w-0">
            <div className="hairline rounded-2xl overflow-hidden bg-card">
              <Image
                src={shot.src}
                alt={shot.alt}
                width={shot.width}
                height={shot.height}
                className="w-full h-auto block"
                sizes="(max-width: 768px) 100vw, 720px"
              />
            </div>
            <figcaption className="mt-3 text-[13.5px] text-muted-foreground leading-relaxed max-w-[68ch]">
              {shot.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
