"use client";
import { AnimatePresence, motion } from "motion/react";
import { useState, type KeyboardEvent } from "react";
import type { TabsBlock } from "@/lib/types";
import { Inline } from "@/lib/inline";
import { Icon } from "../Icon";
import { Reveal } from "../motion/Reveal";

export function Tabs({ b }: { b: TabsBlock }) {
  const tabs = b.tabs || [];
  const [i, setI] = useState(0);
  const t = tabs[i];
  const onKey = (e: KeyboardEvent, idx: number) => {
    if (e.key === "ArrowRight") { e.preventDefault(); setI((idx + 1) % tabs.length); }
    if (e.key === "ArrowLeft") { e.preventDefault(); setI((idx - 1 + tabs.length) % tabs.length); }
  };
  const uid = b.anchor || "tabs";

  return (
    <section id={b.anchor || undefined} className="relative max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16 bg-white text-black overflow-hidden">
      <Reveal variant="left" className="mb-8 flex flex-col items-start border-l-[8px] md:border-l-[12px] border-black pl-5 md:pl-8">
        <h2 className="text-5xl sm:text-6xl md:text-[8rem] leading-[0.8] tracking-tighter italic uppercase">
          {b.titleTop} <br className="md:hidden" />
          {b.titleOutline && <span className="text-transparent [-webkit-text-stroke:1px_black] md:[-webkit-text-stroke:1.5px_black]">{b.titleOutline}</span>}
        </h2>
      </Reveal>

      <div role="tablist" className="grid grid-cols-1 md:grid-cols-3 border-[3px] md:border-[4px] border-black relative z-10">
        {tabs.map((tab, idx) => {
          const on = idx === i;
          return (
            <button key={idx} role="tab" aria-selected={on} aria-controls={`${uid}-panel`} tabIndex={on ? 0 : -1}
              onClick={() => setI(idx)} onKeyDown={(e) => onKey(e, idx)}
              className={`relative py-4 md:h-23 overflow-hidden transition-colors duration-300 border-black border-b-[3px] md:border-b-0 md:border-r-[4px] last:border-b-0 last:border-r-0 text-left ${on ? "text-white" : "text-black hover:bg-gray-50"}`}>
              {on && <motion.span layoutId={`${uid}-tab-bg`} className="absolute inset-0 bg-black z-0" transition={{ type: "spring", stiffness: 380, damping: 34 }} />}
              <span className="hidden sm:block absolute inset-0 z-0 opacity-10 pointer-events-none border-r border-current skew-x-[-15deg]" />
              <span className="relative z-10 flex flex-col items-start px-6 md:px-8 justify-center h-full">
                {tab.sub && <span className="text-[8px] md:text-[10px] font-black tracking-widest uppercase opacity-60 italic">{tab.sub}</span>}
                <span className="text-2xl md:max-dt:text-[1.6rem] md:text-4xl font-semibold tracking-tighter uppercase italic leading-[1.1]">{tab.label}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div id={`${uid}-panel`} role="tabpanel" className="relative border-x-[3px] border-b-[3px] md:border-x-[4px] md:border-b-[4px] border-black p-5 md:p-8 min-h-[500px] md:min-h-[450px] bg-white shadow-[10px_10px_0px_rgba(0,0,0,0.05)] md:shadow-[20px_20px_0px_rgba(0,0,0,0.05)]">
        <AnimatePresence mode="wait">
          {t && (
            <motion.div key={i} className="flex flex-col md:grid md:grid-cols-12 gap-8 md:pb-10"
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}>
              <div className="md:col-span-5 space-y-4">
                {t.registry && <div className="inline-block border-2 border-black px-2 md:px-3 py-1 text-[8px] md:text-[10px] font-black text-black/80 uppercase tracking-widest">{t.registry}</div>}
                {t.heading && <h4 className="text-2xl sm:text-3xl md:max-dt:text-[2.1rem] md:text-5xl leading-[1.1] tracking-tighter uppercase">{t.heading}</h4>}
                {t.note && <p className="text-[10px] md:text-sm font-medium text-black/60 uppercase pt-4 border-t-2 border-black/10 leading-relaxed"><Inline text={t.note} boldClass="text-black font-black italic underline decoration-2 underline-offset-4" /></p>}
              </div>
              <motion.div className="md:col-span-7 grid grid-cols-2 gap-2 md:gap-3 content-start" initial="h" animate="s" variants={{ h: {}, s: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } } }}>
                {(t.tiles || []).map((tile, k) => (
                  <motion.div key={k} variants={{ h: { opacity: 0, scale: 0.94 }, s: { opacity: 1, scale: 1, transition: { duration: 0.35 } } }}
                    className="relative h-20 sm:h-24 md:h-32 border-[2px] md:border-[3px] border-black overflow-hidden group cursor-crosshair bg-white">
                    <Icon name={tile.icon} strokeWidth={1.4} className="absolute right-[8%] top-1/2 -translate-y-1/2 w-[38%] h-[70%] text-black opacity-20 transition-all duration-500 group-hover:opacity-95 group-hover:text-accent group-hover:scale-110 group-hover:-rotate-[4deg] group-hover:z-20" />
                    <span className="absolute inset-0 flex items-end p-2 md:p-4 z-10 bg-white/40 group-hover:bg-black/90 transition-colors duration-300 text-[1.05rem] md:max-dt:text-[1.3rem] md:text-3xl tracking-tight leading-[1.1] group-hover:text-white">{tile.label}</span>
                    <span className="absolute top-0 left-0 w-0 h-1 bg-accent group-hover:w-full transition-all duration-300 z-20" />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        {b.signature && (
          <div className="hidden md:flex absolute bottom-6 left-8 items-center gap-4 opacity-10">
            <span className="text-[10px] font-black tracking-[0.4em] text-black uppercase">{b.signature}</span>
            <div className="w-12 h-[2px] bg-black" />
          </div>
        )}
      </div>
    </section>
  );
}
