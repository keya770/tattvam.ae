"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { CATEGORY_LABEL, HOURS, INSTRUMENTS, type Category, type Instrument } from "@/lib/markets";
import { changePct, fmt, getQuote, spreadPoints, useFeedVersion } from "@/lib/feed";
import { TabBar } from "@/components/ui/interactive";

/* ---------------- Sparkline ---------------- */
function Spark({ data, up }: { data: number[]; up: boolean }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const d = data.map((v, i) => `${i ? "L" : "M"}${((i / (data.length - 1)) * 110).toFixed(1)} ${(30 - ((v - min) / (max - min || 1)) * 26).toFixed(1)}`).join(" ");
  const col = up ? "#0E9F6A" : "#DA4343";
  return (
    <svg viewBox="0 0 110 34" className="h-[34px] w-[110px]" aria-hidden>
      <path d={`${d} L110 34 L0 34Z`} fill={col} opacity=".08" />
      <path d={d} fill="none" stroke={col} strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------------- Flashing number ---------------- */
function Num({ value, dir, tick, ins }: { value: number; dir: number; tick: number; ins: Instrument }) {
  const [flash, setFlash] = useState("");
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (!dir) return;
    setFlash(dir > 0 ? "num-flash-up" : "num-flash-down");
    const t = setTimeout(() => setFlash(""), 700);
    return () => clearTimeout(t);
  }, [tick, dir]);
  return <span className={`-mx-1.5 rounded-md px-1.5 py-0.5 font-mono font-semibold tabular-nums transition-colors duration-500 ${flash}`}>{fmt(value, ins)}</span>;
}

function Row({ ins, i }: { ins: Instrument; i: number }) {
  const q = getQuote(ins.sym);
  const ch = changePct(q);
  const up = ch >= 0;
  return (
    <motion.tr
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.04, duration: 0.4 }}
      className="grid grid-cols-3 gap-x-3 gap-y-2.5 border-t border-line px-4 py-3.5 transition-colors hover:bg-[#fafcfe] md:table-row md:p-0"
    >
      <td className="col-span-2 md:px-5 md:py-3.5">
        <div className="flex items-center gap-3">
          <span className="grid size-11 flex-none place-items-center rounded-xl bg-gradient-to-br from-navy-2 to-navy text-[0.58rem] font-extrabold tracking-tight text-white">{ins.code}</span>
          <span>
            <b className="block text-[0.95rem]">{ins.sym}</b>
            <small className="text-[0.8rem] text-muted">{ins.name}</small>
          </span>
        </div>
      </td>
      <td className="text-[0.85rem] md:px-5 md:text-[0.95rem]"><small className="block text-[0.66rem] uppercase tracking-wider text-soft md:hidden">Bid</small><Num value={q.bid} dir={q.dir} tick={q.tick} ins={ins} /></td>
      <td className="text-[0.85rem] md:px-5 md:text-[0.95rem]"><small className="block text-[0.66rem] uppercase tracking-wider text-soft md:hidden">Ask</small><Num value={q.ask} dir={q.dir} tick={q.tick} ins={ins} /></td>
      <td className="font-mono text-[0.85rem] md:px-5"><small className="block font-sans text-[0.66rem] uppercase tracking-wider text-soft md:hidden">Spread</small>{spreadPoints(ins)}</td>
      <td className="col-start-3 row-start-1 self-center text-right md:px-5 md:text-left">
        <span className={`inline-block rounded-lg px-2 py-1 font-mono text-[0.85rem] font-bold ${up ? "bg-up-50 text-up" : "bg-down-50 text-down"}`}>
          {up ? "▲" : "▼"} {Math.abs(ch).toFixed(2)}%
        </span>
      </td>
      <td className="hidden md:table-cell md:px-5"><Spark data={q.history} up={up} /></td>
      <td className="hidden text-[0.85rem] font-bold text-navy-3 md:table-cell md:px-5">up to {ins.leverage}</td>
    </motion.tr>
  );
}

export function QuotesBoard({
  cats, limit = 8, title = "Live MT5 Pricing", showTabs = true,
}: { cats: Category[]; limit?: number; title?: string; showTabs?: boolean }) {
  useFeedVersion();
  const [cat, setCat] = useState<Category>(cats[0]);
  const rows = useMemo(() => INSTRUMENTS.filter((i) => (showTabs ? i.cat === cat : cats.includes(i.cat))).slice(0, limit), [cat, cats, limit, showTabs]);
  const [clock, setClock] = useState("");
  useEffect(() => {
    const f = () => setClock(new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Dubai", hour12: false }) + " GST");
    f();
    const t = setInterval(f, 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-lift">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-4 sm:px-5">
        {showTabs && cats.length > 1 ? (
          <TabBar tabs={cats.map((c) => ({ id: c, label: CATEGORY_LABEL[c] }))} value={cat} onChange={(v) => setCat(v as Category)} />
        ) : (
          <b className="text-[1.02rem]">{title}</b>
        )}
        <div className="flex items-center gap-4 text-[0.8rem]">
          <span className="font-mono text-soft" suppressHydrationWarning>{clock}</span>
          <span className="inline-flex items-center gap-2 font-bold text-up"><span className="live-dot" />Live</span>
        </div>
      </div>
      <table className="block w-full border-collapse md:table">
        <thead className="hidden bg-bg md:table-header-group">
          <tr>
            {["Asset", "Bid", "Ask", "Spread", "Daily Change", "Chart", "Leverage"].map((h) => (
              <th key={h} className="px-5 py-3 text-left text-[0.72rem] font-bold uppercase tracking-[0.08em] text-soft">{h}</th>
            ))}
          </tr>
        </thead>
        <AnimatePresence mode="popLayout">
          <tbody key={cat} className="block md:table-row-group">
            {rows.map((ins, i) => <Row key={ins.sym} ins={ins} i={i} />)}
          </tbody>
        </AnimatePresence>
      </table>
      <div className="flex flex-wrap justify-between gap-3 border-t border-line px-5 py-3 text-[0.8rem] text-soft">
        <span>Indicative prices from MT5. Executable quotes may differ during volatile market conditions.</span>
      </div>
    </div>
  );
}

/* ---------------- Ticker marquee ---------------- */
export function Ticker({ syms }: { syms?: string[] }) {
  useFeedVersion();
  const list = (syms ? INSTRUMENTS.filter((i) => syms.includes(i.sym)) : INSTRUMENTS.filter((_, i) => i % 2 === 0)).slice(0, 16);
  const items = [...list, ...list];
  return (
    <div className="relative overflow-hidden bg-[linear-gradient(90deg,#5CC8D8,#8FDCE7,#5CC8D8)] text-navy before:absolute before:inset-y-0 before:left-0 before:z-10 before:w-20 before:bg-gradient-to-r before:from-[#5CC8D8] after:absolute after:inset-y-0 after:right-0 after:z-10 after:w-20 after:bg-gradient-to-l after:from-[#5CC8D8]">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {items.map((ins, i) => {
          const q = getQuote(ins.sym);
          const ch = changePct(q);
          return (
            <div key={i} className="flex items-center gap-2.5 whitespace-nowrap border-r border-navy/15 px-6 py-3.5 text-[0.9rem]">
              <b>{ins.sym}</b>
              <span className="font-mono font-semibold">{fmt((q.bid + q.ask) / 2, ins)}</span>
              <span className={`rounded-md bg-white/70 px-1.5 font-mono text-[0.8rem] font-bold ${ch >= 0 ? "text-up" : "text-down"}`}>{ch >= 0 ? "▲" : "▼"} {Math.abs(ch).toFixed(2)}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- Trading hours with live open/closed ---------------- */
function isOpen(sessions: [number, number][], offset: number) {
  const now = new Date();
  const server = new Date(now.getTime() + offset * 3600_000);
  const day = server.getUTCDay();
  if (day === 0 || day === 6) return false;
  const m = server.getUTCHours() * 60 + server.getUTCMinutes();
  return sessions.some(([a, b]) => m >= a && m <= b);
}

export function HoursTable({ groups }: { groups: (keyof typeof HOURS)[] }) {
  const [tab, setTab] = useState(groups[0]);
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(t);
  }, []);
  const g = HOURS[tab];
  const mounted = now !== null;
  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        {groups.length > 1 ? (
          <TabBar tabs={groups.map((k) => ({ id: k, label: k === "energy" ? "Energies" : k[0].toUpperCase() + k.slice(1) }))} value={tab} onChange={(v) => setTab(v as typeof tab)} />
        ) : <span />}
        <span className="text-[0.85rem] text-muted">Market hours <b className="text-navy">{g.tz}</b> (server time)</span>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-line bg-white shadow-soft">
        <table className="w-full min-w-[540px] border-collapse">
          <thead className="bg-bg">
            <tr>{["Symbol", "Trading hours", "Status"].map((h) => <th key={h} className="px-5 py-3 text-left text-[0.72rem] font-bold uppercase tracking-[0.08em] text-soft">{h}</th>)}</tr>
          </thead>
          <tbody>
            {g.rows.map((r, i) => {
              const open = mounted && isOpen(r.sessions, g.offset);
              return (
                <motion.tr key={tab + r.sym} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }} className="border-t border-line">
                  <td className="px-5 py-3.5 font-bold">{r.sym}{r.note && <span className="chip ml-2 !text-[0.66rem]">{r.note}</span>}</td>
                  <td className="px-5 py-3.5 font-mono text-[0.88rem] text-muted">{r.hours}</td>
                  <td className="px-5 py-3.5" suppressHydrationWarning>
                    <span className={`inline-flex items-center gap-1.5 text-[0.82rem] font-bold ${open ? "text-up" : "text-soft"}`}>
                      <span className={`size-2 rounded-full ${open ? "bg-up animate-ping-soft" : "bg-soft"}`} />
                      {open ? "Session open" : "Closed"}
                    </span>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------- Live chart card (detail pages) ---------------- */
export function LiveChart({ cats }: { cats: Category[] }) {
  useFeedVersion();
  const list = INSTRUMENTS.filter((i) => cats.includes(i.cat)).slice(0, 5);
  const [sym, setSym] = useState(list[0].sym);
  const ins = list.find((i) => i.sym === sym)!;
  const q = getQuote(sym);
  const h = q.history;
  const min = Math.min(...h);
  const max = Math.max(...h);
  const W = 600;
  const H = 220;
  const pts = h.map((v, i) => [(i / (h.length - 1)) * W, H - 14 - ((v - min) / (max - min || 1)) * (H - 40)] as const);
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const last = pts[pts.length - 1];
  const ch = changePct(q);
  const up = ch >= 0;
  const col = up ? "#0E9F6A" : "#DA4343";
  return (
    <div className="overflow-hidden rounded-[32px] border border-line bg-white shadow-lift">
      <div className="flex flex-wrap items-end justify-between gap-4 p-5 sm:p-7">
        <div>
          <div className="mb-1 flex items-center gap-2 text-[0.8rem] font-bold text-up"><span className="live-dot" /> Live · {ins.name}</div>
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-extrabold sm:text-3xl">{ins.sym}</span>
            <span className="font-mono text-xl font-bold sm:text-2xl">{fmt((q.bid + q.ask) / 2, ins)}</span>
            <span className={`rounded-lg px-2 py-1 font-mono text-sm font-bold ${up ? "bg-up-50 text-up" : "bg-down-50 text-down"}`}>{up ? "+" : ""}{ch.toFixed(2)}%</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {list.map((i) => (
            <button key={i.sym} onClick={() => setSym(i.sym)} className={`rounded-full border px-3 py-1.5 text-[0.8rem] font-bold transition ${i.sym === sym ? "border-navy bg-navy text-white" : "border-line bg-white text-muted hover:border-navy-3"}`}>
              {i.sym}
            </button>
          ))}
        </div>
      </div>
      <div className="relative px-2 pb-2">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-[200px] w-full sm:h-[240px]" preserveAspectRatio="none" aria-label={`${ins.sym} intraday chart`}>
          <defs>
            <linearGradient id="lcG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={col} stopOpacity=".22" />
              <stop offset="1" stopColor={col} stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0.25, 0.5, 0.75].map((f) => <line key={f} x1="0" x2={W} y1={H * f} y2={H * f} stroke="#E2EAF1" strokeDasharray="4 6" />)}
          <motion.path key={sym + "a"} d={`${d} L${W} ${H} L0 ${H}Z`} fill="url(#lcG)" initial={{ opacity: 0 }} animate={{ opacity: 1, d: `${d} L${W} ${H} L0 ${H}Z` }} transition={{ duration: 0.6 }} />
          <motion.path key={sym} d={d} fill="none" stroke={col} strokeWidth="2.5" vectorEffect="non-scaling-stroke" initial={{ pathLength: 0 }} animate={{ pathLength: 1, d }} transition={{ pathLength: { duration: 1.2 }, d: { duration: 0.6 } }} />
          <motion.line animate={{ y1: last[1], y2: last[1] }} x1="0" x2={W} stroke={col} strokeDasharray="3 4" strokeOpacity=".6" vectorEffect="non-scaling-stroke" />
        </svg>
        <motion.span
          animate={{ top: `${(last[1] / H) * 100}%` }}
          className="absolute right-4 -translate-y-1/2 rounded-md px-2 py-0.5 font-mono text-[0.75rem] font-bold text-white"
          style={{ background: col }}
        >
          {fmt((q.bid + q.ask) / 2, ins)}
        </motion.span>
      </div>
      <div className="grid grid-cols-3 border-t border-line text-center">
        {[["Bid", fmt(q.bid, ins)], ["Ask", fmt(q.ask, ins)], ["Leverage", `1:${ins.leverage.split(":")[1]}`]].map(([k, v]) => (
          <div key={k} className="border-r border-line px-2 py-4 last:border-0">
            <small className="block text-[0.72rem] uppercase tracking-wider text-soft">{k}</small>
            <b className="font-mono">{v}</b>
          </div>
        ))}
      </div>
    </div>
  );
}
