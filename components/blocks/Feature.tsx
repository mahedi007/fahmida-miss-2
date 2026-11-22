import type { FeatureBlock } from "@/lib/types";
import { linkProps } from "@/lib/links";
import { Icon } from "../Icon";
import { CountUp } from "../motion/CountUp";
import { Reveal } from "../motion/Reveal";

export function Feature({ b }: { b: FeatureBlock }) {
  const href = b.ctaUrl || "";
  const Wrap = href ? "a" : "div";
  return (
    <section id={b.anchor || undefined} className="max-w-7xl mx-auto px-4 md:px-6 py-20 bg-stone-950">
      <div className="border-t-2 border-stone-800 pt-12">
        {b.label && (
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-2 bg-accent-deep animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.4em] text-stone-500 uppercase">{b.label}</span>
          </div>
        )}
        <Reveal variant="upLg">
          <Wrap {...(href ? { href, ...linkProps(href) } : {})} className="group block relative border-2 md:border-[4px] border-stone-100 p-6 md:p-12 bg-stone-950 transition-colors hover:bg-stone-900">
            <div className="grid lg:grid-cols-12 gap-8 md:gap-16 items-center">
              {!!b.stats?.length && (
                <div className="lg:col-span-4 order-2 lg:order-1 flex lg:flex-col gap-6 md:gap-8 border-t lg:border-t-0 lg:border-r border-stone-800 pt-8 lg:pt-0 lg:pr-12">
                  {b.stats.map((s, i) => (
                    <div key={i} className="flex-1">
                      <div className="flex items-center gap-2 text-stone-500 mb-1">
                        <Icon name={s.icon || "star"} size={12} strokeWidth={2} />
                        <span className="text-[9px] font-black uppercase tracking-widest">{s.label}</span>
                      </div>
                      <div className="text-5xl md:text-6xl text-stone-100 italic tabular-nums"><CountUp value={Number(s.value) || 0} />{s.suffix}</div>
                    </div>
                  ))}
                </div>
              )}
              <div className={`${b.stats?.length ? "lg:col-span-8" : "lg:col-span-12"} order-1 lg:order-2 space-y-6`}>
                {b.tag && <div className="inline-block bg-accent-deep text-stone-100 px-3 py-1 text-[9px] font-black tracking-widest uppercase italic">{b.tag}</div>}
                <h3 className="text-5xl md:text-7xl text-stone-100 leading-[0.85] uppercase tracking-tighter group-hover:italic transition-all">{b.title}</h3>
                {b.description && <p className="text-stone-400 text-sm md:text-lg font-medium leading-relaxed italic border-l-2 border-stone-800 pl-6 uppercase">{b.description}</p>}
                {href && b.ctaLabel && (
                  <div className="pt-4 flex items-center gap-4 text-[10px] font-black text-stone-100 uppercase tracking-[0.4em]">
                    {b.ctaLabel} <Icon name="arrow" size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                )}
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-24 h-24 opacity-5 pointer-events-none dots-light" />
          </Wrap>
        </Reveal>
      </div>
    </section>
  );
}
