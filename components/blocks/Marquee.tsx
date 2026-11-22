import type { MarqueeBlock } from "@/lib/types";
import { VelocityMarquee } from "../motion/VelocityMarquee";

export function Marquee({ b }: { b: MarqueeBlock }) {
  const items = b.items || [];
  const sec = b.secondary || [];
  return (
    <div id={b.anchor || undefined} aria-hidden="true" className="relative my-16 md:mt-24 md:mb-10 h-[128px] md:h-[150px] overflow-hidden">
      {!!items.length && (
        <div className="absolute -left-[5%] w-[110%] top-[30px] z-[2] bg-white text-black border-y-4 border-black -rotate-[1.5deg]">
          <VelocityMarquee baseVelocity={-0.7}>
            {items.map((t, i) => (
              <span key={i} className="flex items-center gap-6 pr-6 py-2.5">
                <span className="text-[1.6rem] md:text-4xl font-semibold italic uppercase tracking-[-0.04em]">{t}</span>
                <span className="text-base font-black">✦</span>
              </span>
            ))}
          </VelocityMarquee>
        </div>
      )}
      {!!sec.length && (
        <div className="absolute -left-[5%] w-[110%] top-[44px] z-[1] bg-stone-950 border-y border-stone-800 rotate-[1.6deg]">
          <VelocityMarquee baseVelocity={0.5}>
            {sec.map((t, i) => (
              <span key={i} className="flex items-center gap-6 pr-6 py-2.5">
                <span className="text-[1.6rem] md:text-4xl font-semibold italic uppercase tracking-[-0.04em] text-transparent [-webkit-text-stroke:1px_#78716c]">{t}</span>
                <span className="text-base font-black text-accent-deep">//</span>
              </span>
            ))}
          </VelocityMarquee>
        </div>
      )}
    </div>
  );
}
