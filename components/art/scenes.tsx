"use client";

import { motion } from "framer-motion";
import { Art, Backdrop, C, Candles, Chip, CoinIcon, DrawPath, GridLines, Grow, Phone, Pop, Screen, Sparkle, arc, ease, pathFrom, walk } from "./kit";

const mono = { fontFamily: "var(--font-jetbrains)" } as const;

/* ===================== MT5 PLATFORM ===================== */
export function Mt5Art() {
  const l1 = walk(26, 3, 0.55);
  return (
    <Art label="MetaTrader 5 on desktop and mobile">
      <Backdrop />
      <Screen x={40} y={60} w={400} h={260}>
        <rect x={56} y={96} width={90} height={208} rx="8" fill={C.bg} />
        {["EURUSD", "GBPUSD", "XAUUSD", "US30", "AAPL", "USDJPY", "NAS100"].map((s, i) => (
          <g key={s}>
            <text x={64} y={118 + i * 27} fontSize="9" fontWeight="700" fill={C.navy}>{s}</text>
            <rect x={120} y={110 + i * 27} width={18} height={10} rx="3" fill={i % 3 === 1 ? C.down : C.up} opacity=".85" />
          </g>
        ))}
        <GridLines x={158} y={100} w={266} h={200} />
        <Candles x={158} y={110} w={266} h={170} n={18} seed={13} />
        <DrawPath d={pathFrom(l1, 158, 110, 266, 170)} stroke={C.cyan} width={2} delay={1.2} />
        <motion.line x1={158} x2={424} y1={190} y2={190} stroke={C.navy} strokeDasharray="4 4" strokeOpacity=".5" animate={{ y1: [190, 170, 200, 190], y2: [190, 170, 200, 190] }} transition={{ duration: 6, repeat: Infinity }} />
      </Screen>
      <motion.g variants={{ hidden: { x: 50, opacity: 0 }, show: { x: 0, opacity: 1, transition: { delay: 0.5, duration: 0.9, ease } } }}>
        <g className="svg-float-2">
          <Phone x={390} y={170} w={128} h={240}>
            <text x={406} y={208} fontSize="10" fontWeight="800" fill={C.navy}>MT5 Mobile</text>
            <Candles x={402} y={218} w={104} h={90} n={9} seed={17} delay={1.1} />
            <rect x={402} y={320} width={104} height={34} rx="9" fill={C.bg} />
            <text x={410} y={341} fontSize="9" fontWeight="700" fill={C.navy}>Vol 0.10</text>
            <rect x={402} y={362} width={50} height={22} rx="11" fill={C.down} />
            <rect x={456} y={362} width={50} height={22} rx="11" fill={C.up} />
            <text x={427} y={377} fontSize="8.5" fontWeight="800" fill="#fff" textAnchor="middle">SELL</text>
            <text x={481} y={377} fontSize="8.5" fontWeight="800" fill="#fff" textAnchor="middle">BUY</text>
          </Phone>
        </g>
      </motion.g>
      <Chip x={0} y={380} w={170} title="Timeframes" value="9 · 3 chart types" delay={1.3} float={3} />
      <Chip x={180} y={4} w={170} title="Expert Advisors" value="EA ready" delay={1.1} />
    </Art>
  );
}

/* ===================== SECURITY ===================== */
export function SecurityArt() {
  return (
    <Art label="Shield and lock protecting segregated client funds">
      <Backdrop />
      <defs>
        <linearGradient id="shieldG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={C.navy2} />
          <stop offset="1" stopColor={C.navy} />
        </linearGradient>
      </defs>
      <g className="svg-spin">
        <circle cx="280" cy="230" r="170" fill="none" stroke={C.cyan} strokeWidth="2" strokeDasharray="2 12" strokeLinecap="round" />
      </g>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const a = (i / 6) * Math.PI * 2;
        return (
          <Pop key={i} delay={0.9 + i * 0.08}>
            <circle cx={280 + Math.cos(a) * 170} cy={230 + Math.sin(a) * 170} r="9" fill="#fff" stroke={C.cyan} strokeWidth="3" />
          </Pop>
        );
      })}
      <Pop delay={0.15}>
        <path d="M280 70 L400 112 V218 C400 300 350 352 280 382 C210 352 160 300 160 218 V112 Z" fill="url(#shieldG)" />
        <path d="M280 92 L382 128 V218 C382 290 340 334 280 360 C220 334 178 290 178 218 V128 Z" fill="none" stroke={C.cyan} strokeOpacity=".55" strokeWidth="2" />
        {/* lock */}
        <motion.path d="M250 210 V188 a30 30 0 0 1 60 0 V210" fill="none" stroke="#fff" strokeWidth="12" strokeLinecap="round"
          variants={{ hidden: { y: -16 }, show: { y: 0, transition: { delay: 1.1, type: "spring", stiffness: 260, damping: 12 } } }} />
        <rect x="234" y="206" width="92" height="76" rx="16" fill={C.cyan} />
        <circle cx="280" cy="236" r="10" fill={C.navy} />
        <rect x="276" y="240" width="8" height="22" rx="4" fill={C.navy} />
      </Pop>
      <motion.rect x="170" y="80" width="220" height="4" rx="2" fill={C.cyan} opacity=".5" animate={{ y: [80, 360, 80] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
      <Chip x={0} y={60} w={170} title="Client funds" value="Segregated" delay={1.2} icon={<CoinIcon ch="✓" fill={C.up} />} />
      <Chip x={390} y={330} w={160} title="Payments" value="PCI DSS" delay={1.4} float={2} icon={<CoinIcon ch="🔒" fill={C.navy} />} />
      <Chip x={380} y={40} w={170} title="Office" value="Dubai, UAE" delay={1.6} float={3} />
    </Art>
  );
}

/* ===================== EXECUTION ===================== */
export function ExecutionArt() {
  return (
    <Art label="Speed gauge showing low-latency order execution">
      <Backdrop />
      <Pop delay={0.1}>
        <circle cx="280" cy="250" r="150" fill="#fff" stroke={C.line} strokeWidth="2" />
      </Pop>
      <path d={arc(280, 250, 120, 150, 390)} fill="none" stroke={C.bg} strokeWidth="22" strokeLinecap="round" />
      <DrawPath d={arc(280, 250, 120, 150, 360)} stroke={C.cyan} width={22} delay={0.4} dur={1.6} />
      {Array.from({ length: 13 }).map((_, i) => {
        const a = ((150 + i * 20) * Math.PI) / 180;
        return <line key={i} x1={280 + Math.cos(a) * 92} y1={250 + Math.sin(a) * 92} x2={280 + Math.cos(a) * 100} y2={250 + Math.sin(a) * 100} stroke={C.navy} strokeOpacity=".4" strokeWidth="2" />;
      })}
      <motion.g style={{ originX: "280px", originY: "250px" }} variants={{ hidden: { rotate: -120 }, show: { rotate: 95, transition: { delay: 0.5, duration: 1.8, type: "spring", stiffness: 40, damping: 8 } } }}>
        <path d="M280 250 L274 250 L280 150 L286 250 Z" fill={C.navy} />
      </motion.g>
      <circle cx="280" cy="250" r="16" fill={C.navy} />
      <circle cx="280" cy="250" r="6" fill={C.cyan} />
      <text x="280" y="320" textAnchor="middle" fontSize="30" fontWeight="800" fill={C.navy} style={mono}>0.02s</text>
      <text x="280" y="342" textAnchor="middle" fontSize="11" fontWeight="700" fill={C.muted}>AVG. ORDER ROUTING</text>
      {/* speed lines */}
      {[0, 1, 2].map((i) => (
        <motion.line key={i} x1="30" x2="110" y1={150 + i * 26} y2={150 + i * 26} stroke={C.cyan} strokeWidth="4" strokeLinecap="round"
          animate={{ x1: [30, 90, 30], x2: [110, 140, 110], opacity: [0, 1, 0] }} transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.25 }} />
      ))}
      <Pop delay={1.2}>
        <g className="svg-float">
          <path d="M470 90 L440 150 H468 L456 200 L500 132 H472 L486 90 Z" fill={C.cyan} stroke={C.navy} strokeWidth="3" strokeLinejoin="round" />
        </g>
      </Pop>
      <Chip x={10} y={380} w={170} title="Market order" value="FILLED" delay={1.4} icon={<CoinIcon ch="✓" fill={C.up} />} />
      <Chip x={380} y={380} w={170} title="Pending orders" value="On-server" delay={1.6} float={2} />
    </Art>
  );
}

/* ===================== PARTNERSHIP NETWORK ===================== */
function Avatar({ x, y, r = 26, tone = C.cyan, delay = 0 }: { x: number; y: number; r?: number; tone?: string; delay?: number }) {
  return (
    <Pop delay={delay}>
      <circle cx={x} cy={y} r={r + 6} fill="#fff" stroke={C.line} />
      <circle cx={x} cy={y} r={r} fill={tone} opacity=".18" />
      <circle cx={x} cy={y - r * 0.22} r={r * 0.34} fill={C.navy} />
      <path d={`M${x - r * 0.6} ${y + r * 0.62} a${r * 0.6} ${r * 0.5} 0 0 1 ${r * 1.2} 0`} fill={C.navy} />
    </Pop>
  );
}
export function PartnershipArt() {
  const nodes = [
    [120, 120], [440, 110], [90, 320], [460, 330], [280, 400], [280, 60],
  ];
  return (
    <Art label="Partner network connecting introducing brokers and clients">
      <Backdrop />
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <DrawPath d={`M280 230 L${x} ${y}`} stroke={C.cyan} width={2.5} delay={0.2 + i * 0.1} dur={0.8} />
          <motion.circle r="5" fill={C.cyanD} animate={{ cx: [280, x], cy: [230, y], opacity: [0, 1, 0] }} transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.35 }} />
        </g>
      ))}
      <Pop delay={0.05}>
        <circle cx="280" cy="230" r="66" fill={C.navy} />
        <circle cx="280" cy="230" r="66" fill="none" stroke={C.cyan} strokeWidth="3" strokeDasharray="4 8" className="svg-spin" />
        <text x="280" y="226" textAnchor="middle" fontSize="20" fontWeight="800" fill="#fff">IB</text>
        <text x="280" y="246" textAnchor="middle" fontSize="9" fontWeight="700" fill={C.cyan2}>PARTNER DESK</text>
      </Pop>
      {nodes.map(([x, y], i) => <Avatar key={i} x={x} y={y} tone={i % 2 ? C.cyan : C.navy} delay={0.6 + i * 0.1} />)}
      <Chip x={360} y={190} w={180} title="Commission" value="+$1,240.50" delta="+18%" delay={1.3} float={2} />
      <Chip x={10} y={200} w={150} title="Referrals" value="128 active" delay={1.5} float={3} />
    </Art>
  );
}

/* ===================== INSTITUTIONAL / LIQUIDITY ===================== */
export function InstitutionalArt() {
  return (
    <Art label="Prime liquidity servers routing to partner desks">
      <Backdrop />
      {[0, 1, 2].map((i) => (
        <Pop key={i} delay={0.1 + i * 0.12}>
          <rect x="200" y={110 + i * 64} width="160" height="52" rx="12" fill={i === 1 ? C.navy : "#fff"} stroke={C.navy} strokeWidth="2" />
          {[0, 1, 2].map((j) => <circle key={j} cx={222 + j * 16} cy={136 + i * 64} r="4.5" fill={j === 0 ? C.up : C.cyan} className={j === 0 ? "svg-blink" : ""} style={{ animationDelay: `${i * 0.3}s` }} />)}
          {[0, 1, 2, 3].map((j) => <rect key={j} x={282 + j * 16} y={126 + i * 64} width="8" height="20" rx="2" fill={i === 1 ? C.cyan : C.line} />)}
        </Pop>
      ))}
      {[[60, 120], [60, 340], [500, 120], [500, 340]].map(([x, y], i) => (
        <g key={i}>
          <DrawPath d={`M${x < 280 ? 200 : 360} ${y < 230 ? 136 : 264} C ${(x + 280) / 2} ${y < 230 ? 136 : 264}, ${(x + 280) / 2} ${y}, ${x} ${y}`} stroke={C.cyan} width={3} delay={0.6 + i * 0.1} className="svg-dash" />
          <Pop delay={0.9 + i * 0.1}>
            <rect x={x - 34} y={y - 26} width="68" height="52" rx="14" fill="#fff" stroke={C.line} />
            <text x={x} y={y + 5} textAnchor="middle" fontSize="11" fontWeight="800" fill={C.navy}>{["Broker", "Fund", "Prop", "IB"][i]}</text>
          </Pop>
        </g>
      ))}
      <Chip x={170} y={340} w={220} title="Liquidity" value="Multi-asset · Prime" delay={1.4} float={2} icon={<CoinIcon ch="◎" fill={C.cyanD} />} />
      <Chip x={180} y={20} w={200} title="Payouts" value="Fast settlement" delay={1.6} float={3} />
    </Art>
  );
}

/* ===================== PROMOTION ===================== */
export function PromoArt() {
  const conf = Array.from({ length: 16 });
  return (
    <Art label="Gift box with a 100 percent deposit bonus badge">
      <Backdrop />
      {conf.map((_, i) => (
        <motion.rect key={i} x={140 + ((i * 37) % 280)} y={120} width="8" height="14" rx="2" fill={[C.cyan, C.gold, C.navy, C.up][i % 4]}
          animate={{ y: [200, 40 + (i % 5) * 20, 200], rotate: [0, 180 + i * 20, 360], opacity: [0, 1, 0] }} transition={{ duration: 3 + (i % 4) * 0.4, repeat: Infinity, delay: i * 0.2 }} />
      ))}
      <Pop delay={0.1}>
        <rect x="170" y="230" width="220" height="150" rx="14" fill={C.navy} />
        <rect x="266" y="230" width="28" height="150" fill={C.cyan} />
      </Pop>
      <motion.g variants={{ hidden: { y: 0 }, show: { y: [0, -36, -22], transition: { delay: 0.8, duration: 1 } } }}>
        <g className="svg-float-3">
          <rect x="156" y="196" width="248" height="44" rx="12" fill={C.navy2} />
          <rect x="266" y="196" width="28" height="44" fill={C.cyan} />
          <path d="M280 196 C250 150 210 160 222 186 C230 200 262 198 280 196 Z M280 196 C310 150 350 160 338 186 C330 200 298 198 280 196 Z" fill={C.cyan} stroke={C.cyanD} strokeWidth="2" />
        </g>
      </motion.g>
      <Pop delay={1.2}>
        <g className="svg-float">
          <circle cx="430" cy="140" r="62" fill={C.gold} />
          <circle cx="430" cy="140" r="52" fill="none" stroke="#fff" strokeOpacity=".6" strokeWidth="2" strokeDasharray="3 5" className="svg-spin" />
          <text x="430" y="140" textAnchor="middle" fontSize="28" fontWeight="800" fill="#fff">100%</text>
          <text x="430" y="162" textAnchor="middle" fontSize="11" fontWeight="800" fill="#fff">BONUS</text>
        </g>
      </Pop>
      <Chip x={10} y={110} w={170} title="First deposit" value="up to $500" delay={1.4} float={2} />
      <Chip x={30} y={392} w={190} title="Re-deposit bonus" value="20% · up to $2,000" delay={1.6} float={3} />
      <Sparkle x={150} y={70} delay={0.4} />
      <Sparkle x={520} y={280} s={0.8} delay={1.2} />
    </Art>
  );
}

/* ===================== ACUITY AI ===================== */
export function AcuityArt() {
  return (
    <Art label="AI signal dashboard with confidence gauge">
      <Backdrop />
      <Pop delay={0.05}>
        <rect x="60" y="70" width="440" height="300" rx="24" fill="#fff" stroke={C.line} />
      </Pop>
      <text x="88" y="108" fontSize="13" fontWeight="800" fill={C.navy}>Analysis IQ</text>
      <text x="88" y="126" fontSize="10" fill={C.muted}>AI-powered signals · Top 50 assets</text>
      {/* confidence ring */}
      <circle cx="170" cy="240" r="62" fill="none" stroke={C.bg} strokeWidth="14" />
      <DrawPath d={arc(170, 240, 62, -90, 207)} stroke={C.cyan} width={14} delay={0.5} dur={1.8} />
      <text x="170" y="244" textAnchor="middle" fontSize="26" fontWeight="800" fill={C.navy} style={mono}>82%</text>
      <text x="170" y="262" textAnchor="middle" fontSize="9" fontWeight="700" fill={C.muted}>CONFIDENCE</text>
      {[
        ["EURUSD", "BUY", "1.1695 → 1.1760", true],
        ["XAUUSD", "BUY", "4,150 → 4,198", true],
        ["US30", "SELL", "46,520 → 46,180", false],
      ].map(([s, side, lv, up], i) => (
        <Pop key={s as string} delay={0.8 + i * 0.15}>
          <rect x="260" y={150 + i * 66} width="214" height="54" rx="12" fill={C.bg} />
          <text x="276" y={172 + i * 66} fontSize="11" fontWeight="800" fill={C.navy}>{s}</text>
          <text x="276" y={190 + i * 66} fontSize="9" fill={C.muted} style={mono}>{lv}</text>
          <rect x="414" y={163 + i * 66} width="46" height="22" rx="11" fill={up ? C.up : C.down} />
          <text x="437" y={178 + i * 66} fontSize="9" fontWeight="800" textAnchor="middle" fill="#fff">{side}</text>
        </Pop>
      ))}
      {/* AI orb */}
      <Pop delay={1.3}>
        <g className="svg-float-2">
          <circle cx="470" cy="70" r="40" fill={C.navy} />
          <circle cx="470" cy="70" r="40" fill="none" stroke={C.cyan} strokeWidth="2" strokeDasharray="5 6" className="svg-spin" />
          <text x="470" y="77" textAnchor="middle" fontSize="20" fontWeight="800" fill={C.cyan}>AI</text>
        </g>
      </Pop>
      <Chip x={20} y={380} w={210} title="Telegram alerts" value="10 languages" delay={1.5} float={3} />
    </Art>
  );
}

/* ===================== CALCULATOR ===================== */
export function CalculatorArt() {
  return (
    <Art label="Trading calculator with margin and profit results">
      <Backdrop />
      <Pop delay={0.1}>
        <rect x="160" y="60" width="200" height="320" rx="26" fill={C.navy} />
        <rect x="178" y="80" width="164" height="80" rx="14" fill="#0F263B" />
        <text x="330" y="112" textAnchor="end" fontSize="11" fill={C.cyan2} style={mono}>Required margin</text>
        <text x="330" y="144" textAnchor="end" fontSize="24" fontWeight="800" fill={C.cyan} style={mono}>$234.24</text>
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.rect key={i} x={180 + (i % 3) * 56} y={176 + Math.floor(i / 3) * 48} width="48" height="38" rx="10" fill={i === 11 ? C.cyan : C.navy2}
            animate={i === 4 || i === 11 ? { opacity: [1, 0.55, 1] } : {}} transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.1 }} />
        ))}
      </Pop>
      <Chip x={360} y={110} w={180} title="Pip value" value="$10.00 / lot" delay={0.9} />
      <Chip x={370} y={250} w={170} title="Swap long" value="-$6.82" delta="1 day" up={false} delay={1.1} float={2} />
      <Chip x={10} y={200} w={160} title="Leverage" value="1:500" delay={1.3} float={3} />
      <Chip x={20} y={330} w={160} title="P/L (est.)" value="+$312.40" delta="+3.1%" delay={1.5} />
    </Art>
  );
}

/* ===================== CALENDAR ===================== */
export function CalendarArt() {
  const hot = [3, 9, 12, 18, 24];
  return (
    <Art label="Economic calendar with highlighted high-impact events">
      <Backdrop />
      <Pop delay={0.05}>
        <rect x="90" y="80" width="380" height="300" rx="24" fill="#fff" stroke={C.line} />
        <rect x="90" y="80" width="380" height="64" rx="24" fill={C.navy} />
        <rect x="90" y="120" width="380" height="24" fill={C.navy} />
        <text x="118" y="120" fontSize="15" fontWeight="800" fill="#fff">This Week · Macro</text>
        {[150, 410].map((x) => <rect key={x} x={x} y="64" width="12" height="36" rx="6" fill={C.cyan} />)}
      </Pop>
      {Array.from({ length: 28 }).map((_, i) => {
        const x = 112 + (i % 7) * 50;
        const y = 162 + Math.floor(i / 7) * 52;
        const on = hot.includes(i);
        return (
          <Pop key={i} delay={0.25 + i * 0.025}>
            <rect x={x} y={y} width="40" height="42" rx="10" fill={on ? C.cyan50 : C.bg} stroke={on ? C.cyan : "none"} strokeWidth="2" />
            <text x={x + 20} y={y + 26} textAnchor="middle" fontSize="11" fontWeight="700" fill={C.navy}>{i + 1}</text>
            {on && <circle cx={x + 33} cy={y + 8} r="4" fill={i % 2 ? C.down : "#F0A33A"} className="svg-blink" />}
          </Pop>
        );
      })}
      <Chip x={380} y={20} w={170} title="US · NFP" value="High impact" delay={1.2} up={false} icon={<CoinIcon ch="!" fill={C.down} />} />
      <Chip x={10} y={380} w={180} title="CPI (YoY)" value="F 2.9% · P 3.0%" delay={1.4} float={2} />
    </Art>
  );
}

/* ===================== SUPPORT / CONTACT ===================== */
export function SupportArt() {
  return (
    <Art label="Client desk support chat conversation">
      <Backdrop />
      <Pop delay={0.1}>
        <circle cx="280" cy="210" r="90" fill="#fff" stroke={C.line} strokeWidth="2" />
        <circle cx="280" cy="190" r="34" fill={C.navy} />
        <path d="M222 268 a58 48 0 0 1 116 0" fill={C.navy} />
        <path d="M236 192 a44 44 0 0 1 88 0" fill="none" stroke={C.cyan} strokeWidth="8" strokeLinecap="round" />
        <rect x="226" y="184" width="16" height="30" rx="7" fill={C.cyan} />
        <rect x="318" y="184" width="16" height="30" rx="7" fill={C.cyan} />
        <path d="M326 214 q0 26 -30 30" fill="none" stroke={C.cyan} strokeWidth="4" strokeLinecap="round" />
      </Pop>
      {[
        { x: 20, y: 90, w: 200, t: "How do I fund my account?", me: false, d: 0.7 },
        { x: 340, y: 150, w: 200, t: "Bank transfer or card — 2 min ✓", me: true, d: 1.1 },
        { x: 40, y: 320, w: 180, t: "MT5 login help?", me: false, d: 1.5 },
      ].map((b, i) => (
        <Pop key={i} delay={b.d}>
          <g className={i % 2 ? "svg-float-2" : "svg-float-3"}>
            <rect x={b.x} y={b.y} width={b.w} height="46" rx="16" fill={b.me ? C.navy : "#fff"} stroke={C.line} />
            <text x={b.x + 16} y={b.y + 28} fontSize="11.5" fontWeight="700" fill={b.me ? "#fff" : C.navy}>{b.t}</text>
          </g>
        </Pop>
      ))}
      <Pop delay={1.8}>
        <rect x="330" y="320" width="74" height="34" rx="17" fill="#fff" stroke={C.line} />
        {[0, 1, 2].map((i) => (
          <motion.circle key={i} cx={350 + i * 17} cy="337" r="5" fill={C.cyanD} animate={{ y: [0, -5, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }} />
        ))}
      </Pop>
      <Chip x={380} y={392} w={160} title="Email response" value="< 24h" delay={2} float={3} />
    </Art>
  );
}

/* ===================== LEGAL ===================== */
export function LegalArt() {
  return (
    <Art label="Policy document with an approval seal">
      <Backdrop />
      <Pop delay={0.05}>
        <g transform="rotate(-6 250 230)">
          <rect x="150" y="70" width="230" height="300" rx="18" fill={C.bg} stroke={C.line} />
        </g>
        <rect x="170" y="60" width="230" height="310" rx="18" fill="#fff" stroke={C.line} />
        <rect x="194" y="88" width="120" height="12" rx="6" fill={C.navy} />
      </Pop>
      {Array.from({ length: 9 }).map((_, i) => (
        <motion.rect key={i} x="194" y={122 + i * 24} height="8" rx="4" fill={i % 4 === 0 ? C.cyan : C.line}
          variants={{ hidden: { width: 0 }, show: { width: i % 4 === 3 ? 110 : 180, transition: { delay: 0.3 + i * 0.08, duration: 0.6 } } }} />
      ))}
      <Pop delay={1.1}>
        <g className="svg-float">
          <circle cx="390" cy="320" r="52" fill={C.navy} />
          <circle cx="390" cy="320" r="42" fill="none" stroke={C.cyan} strokeWidth="2" strokeDasharray="3 5" className="svg-spin" />
          <path d="M370 320 l14 14 l26 -28" fill="none" stroke={C.cyan} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </Pop>
      <Chip x={10} y={120} w={150} title="Regulator" value="FSC" delay={1.3} float={2} />
    </Art>
  );
}

/* ===================== ABOUT ===================== */
export function AboutArt() {
  return (
    <Art label="Dubai and Mauritius connected on a world map">
      <Backdrop />
      <Pop delay={0.05}>
        <rect x="50" y="90" width="460" height="260" rx="26" fill="#fff" stroke={C.line} />
      </Pop>
      {/* dotted world */}
      <g fill={C.navy3} opacity=".35">
        {Array.from({ length: 22 * 11 }).map((_, i) => {
          const cx = 74 + (i % 22) * 19.5;
          const cy = 112 + Math.floor(i / 22) * 21;
          const nx = (i % 22) / 22;
          const ny = Math.floor(i / 22) / 11;
          const land =
            (nx > 0.08 && nx < 0.3 && ny > 0.1 && ny < 0.5) || (nx > 0.2 && nx < 0.32 && ny > 0.5 && ny < 0.95) ||
            (nx > 0.42 && nx < 0.58 && ny > 0.1 && ny < 0.42) || (nx > 0.45 && nx < 0.6 && ny > 0.42 && ny < 0.85) ||
            (nx > 0.58 && nx < 0.9 && ny > 0.08 && ny < 0.55) || (nx > 0.78 && nx < 0.92 && ny > 0.7 && ny < 0.9);
          return land ? <circle key={i} cx={cx} cy={cy} r="3.2" /> : null;
        })}
      </g>
      {/* Dubai -> Mauritius */}
      <DrawPath d="M336 186 Q 380 230 350 282" stroke={C.cyanD} width={3} delay={0.8} className="svg-dash" />
      {[
        [336, 186, "Dubai"],
        [350, 282, "Mauritius"],
      ].map(([x, y, n], i) => (
        <Pop key={n as string} delay={1 + i * 0.2}>
          <circle cx={x as number} cy={y as number} r="16" fill={C.cyan} opacity=".25" className="svg-blink" />
          <circle cx={x as number} cy={y as number} r="7" fill={C.navy} />
          <rect x={(x as number) + 14} y={(y as number) - 28} width="84" height="26" rx="13" fill={C.navy} />
          <text x={(x as number) + 56} y={(y as number) - 11} textAnchor="middle" fontSize="11" fontWeight="800" fill="#fff">{n}</text>
        </Pop>
      ))}
      <Chip x={10} y={20} w={190} title="Award 2024" value="Best Online Broker" delay={1.3} float={2} icon={<CoinIcon ch="★" fill={C.gold} />} />
      <Chip x={340} y={380} w={200} title="Office" value="Dubai, UAE" delay={1.5} float={3} />
    </Art>
  );
}

/* ===================== RISK MANAGEMENT ===================== */
export function RiskArt() {
  const l = walk(28, 61, 0.5);
  return (
    <Art label="Chart with stop-loss and take-profit levels">
      <Backdrop />
      <Pop delay={0.05}>
        <rect x="50" y="70" width="460" height="300" rx="24" fill="#fff" stroke={C.line} />
      </Pop>
      <GridLines x={76} y={100} w={408} h={240} rows={6} />
      <motion.rect x="76" y="110" width="408" height="60" fill={C.up} opacity=".08" variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { delay: 0.6, duration: 1 } } }} style={{ originX: "76px" }} />
      <motion.rect x="76" y="270" width="408" height="60" fill={C.down} opacity=".08" variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { delay: 0.7, duration: 1 } } }} style={{ originX: "76px" }} />
      <line x1="76" x2="484" y1="140" y2="140" stroke={C.up} strokeWidth="2" strokeDasharray="6 5" />
      <line x1="76" x2="484" y1="300" y2="300" stroke={C.down} strokeWidth="2" strokeDasharray="6 5" />
      <line x1="76" x2="484" y1="220" y2="220" stroke={C.navy} strokeWidth="1.5" strokeDasharray="3 4" opacity=".5" />
      <rect x="420" y="128" width="58" height="22" rx="6" fill={C.up} /><text x="449" y="143" textAnchor="middle" fontSize="10" fontWeight="800" fill="#fff">TP</text>
      <rect x="420" y="288" width="58" height="22" rx="6" fill={C.down} /><text x="449" y="303" textAnchor="middle" fontSize="10" fontWeight="800" fill="#fff">SL</text>
      <DrawPath d={pathFrom(l, 76, 160, 340, 120)} stroke={C.cyanD} width={3} delay={0.9} />
      <Chip x={0} y={10} w={190} title="Stop out" value="20% margin" delay={1.3} up={false} />
      <Chip x={370} y={380} w={180} title="Risk / reward" value="1 : 2.4" delay={1.5} float={2} />
    </Art>
  );
}

/* ===================== ACCOUNTS ===================== */
export function AccountsArt() {
  const cards = [
    { n: "Bronze", d: "$275", g: ["#E0A673", "#A4612B"], r: -10, x: 70, y: 150 },
    { n: "Silver", d: "$750", g: ["#DDE3EA", "#8C99A8"], r: -2, x: 160, y: 120 },
    { n: "Gold", d: "$2000", g: ["#F2D675", "#B98C12"], r: 6, x: 250, y: 90 },
  ];
  return (
    <Art label="Bronze, Silver and Gold trading account cards">
      <Backdrop />
      <defs>
        {cards.map((c) => (
          <linearGradient key={c.n} id={`acc${c.n}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={c.g[0]} /><stop offset="1" stopColor={c.g[1]} />
          </linearGradient>
        ))}
      </defs>
      {cards.map((c, i) => (
        <motion.g key={c.n}
          variants={{ hidden: { opacity: 0, rotate: 0, y: 60 }, show: { opacity: 1, rotate: c.r, y: 0, transition: { delay: 0.2 + i * 0.18, type: "spring", stiffness: 120, damping: 14 } } }}
          style={{ originX: `${c.x + 120}px`, originY: `${c.y + 80}px` }}>
          <g className={["svg-float-3", "svg-float-2", "svg-float"][i]}>
            <rect x={c.x} y={c.y} width="240" height="150" rx="20" fill={`url(#acc${c.n})`} />
            <rect x={c.x} y={c.y} width="240" height="150" rx="20" fill="none" stroke="#fff" strokeOpacity=".4" />
            <circle cx={c.x + 205} cy={c.y + 30} r="16" fill="#fff" opacity=".35" />
            <text x={c.x + 22} y={c.y + 40} fontSize="18" fontWeight="800" fill="#fff">{c.n}</text>
            <text x={c.x + 22} y={c.y + 58} fontSize="10" fontWeight="700" fill="#fff" opacity=".85">MT5 ACCOUNT</text>
            <text x={c.x + 22} y={c.y + 118} fontSize="11" fontWeight="700" fill="#fff" opacity=".85">Min deposit</text>
            <text x={c.x + 22} y={c.y + 138} fontSize="20" fontWeight="800" fill="#fff" style={mono}>{c.d}</text>
          </g>
        </motion.g>
      ))}
      <Chip x={330} y={330} w={200} title="Leverage up to" value="1:2000" delay={1.1} float={2} />
      <Chip x={20} y={340} w={180} title="Products" value="400+" delay={1.3} float={3} />
    </Art>
  );
}

/* ===================== CONDITIONS ===================== */
export function ConditionsArt() {
  const rows = [
    ["Spread", 0.85], ["Leverage", 0.7], ["Commission", 0.35], ["Swap", 0.55],
  ] as const;
  return (
    <Art label="Trading conditions control panel">
      <Backdrop />
      <Pop delay={0.05}>
        <rect x="80" y="80" width="400" height="290" rx="24" fill="#fff" stroke={C.line} />
      </Pop>
      <text x="108" y="120" fontSize="14" fontWeight="800" fill={C.navy}>Account conditions</text>
      {rows.map(([n, v], i) => (
        <g key={n}>
          <text x="108" y={168 + i * 52} fontSize="11" fontWeight="700" fill={C.muted}>{n}</text>
          <rect x="108" y={178 + i * 52} width="344" height="8" rx="4" fill={C.bg} />
          <motion.rect x="108" y={178 + i * 52} height="8" rx="4" fill={i % 2 ? C.navy : C.cyan} variants={{ hidden: { width: 0 }, show: { width: 344 * v, transition: { delay: 0.4 + i * 0.15, duration: 1, ease } } }} />
          <motion.circle cy={182 + i * 52} r="10" fill="#fff" stroke={i % 2 ? C.navy : C.cyan} strokeWidth="4" variants={{ hidden: { cx: 108 }, show: { cx: 108 + 344 * v, transition: { delay: 0.4 + i * 0.15, duration: 1, ease } } }} />
        </g>
      ))}
      <Chip x={380} y={30} w={170} title="Hidden fees" value="None" delay={1.2} icon={<CoinIcon ch="✓" fill={C.up} />} />
      <Chip x={10} y={380} w={210} title="Negative balance" value="Protected" delay={1.4} float={2} />
    </Art>
  );
}

/* ===================== NEWS ===================== */
export function NewsArt() {
  return (
    <Art label="Live market headline cards">
      <Backdrop />
      {[0, 1, 2].map((i) => (
        <Pop key={i} delay={0.15 + i * 0.15}>
          <g className={["svg-float", "svg-float-2", "svg-float-3"][i]}>
            <rect x={110 + i * 30} y={90 + i * 80} width="300" height="96" rx="18" fill="#fff" stroke={C.line} />
            <rect x={126 + i * 30} y={106 + i * 80} width="64" height="64" rx="12" fill={[C.cyan50, "#FFF5DD", C.bg][i]} />
            <Candles x={130 + i * 30} y={112 + i * 80} w={56} h={52} n={6} seed={i * 9 + 4} delay={0.6 + i * 0.1} />
            <rect x={204 + i * 30} y={112 + i * 80} width="54" height="14" rx="7" fill={C.cyan50} />
            <text x={231 + i * 30} y={122 + i * 80} textAnchor="middle" fontSize="8" fontWeight="800" fill={C.cyanD}>{["FOREX", "GOLD", "MACRO"][i]}</text>
            <rect x={204 + i * 30} y={136 + i * 80} width="180" height="8" rx="4" fill={C.navy} />
            <rect x={204 + i * 30} y={152 + i * 80} width="130" height="8" rx="4" fill={C.line} />
          </g>
        </Pop>
      ))}
      <Pop delay={0.9}>
        <rect x="400" y="60" width="96" height="34" rx="17" fill={C.down} />
        <circle cx="420" cy="77" r="5" fill="#fff" className="svg-blink" />
        <text x="458" y="82" textAnchor="middle" fontSize="12" fontWeight="800" fill="#fff">LIVE</text>
      </Pop>
    </Art>
  );
}

/* ===================== HELP ===================== */
export function HelpArt() {
  return (
    <Art label="Help centre FAQ cards">
      <Backdrop />
      <Pop delay={0.1}>
        <circle cx="280" cy="220" r="96" fill={C.navy} />
        <text x="280" y="262" textAnchor="middle" fontSize="120" fontWeight="800" fill={C.cyan}>?</text>
      </Pop>
      {["What is leverage?", "What is a spread?", "How to deposit?", "Trading signals?"].map((q, i) => {
        const pos = [[20, 70], [360, 110], [10, 330], [370, 340]][i];
        return (
          <Pop key={q} delay={0.6 + i * 0.15}>
            <g className={["svg-float", "svg-float-2", "svg-float-3", "svg-float"][i]}>
              <rect x={pos[0]} y={pos[1]} width="180" height="48" rx="16" fill="#fff" stroke={C.line} />
              <circle cx={pos[0] + 24} cy={pos[1] + 24} r="11" fill={C.cyan50} />
              <text x={pos[0] + 24} y={pos[1] + 28} textAnchor="middle" fontSize="11" fontWeight="800" fill={C.cyanD}>?</text>
              <text x={pos[0] + 44} y={pos[1] + 29} fontSize="11.5" fontWeight="700" fill={C.navy}>{q}</text>
            </g>
          </Pop>
        );
      })}
      <Sparkle x={420} y={60} />
    </Art>
  );
}

/* ===================== ONBOARDING (KYC) ===================== */
export function OnboardingArt() {
  return (
    <Art label="Identity verification on a phone">
      <Backdrop />
      <Pop delay={0.1}>
        <Phone x={200} y={60} w={160} h={320}>
          <text x="280" y="108" textAnchor="middle" fontSize="12" fontWeight="800" fill={C.navy}>Verify identity</text>
          <rect x="226" y="124" width="108" height="140" rx="14" fill={C.cyan50} stroke={C.cyan} strokeDasharray="5 5" />
          <circle cx="280" cy="176" r="24" fill={C.navy} />
          <path d="M246 244 a34 28 0 0 1 68 0" fill={C.navy} />
          <motion.rect x="226" y="124" width="108" height="4" fill={C.cyan} animate={{ y: [124, 260, 124] }} transition={{ duration: 2.6, repeat: Infinity }} />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <circle cx="232" cy={292 + i * 24} r="8" fill={C.up} />
              <path d={`M228 ${292 + i * 24} l3 3 l6 -6`} stroke="#fff" strokeWidth="2" fill="none" />
              <rect x="248" y={288 + i * 24} width={[80, 64, 72][i]} height="8" rx="4" fill={C.line} />
            </g>
          ))}
        </Phone>
      </Pop>
      <Chip x={20} y={110} w={160} title="KYC / CDD" value="Verified" delay={0.9} icon={<CoinIcon ch="✓" fill={C.up} />} />
      <Chip x={380} y={250} w={160} title="Compliance" value="AML/CFT" delay={1.1} float={2} />
    </Art>
  );
}

/* ===================== TROPHY (awards) ===================== */
export function Trophy({ className = "size-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id="trG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#F5DA7A" /><stop offset="1" stopColor="#B98C12" /></linearGradient>
      </defs>
      <circle cx="32" cy="32" r="31" fill="#FFF8E3" />
      <path d="M20 14h24v8a12 12 0 0 1-24 0v-8Z" fill="url(#trG)" />
      <path d="M20 17h-5a6 6 0 0 0 6 8M44 17h5a6 6 0 0 1-6 8" stroke="#B98C12" strokeWidth="2.5" fill="none" />
      <rect x="29" y="33" width="6" height="8" fill="#B98C12" />
      <rect x="22" y="41" width="20" height="6" rx="2" fill={C.navy} />
      <path d="m32 17 1.6 3.3 3.6.5-2.6 2.5.6 3.6-3.2-1.7-3.2 1.7.6-3.6-2.6-2.5 3.6-.5L32 17Z" fill="#fff" />
    </svg>
  );
}

/* Thumbnail art for news cards */
export function NewsThumb({ seed, tone = "cyan" }: { seed: number; tone?: "cyan" | "gold" | "navy" }) {
  const l = walk(24, seed, 0.5);
  const bg = tone === "gold" ? "#FFF7E1" : tone === "navy" ? "#E8EFF6" : C.cyan50;
  const st = tone === "gold" ? C.gold : tone === "navy" ? C.navy : C.cyanD;
  return (
    <svg viewBox="0 0 320 180" className="size-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="320" height="180" fill={bg} />
      <GridLines x={0} y={20} w={320} h={140} rows={5} />
      <Candles x={10} y={30} w={300} h={120} n={16} seed={seed + 3} delay={0} />
      <path d={pathFrom(l, 10, 30, 300, 120)} fill="none" stroke={st} strokeWidth="2.5" />
    </svg>
  );
}

export { Grow };
