import type { CommitmentsBlock, Settings } from "@/lib/types";
import { contactHref, linkProps } from "@/lib/links";
import { Icon } from "../Icon";
import { Magnetic } from "../motion/Magnetic";
import { Reveal } from "../motion/Reveal";

export function Commitments({ b, s }: { b: CommitmentsBlock; s: Settings }) {
  const href = b.ctaUrl || contactHref(s);
  return (
    <section id={b.anchor || undefined} className="relative max-w-7xl mx-auto px-4 sm:px-6 py-7 md:py-10 bg-stone-950 overflow-hidden">
      <div className="mb-8 border-b border-stone-800 pb-6">
        {b.label && <div className="flex items-center gap-3 mb-4 md:mb-6 text-stone-500"><Icon name="file" size={16} strokeWidth={2} /><span className="text-[9px] md:text-[10px] font-black tracking-[0.3em] md:tracking-[0.5em] uppercase">{b.label}</span></div>}
        <Reveal variant="left">
          <h2 className="text-5xl sm:text-7xl md:text-[6rem] text-stone-100 italic uppercase leading-[0.8] tracking-tighter">
            {b.titleTop}{b.titleOutline && <span className="text-transparent [-webkit-text-stroke:1px_#f5f5f4]"> {b.titleOutline}</span>}
          </h2>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-stone-800 border-2 border-stone-800">
        {(b.items || []).map((c, i) => (
          <Reveal key={i} variant="up" delay={i * 0.1} className="bg-stone-950 p-6 md:p-8 flex flex-col justify-between group min-h-[320px] md:min-h-0">
            <div className="mb-8 md:mb-12">
              <div className="text-stone-600 mb-6 md:mb-8 group-hover:text-stone-100 transition-colors duration-500"><Icon name={c.icon} size={24} strokeWidth={1.6} /></div>
              <h3 className="text-3xl md:text-4xl text-stone-100 mb-6 md:mb-10 tracking-tight italic uppercase leading-[1.05]">{c.title}</h3>
              <div className="space-y-6 md:space-y-7">
                {c.practice && (
                  <div className="relative pl-5 md:pl-6">
                    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-stone-800" />
                    <p className="text-[8px] md:text-[9px] font-black text-stone-500 uppercase tracking-[0.2em] mb-2">{c.practiceLabel}</p>
                    <p className="text-stone-400 font-medium text-xs md:text-sm leading-relaxed">{c.practice}</p>
                  </div>
                )}
                {c.outcome && (
                  <div className="relative pl-5 md:pl-6">
                    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-stone-100/20 group-hover:bg-stone-100 transition-colors" />
                    <p className="text-[8px] md:text-[9px] font-black text-stone-300 uppercase tracking-[0.2em] mb-2">{c.outcomeLabel}</p>
                    <p className="text-stone-100/75 group-hover:text-stone-100 font-bold text-lg md:text-2xl leading-tight uppercase tracking-tighter italic transition-colors">{c.outcome}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-between items-end mt-4">
              <div className="text-[9px] md:text-[10px] font-black text-stone-700 uppercase tracking-[0.3em]">Principle // {String(i + 1).padStart(2, "0")}</div>
              <div className="w-8 h-[1px] bg-stone-800 group-hover:w-16 group-hover:bg-stone-100 transition-all hidden sm:block" />
            </div>
          </Reveal>
        ))}
      </div>

      {(b.closing || b.ctaLabel) && (
        <div className="mt-8 flex flex-col md:grid md:grid-cols-2 items-start md:items-center gap-10 md:gap-16 border-t border-stone-800 pt-8">
          <p className="text-stone-500 text-[10px] md:text-xs font-bold uppercase leading-relaxed tracking-widest max-w-sm">{b.closing}</p>
          {b.ctaLabel && (
            <Magnetic strength={0.3} className="md:justify-self-end">
              <a href={href} {...linkProps(href)} className="group flex items-center gap-8 cursor-pointer">
                <div className="text-right">
                  {b.ctaSub && <span className="block text-stone-500 text-[9px] font-black uppercase tracking-[0.5em] mb-2 italic">{b.ctaSub}</span>}
                  <span className="block text-5xl md:text-7xl text-stone-100 italic leading-none uppercase group-hover:text-accent-deep transition-colors">{b.ctaLabel}</span>
                </div>
                <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 border-2 border-stone-100 text-stone-100 flex items-center justify-center group-hover:bg-stone-100 group-hover:text-stone-950 transition-all">
                  <span className="text-4xl md:text-6xl italic leading-none group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </a>
            </Magnetic>
          )}
        </div>
      )}
    </section>
  );
}
