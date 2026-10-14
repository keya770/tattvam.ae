"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { TabBar } from "@/components/ui/interactive";
import { Icon } from "@/components/ui/Icon";

const STEPS = [
  { t: "Login", d: "Sign in with your Tattvam MT5 credentials on mobile.", icon: "user" },
  { t: "Trade", d: "Open market or pending orders in a couple of taps.", icon: "trend" },
  { t: "Chart", d: "Analyse price with 3 chart types and 9 timeframes.", icon: "bars" },
  { t: "Trading Tools", d: "Apply indicators and drawing objects on any chart.", icon: "sliders" },
  { t: "Properties", d: "Check contract specifications for every symbol.", icon: "doc" },
  { t: "Tradays", d: "Follow the economic calendar from inside MT5.", icon: "calendar" },
  { t: "Expiry Date", d: "View expiry dates for futures-based CFDs.", icon: "clock" },
  { t: "Commission Rates", d: "See the commission applied to your account type.", icon: "card" },
  { t: "Swap Charges", d: "Review long and short swap rates before holding overnight.", icon: "wallet" },
];

function Screen({ i }: { i: number }) {
  const s = STEPS[i];
  return (
    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35 }} className="flex h-full flex-col p-4">
      <div className="mb-3 flex items-center justify-between text-[0.7rem] font-bold text-soft"><span>MT5</span><span>{s.t}</span></div>
      <div className="mb-3 grid size-12 place-items-center rounded-2xl bg-cyan-50 text-cyan-d"><Icon name={s.icon} className="size-6" /></div>
      <b className="mb-1 text-[0.95rem]">{s.t}</b>
      <p className="mb-4 text-[0.78rem] leading-snug text-muted">{s.d}</p>
      <div className="grid gap-2">
        {[0, 1, 2, 3].map((k) => (
          <motion.div key={k} initial={{ width: 0 }} animate={{ width: `${60 + ((k * 17 + i * 11) % 40)}%` }} transition={{ delay: 0.1 + k * 0.08 }} className={`h-2.5 rounded-full ${k === 0 ? "bg-cyan" : "bg-line"}`} />
        ))}
      </div>
      <div className="mt-auto grid grid-cols-2 gap-2">
        <span className="rounded-xl bg-down py-2 text-center text-[0.7rem] font-extrabold text-white">SELL</span>
        <span className="rounded-xl bg-up py-2 text-center text-[0.7rem] font-extrabold text-white">BUY</span>
      </div>
    </motion.div>
  );
}

export function Mt5Guide() {
  const [os, setOs] = useState("android");
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setI((x) => (x + 1) % STEPS.length), 3200);
    return () => clearInterval(t);
  }, [auto]);
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
      <div>
        <TabBar className="mb-6" tabs={[{ id: "android", label: "Android" }, { id: "ios", label: "iOS" }]} value={os} onChange={setOs} />
        <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((s, k) => (
            <li key={s.t}>
              <button onClick={() => { setI(k); setAuto(false); }} className={`relative flex w-full items-center gap-3 overflow-hidden rounded-2xl border p-3.5 text-left transition ${k === i ? "border-navy bg-white shadow-lift" : "border-line bg-white/60 hover:border-cyan-2"}`}>
                <span className={`font-mono text-sm font-bold ${k === i ? "text-cyan-d" : "text-soft"}`}>{String(k + 1).padStart(2, "0")}</span>
                <b className="text-[0.92rem]">{s.t}</b>
                {k === i && auto && <motion.span key={`p${i}`} initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 3.2, ease: "linear" }} className="absolute bottom-0 left-0 h-0.5 bg-cyan" />}
              </button>
            </li>
          ))}
        </ol>
      </div>
      <div className="mx-auto">
        <motion.div key={os} initial={{ rotateY: 90 }} animate={{ rotateY: 0 }} transition={{ duration: 0.5 }} className="relative h-[440px] w-[220px] rounded-[38px] bg-navy p-2.5 shadow-deep">
          <div className="absolute left-1/2 top-4 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-navy" />
          <div className="h-full overflow-hidden rounded-[30px] bg-white pt-8">
            <div className="px-4 text-[0.65rem] font-extrabold uppercase tracking-widest text-cyan-d">{os === "ios" ? "iOS" : "Android"} · {String(i + 1).padStart(2, "0")}</div>
            <AnimatePresence mode="wait"><Screen i={i} /></AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
