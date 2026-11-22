"use client";
import { motion } from "motion/react";
import type { LedgerBlock } from "@/lib/types";
import { Icon } from "../Icon";
import { Reveal, staggerChild, staggerParent } from "../motion/Reveal";

export function Ledger({ b }: { b: LedgerBlock }) {
  return (
    <section id={b.anchor || undefined} className="max-w-7xl mx-auto px-4 md:px-6 pt-8 md:pt-10 pb-16 md:pb-20 bg-stone-950">
      <div className="mb-10 border-b border-stone-800 pb-6">
        {b.label && <div className="flex items-center gap-3 mb-4 text-stone-500"><Icon name="award" size={16} strokeWidth={2} /><span className="text-[10px] font-black tracking-[0.4em] uppercase">{b.label}</span></div>}
        <Reveal variant="left">
          <h2 className="text-6xl md:text-[6rem] text-stone-100 italic uppercase leading-[0.8] tracking-tighter">
            {b.titleTop}{b.titleOutline && <span className="text-transparent [-webkit-text-stroke:1px_#f5f5f4]"> {b.titleOutline}</span>}
          </h2>
        </Reveal>
      </div>

      {(b.groups || []).map((g, gi) => (
        <div key={gi} className={gi ? "mt-12" : ""}>
          {g.label && <div className="text-[10px] font-black tracking-[0.35em] uppercase text-stone-600 mb-4">// {g.label}</div>}
          <motion.ol className="border-t-2 border-stone-800" variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true, margin: "0px 0px -8% 0px" }}>
            {(g.rows || []).map((r, ri) => {
              const Wrap = r.url ? motion.a : motion.li;
              const style = r.style || "default";
              return (
                <Wrap key={ri} variants={staggerChild} {...(r.url ? { href: r.url, target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group relative isolate overflow-hidden grid grid-cols-[auto_1fr] md:grid-cols-[6rem_1fr_auto_2rem] gap-x-4 md:gap-x-8 gap-y-1 items-center px-3 md:px-4 py-5 md:py-6 border-b-2 border-stone-800">
                  <span className="absolute inset-0 -z-10 bg-stone-100 scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)]" />
                  <span className="row-span-2 md:row-span-1 self-start md:self-center pt-1 md:pt-0 text-[9px] md:text-[10px] font-black tracking-[0.2em] text-stone-600 group-hover:text-accent transition-colors">{r.code}</span>
                  <div className="min-w-0">
                    <h3 className="text-xl md:text-[1.75rem] leading-[1.1] text-stone-100 tracking-[-0.035em] uppercase group-hover:text-stone-950 group-hover:italic transition-colors">{r.title}</h3>
                    {r.meta && <p className="mt-1.5 text-xs md:text-[13px] font-medium text-stone-500 group-hover:text-stone-700 transition-colors">{r.meta}</p>}
                  </div>
                  {r.status && (
                    <span className={`col-start-2 md:col-start-auto justify-self-start md:justify-self-end mt-2 md:mt-0 text-[9px] md:text-[10px] font-black tracking-[0.15em] uppercase px-2 md:px-3 py-1 skew-x-[-10deg] border-2 transition-colors
                      ${style === "live" ? "bg-accent-deep border-accent-deep text-stone-100" : style === "progress" ? "border-dashed border-stone-700 text-stone-300 group-hover:text-black group-hover:border-black" : "border-stone-700 text-stone-300 group-hover:text-black group-hover:border-black"}`}>
                      {r.status}
                    </span>
                  )}
                  <Icon name="arrow" size={22} className="hidden md:block text-stone-950 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                </Wrap>
              );
            })}
          </motion.ol>
        </div>
      ))}
    </section>
  );
}
