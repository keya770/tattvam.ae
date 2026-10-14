"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { LAND_DOTS } from "@/lib/land-dots";

type City = { name: string; lon: number; lat: number; hub?: boolean };
const CITIES: City[] = [
  { name: "Dubai", lon: 55.27, lat: 25.2, hub: true },
  { name: "Mauritius", lon: 57.5, lat: -20.2, hub: true },
  { name: "London", lon: -0.12, lat: 51.5 },
  { name: "New York", lon: -74, lat: 40.7 },
  { name: "Mumbai", lon: 72.8, lat: 19.07 },
  { name: "Singapore", lon: 103.8, lat: 1.35 },
  { name: "Tokyo", lon: 139.7, lat: 35.7 },
];
const ROUTES: [number, number][] = [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [1, 5], [0, 6]];

const RAD = Math.PI / 180;
function toVec(lon: number, lat: number) {
  const l = lon * RAD, p = lat * RAD;
  return [Math.cos(p) * Math.sin(l), Math.sin(p), Math.cos(p) * Math.cos(l)] as const;
}
/** Great-circle interpolation between two cities, lifted slightly above the surface. */
function arcPoints(a: City, b: City, n = 48) {
  const A = toVec(a.lon, a.lat), B = toVec(b.lon, b.lat);
  const dot = Math.min(1, Math.max(-1, A[0] * B[0] + A[1] * B[1] + A[2] * B[2]));
  const w = Math.acos(dot);
  const out: [number, number, number][] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const s1 = Math.sin((1 - t) * w) / Math.sin(w), s2 = Math.sin(t * w) / Math.sin(w);
    const lift = 1 + Math.sin(Math.PI * t) * 0.12 * (w / Math.PI + 0.4);
    out.push([(A[0] * s1 + B[0] * s2) * lift, (A[1] * s1 + B[1] * s2) * lift, (A[2] * s1 + B[2] * s2) * lift]);
  }
  return out;
}
const ARCS = ROUTES.map(([a, b]) => arcPoints(CITIES[a], CITIES[b]));
const DOTS = LAND_DOTS.map(([lon, lat]) => toVec(lon, lat));

/**
 * Animated dotted Earth (canvas, orthographic). Rotates continuously, draws
 * glowing trade routes from Dubai & Mauritius to global financial hubs.
 */
export function Globe({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d")!;
    let raf = 0;
    let rot = -40; // start with the Middle East facing the viewer
    const tilt = -18 * RAD;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(cv);

    const size = () => {
      const w = cv.clientWidth; // layout width — unaffected by parent scale transforms
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = w * dpr;
      cv.height = w * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    const ro = new ResizeObserver(size);
    ro.observe(cv);

    const project = (v: readonly number[], R: number, cx: number, cy: number) => {
      // rotate around Y by rot, then tilt around X
      const a = rot * RAD;
      const x1 = v[0] * Math.cos(a) + v[2] * Math.sin(a);
      const z1 = -v[0] * Math.sin(a) + v[2] * Math.cos(a);
      const y2 = v[1] * Math.cos(tilt) - z1 * Math.sin(tilt);
      const z2 = v[1] * Math.sin(tilt) + z1 * Math.cos(tilt);
      return [cx + x1 * R, cy - y2 * R, z2] as const;
    };

    const ff = getComputedStyle(document.body).fontFamily;
    let t0 = performance.now();
    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      const dt = Math.min(64, now - t0);
      t0 = now;
      if (!reduce) rot -= dt * 0.006;
      const W = cv.clientWidth;
      const R = W * 0.4, cx = W / 2, cy = W / 2;
      ctx.clearRect(0, 0, W, W);

      // atmosphere glow
      const g = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.25);
      g.addColorStop(0, "rgba(92,200,216,0.35)");
      g.addColorStop(1, "rgba(92,200,216,0)");
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(cx, cy, R * 1.25, 0, Math.PI * 2); ctx.fill();

      // sphere
      const s = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R);
      s.addColorStop(0, "#FFFFFF");
      s.addColorStop(0.6, "#EAF8FB");
      s.addColorStop(1, "#BDEAF1");
      ctx.fillStyle = s;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = "rgba(23,52,79,0.18)"; ctx.lineWidth = 1.2; ctx.stroke();

      // land dots
      for (const d of DOTS) {
        const [x, y, z] = project(d, R, cx, cy);
        if (z < -0.05) continue;
        const k = Math.max(0, z);
        ctx.fillStyle = `rgba(23,52,79,${0.35 + k * 0.6})`;
        ctx.beginPath(); ctx.arc(x, y, (1.3 + k * 1.6) * (W / 520), 0, Math.PI * 2); ctx.fill();
      }

      // routes (animated dash travelling along each arc)
      const phase = (now / 2200) % 1;
      ARCS.forEach((arc, ai) => {
        ctx.lineWidth = 1.6 * (W / 520);
        ctx.strokeStyle = "rgba(19,135,155,0.55)";
        ctx.beginPath();
        let started = false;
        arc.forEach((p) => {
          const [x, y, z] = project(p, R, cx, cy);
          if (z < 0) { started = false; return; }
          if (!started) { ctx.moveTo(x, y); started = true; } else ctx.lineTo(x, y);
        });
        ctx.stroke();
        const idx = Math.floor(((phase + ai * 0.13) % 1) * (arc.length - 1));
        const [px, py, pz] = project(arc[idx], R, cx, cy);
        if (pz > 0) {
          ctx.fillStyle = "#5CC8D8";
          ctx.beginPath(); ctx.arc(px, py, 3 * (W / 520), 0, Math.PI * 2); ctx.fill();
        }
      });

      // cities
      CITIES.forEach((c) => {
        const [x, y, z] = project(toVec(c.lon, c.lat), R, cx, cy);
        if (z < 0.02) return;
        const pulse = (now / 1400) % 1;
        if (c.hub) {
          ctx.strokeStyle = `rgba(92,200,216,${1 - pulse})`;
          ctx.lineWidth = 2;
          ctx.beginPath(); ctx.arc(x, y, (6 + pulse * 16) * (W / 520), 0, Math.PI * 2); ctx.stroke();
        }
        ctx.fillStyle = c.hub ? "#17344F" : "#13879B";
        ctx.beginPath(); ctx.arc(x, y, (c.hub ? 5 : 3.2) * (W / 520), 0, Math.PI * 2); ctx.fill();
        if (c.hub) {
          ctx.font = `700 ${12 * (W / 520)}px ${ff}`;
          const tw = ctx.measureText(c.name).width;
          const bx = x + 10 * (W / 520), by = y - 26 * (W / 520), bh = 22 * (W / 520), pad = 8 * (W / 520);
          ctx.fillStyle = "#17344F";
          ctx.beginPath(); ctx.roundRect(bx, by, tw + pad * 2, bh, bh / 2); ctx.fill();
          ctx.fillStyle = "#fff";
          ctx.fillText(c.name, bx + pad, by + bh * 0.68);
        }
      });
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <canvas ref={ref} className="aspect-square w-full" aria-label="Rotating globe with Dubai and Mauritius connected to global financial hubs" role="img" />
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.7 }}
        className="absolute left-0 top-[8%] flex items-center gap-3 rounded-2xl border border-line bg-white/90 px-4 py-3 shadow-lift backdrop-blur animate-floaty"
      >
        <span className="grid size-8 place-items-center rounded-full bg-gold text-sm text-white">★</span>
        <span><small className="block text-[0.72rem] font-bold text-muted">Award 2024</small><b className="whitespace-nowrap font-mono text-[0.9rem]">Best Online Broker</b></span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.7 }}
        className="absolute bottom-[8%] right-0 rounded-2xl border border-line bg-white/90 px-4 py-3 shadow-lift backdrop-blur [animation:floaty_7s_1s_ease-in-out_infinite]"
      >
        <small className="block text-[0.72rem] font-bold text-muted">UAE office</small>
        <b className="font-mono text-[0.9rem]">Dubai</b>
      </motion.div>
    </div>
  );
}
