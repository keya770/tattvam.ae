"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useSyncExternalStore } from "react";

/* ------------------------------------------------------------------
   Intro loader (first visit per browser session, like waverunmedia.com):
   stacked brand panels slide up one after another, then the hero
   animates in. Other components wait for it via useIntroReady().
   ------------------------------------------------------------------ */

let ready = false;
const subs = new Set<() => void>();
function setReady() {
  if (ready) return;
  ready = true;
  subs.forEach((f) => f());
}
export function useIntroReady() {
  return useSyncExternalStore(
    (cb) => {
      subs.add(cb);
      return () => subs.delete(cb);
    },
    () => ready,
    () => false,
  );
}

const PANELS = ["#FFFFFF", "#8FDCE7", "#5CC8D8", "#17344F"]; // bottom → top

export function Preloader() {
  // Rendered on the server too, so the page never flashes before the intro.
  const [show, setShow] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
      seen = sessionStorage.getItem("tv-intro") === "1" && nav?.type !== "reload";
      sessionStorage.setItem("tv-intro", "1");
    } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setShow(false); setReady(); return; }
    const hold = seen ? 150 : 1300; // quick wipe on repeat visits, full intro on first visit / reload
    document.documentElement.style.overflow = "hidden";
    const t1 = setTimeout(() => setLeaving(true), hold);
    const t2 = setTimeout(() => setReady(), hold + 450);
    const t3 = setTimeout(() => { setShow(false); document.documentElement.style.overflow = ""; }, hold + 1300);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); document.documentElement.style.overflow = ""; };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div className="fixed inset-0 z-[100]" aria-hidden exit={{ opacity: 0 }}>
          {PANELS.map((c, i) => (
            <motion.div
              key={c}
              className="absolute inset-0"
              style={{ background: c }}
              initial={{ y: 0 }}
              animate={leaving ? { y: "-110%" } : { y: 0 }}
              transition={{ duration: 1, delay: leaving ? (PANELS.length - 1 - i) * 0.08 : 0, ease: [0.87, 0, 0.13, 1] }}
            />
          ))}
          <motion.div
            className="absolute inset-0 grid place-items-center"
            animate={leaving ? { y: "-110%", opacity: 0 } : { y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.87, 0, 0.13, 1] }}
          >
            <div className="flex flex-col items-center gap-6">
              <motion.div initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                <Image src="/img/mark-light.png" alt="" width={96} height={96} priority className="size-20" />
              </motion.div>
              <div className="h-[2px] w-40 overflow-hidden rounded bg-white/15">
                <motion.div className="h-full bg-cyan" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 1.1, ease: "easeInOut" }} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
