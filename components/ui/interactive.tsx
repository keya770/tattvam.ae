"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useId, useRef, useState, type ReactNode } from "react";

export function TabBar({
  tabs, value, onChange, className = "",
}: { tabs: { id: string; label: string }[]; value: string; onChange: (id: string) => void; className?: string }) {
  const lid = useId();
  return (
    <div role="tablist" className={`flex max-w-full gap-1 overflow-x-auto rounded-full bg-bg-2 p-1 [scrollbar-width:none] ${className}`}>
      {tabs.map((t) => {
        const on = t.id === value;
        return (
          <button
            key={t.id}
            role="tab"
            aria-selected={on}
            onClick={() => onChange(t.id)}
            className={`relative whitespace-nowrap rounded-full px-4 py-2 text-[0.88rem] font-bold transition-colors ${on ? "text-navy" : "text-muted hover:text-navy"}`}
          >
            {on && <motion.span layoutId={`tab-${lid}`} className="absolute inset-0 rounded-full bg-white shadow-soft" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
            <span className="relative">{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export function Tabs({ items, className = "", barClass = "" }: { items: { id: string; label: string; content: ReactNode }[]; className?: string; barClass?: string }) {
  const [v, setV] = useState(items[0].id);
  const cur = items.find((i) => i.id === v)!;
  return (
    <div className={className}>
      <TabBar tabs={items} value={v} onChange={setV} className={barClass} />
      <AnimatePresence mode="wait">
        <motion.div key={v} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }} className="mt-6">
          {cur.content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function Accordion({ items, numbered = true, defaultOpen = 0 }: { items: { q: string; a: ReactNode }[]; numbered?: boolean; defaultOpen?: number }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const wrap = useRef<HTMLDivElement>(null);
  // Scroll-linked progress rail down the left side of the list
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start 0.8", "end 0.6"] });
  const rail = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });
  return (
    <div ref={wrap} className="relative pl-5 sm:pl-8">
      <div className="absolute bottom-2 left-0 top-2 w-[3px] rounded-full bg-cyan/20 sm:left-2">
        <motion.div style={{ scaleY: rail }} className="h-full w-full origin-top rounded-full bg-gradient-to-b from-cyan to-navy" />
      </div>
      <motion.div
        className="grid gap-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ staggerChildren: 0.08 }}
      >
        {items.map((it, i) => {
          const on = open === i;
          return (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, x: 48, filter: "blur(6px)" },
                show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
              }}
              className="relative"
            >
              {/* rail dot */}
              <motion.span
                animate={{ scale: on ? 1 : 0.6, backgroundColor: on ? "#5CC8D8" : "#FFFFFF" }}
                className="absolute -left-[29px] top-[26px] hidden size-3.5 rounded-full border-2 border-cyan sm:block"
              />
              <div
                className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 [transition-timing-function:cubic-bezier(.22,1,.36,1)] ${
                  on
                    ? "border-cyan bg-[linear-gradient(120deg,#FFFFFF_0%,#EAF8FB_100%)] shadow-[0_24px_50px_-24px_rgb(19_135_155/.55)]"
                    : "border-line bg-white hover:-translate-y-0.5 hover:border-cyan-2 hover:shadow-lift"
                }`}
              >
                {/* accent bar */}
                <motion.span
                  initial={false}
                  animate={{ scaleY: on ? 1 : 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-y-0 left-0 w-1.5 origin-top bg-gradient-to-b from-cyan to-navy"
                />
                <button onClick={() => setOpen(on ? null : i)} aria-expanded={on} className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-bold sm:px-7">
                  <span className="flex items-center gap-3.5">
                    {numbered && (
                      <motion.span
                        animate={{ backgroundColor: on ? "#17344F" : "#EAF8FB", color: on ? "#5CC8D8" : "#13879B" }}
                        className="grid h-8 min-w-10 place-items-center rounded-lg px-2 font-mono text-[0.8rem]"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </motion.span>
                    )}
                    <span className={`transition-colors duration-300 ${on ? "text-cyan-d" : "group-hover:text-cyan-d"}`}>{it.q}</span>
                  </span>
                  <motion.span
                    animate={{ rotate: on ? 135 : 0, backgroundColor: on ? "#17344F" : "#EAF8FB", color: on ? "#FFFFFF" : "#17344F", scale: on ? 1.08 : 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="grid size-9 flex-none place-items-center rounded-full text-xl leading-none"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <motion.div
                        initial={{ y: 12, filter: "blur(4px)" }}
                        animate={{ y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="prose-legal px-5 pb-6 pl-[4.4rem] text-muted sm:px-7 sm:pl-[5.1rem]"
                      >
                        {it.a}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
