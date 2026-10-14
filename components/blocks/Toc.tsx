"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Toc({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-30% 0px -60% 0px" },
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [items]);
  return (
    <nav aria-label="On this page" className="rounded-2xl border border-line bg-white p-4 lg:sticky lg:top-28">
      <b className="mb-2 block px-2 text-[0.75rem] uppercase tracking-[0.12em] text-soft">On this page</b>
      <ul className="grid gap-0.5">
        {items.map((i) => (
          <li key={i.id} className="relative">
            {active === i.id && <motion.span layoutId="toc-active" className="absolute inset-0 rounded-lg border-l-2 border-cyan bg-cyan-50" />}
            <a href={`#${i.id}`} className={`relative block rounded-lg px-3 py-2 text-[0.9rem] transition-colors ${active === i.id ? "font-semibold text-navy" : "text-muted hover:text-navy"}`}>{i.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
