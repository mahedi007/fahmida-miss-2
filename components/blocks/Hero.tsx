"use client";
import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, useState } from "react";
import type { HeroBlock } from "@/lib/types";
import { SplitText } from "../motion/SplitText";
import { EASE } from "../motion/Reveal";

export function Hero({ b }: { b: HeroBlock }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const splashY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -70]);

  // colour spotlight
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const r = useSpring(0, { stiffness: 160, damping: 22 });
  const mask = useMotionTemplate`radial-gradient(circle ${r}px at ${mx}px ${my}px, #000 70%, transparent 100%)`;
  const [full, setFull] = useState(false);
  const reveal = b.colorReveal !== false;

  return (
    <section ref={ref} id={b.anchor || undefined}
      className="relative min-h-[83vh] md:max-dt:min-h-[88vh] flex flex-col justify-start dt:justify-center overflow-hidden bg-white text-black border-[7px] border-black m-2">
      <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none dots" />

      <motion.div style={{ y: titleY }} className="relative z-20 w-full px-8 pt-12 md:px-12 dt:px-24 dt:pt-0 pointer-events-none">
        <div className="max-w-5xl space-y-8">
          <h1 className="text-[clamp(3rem,16.5vw,4.4rem)] md:text-[clamp(6rem,10.4vw,11rem)] leading-[0.82] tracking-tighter italic font-semibold">
            <SplitText mode="mount" delay={0.15} stagger={0.04} lines={[{ text: b.firstName }, { text: b.lastName }]} />
          </h1>

          <motion.div className="space-y-5" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.75, ease: EASE }}>
            {b.tag && (
              <motion.div initial={{ clipPath: "inset(0 100% 0 0)" }} animate={{ clipPath: "inset(0 0% 0 0)" }} transition={{ duration: 0.9, delay: 0.8, ease: EASE }}
                className="inline-block bg-black text-white px-6 py-3 text-lg md:text-xl font-bold uppercase tracking-tight rotate-[-1deg]">
                {b.tag}
              </motion.div>
            )}
            <div className="max-w-2xl md:max-w-[26rem] dt:max-w-[38rem] space-y-4">
              {b.lead && <p className="text-lg md:text-xl font-medium leading-relaxed text-black/75 tracking-tight">{b.lead}</p>}
              {!!b.chips?.length && (
                <motion.div className="flex flex-wrap gap-3 pt-2 pointer-events-auto" initial="h" animate="s"
                  variants={{ h: {}, s: { transition: { staggerChildren: 0.07, delayChildren: 1.0 } } }}>
                  {b.chips.map((c) => (
                    <motion.span key={c} variants={{ h: { opacity: 0, y: 12 }, s: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}
                      className="border-2 border-black px-4 py-2 text-xs md:text-sm font-black uppercase tracking-[0.18em] hover:bg-black hover:text-white hover:-rotate-1 transition-[background,color,rotate] duration-200">
                      {c}
                    </motion.span>
                  ))}
                </motion.div>
              )}
              {b.location && <p className="text-xs font-black tracking-[0.25em] uppercase text-black/40 pt-2">{b.location}</p>}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {b.portrait && (
        <div className="relative z-10 w-full mt-4 md:mt-0 md:absolute md:bottom-0 md:right-0 md:w-[60%] lg:w-1/2 pointer-events-none">
          <motion.div className="relative flex items-end justify-end" initial={{ opacity: 0, y: 200 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.3, ease: EASE }}>
            {b.splash && (
              <motion.img style={{ y: splashY }} src={b.splash} alt="" aria-hidden="true"
                className="absolute right-0 bottom-[6%] w-[125%] max-w-none opacity-[0.22] -scale-x-100 -translate-x-[8%]" />
            )}
            <motion.div style={{ y: portraitY }}
              className="relative z-20 ml-auto w-full max-w-[560px] md:max-w-none md:w-auto md:h-[min(62vh,620px)] dt:h-[min(78vh,760px)] pointer-events-auto cursor-crosshair"
              onPointerMove={(e) => {
                if (!reveal || e.pointerType !== "mouse") return;
                const bx = e.currentTarget.getBoundingClientRect();
                mx.set(e.clientX - bx.left); my.set(e.clientY - bx.top);
                r.set(Math.max(110, bx.width * 0.22));
              }}
              onPointerLeave={() => r.set(0)}
              onClick={() => { if (reveal && matchMedia("(hover: none)").matches) setFull((v) => !v); }}>
              <img src={b.portrait} alt={b.portraitAlt || ""} className={`w-full h-auto md:h-full md:w-auto select-none ${reveal ? "grayscale contrast-[1.2]" : ""}`} draggable={false} />
              {reveal && (
                <motion.img src={b.portrait} alt="" aria-hidden="true" draggable={false}
                  className="absolute inset-0 w-full h-full select-none"
                  style={full ? undefined : { WebkitMaskImage: mask, maskImage: mask }} />
              )}
            </motion.div>
            {reveal && b.revealHint && (
              <span className="absolute z-30 right-4 bottom-4 bg-black text-white text-[9px] font-black tracking-[0.3em] uppercase px-2.5 py-1.5 skew-x-[-10deg] opacity-85 hidden md:block">{b.revealHint}</span>
            )}
          </motion.div>
        </div>
      )}

      {b.exploreLabel && (
        <a href={b.exploreHref || "#about"} className="absolute bottom-10 left-10 z-30 hidden dt:flex flex-col items-center gap-4 group">
          <span className="[writing-mode:vertical-lr] font-black text-[10px] tracking-[0.5em] uppercase opacity-40 group-hover:opacity-100 transition-opacity">{b.exploreLabel}</span>
          <motion.span className="w-[2px] h-20 bg-gradient-to-b from-black to-transparent origin-top" animate={{ scaleY: [1, 0.5, 1] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }} />
        </a>
      )}
    </section>
  );
}
