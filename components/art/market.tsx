"use client";

import { motion } from "framer-motion";
import { Art, Backdrop, C, Candles, Chip, CoinIcon, DrawPath, GridLines, Grow, Phone, Pop, Screen, Sparkle, ease, pathFrom, rng, walk } from "./kit";

/* ===================== HOME HERO ===================== */
export function HeroTradingArt() {
  const line = walk(30, 11, 0.56);
  return (
    <Art label="Trading dashboard on desktop and mobile with live market cards">
      <Backdrop cx={300} cy={225} r={200} />
      <Screen x={60} y={70} w={400} h={250}>
        <text x={80} y={58 + 52} fontSize="12" fontWeight="800" fill={C.navy}>XAUUSD · H1</text>
        <text x={80} y={58 + 70} fontSize="10" fill={C.muted} style={{ fontFamily: "var(--font-jetbrains)" }}>4,162.41  +0.13%</text>
        <GridLines x={78} y={140} w={364} h={150} />
        <Candles x={78} y={140} w={364} h={150} n={22} seed={5} />
        <DrawPath d={pathFrom(line, 78, 140, 364, 150)} stroke={C.cyan} width={2.5} delay={1.2} />
      </Screen>
      {/* Phone */}
      <motion.g variants={{ hidden: { x: 60, opacity: 0 }, show: { x: 0, opacity: 1, transition: { duration: 0.9, delay: 0.4, ease } } }}>
        <g className="svg-float-2">
          <Phone x={380} y={150} w={130} h={250}>
            <text x={398} y={190} fontSize="10" fontWeight="800" fill={C.navy}>Watchlist</text>
            {[
              ["EURUSD", "1.17120", true],
              ["GBPUSD", "1.34481", true],
              ["USDJPY", "147.820", false],
              ["NAS100", "24,812", true],
              ["XAGUSD", "60.482", false],
            ].map(([s, v, up], i) => (
              <g key={s as string}>
                <rect x={394} y={202 + i * 34} width={102} height={28} rx="8" fill={i % 2 ? "#fff" : C.bg} />
                <text x={400} y={220 + i * 34} fontSize="9" fontWeight="700" fill={C.navy}>{s}</text>
                <text x={490} y={220 + i * 34} fontSize="8.5" textAnchor="end" fill={up ? C.up : C.down} style={{ fontFamily: "var(--font-jetbrains)" }}>{v}</text>
              </g>
            ))}
            <rect x={394} y={376} width={48} height={16} rx="8" fill={C.down} />
            <rect x={448} y={376} width={48} height={16} rx="8" fill={C.up} />
            <text x={418} y={387} fontSize="8" fontWeight="800" textAnchor="middle" fill="#fff">SELL</text>
            <text x={472} y={387} fontSize="8" fontWeight="800" textAnchor="middle" fill="#fff">BUY</text>
          </Phone>
        </g>
      </motion.g>
      <Chip x={0} y={250} w={160} title="EUR/USD" value="1.17120" delta="+0.12%" delay={0.9} icon={<CoinIcon ch="€" />} />
      <Chip x={190} y={8} w={170} title="Order filled" value="0.02 sec" delay={1.1} float={3} icon={<CoinIcon ch="✓" fill={C.up} />} />
      <Chip x={60} y={372} w={190} title="Leverage up to" value="1:2000" delay={1.3} float={2} icon={<CoinIcon ch="⚡" fill={C.navy} />} />
      <Sparkle x={520} y={90} delay={0.3} />
      <Sparkle x={30} y={170} s={0.7} delay={1.1} />
    </Art>
  );
}

/* ===================== FOREX ===================== */
export function ForexArt() {
  const coins = [
    { ch: "$", c: C.up },
    { ch: "€", c: C.cyanD },
    { ch: "£", c: C.navy2 },
    { ch: "¥", c: "#E08A3C" },
  ];
  return (
    <Art label="Globe with orbiting currency coins">
      <Backdrop />
      <defs>
        <radialGradient id="globeG" cx="35%" cy="30%" r="80%">
          <stop offset="0" stopColor="#fff" />
          <stop offset=".55" stopColor={C.cyan50} />
          <stop offset="1" stopColor={C.cyan2} />
        </radialGradient>
        <clipPath id="globeClip"><circle cx="280" cy="230" r="120" /></clipPath>
      </defs>
      <Pop delay={0.1}>
        <circle cx="280" cy="230" r="120" fill="url(#globeG)" stroke={C.navy} strokeWidth="3" />
        <g clipPath="url(#globeClip)" stroke={C.navy3} strokeOpacity=".45" fill="none" strokeWidth="1.4">
          {[-80, -40, 0, 40, 80].map((d) => <line key={d} x1="150" x2="410" y1={230 + d} y2={230 + d} />)}
          <motion.g animate={{ x: [0, -60] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
            {Array.from({ length: 9 }).map((_, i) => (
              <ellipse key={i} cx={160 + i * 60} cy="230" rx="30" ry="120" />
            ))}
          </motion.g>
          {/* continents (abstract blobs) */}
          <motion.g animate={{ x: [0, -120] }} transition={{ duration: 16, repeat: Infinity, ease: "linear" }} fill={C.cyan} fillOpacity=".55" stroke="none">
            {[0, 240].map((o) => (
              <g key={o} transform={`translate(${o} 0)`}>
                <path d="M190 170c20-18 52-14 60 4 8 18-10 22-4 40s-22 30-36 18-10-30-24-36-10-14 4-26Z" />
                <path d="M290 250c18-6 40 6 36 26s-20 40-34 30-20-48-2-56Z" />
                <path d="M320 150c26-8 70 2 72 20s-30 16-44 26-30-6-34-20 0-22 6-26Z" />
              </g>
            ))}
          </motion.g>
        </g>
      </Pop>
      {/* orbit */}
      <ellipse cx="280" cy="230" rx="200" ry="70" fill="none" stroke={C.navy} strokeOpacity=".18" strokeWidth="1.5" transform="rotate(-14 280 230)" />
      {coins.map((cn, i) => {
        const N = 48;
        const xs: number[] = [];
        const ys: number[] = [];
        for (let k = 0; k <= N; k++) {
          const a = (k / N + i / coins.length) * Math.PI * 2;
          const ex = Math.cos(a) * 200;
          const ey = Math.sin(a) * 70;
          const rot = (-14 * Math.PI) / 180;
          xs.push(280 + ex * Math.cos(rot) - ey * Math.sin(rot) - 20);
          ys.push(230 + ex * Math.sin(rot) + ey * Math.cos(rot) - 20);
        }
        return (
          <motion.g key={cn.ch} initial={{ x: xs[0], y: ys[0] }} animate={{ x: xs, y: ys }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }}>
            <circle cx="20" cy="20" r="22" fill="#fff" stroke={C.line} />
            <g transform="translate(3 3)"><CoinIcon ch={cn.ch} fill={cn.c} size={34} /></g>
          </motion.g>
        );
      })}
      <Chip x={10} y={40} w={160} title="EUR/USD" value="1.17120" delta="+0.12%" delay={0.8} />
      <Chip x={380} y={360} w={160} title="GBP/JPY" value="198.792" delta="-0.08%" up={false} delay={1} float={2} />
      <Chip x={400} y={50} w={140} title="Spread from" value="0.1 pips" delay={1.2} float={3} />
    </Art>
  );
}

/* ===================== COMMODITIES ===================== */
function GoldBar({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 40 L18 0 H102 L120 40 Z" fill="url(#goldTop)" />
      <path d="M0 40 H120 V56 H0 Z" fill={C.goldD} />
      <path d="M18 0 H102 L96 10 H24 Z" fill="#fff" opacity=".35" />
      <text x="60" y="27" textAnchor="middle" fontSize="11" fontWeight="800" fill={C.goldD} letterSpacing="2">999.9</text>
    </g>
  );
}
export function CommoditiesArt() {
  const line = walk(26, 21, 0.58);
  return (
    <Art label="Gold bars, oil drop and price chart">
      <Backdrop />
      <defs>
        <linearGradient id="goldTop" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={C.gold2} />
          <stop offset="1" stopColor={C.gold} />
        </linearGradient>
        <linearGradient id="oilG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.navy3} />
          <stop offset="1" stopColor={C.navy} />
        </linearGradient>
        <linearGradient id="areaG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.gold} stopOpacity=".35" />
          <stop offset="1" stopColor={C.gold} stopOpacity="0" />
        </linearGradient>
      </defs>
      <GridLines x={70} y={90} w={420} h={180} />
      <motion.path d={`${pathFrom(line, 70, 90, 420, 180)} L490 270 L70 270Z`} fill="url(#areaG)" variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 1.4, duration: 1 } } }} />
      <DrawPath d={pathFrom(line, 70, 90, 420, 180)} stroke={C.gold} width={3.5} delay={0.4} />
      {/* bars pyramid */}
      {[
        [130, 330, 0.2], [255, 330, 0.3], [380, 330, 0.4], [192, 280, 0.6], [318, 280, 0.7], [255, 230, 0.9],
      ].map(([x, y, d], i) => (
        <motion.g key={i} variants={{ hidden: { y: -80, opacity: 0 }, show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 180, damping: 14, delay: d as number } } }}>
          <GoldBar x={x as number} y={y as number} s={0.92} />
        </motion.g>
      ))}
      {/* shine sweep */}
      <motion.rect x="120" y="225" width="30" height="170" fill="#fff" opacity=".25" transform="skewX(-20)" animate={{ x: [0, 420] }} transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 2 }} />
      {/* oil drop */}
      <Pop delay={1.1}>
        <g className="svg-float-2">
          <path d="M470 120c0 0-38 46-38 72a38 38 0 0 0 76 0c0-26-38-72-38-72Z" fill="url(#oilG)" />
          <ellipse cx="456" cy="196" rx="8" ry="14" fill="#fff" opacity=".35" />
          <text x="470" y="214" textAnchor="middle" fontSize="11" fontWeight="800" fill="#fff">WTI</text>
        </g>
      </Pop>
      <Chip x={20} y={30} w={170} title="XAU/USD" value="4,162.41" delta="+0.13%" delay={0.9} icon={<CoinIcon ch="Au" fill={C.gold} />} />
      <Chip x={30} y={392} w={160} title="XAG/USD" value="60.482" delta="+0.17%" delay={1.2} float={3} icon={<CoinIcon ch="Ag" fill="#9AA7B5" />} />
      <Sparkle x={300} y={210} delay={1.8} />
    </Art>
  );
}

/* ===================== INDICES ===================== */
export function IndicesArt() {
  const bars = [0.35, 0.5, 0.42, 0.62, 0.55, 0.74, 0.68, 0.86];
  const labels = ["US30", "NAS100", "SP500", "GER40", "UK100", "JPN225"];
  return (
    <Art label="Rising index bar chart">
      <Backdrop />
      <defs>
        <linearGradient id="barG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.cyan} />
          <stop offset="1" stopColor={C.cyanD} />
        </linearGradient>
        <linearGradient id="barN" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.navy3} />
          <stop offset="1" stopColor={C.navy} />
        </linearGradient>
      </defs>
      <rect x="70" y="80" width="420" height="300" rx="24" fill="#fff" stroke={C.line} />
      <text x="96" y="116" fontSize="13" fontWeight="800" fill={C.navy}>Global Indices</text>
      <text x="96" y="134" fontSize="10" fill={C.muted}>Benchmark performance</text>
      <GridLines x={96} y={150} w={370} h={190} />
      {bars.map((b, i) => (
        <Grow key={i} delay={0.2 + i * 0.1}>
          <rect x={104 + i * 46} y={340 - b * 190} width="28" height={b * 190} rx="7" fill={i % 3 === 2 ? "url(#barN)" : "url(#barG)"} />
        </Grow>
      ))}
      <DrawPath d={`M118 ${340 - 0.42 * 190} ${bars.map((b, i) => `L${118 + i * 46} ${340 - b * 190 - 18}`).join(" ")}`} stroke={C.navy} width={2.5} delay={1.1} />
      <motion.g variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 2.2 } } }}>
        <circle cx={118 + 7 * 46} cy={340 - 0.86 * 190 - 18} r="7" fill={C.up} />
        <circle cx={118 + 7 * 46} cy={340 - 0.86 * 190 - 18} r="7" fill="none" stroke={C.up} className="svg-blink" strokeWidth="6" strokeOpacity=".3" />
      </motion.g>
      {/* ticker chips row */}
      <g>
        {labels.map((l, i) => (
          <Pop key={l} delay={0.8 + i * 0.08}>
            <g className={i % 2 ? "svg-float-2" : "svg-float-3"}>
              <rect x={20 + (i % 3) * 180 + (i > 2 ? 90 : 0)} y={i > 2 ? 420 : 22} width="88" height="30" rx="15" fill={i % 2 ? C.navy : "#fff"} stroke={C.line} />
              <text x={64 + (i % 3) * 180 + (i > 2 ? 90 : 0)} y={i > 2 ? 440 : 42} textAnchor="middle" fontSize="11" fontWeight="800" fill={i % 2 ? "#fff" : C.navy}>{l}</text>
            </g>
          </Pop>
        ))}
      </g>
      <Chip x={400} y={120} w={150} title="NAS100" value="24,812.5" delta="+0.64%" delay={1.4} />
    </Art>
  );
}

/* ===================== US SHARES ===================== */
export function UsSharesArt() {
  const r = rng(31);
  const buildings = Array.from({ length: 11 }).map((_, i) => ({ x: 60 + i * 40, w: 34 + (i % 3) * 4, h: 90 + r() * 170 }));
  const line = walk(22, 41, 0.6);
  return (
    <Art label="City skyline with rising stock chart">
      <Backdrop />
      <defs>
        <linearGradient id="bldG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.navy2} />
          <stop offset="1" stopColor={C.navy} />
        </linearGradient>
      </defs>
      {buildings.map((b, i) => (
        <Grow key={i} delay={0.1 + i * 0.07}>
          <rect x={b.x} y={380 - b.h} width={b.w} height={b.h} rx="4" fill={i % 4 === 1 ? C.navy3 : "url(#bldG)"} />
          {Array.from({ length: Math.floor(b.h / 22) }).map((_, j) => (
            <g key={j}>
              <rect x={b.x + 7} y={380 - b.h + 12 + j * 22} width="7" height="9" rx="1.5" fill={C.cyan} className={(i + j) % 3 === 0 ? "svg-blink" : ""} opacity={(i + j) % 2 ? 0.9 : 0.35} style={{ animationDelay: `${(i * 0.3 + j * 0.2) % 2}s` }} />
              <rect x={b.x + b.w - 14} y={380 - b.h + 12 + j * 22} width="7" height="9" rx="1.5" fill={C.cyan} opacity={(i + j) % 3 ? 0.4 : 0.9} />
            </g>
          ))}
        </Grow>
      ))}
      <rect x="40" y="378" width="480" height="6" rx="3" fill={C.navy} />
      <DrawPath d={pathFrom(line, 50, 60, 460, 200)} stroke={C.up} width={4} delay={0.9} />
      <Chip x={10} y={20} w={150} title="AAPL" value="$254.60" delta="+1.2%" delay={1.2} />
      <Chip x={390} y={16} w={150} title="NVDA" value="$186.20" delta="+2.4%" delay={1.4} float={2} />
      <Chip x={380} y={400} w={160} title="Leverage" value="1:10 Fixed" delay={1.6} float={3} />
    </Art>
  );
}

/* ===================== UAE SHARES ===================== */
export function UaeSharesArt() {
  const line = walk(22, 77, 0.57);
  const towers = [
    { x: 80, w: 40, h: 140 }, { x: 128, w: 34, h: 190 }, { x: 170, w: 46, h: 120 },
    { x: 330, w: 44, h: 170 }, { x: 382, w: 36, h: 210 }, { x: 426, w: 48, h: 130 },
  ];
  return (
    <Art label="Gulf city skyline with a tall spire tower and rising chart">
      <Backdrop />
      <defs>
        <linearGradient id="skyT" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.navy3} />
          <stop offset="1" stopColor={C.navy} />
        </linearGradient>
        <radialGradient id="sunG"><stop offset="0" stopColor="#FFE3A3" /><stop offset="1" stopColor="#FFC56B" stopOpacity="0" /></radialGradient>
      </defs>
      <motion.circle cx="410" cy="120" r="70" fill="url(#sunG)" variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 1.6 } } }} />
      {towers.map((t, i) => (
        <Grow key={i} delay={0.15 + i * 0.08}>
          <rect x={t.x} y={380 - t.h} width={t.w} height={t.h} rx="5" fill="url(#skyT)" />
          {Array.from({ length: Math.floor(t.h / 26) }).map((_, j) => (
            <rect key={j} x={t.x + 6} y={380 - t.h + 14 + j * 26} width={t.w - 12} height="4" rx="2" fill={C.cyan} opacity={(i + j) % 3 ? 0.35 : 0.9} />
          ))}
        </Grow>
      ))}
      {/* central spire tower */}
      <Grow delay={0.5}>
        <path d="M266 380 L272 160 L276 80 L280 30 L284 80 L288 160 L294 380 Z" fill={C.navy} />
        <path d="M244 380 L256 230 L268 240 L262 380Z M316 380 L304 230 L292 240 L298 380Z" fill={C.navy2} />
        <path d="M232 380 L240 300 L252 306 L250 380Z M328 380 L320 300 L308 306 L310 380Z" fill={C.navy3} />
        {Array.from({ length: 10 }).map((_, j) => (
          <rect key={j} x="274" y={110 + j * 26} width="12" height="3" rx="1.5" fill={C.cyan} className="svg-blink" style={{ animationDelay: `${j * 0.15}s` }} />
        ))}
      </Grow>
      <path d="M40 380 Q140 395 280 386 T520 384" fill="none" stroke={C.cyan} strokeWidth="3" strokeOpacity=".6" />
      <rect x="40" y="380" width="480" height="5" rx="2.5" fill={C.navy} />
      <DrawPath d={pathFrom(line, 50, 70, 460, 190)} stroke={C.up} width={3.5} delay={1.1} />
      <Chip x={6} y={30} w={160} title="FAB" value="AED 16.42" delta="+0.9%" delay={1.3} />
      <Chip x={6} y={400} w={170} title="EMAAR" value="AED 14.55" delta="+1.4%" delay={1.5} float={2} />
      <Chip x={400} y={400} w={140} title="Leverage" value="1:5 Fixed" delay={1.7} float={3} />
    </Art>
  );
}

/* ===================== MARKETS OVERVIEW ===================== */
export function MarketsOverviewArt() {
  const items = [
    { t: "Forex", v: "40+ pairs", ch: "€", c: C.cyanD },
    { t: "Metals", v: "XAU · XAG", ch: "Au", c: C.gold },
    { t: "Indices", v: "US30 · NAS100", ch: "▲", c: C.navy },
    { t: "US Shares", v: "AAPL · NVDA", ch: "$", c: C.up },
    { t: "UAE Shares", v: "FAB · EMAAR", ch: "د", c: "#E08A3C" },
  ];
  return (
    <Art label="Hub of asset classes connected to one MT5 account">
      <Backdrop />
      <Pop delay={0.1}>
        <circle cx="280" cy="230" r="70" fill="#fff" stroke={C.line} strokeWidth="2" />
        <circle cx="280" cy="230" r="54" fill={C.navy} />
        <text x="280" y="226" textAnchor="middle" fontSize="18" fontWeight="800" fill="#fff">MT5</text>
        <text x="280" y="246" textAnchor="middle" fontSize="9" fontWeight="700" fill={C.cyan2}>ONE ACCOUNT</text>
      </Pop>
      {items.map((it, i) => {
        const a = -Math.PI / 2 + (i / items.length) * Math.PI * 2;
        const x = 280 + Math.cos(a) * 180;
        const y = 230 + Math.sin(a) * 160;
        return (
          <g key={it.t}>
            <DrawPath d={`M280 230 L${x} ${y}`} stroke={C.cyan} width={2} delay={0.3 + i * 0.12} dur={0.8} className="svg-dash" />
            <Chip x={x - 72} y={y - 29} w={144} title={it.t} value={it.v} delay={0.6 + i * 0.12} float={((i % 3) + 1) as 1 | 2 | 3} icon={<CoinIcon ch={it.ch} fill={it.c} />} />
          </g>
        );
      })}
    </Art>
  );
}
