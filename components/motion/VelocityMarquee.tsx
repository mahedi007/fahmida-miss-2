"use client";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "motion/react";
import { useRef, type ReactNode } from "react";

const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

/** Infinite marquee whose speed + direction react to scroll velocity */
export function VelocityMarquee({ children, baseVelocity = -2, className = "" }: { children: ReactNode; baseVelocity?: number; className?: string }) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [0, 1000], [0, 1.5], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);
  const dir = useRef(1);
  const hovering = useRef(false);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = dir.current * baseVelocity * (delta / 1000) * (hovering.current ? 0.25 : 1);
    const f = factor.get();
    if (f < 0) dir.current = -1; else if (f > 0) dir.current = 1;
    move += dir.current * move * f;
    baseX.set(baseX.get() + move);
  });

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`} onPointerEnter={() => (hovering.current = true)} onPointerLeave={() => (hovering.current = false)}>
      <motion.div className="flex w-max" style={{ x }}>
        {[0, 1, 2, 3].map((k) => (
          <div key={k} className="flex shrink-0 items-center" aria-hidden={k > 0}>{children}</div>
        ))}
      </motion.div>
    </div>
  );
}
