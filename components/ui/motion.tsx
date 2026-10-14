"use client";

import { animate, motion, useInView, useMotionValue, useTransform, type Variants } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { useIntroReady } from "@/components/site/Preloader";

const EASE = [0.22, 1, 0.36, 1] as const; // easeOutQuint — smoother settle

type Dir = "up" | "left" | "right" | "zoom" | "none";
const offset = (dir: Dir) =>
  dir === "left" ? { x: -40 } : dir === "right" ? { x: 40 } : dir === "zoom" ? { scale: 0.94 } : dir === "none" ? {} : { y: 32 };

/** Fades/slides children in when scrolled into view. */
export function Reveal({
  children, dir = "up", delay = 0, className, as = "div",
}: { children: ReactNode; dir?: Dir; delay?: number; className?: string; as?: "div" | "li" | "section" | "article" }) {
  const C = motion[as];
  return (
    <C
      className={className}
      initial={{ opacity: 0, filter: "blur(5px)", ...offset(dir) }}
      whileInView={{ opacity: 1, filter: "blur(0px)", x: 0, y: 0, scale: 1, transitionEnd: { filter: "none" } }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.95, delay, ease: EASE }}
    >
      {children}
    </C>
  );
}

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } };
const item: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.85, ease: EASE } },
};

/** Staggers direct <StaggerItem> children. */
export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
      {children}
    </motion.div>
  );
}
export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}

/** Hero text entrance: words rise in sequence. */
export function HeroTitle({ text, highlight, className }: { text: string; highlight?: string; className?: string }) {
  const ready = useIntroReady();
  const words = text.split(" ");
  const hl = new Set((highlight ?? "").split(" ").filter(Boolean));
  return (
    <h1 className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom" aria-hidden>
          <motion.span
            className={`inline-block ${hl.has(w) ? "text-grad" : ""}`}
            initial={{ y: "110%", filter: "blur(10px)" }}
            animate={ready ? { y: 0, filter: "blur(0px)" } : { y: "110%", filter: "blur(10px)" }}
            transition={{ duration: 0.9, delay: 0.05 + i * 0.08, ease: EASE }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </h1>
  );
}

export function FadeIn({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const ready = useIntroReady();
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 18, filter: "blur(6px)" }} animate={ready ? { opacity: 1, y: 0, filter: "blur(0px)", transitionEnd: { filter: "none" } } : undefined} transition={{ duration: 0.8, delay, ease: EASE }}>
      {children}
    </motion.div>
  );
}

/** Counts up to the numeric part of `value` (e.g. "$2,000", "100%", "24/5" stays static). */
export function Counter({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const m = value.match(/^([^\d]*)([\d,.]+)(.*)$/);
  const target = m && !value.includes("/") && !value.includes(":") ? parseFloat(m[2].replace(/,/g, "")) : null;
  const decimals = m && m[2].includes(".") ? m[2].split(".")[1].length : 0;
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) =>
    m ? `${m[1]}${v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${m[3]}` : value,
  );
  useEffect(() => {
    if (!inView || target === null) return;
    const c = animate(mv, target, { duration: 1.6, ease: EASE });
    return () => c.stop();
  }, [inView, target, mv]);
  if (target === null) return <span className={className}>{value}</span>;
  return <motion.span ref={ref} className={className}>{text}</motion.span>;
}

export { motion };
