"use client";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import type { GalleryBlock } from "@/lib/types";
import { Reveal, staggerChild, staggerParent } from "../motion/Reveal";

export function Gallery({ b }: { b: GalleryBlock }) {
  const imgs = b.images || [];
  const [open, setOpen] = useState<number | null>(null);
  useEffect(() => {
    if (open === null) return;
    window.__lenis?.stop();
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((o) => (o === null ? o : (o + 1) % imgs.length));
      if (e.key === "ArrowLeft") setOpen((o) => (o === null ? o : (o - 1 + imgs.length) % imgs.length));
    };
    addEventListener("keydown", k);
    return () => { removeEventListener("keydown", k); window.__lenis?.start(); };
  }, [open, imgs.length]);

  return (
    <section id={b.anchor || undefined} className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
      {b.label && <div className="text-[10px] font-black tracking-[0.4em] uppercase text-stone-500 mb-6">{b.label}</div>}
      {(b.titleTop || b.titleOutline) && (
        <Reveal variant="left" className="mb-10">
          <h2 className="text-5xl sm:text-7xl md:text-9xl text-white/60 leading-none italic uppercase">
            {b.titleTop} {b.titleOutline && <span className="text-transparent [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:2px_white]">{b.titleOutline}</span>}
          </h2>
        </Reveal>
      )}
      <motion.div className="columns-2 md:columns-3 gap-4 md:gap-6" variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true }}>
        {imgs.map((im, i) => (
          <motion.button key={i} variants={staggerChild} onClick={() => setOpen(i)}
            className="group relative mb-4 md:mb-6 block w-full break-inside-avoid border-[3px] border-black bg-white p-2 shadow-[6px_6px_0_0_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all text-left">
            <div className="overflow-hidden">
              <img src={im.image} alt={im.caption || ""} loading="lazy" className="w-full h-auto grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
            </div>
            {im.caption && <p className="pt-2 text-[9px] font-black uppercase tracking-[0.2em] text-black/70">{im.caption}</p>}
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence>
        {open !== null && imgs[open] && (
          <motion.div className="fixed inset-0 z-[80] bg-black/95 flex items-center justify-center p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)} data-lenis-prevent>
            <motion.figure key={open} initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ type: "spring", damping: 24, stiffness: 260 }}
              className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
              <img src={imgs[open].image} alt={imgs[open].caption || ""} className="max-h-[80vh] w-auto mx-auto border-4 border-white" />
              {imgs[open].caption && <figcaption className="mt-4 text-center text-xs font-black uppercase tracking-[0.3em] text-white/70">{imgs[open].caption}</figcaption>}
            </motion.figure>
            <button className="absolute top-6 right-8 text-white text-xl italic tracking-[0.4em]" onClick={() => setOpen(null)}>CLOSE [×]</button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
