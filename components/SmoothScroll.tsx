"use client";
import Lenis from "lenis";
import { useEffect } from "react";

declare global { interface Window { __lenis?: Lenis } }

/** Lenis smooth scrolling + offset-aware anchor links ("#id" and "/#id") */
export function SmoothScroll({ enabled = true }: { enabled?: boolean }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis: Lenis | undefined;
    let raf = 0;
    if (enabled && !reduce) {
      lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
      window.__lenis = lenis;
      const loop = (t: number) => { lenis!.raf(t); raf = requestAnimationFrame(loop); };
      raf = requestAnimationFrame(loop);
    }
    const headerOffset = () => -((document.querySelector("header") as HTMLElement)?.offsetHeight || 72) - 8;

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a");
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return;
      const href = a.getAttribute("href") || "";
      const m = href.match(/^(\/[^#]*)?#(.+)$/);
      if (!m) return;
      const path = m[1] || location.pathname;
      const norm = (p: string) => p.replace(/\/+$/, "") || "/";
      if (norm(path) !== norm(location.pathname)) return;
      const target = m[2] === "top" ? document.body : document.getElementById(m[2]);
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(m[2] === "top" ? 0 : target, { offset: headerOffset() });
      else window.scrollTo({ top: m[2] === "top" ? 0 : target.getBoundingClientRect().top + scrollY + headerOffset(), behavior: reduce ? "auto" : "smooth" });
      history.replaceState(null, "", `#${m[2]}`);
    };
    document.addEventListener("click", onClick);

    // landing on /#section from another page
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) setTimeout(() => (lenis ? lenis.scrollTo(el, { offset: headerOffset(), immediate: true }) : el.scrollIntoView()), 60);
    }

    return () => { document.removeEventListener("click", onClick); cancelAnimationFrame(raf); lenis?.destroy(); window.__lenis = undefined; };
  }, [enabled]);
  return null;
}
