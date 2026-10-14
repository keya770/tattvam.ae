"use client";

import { motion } from "framer-motion";
import { useId, type ReactNode } from "react";

export const C = {
  navy: "#17344F",
  navy2: "#24496B",
  navy3: "#3A5F82",
  cyan: "#5CC8D8",
  cyan2: "#8FDCE7",
  cyanD: "#13879B",
  cyan50: "#EAF8FB",
  line: "#E2EAF1",
  bg: "#F6F9FC",
  up: "#0E9F6A",
  down: "#DA4343",
  gold: "#D9B13B",
  gold2: "#F2D675",
  goldD: "#A57E12",
  muted: "#8796A6",
};

export const ease = [0.2, 0.7, 0.2, 1] as const;

/** Deterministic pseudo-random so SSR and client agree. */
export function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function walk(n: number, seed: number, drift = 0.52) {
  const r = rng(seed);
  const out: number[] = [];
  let v = 0.5;
  for (let i = 0; i < n; i++) {
    v += (r() - (1 - drift)) * 0.12;
    v = Math.max(0.08, Math.min(0.92, v));
    out.push(v);
  }
  return out;
}

export function pathFrom(vals: number[], x: number, y: number, w: number, h: number) {
  return vals.map((v, i) => `${i ? "L" : "M"}${(x + (i / (vals.length - 1)) * w).toFixed(1)} ${(y + h - v * h).toFixed(1)}`).join(" ");
}

/** The whole art root: viewport-triggered, aria-hidden SVG. */
export function Art({ children, vb = "0 0 560 460", className = "", label }: { children: ReactNode; vb?: string; className?: string; label?: string }) {
  return (
    <motion.svg
      viewBox={vb}
      className={`h-auto w-full overflow-visible ${className}`}
      role="img"
      aria-label={label}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
    >
      {children}
    </motion.svg>
  );
}

export function arc(cx: number, cy: number, r: number, a0: number, a1: number) {
  const p = (a: number) => [cx + r * Math.cos((a * Math.PI) / 180), cy + r * Math.sin((a * Math.PI) / 180)];
  const [x0, y0] = p(a0);
  const [x1, y1] = p(a1);
  return `M${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`;
}

/** Soft circular backdrop + logo-ring motif. */
export function Backdrop({ cx = 280, cy = 230, r = 190 }: { cx?: number; cy?: number; r?: number }) {
  const id = useId().replace(/:/g, "");
  return (
    <g>
      <defs>
        <radialGradient id={`bd${id}`} cx="50%" cy="45%" r="60%">
          <stop offset="0" stopColor={C.cyan} stopOpacity=".32" />
          <stop offset="1" stopColor={C.cyan} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={r + 40} fill={`url(#bd${id})`} />
      <motion.path
        d={arc(cx, cy, r, 140, 395)} fill="none" stroke={C.navy} strokeWidth="14" strokeLinecap="round"
        variants={{ hidden: { pathLength: 0, opacity: 0 }, show: { pathLength: 1, opacity: 0.9, transition: { duration: 1.6, ease } } }}
      />
      <circle cx={cx} cy={cy} r={r - 34} fill="none" stroke={C.cyan} strokeOpacity=".35" strokeWidth="1.5" className="svg-dash" />
    </g>
  );
}

export function DrawPath({ d, stroke = C.cyanD, width = 3, delay = 0.3, dur = 1.8, fill = "none", className }: { d: string; stroke?: string; width?: number; delay?: number; dur?: number; fill?: string; className?: string }) {
  return (
    <motion.path
      d={d} fill={fill} stroke={stroke} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" className={className}
      variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: dur, delay, ease } } }}
    />
  );
}

export function Grow({ children, delay = 0, origin = "bottom" }: { children: ReactNode; delay?: number; origin?: string }) {
  return (
    <motion.g
      style={{ transformBox: "fill-box", transformOrigin: origin }}
      variants={{ hidden: { scaleY: 0, opacity: 0 }, show: { scaleY: 1, opacity: 1, transition: { duration: 0.7, delay, ease: [0.3, 1.3, 0.5, 1] } } }}
    >
      {children}
    </motion.g>
  );
}

export function Pop({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.g
      className={className}
      style={{ transformBox: "fill-box", transformOrigin: "center" }}
      variants={{ hidden: { opacity: 0, scale: 0.6, y: 20 }, show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 220, damping: 16, delay } } }}
    >
      {children}
    </motion.g>
  );
}

/** Candlestick cluster drawn inside a box. */
export function Candles({ x, y, w, h, n = 14, seed = 7, delay = 0.2 }: { x: number; y: number; w: number; h: number; n?: number; seed?: number; delay?: number }) {
  const r = rng(seed);
  const step = w / n;
  let v = 0.45;
  return (
    <g>
      {Array.from({ length: n }).map((_, i) => {
        const o = v;
        v = Math.max(0.12, Math.min(0.88, v + (r() - 0.42) * 0.18));
        const c = v;
        const hi = Math.max(o, c) + r() * 0.08;
        const lo = Math.min(o, c) - r() * 0.08;
        const up = c >= o;
        const cx = x + i * step + step / 2;
        const top = y + h - Math.max(o, c) * h;
        const bh = Math.max(3, Math.abs(c - o) * h);
        return (
          <Grow key={i} delay={delay + i * 0.05}>
            <line x1={cx} x2={cx} y1={y + h - hi * h} y2={y + h - lo * h} stroke={up ? C.up : C.down} strokeWidth="1.6" />
            <rect x={cx - step * 0.3} y={top} width={step * 0.6} height={bh} rx="1.5" fill={up ? C.up : C.down} />
          </Grow>
        );
      })}
    </g>
  );
}

/** Small floating info card. */
export function Chip({
  x, y, w = 150, title, value, delta, up = true, delay = 0.6, float = 1, icon,
}: { x: number; y: number; w?: number; title: string; value: string; delta?: string; up?: boolean; delay?: number; float?: 1 | 2 | 3; icon?: ReactNode }) {
  const tx = icon ? 46 : 14;
  return (
    <Pop delay={delay}>
      <g className={float === 1 ? "svg-float" : float === 2 ? "svg-float-2" : "svg-float-3"}>
        <rect x={x} y={y} width={w} height={58} rx="14" fill="#fff" stroke={C.line} />
        <rect x={x} y={y} width={w} height={58} rx="14" fill="none" stroke={C.navy} strokeOpacity=".04" strokeWidth="8" />
        {icon && <g transform={`translate(${x + 10} ${y + 13})`}>{icon}</g>}
        <text x={x + tx} y={y + 23} fontSize="11" fontWeight="700" fill={C.muted}>{title}</text>
        <text x={x + tx} y={y + 44} fontSize="15" fontWeight="800" fill={C.navy} style={{ fontFamily: "var(--font-jetbrains)" }}>{value}</text>
        {delta && (
          <g>
            <rect x={x + w - 58} y={y + 9} width="48" height="18" rx="9" fill={up ? "#E6F7F0" : "#FDECEC"} />
            <text x={x + w - 34} y={y + 22} fontSize="10" fontWeight="800" textAnchor="middle" fill={up ? C.up : C.down} style={{ fontFamily: "var(--font-jetbrains)" }}>{delta}</text>
          </g>
        )}
      </g>
    </Pop>
  );
}

export function CoinIcon({ ch, fill = C.cyan, size = 26 }: { ch: string; fill?: string; size?: number }) {
  return (
    <g>
      <circle cx={size / 2} cy={size / 2} r={size / 2} fill={fill} />
      <text x={size / 2} y={size / 2 + 5} fontSize={size * 0.5} fontWeight="800" textAnchor="middle" fill="#fff">{ch}</text>
    </g>
  );
}

/** Laptop / monitor screen frame with a chart window. */
export function Screen({ x, y, w, h, children, stand = true }: { x: number; y: number; w: number; h: number; children?: ReactNode; stand?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="16" fill={C.navy} />
      <rect x={x + 8} y={y + 8} width={w - 16} height={h - 16} rx="10" fill="#fff" />
      <g>
        <circle cx={x + 22} cy={y + 22} r="3.5" fill="#FF8C7A" />
        <circle cx={x + 33} cy={y + 22} r="3.5" fill="#FFD36B" />
        <circle cx={x + 44} cy={y + 22} r="3.5" fill="#6FDCA4" />
      </g>
      {children}
      {stand && (
        <g>
          <path d={`M${x + w / 2 - 26} ${y + h} h52 l8 28 h-68 z`} fill={C.navy2} />
          <rect x={x + w / 2 - 60} y={y + h + 26} width="120" height="8" rx="4" fill={C.navy} />
        </g>
      )}
    </g>
  );
}

export function Phone({ x, y, w = 120, h = 230, children }: { x: number; y: number; w?: number; h?: number; children?: ReactNode }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="22" fill={C.navy} />
      <rect x={x + 6} y={y + 6} width={w - 12} height={h - 12} rx="17" fill="#fff" />
      <rect x={x + w / 2 - 18} y={y + 11} width="36" height="7" rx="3.5" fill={C.navy} />
      {children}
    </g>
  );
}

export function GridLines({ x, y, w, h, rows = 4 }: { x: number; y: number; w: number; h: number; rows?: number }) {
  return (
    <g stroke={C.line} strokeWidth="1">
      {Array.from({ length: rows + 1 }).map((_, i) => (
        <line key={i} x1={x} x2={x + w} y1={y + (i * h) / rows} y2={y + (i * h) / rows} strokeDasharray="3 5" />
      ))}
    </g>
  );
}

export function Sparkle({ x, y, s = 1, delay = 0 }: { x: number; y: number; s?: number; delay?: number }) {
  return (
    <motion.path
      d={`M${x} ${y - 9 * s} L${x + 2.5 * s} ${y - 2.5 * s} L${x + 9 * s} ${y} L${x + 2.5 * s} ${y + 2.5 * s} L${x} ${y + 9 * s} L${x - 2.5 * s} ${y + 2.5 * s} L${x - 9 * s} ${y} L${x - 2.5 * s} ${y - 2.5 * s}Z`}
      fill={C.cyan}
      animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.1, 0.8] }}
      transition={{ duration: 2.4, repeat: Infinity, delay }}
      style={{ transformBox: "fill-box", transformOrigin: "center" }}
    />
  );
}
