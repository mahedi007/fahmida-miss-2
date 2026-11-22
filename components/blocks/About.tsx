import type { AboutBlock } from "@/lib/types";
import { Inline } from "@/lib/inline";
import { GrowBar, Reveal } from "../motion/Reveal";

export function About({ b }: { b: AboutBlock }) {
  return (
    <section id={b.anchor || undefined} className="relative z-10 max-w-7xl mx-auto px-6 mt-8 mb-24 md:mt-10 md:mb-40 bg-stone-950 py-20 border-y border-stone-800">
      <div className="relative z-10 grid md:grid-cols-12 gap-8 md:gap-16 items-start">
        <div className="md:col-span-5 lg:col-span-4 space-y-6">
          <Reveal variant="leftSm" className="border-l-[12px] border-stone-100 pl-6">
            <h2 className="text-7xl md:text-[5.5rem] lg:text-8xl text-stone-100 leading-[0.8] tracking-tighter italic uppercase">
              {b.titleTop} <br />
              {b.titleOutline && <span className="text-transparent [-webkit-text-stroke:1px_#f5f5f4] hover:text-stone-100 transition-all duration-500 cursor-default">{b.titleOutline}</span>}
            </h2>
            {b.subline && <p className="mt-4 text-[10px] font-black uppercase tracking-[0.4em] text-stone-500">{b.subline}</p>}
          </Reveal>
          <GrowBar className="h-[8px] bg-stone-100 skew-x-[-20deg]" delay={0.2} />
        </div>

        <div className="md:col-span-7 lg:col-span-8 space-y-12">
          {(b.statementLead || b.statementHighlight) && (
            <Reveal variant="up" className="text-3xl md:text-5xl font-black leading-[1] tracking-tighter uppercase">
              {b.statementLead && <p className="text-stone-400">{b.statementLead}</p>}
              {b.statementHighlight && (
                <span className="relative inline-block mt-2 group text-stone-100">
                  <span className="relative z-10 group-hover:text-stone-950 transition-colors duration-300">{b.statementHighlight}</span>
                  <span className="absolute inset-0 bg-stone-100 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 z-0" />
                </span>
              )}
            </Reveal>
          )}

          {!!b.columns?.length && (
            <div className="grid sm:grid-cols-2 md:max-lg:grid-cols-1 gap-8 md:gap-12 pt-8 border-t-[4px] border-stone-800">
              {b.columns.map((c, i) => (
                <Reveal key={i} variant="up" delay={(i % 2) * 0.1} className="space-y-3">
                  <h3 className="text-[1.6rem] sm:text-3xl tracking-tight text-stone-100 italic leading-tight">
                    {c.number ? `${c.number}. ` : ""}{c.title.toUpperCase()} {c.tag && <span className="text-sm not-italic text-stone-600">// {c.tag.toUpperCase()}</span>}
                  </h3>
                  <p className="text-base font-medium leading-snug text-stone-400"><Inline text={c.body} boldClass="text-stone-200 font-black italic" /></p>
                </Reveal>
              ))}
            </div>
          )}

          {b.status && (
            <div className="flex items-center gap-4 p-4 border-2 border-stone-800 group">
              <div className="w-3 h-3 shrink-0 bg-stone-700 rounded-full animate-pulse shadow-[0_0_10px_rgba(120,113,108,0.3)] group-hover:bg-accent transition-colors" />
              <span className="text-[12px] font-black uppercase tracking-[0.3em] text-stone-500">{b.status}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
