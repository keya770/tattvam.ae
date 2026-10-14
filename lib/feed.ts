"use client";

import { useEffect, useSyncExternalStore } from "react";
import { INSTRUMENTS, type Instrument } from "./markets";

export type Quote = {
  sym: string;
  bid: number;
  ask: number;
  open: number;
  dir: 0 | 1 | -1;
  history: number[];
  tick: number;
};

/* ------------------------------------------------------------------
   Indicative price feed.
   Deterministic seed for SSR/hydration, then a light random walk on
   the client. Replace `startFeed()` with your MT5 bridge in production.
   ------------------------------------------------------------------ */

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const HISTORY = 48;
const state = new Map<string, Quote>();

INSTRUMENTS.forEach((ins, idx) => {
  const rnd = seeded(1000 + idx * 97);
  const vol = ins.price * 0.0009;
  const hist: number[] = [];
  let p = ins.price * (1 - 0.002 + rnd() * 0.004);
  for (let i = 0; i < HISTORY; i++) {
    p += (rnd() - 0.48) * vol;
    hist.push(p);
  }
  const mid = hist[hist.length - 1];
  state.set(ins.sym, {
    sym: ins.sym,
    bid: mid - ins.spread / 2,
    ask: mid + ins.spread / 2,
    open: hist[0],
    dir: 0,
    history: hist,
    tick: 0,
  });
});

const listeners = new Set<() => void>();
let version = 0;
let timer: ReturnType<typeof setInterval> | null = null;

function step() {
  INSTRUMENTS.forEach((ins) => {
    if (Math.random() > 0.45) return;
    const q = state.get(ins.sym)!;
    const mid = (q.bid + q.ask) / 2;
    const vol = ins.price * 0.00035;
    const next = mid + (Math.random() - 0.495) * vol;
    const history = q.history.slice(1);
    history.push(next);
    state.set(ins.sym, {
      ...q,
      bid: next - ins.spread / 2,
      ask: next + ins.spread / 2,
      dir: next > mid ? 1 : -1,
      history,
      tick: q.tick + 1,
    });
  });
  version++;
  listeners.forEach((l) => l());
}

function startFeed() {
  if (timer || typeof window === "undefined") return;
  timer = setInterval(step, 1400);
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function useFeedVersion() {
  useEffect(() => startFeed(), []);
  return useSyncExternalStore(subscribe, () => version, () => 0);
}

export function getQuote(sym: string) {
  return state.get(sym)!;
}

export function fmt(n: number, ins: Pick<Instrument, "digits">) {
  return n.toLocaleString("en-US", { minimumFractionDigits: ins.digits, maximumFractionDigits: ins.digits });
}

export function spreadPoints(ins: Instrument) {
  // Express spread in pips for FX (5/3 digit quotes), raw otherwise
  if (ins.cat === "forex") return (ins.spread * (ins.digits === 3 ? 100 : 10000)).toFixed(1);
  return ins.spread.toFixed(ins.digits > 2 ? 3 : 2);
}

export function changePct(q: Quote) {
  const mid = (q.bid + q.ask) / 2;
  return ((mid - q.open) / q.open) * 100;
}
