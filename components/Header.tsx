"use client";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import type { NavItem } from "@/lib/types";
import { Icon } from "./Icon";

type Props = {
  firstName: string; lastName: string; nav: NavItem[];
  buttonLabel: string; buttonHref: string; buttonExternal: boolean;
  linkedin?: string; emailHref?: string;
};

export function Header({ firstName, lastName, nav, buttonLabel, buttonHref, buttonExternal, linkedin, emailHref }: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  const ext = buttonExternal ? { target: "_blank", rel: "noopener noreferrer" } : {};
  const isFile = /\.(pdf|docx?)$/i.test(buttonHref);

  useEffect(() => {
    const ids = nav.map((n) => n.href.split("#")[1]).filter(Boolean) as string[];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver((en) => en.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    els.forEach((el) => io.observe(el));
    const onScroll = () => { if (scrollY < innerHeight * 0.4) setActive(""); };
    addEventListener("scroll", onScroll, { passive: true });
    return () => { io.disconnect(); removeEventListener("scroll", onScroll); };
  }, [nav]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open) window.__lenis?.stop(); else window.__lenis?.start();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-[60] bg-white border-b-[6px] border-black">
        <motion.div className="absolute left-0 right-0 -bottom-[6px] h-[6px] bg-accent origin-left pointer-events-none" style={{ scaleX: progress }} />
        <nav className="mx-auto max-w-7xl px-6 py-2 flex items-center justify-between">
          <a className="group relative flex flex-col leading-[0.8] tracking-tighter" href="/#top" aria-label={`${firstName} ${lastName} — home`}>
            <span className="text-black text-4xl italic">{firstName}</span>
            <span className="text-transparent text-4xl [-webkit-text-stroke:1.5px_black] group-hover:text-black transition-colors">{lastName}</span>
            <span className="absolute -bottom-1 left-0 w-0 h-1 bg-black group-hover:w-full transition-all duration-500" />
          </a>

          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center lg:gap-2 lg:mr-4">
              {nav.map((n) => {
                const id = n.href.split("#")[1];
                const on = id && id === active;
                return (
                  <a key={n.href + n.label} href={n.href}
                    className={`relative transition-all duration-300 px-2 lg:px-4 py-1 uppercase tracking-[0.16em] lg:tracking-[0.2em] text-[10px] font-black hover:text-black hover:italic ${on ? "text-black italic" : "text-black/70"}`}>
                    {n.label}
                    {on && <motion.span layoutId="nav-underline" className="absolute left-2 right-2 lg:left-4 lg:right-4 -bottom-0.5 h-[2px] bg-accent" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                  </a>
                );
              })}
            </div>
            <div className="h-6 w-[2px] bg-black rotate-[20deg]" />
            <div className="flex items-center gap-5 ml-2 lg:ml-4 text-black">
              {linkedin && <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:scale-125 transition-transform"><Icon name="linkedin" /></a>}
              {emailHref && <a href={emailHref} aria-label="Email" className="hover:scale-125 transition-transform"><Icon name="mail" /></a>}
            </div>
            <a href={buttonHref} {...ext} className="relative ml-3 lg:ml-6 border-[3px] border-black bg-white px-5 lg:px-8 py-2 text-xs font-black text-black uppercase tracking-[0.3em] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all overflow-hidden group">
              <span className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity dots" />
              <span className="relative z-10 flex items-center gap-2 whitespace-nowrap">{buttonLabel} <span className="text-[12px] opacity-40 group-hover:opacity-100 italic transition-opacity">[{isFile ? "↓" : "→"}]</span></span>
            </a>
          </div>

          <button onClick={() => setOpen(!open)} className="lg:hidden border-2 border-black p-2 bg-black text-white" aria-label="Toggle menu" aria-expanded={open}>
            <div className="space-y-1.5">
              <span className={`block h-[2px] w-6 bg-white transition-transform ${open ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-[2px] w-6 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`block h-[2px] bg-white transition-all ${open ? "w-6 -rotate-45 -translate-y-2" : "w-8"}`} />
            </div>
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ y: "-100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }} transition={{ type: "spring", damping: 20, stiffness: 120 }}
            className="fixed inset-0 bg-black text-white z-[70] flex flex-col justify-center px-10 gap-8 overflow-hidden" data-lenis-prevent>
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(white 1.5px, transparent 0)", backgroundSize: "12px 12px" }} />
            <button onClick={() => setOpen(false)} className="absolute top-16 right-8 text-white text-2xl uppercase tracking-[0.5em] italic">EXIT [×]</button>
            <motion.div className="flex flex-col gap-7 relative z-10" initial="h" animate="s" variants={{ h: {}, s: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } } }}>
              {nav.map((n, i) => (
                <motion.a key={n.href + n.label} href={n.href} onClick={() => setOpen(false)}
                  variants={{ h: { opacity: 0, x: -40 }, s: { opacity: 1, x: 0, transition: { type: "spring", damping: 18 } } }}
                  className="group text-[clamp(2.2rem,11vw,3rem)] italic uppercase tracking-tighter flex items-center gap-4 leading-none">
                  <span className="text-sm not-italic opacity-40 whitespace-nowrap tracking-normal">0 {i + 1}</span>
                  <span className="font-semibold group-hover:pl-6 transition-all">{n.label}</span>
                </motion.a>
              ))}
            </motion.div>
            <div className="mt-10 space-y-5 relative z-10 border-t border-white/20 pt-8">
              <a href={buttonHref} {...ext} onClick={() => setOpen(false)} className="text-2xl font-black underline decoration-[3px] underline-offset-8 uppercase italic hover:text-gray-400">{buttonLabel.replace(/\s+/g, "_")}</a>
              <div className="flex mt-4 gap-8 font-bold uppercase tracking-widest text-xs">
                {linkedin && <a href={linkedin} target="_blank" rel="noopener noreferrer" className="hover:line-through">LinkedIn</a>}
                {emailHref && <a href={emailHref} className="hover:line-through">Email</a>}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
