"use client";
import { motion } from "motion/react";
import type { CardsBlock } from "@/lib/types";
import { Icon } from "../Icon";
import { GrowBar, Reveal, staggerChild, staggerParent } from "../motion/Reveal";

export function Cards({ b }: { b: CardsBlock }) {
  const items = b.items || [];
  const cols = items.length >= 4 ? "xl:grid-cols-4" : items.length === 3 ? "lg:grid-cols-3" : "";
  return (
    <section id={b.anchor || undefined} className="relative max-w-7xl mx-auto px-4 md:px-6 mt-16 md:mt-32 mb-24 md:mb-40 overflow-x-hidden">
      <div className="flex flex-col md:flex-row md:items-end gap-4 mb-12 md:mb-16">
        <Reveal variant="left" className="shrink-0">
          <h2 className="text-5xl sm:text-7xl md:text-9xl text-white/60 leading-none italic uppercase">
            {b.titleTop} <br />
            {b.titleOutline && <span className="text-transparent [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:2px_white]">{b.titleOutline}</span>}
          </h2>
        </Reveal>
        <div className="h-[2px] w-full md:flex-grow bg-white/5 mb-2 md:mb-4 relative overflow-hidden">
          <GrowBar className="absolute inset-0 bg-accent/50" delay={0.3} />
        </div>
      </div>

      <motion.div className={`grid grid-cols-1 md:grid-cols-2 ${cols} gap-6 md:gap-10 xl:gap-8`}
        variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true, margin: "0px 0px -10% 0px" }}>
        {items.map((c, i) => {
          const Wrap = c.link ? "a" : "div";
          return (
            <motion.div key={i} variants={staggerChild} className="min-w-0">
              <Wrap {...(c.link ? { href: c.link, target: "_blank", rel: "noopener noreferrer" } : {})} className="block group h-full">
                <div className="relative h-full flex flex-col border-[3px] md:border-[4px] border-black bg-white text-black p-5 md:p-6 xl:p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all group-hover:shadow-none group-hover:translate-x-[3px] md:group-hover:translate-x-[4px] group-hover:translate-y-[3px] md:group-hover:translate-y-[4px]">
                  <div className="@container relative w-full aspect-video bg-[#111] text-white border-b-[3px] md:border-b-[4px] border-black overflow-hidden mb-5 md:mb-6 grayscale group-hover:grayscale-0 transition-[filter] duration-500">
                    {c.image ? (
                      <img src={c.image} alt={c.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="absolute inset-0 flex flex-col justify-between px-4 py-3.5">
                        <div className="absolute inset-0 opacity-[0.12] group-hover:opacity-[0.22] transition-opacity dots-light pointer-events-none" />
                        <div className="relative z-10 flex justify-between items-center gap-2 pr-6 whitespace-nowrap text-[7px] md:text-[8px] font-black tracking-[0.2em] uppercase text-white/55">
                          <span>{c.meta}</span>
                          {c.badge && <span className={`inline-flex items-center gap-1.5 ${c.live ? "text-white" : ""}`}>{c.live && <i className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />}{c.badge}</span>}
                        </div>
                        <div className="relative z-10 flex items-baseline gap-[0.15em] italic font-semibold tracking-tighter leading-[0.9] origin-bottom-left group-hover:scale-105 transition-transform duration-500 text-[14.5cqi]">
                          <span className="text-transparent [-webkit-text-stroke:1.2px_#fff] group-hover:text-white transition-colors duration-500">{c.from}</span>
                          <span className="not-italic text-accent text-[0.55em]">→</span>
                          <span>{c.to}</span>
                        </div>
                        {c.role && <div className="relative z-10 text-[9px] font-black tracking-[0.3em] uppercase text-white/70 border-l-2 border-accent pl-2 truncate">{c.role}</div>}
                      </div>
                    )}
                    <div className="absolute top-0 right-0 w-8 md:w-12 h-8 md:h-12 bg-black skew-x-[45deg] translate-x-4 md:translate-x-6 -translate-y-4 md:-translate-y-6 z-30 border-l-[3px] border-white" />
                  </div>
                  <div className="flex justify-between items-start xl:flex-col xl:gap-1.5 gap-2 mb-3 md:mb-4">
                    <h3 className="text-3xl md:text-4xl xl:text-[1.95rem] text-black leading-none uppercase tracking-tighter group-hover:italic transition-all group-hover:underline decoration-accent underline-offset-4">{c.name}</h3>
                    <span className="flex items-center gap-2 text-[8px] font-black tracking-[0.2em] uppercase text-black/45 whitespace-nowrap pt-1">
                      {c.duration}{c.link && <Icon name="ext" size={16} strokeWidth={2} className="text-black" />}
                    </span>
                  </div>
                  {c.description && <p className="text-xs md:text-sm font-bold leading-tight text-black/80 mb-5 md:mb-6 line-clamp-3 border-l-2 border-black pl-3">{c.description}</p>}
                  {!!c.tags?.length && (
                    <div className="mt-auto flex flex-wrap gap-1.5 md:gap-2 pt-4 border-t border-black/10">
                      {c.tags.map((t) => <span key={t} className="text-[8px] md:text-[9px] font-black uppercase tracking-tighter md:tracking-widest bg-black text-white px-1.5 md:px-2 py-0.5 skew-x-[-10deg]">{t}</span>)}
                    </div>
                  )}
                </div>
              </Wrap>
            </motion.div>
          );
        })}
      </motion.div>

      {b.footnote && (
        <div className="mt-8 md:mt-12 flex justify-end">
          <div className="flex items-center gap-2 text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-white/25"><Icon name="terminal" size={14} /> {b.footnote}</div>
        </div>
      )}
    </section>
  );
}
