"use client";
import { motion } from "motion/react";
import { EASE } from "./Reveal";

/**
 * Masked per-character reveal. Each line gets its own mask; characters rise in with a stagger.
 * mode="mount" animates on load (hero), mode="view" when scrolled into view.
 */
export function SplitText({ lines, className = "", lineClassName = "", delay = 0, stagger = 0.035, mode = "view" }: {
  lines: { text: string; className?: string }[]; className?: string; lineClassName?: string; delay?: number; stagger?: number; mode?: "mount" | "view";
}) {
  let n = 0;
  const trigger = mode === "mount"
    ? { initial: "hidden", animate: "show" }
    : { initial: "hidden", whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } };
  return (
    <motion.span className={className} aria-label={lines.map((l) => l.text).join(" ")} role="text" {...trigger}>
      {lines.map((line, li) => (
        <span key={li} aria-hidden="true" className={`block whitespace-nowrap overflow-hidden pb-[0.06em] -mb-[0.06em] pr-[0.12em] ${lineClassName} ${line.className || ""}`}>
          {[...line.text].map((ch, ci) => {
            const i = n++;
            return (
              <motion.span
                key={ci}
                className="inline-block will-change-transform"
                variants={{
                  hidden: { y: "105%", rotate: 6, opacity: 0 },
                  show: { y: "0%", rotate: 0, opacity: 1, transition: { duration: 0.9, delay: delay + i * stagger, ease: EASE } },
                }}
              >
                {ch === " " ? " " : ch}
              </motion.span>
            );
          })}
        </span>
      ))}
    </motion.span>
  );
}
