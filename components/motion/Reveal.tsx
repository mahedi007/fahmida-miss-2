"use client";
import { motion, type HTMLMotionProps } from "motion/react";

type Variant = "left" | "leftSm" | "up" | "upLg" | "fade" | "scale";
const from: Record<Variant, Record<string, number>> = {
  left: { opacity: 0, x: -50 },
  leftSm: { opacity: 0, x: -30 },
  up: { opacity: 0, y: 20 },
  upLg: { opacity: 0, y: 60 },
  fade: { opacity: 0 },
  scale: { opacity: 0, scale: 0.94 },
};

export const EASE = [0.16, 1, 0.3, 1] as const;

export function Reveal({ variant = "up", delay = 0, duration = 0.8, children, ...rest }: { variant?: Variant; delay?: number; duration?: number } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={from[variant]}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Bar that grows from 0 to full width when scrolled into view */
export function GrowBar({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.1, delay, ease: [0.65, 0, 0.35, 1] }}
      style={{ transformOrigin: "left" }}
    />
  );
}

/** Stagger container + item */
export const staggerParent = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
export const staggerChild = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };
