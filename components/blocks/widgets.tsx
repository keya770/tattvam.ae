"use client";

import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { INSTRUMENTS, type Instrument } from "@/lib/markets";
import { getQuote, useFeedVersion } from "@/lib/feed";
import { TabBar } from "@/components/ui/interactive";
import { NewsThumb } from "@/components/art/scenes";

/* =========================================================
   Calculators
   ========================================================= */
const CONTRACT: Record<string, number> = { forex: 100000, metals: 100, energy: 1000, indices: 1, crypto: 1, us: 1, uae: 1 };
const contractOf = (ins: Instrument) => (ins.sym === "XAGUSD" ? 5000 : CONTRACT[ins.cat]);
const USD_PER: Record<string, number> = { USD: 1, EUR: 1.1712, GBP: 1.3448, AED: 1 / 3.6725, AUD: 0.6598, JPY: 1 / 147.82, CAD: 1 / 1.3921, CHF: 1 / 0.7964, NZD: 0.5843 };
const SYMBOL: Record<string, string> = { USD: "$", EUR: "€", GBP: "£", AED: "AED ", AUD: "A$", JPY: "¥", CAD: "C$", CHF: "CHF " };
// Indicative swap points (per lot, per night, USD) — replace with live MT5 specs.
const SWAP: Record<string, [number, number]> = {
  EURUSD: [-7.2, 2.1], GBPUSD: [-4.9, 0.8], USDJPY: [11.6, -24.3], AUDUSD: [-3.1, -1.2], USDCHF: [6.4, -14.8], USDCAD: [1.2, -6.9], NZDUSD: [-2.6, -1.4],
  XAUUSD: [-38.5, 18.2], XAGUSD: [-14.2, 4.1],
};

function mid(ins: Instrument) {
  const q = getQuote(ins.sym);
  return (q.bid + q.ask) / 2;
}
/** Value in USD of 1 unit of the instrument's quote currency. */
function quoteToUsd(ins: Instrument, price: number) {
  if (ins.cat !== "forex") return ins.cat === "uae" ? USD_PER.AED : 1;
  const quote = ins.sym.slice(3);
  if (quote === "USD") return 1;
  if (ins.sym.startsWith("USD")) return 1 / price;
  return USD_PER[quote] ?? 1;
}
function marginUsd(ins: Instrument, lots: number, lev: number, price: number) {
  const notionalQuote = lots * contractOf(ins) * price;
  return (notionalQuote * quoteToUsd(ins, price)) / lev;
}

function Money({ usd, cur }: { usd: number; cur: string }) {
  const v = usd / (USD_PER[cur] ?? 1);
  const mv = useMotionValue(0);
  const txt = useTransform(mv, (x) => `${x < 0 ? "-" : ""}${SYMBOL[cur] ?? ""}${Math.abs(x).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
  useEffect(() => {
    const c = animate(mv, isFinite(v) ? v : 0, { duration: 0.8, ease: [0.2, 0.7, 0.2, 1] });
    return () => c.stop();
  }, [v, mv]);
  return <motion.b className="font-mono text-xl text-cyan sm:text-[1.3rem]">{txt}</motion.b>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="field"><label>{label}</label>{children}</div>;
}

const LEVS = [1, 2, 5, 10, 20, 25, 50, 100, 200, 300, 400, 500];
const CURS = ["USD", "EUR", "GBP", "AED", "AUD", "JPY", "CAD", "CHF"];

export function Calculators() {
  useFeedVersion();
  const [tab, setTab] = useState("forex");
  const [cur, setCur] = useState("USD");
  const [sym, setSym] = useState("EURUSD");
  const [lev, setLev] = useState(500);
  const [lots, setLots] = useState(1);
  const [days, setDays] = useState(1);
  const [dir, setDir] = useState<"buy" | "sell">("buy");
  const ins = INSTRUMENTS.find((i) => i.sym === sym)!;
  const live = mid(ins);
  const [openP, setOpenP] = useState<string>("");
  const [closeP, setCloseP] = useState<string>("");
  useEffect(() => {
    const p = mid(INSTRUMENTS.find((i) => i.sym === sym)!);
    const ii = INSTRUMENTS.find((i) => i.sym === sym)!;
    setOpenP(p.toFixed(ii.digits));
    setCloseP((p * 1.004).toFixed(ii.digits));
  }, [sym]);

  const symbols = tab === "forex" ? INSTRUMENTS.filter((i) => i.cat === "forex") : INSTRUMENTS;
  useEffect(() => {
    if (!symbols.some((s) => s.sym === sym)) setSym(symbols[0].sym);
  }, [tab]); // eslint-disable-line react-hooks/exhaustive-deps

  const pipSize = ins.cat === "forex" ? (ins.digits === 3 ? 0.01 : 0.0001) : Math.pow(10, -Math.min(ins.digits, 2));
  const res = useMemo(() => {
    const margin = marginUsd(ins, lots, lev, live);
    const pip = lots * contractOf(ins) * pipSize * quoteToUsd(ins, live);
    const sw = SWAP[ins.sym] ?? [-(live * contractOf(ins) * 0.00012) * lots, -(live * contractOf(ins) * 0.00004) * lots];
    const swapL = (SWAP[ins.sym] ? sw[0] * lots : sw[0]) * days;
    const swapS = (SWAP[ins.sym] ? sw[1] * lots : sw[1]) * days;
    const o = parseFloat(openP) || live;
    const c = parseFloat(closeP) || live;
    const pl = (dir === "buy" ? c - o : o - c) * lots * contractOf(ins) * quoteToUsd(ins, c);
    return { margin, pip, swapL, swapS, pl, notional: lots * contractOf(ins) * live * quoteToUsd(ins, live) };
  }, [ins, lots, lev, live, pipSize, days, openP, closeP, dir]);

  const results =
    tab === "forex"
      ? [["Required Margin", res.margin], ["Pip Value", res.pip], ["Swap Long", res.swapL], ["Swap Short", res.swapS]]
      : tab === "margin"
        ? [["Required Margin", res.margin], ["Position Value", res.notional], ["Pip / Point Value", res.pip]]
        : [["Profit / Loss", res.pl], ["Required Margin", res.margin], ["Position Value", res.notional]];

  return (
    <div>
      <TabBar
        className="mb-6"
        tabs={[{ id: "forex", label: "Forex Calculator" }, { id: "margin", label: "Margin Calculator" }, { id: "profit", label: "Profit Calculator" }]}
        value={tab}
        onChange={setTab}
      />
      <div className="grid overflow-hidden rounded-[32px] border border-line bg-white shadow-lift lg:grid-cols-[1.2fr_1fr]">
        <div className="p-6 sm:p-9">
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 14 }} transition={{ duration: 0.3 }}>
              <h3 className="mb-1">{tab === "forex" ? "Forex Calculator" : tab === "margin" ? "Margin Calculator" : "Profit Calculator"}</h3>
              <p className="mb-6 text-[0.93rem] text-muted">
                {tab === "forex" ? "Measure required margin, pip value and overnight swaps." : tab === "margin" ? "Estimate the margin needed to open a position across any market." : "Estimate hypothetical P/L between an entry and exit price."}
              </p>
            </motion.div>
          </AnimatePresence>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Account Base Currency">
              <select value={cur} onChange={(e) => setCur(e.target.value)}>{CURS.map((c) => <option key={c}>{c}</option>)}</select>
            </Field>
            <Field label="Symbol">
              <select value={sym} onChange={(e) => setSym(e.target.value)}>{symbols.map((s) => <option key={s.sym}>{s.sym}</option>)}</select>
            </Field>
            {tab !== "profit" && (
              <Field label="Leverage for Margin">
                <select value={lev} onChange={(e) => setLev(+e.target.value)}>{LEVS.map((l) => <option key={l} value={l}>1:{l}</option>)}</select>
              </Field>
            )}
            <Field label="Volume in Lots">
              <input type="number" min={0.01} step={0.01} value={lots} onChange={(e) => setLots(Math.max(0, +e.target.value))} />
            </Field>
            {tab === "forex" && (
              <Field label="Holding Period (days)">
                <input type="number" min={0} step={1} value={days} onChange={(e) => setDays(Math.max(0, +e.target.value))} />
              </Field>
            )}
            {tab === "profit" && (
              <>
                <Field label="Direction">
                  <div className="grid grid-cols-2 gap-2">
                    {(["buy", "sell"] as const).map((d) => (
                      <button key={d} type="button" onClick={() => setDir(d)} className={`rounded-xl border-[1.5px] py-3 text-sm font-extrabold uppercase transition ${dir === d ? (d === "buy" ? "border-up bg-up text-white" : "border-down bg-down text-white") : "border-line-2 bg-white text-muted"}`}>{d}</button>
                    ))}
                  </div>
                </Field>
                <Field label="Open Price"><input type="number" step="any" value={openP} onChange={(e) => setOpenP(e.target.value)} /></Field>
                <Field label="Close Price"><input type="number" step="any" value={closeP} onChange={(e) => setCloseP(e.target.value)} /></Field>
              </>
            )}
          </div>
          <p className="mt-5 text-[0.82rem] text-muted">
            Live reference price <b className="font-mono text-navy">{live.toFixed(ins.digits)}</b> · contract size {contractOf(ins).toLocaleString()}
          </p>
        </div>
        <div className="flex flex-col gap-1 bg-[linear-gradient(160deg,var(--color-navy),var(--color-ink))] p-6 text-white sm:p-9">
          <span className="mb-2 text-[0.75rem] font-extrabold uppercase tracking-[0.14em] text-cyan-2">Result</span>
          {results.map(([k, v]) => (
            <div key={k as string} className="flex items-center justify-between border-b border-white/10 py-4">
              <span className="text-[0.9rem] text-[#9fbcd2]">{k}</span>
              <Money usd={v as number} cur={cur} />
            </div>
          ))}
          <small className="mt-auto pt-5 text-[0.78rem] text-[#9fbcd2]">*The calculated results are only reference values, based on indicative prices. Swap rates shown are indicative.</small>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   Economic calendar (indicative weekly schedule)
   ========================================================= */
type Ev = { d: number; t: string; cur: string; ev: string; imp: "High" | "Medium"; f: string; p: string };
const TEMPLATE: Ev[] = [
  { d: 1, t: "08:00", cur: "EUR", ev: "German Factory Orders (MoM)", imp: "Medium", f: "0.4%", p: "-0.2%" },
  { d: 1, t: "14:00", cur: "USD", ev: "ISM Manufacturing PMI", imp: "High", f: "49.2", p: "48.7" },
  { d: 2, t: "01:30", cur: "AUD", ev: "RBA Interest Rate Decision", imp: "High", f: "3.60%", p: "3.60%" },
  { d: 2, t: "14:00", cur: "USD", ev: "JOLTS Job Openings", imp: "Medium", f: "7.20M", p: "7.18M" },
  { d: 3, t: "09:00", cur: "EUR", ev: "Eurozone CPI Flash (YoY)", imp: "High", f: "2.1%", p: "2.0%" },
  { d: 3, t: "12:15", cur: "USD", ev: "ADP Non-Farm Employment Change", imp: "Medium", f: "52K", p: "54K" },
  { d: 3, t: "14:30", cur: "USD", ev: "Crude Oil Inventories", imp: "Medium", f: "-1.2M", p: "1.8M" },
  { d: 4, t: "11:00", cur: "GBP", ev: "BoE Interest Rate Decision", imp: "High", f: "4.00%", p: "4.00%" },
  { d: 4, t: "12:30", cur: "USD", ev: "Initial Jobless Claims", imp: "Medium", f: "225K", p: "231K" },
  { d: 5, t: "12:30", cur: "USD", ev: "Non-Farm Payrolls", imp: "High", f: "50K", p: "22K" },
  { d: 5, t: "12:30", cur: "USD", ev: "Unemployment Rate", imp: "High", f: "4.3%", p: "4.3%" },
  { d: 5, t: "12:30", cur: "CAD", ev: "Employment Change", imp: "Medium", f: "10.0K", p: "-65.5K" },
];

export function EconomicCalendar() {
  const [filter, setFilter] = useState("all");
  const [monday, setMonday] = useState<Date | null>(null);
  useEffect(() => {
    const n = new Date();
    const m = new Date(Date.UTC(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate() - ((n.getUTCDay() + 6) % 7)));
    setMonday(m);
  }, []);
  const list = TEMPLATE.filter((e) => filter === "all" || e.imp.toLowerCase() === filter);
  const days = [1, 2, 3, 4, 5].filter((d) => list.some((e) => e.d === d));
  const label = (d: number) => {
    if (!monday) return ["Mon", "Tue", "Wed", "Thu", "Fri"][d - 1];
    const x = new Date(monday.getTime() + (d - 1) * 86400000);
    return x.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "short", timeZone: "UTC" });
  };
  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <TabBar tabs={[{ id: "all", label: "All" }, { id: "high", label: "High impact" }, { id: "medium", label: "Medium" }]} value={filter} onChange={setFilter} />
        <span className="text-[0.82rem] text-muted">Times in UTC · indicative weekly schedule</span>
      </div>
      <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-lift">
        <AnimatePresence mode="wait">
          <motion.div key={filter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            {days.map((d) => (
              <div key={d}>
                <div className="bg-bg px-5 py-2.5 text-[0.8rem] font-extrabold uppercase tracking-wider text-navy-3" suppressHydrationWarning>{label(d)}</div>
                {list.filter((e) => e.d === d).map((e, i) => (
                  <motion.div key={e.ev} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="grid grid-cols-[56px_1fr] items-center gap-x-4 gap-y-1 border-t border-line px-5 py-3.5 sm:grid-cols-[64px_64px_1fr_110px_150px]">
                    <span className="font-mono text-[0.9rem] font-bold">{e.t}</span>
                    <span className="chip w-fit sm:order-none">{e.cur}</span>
                    <span className="col-span-2 font-semibold sm:col-span-1">{e.ev}</span>
                    <span className={`inline-flex items-center gap-1.5 text-[0.8rem] font-bold ${e.imp === "High" ? "text-down" : "text-[#C9821B]"}`}>
                      <span className={`size-2 rounded-full ${e.imp === "High" ? "bg-down" : "bg-[#F0A33A]"}`} />{e.imp}
                    </span>
                    <span className="font-mono text-[0.85rem] text-muted">F {e.f} · P {e.p}</span>
                  </motion.div>
                ))}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      <p className="mt-3 text-[0.8rem] text-soft">Schedule shown for illustration; connect a live economic-calendar feed for real-time releases and actuals.</p>
    </div>
  );
}

/* =========================================================
   News grid with category filter
   ========================================================= */
export type NewsItem = { title: string; source: string; cat: string; ago: string; excerpt?: string; img?: string };
export function NewsGrid({ items }: { items: NewsItem[] }) {
  const cats = ["All", "Forex", "Commodities", "Stocks", "Crypto", "Markets"];
  const [c, setC] = useState("All");
  const list = items.filter((i) => c === "All" || i.cat === c);
  return (
    <div>
      <TabBar className="mb-7" tabs={cats.map((x) => ({ id: x, label: x }))} value={c} onChange={setC} />
      <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((n, i) => (
            <motion.article
              layout
              key={n.title}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, delay: i * 0.03 }}
              className={`group flex flex-col overflow-hidden rounded-3xl border border-line bg-white transition-shadow hover:shadow-lift ${i === 0 && c === "All" ? "sm:col-span-2 lg:row-span-2" : ""}`}
            >
              <div className={`relative overflow-hidden bg-bg-2 ${i === 0 && c === "All" ? "aspect-[16/9] lg:aspect-auto lg:flex-1" : "aspect-[16/9]"}`}>
                <div className="relative size-full min-h-[200px] transition-transform duration-[1200ms] [transition-timing-function:cubic-bezier(.22,1,.36,1)] group-hover:scale-110">
                  {n.img ? (
                    <>
                      <Image src={n.img} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-cyan/10" />
                    </>
                  ) : (
                    <NewsThumb seed={i * 13 + n.title.length} tone={n.cat === "Commodities" ? "gold" : i % 3 === 1 ? "navy" : "cyan"} />
                  )}
                </div>
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[0.72rem] font-extrabold uppercase tracking-wider text-cyan-d backdrop-blur">{n.cat}</span>
              </div>
              <div className="flex flex-col gap-2 p-5">
                <div className="flex flex-wrap gap-2 text-[0.78rem] font-semibold text-soft">
                  <span className="text-cyan-d">{n.cat}</span>·<span>{n.source}</span>·<span>{n.ago}</span>
                </div>
                <h3 className="!text-[1.05rem] leading-snug group-hover:text-cyan-d">{n.title}</h3>
                {n.excerpt && <p className="text-[0.9rem] text-muted">{n.excerpt}</p>}
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
