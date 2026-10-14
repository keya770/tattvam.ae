export type Category = "forex" | "metals" | "energy" | "indices" | "crypto" | "us" | "uae";

export type Instrument = {
  sym: string;
  name: string;
  code: string; // short badge shown in the icon tile
  cat: Category;
  price: number; // reference mid used by the indicative feed
  digits: number;
  spread: number; // in price units
  leverage: string;
};

/**
 * Reference instruments.
 * NOTE: the website ships with an indicative (simulated) price stream so pages
 * look alive in any environment. Swap `lib/feed.ts` for your MT5 price bridge
 * (WebSocket / REST) in production — the components only consume `useQuotes()`.
 */
export const INSTRUMENTS: Instrument[] = [
  // Forex
  { sym: "EURUSD", name: "Euro vs U.S. Dollar", code: "EU/US", cat: "forex", price: 1.1712, digits: 5, spread: 0.00008, leverage: "1:500" },
  { sym: "GBPUSD", name: "British Pound vs U.S. Dollar", code: "GB/US", cat: "forex", price: 1.3448, digits: 5, spread: 0.0001, leverage: "1:500" },
  { sym: "USDJPY", name: "U.S. Dollar vs Japanese Yen", code: "US/JP", cat: "forex", price: 147.82, digits: 3, spread: 0.012, leverage: "1:500" },
  { sym: "AUDUSD", name: "Australian Dollar vs U.S. Dollar", code: "AU/US", cat: "forex", price: 0.6598, digits: 5, spread: 0.0001, leverage: "1:500" },
  { sym: "USDCHF", name: "U.S. Dollar vs Swiss Franc", code: "US/CH", cat: "forex", price: 0.7964, digits: 5, spread: 0.00012, leverage: "1:500" },
  { sym: "USDCAD", name: "U.S. Dollar vs Canadian Dollar", code: "US/CA", cat: "forex", price: 1.3921, digits: 5, spread: 0.00012, leverage: "1:500" },
  { sym: "NZDUSD", name: "New Zealand Dollar vs U.S. Dollar", code: "NZ/US", cat: "forex", price: 0.5843, digits: 5, spread: 0.00014, leverage: "1:500" },
  // Metals
  { sym: "XAUUSD", name: "Gold vs U.S. Dollar", code: "Au", cat: "metals", price: 4162.41, digits: 2, spread: 0.1, leverage: "1:500" },
  { sym: "XAGUSD", name: "Silver vs U.S. Dollar", code: "Ag", cat: "metals", price: 60.482, digits: 3, spread: 0.034, leverage: "1:500" },
  { sym: "XPTUSD", name: "Platinum vs U.S. Dollar", code: "Pt", cat: "metals", price: 1706.1, digits: 2, spread: 5.9, leverage: "1:100" },
  { sym: "XPDUSD", name: "Palladium vs U.S. Dollar", code: "Pd", cat: "metals", price: 1187.9, digits: 2, spread: 3.0, leverage: "1:100" },
  // Energy
  { sym: "USOIL", name: "WTI Crude Oil", code: "WTI", cat: "energy", price: 64.18, digits: 2, spread: 0.03, leverage: "1:100" },
  { sym: "UKOIL", name: "Brent Crude Oil", code: "BRT", cat: "energy", price: 67.42, digits: 2, spread: 0.03, leverage: "1:100" },
  { sym: "XNGUSD", name: "Natural Gas", code: "NG", cat: "energy", price: 3.214, digits: 3, spread: 0.006, leverage: "1:50" },
  // Indices
  { sym: "NAS100", name: "NASDAQ 100 Index", code: "NDX", cat: "indices", price: 24812.5, digits: 1, spread: 1.2, leverage: "1:500" },
  { sym: "SP500", name: "S&P 500 Index", code: "SPX", cat: "indices", price: 6688.3, digits: 1, spread: 0.5, leverage: "1:500" },
  { sym: "US30", name: "Dow Jones 30 Index", code: "DJI", cat: "indices", price: 46420.0, digits: 1, spread: 2.0, leverage: "1:500" },
  { sym: "UK100", name: "FTSE 100 Index", code: "FTSE", cat: "indices", price: 9352.6, digits: 1, spread: 1.0, leverage: "1:500" },
  { sym: "DAX30", name: "Germany 30 Index", code: "DAX", cat: "indices", price: 24210.4, digits: 1, spread: 1.0, leverage: "1:500" },
  { sym: "CAC40", name: "France 40 Index", code: "CAC", cat: "indices", price: 7892.3, digits: 1, spread: 1.0, leverage: "1:500" },
  { sym: "JPN225", name: "Nikkei 225 Index", code: "N225", cat: "indices", price: 44930.0, digits: 0, spread: 8, leverage: "1:500" },
  // Crypto
  { sym: "BTCUSD", name: "Bitcoin vs U.S. Dollar", code: "BTC", cat: "crypto", price: 114250, digits: 1, spread: 25, leverage: "1:20" },
  { sym: "ETHUSD", name: "Ethereum vs U.S. Dollar", code: "ETH", cat: "crypto", price: 4160.5, digits: 2, spread: 2.2, leverage: "1:20" },
  { sym: "SOLUSD", name: "Solana vs U.S. Dollar", code: "SOL", cat: "crypto", price: 208.4, digits: 2, spread: 0.3, leverage: "1:10" },
  // US shares
  { sym: "AAPL", name: "Apple Inc", code: "AAPL", cat: "us", price: 254.6, digits: 2, spread: 0.06, leverage: "1:10" },
  { sym: "NVDA", name: "Nvidia Corp", code: "NVDA", cat: "us", price: 186.2, digits: 2, spread: 0.06, leverage: "1:10" },
  { sym: "META", name: "Meta Platforms Inc", code: "META", cat: "us", price: 742.1, digits: 2, spread: 0.2, leverage: "1:10" },
  { sym: "TSLA", name: "Tesla Inc", code: "TSLA", cat: "us", price: 443.2, digits: 2, spread: 0.15, leverage: "1:10" },
  { sym: "AMZN", name: "Amazon.com Inc", code: "AMZN", cat: "us", price: 219.5, digits: 2, spread: 0.06, leverage: "1:10" },
  // UAE shares
  { sym: "ADCB", name: "Abu Dhabi Commercial Bank", code: "ADCB", cat: "uae", price: 13.86, digits: 2, spread: 0.02, leverage: "1:5" },
  { sym: "EMAAR", name: "Emaar Properties", code: "EMR", cat: "uae", price: 14.55, digits: 2, spread: 0.02, leverage: "1:5" },
  { sym: "ETISALAT", name: "e& (Etisalat Group)", code: "e&", cat: "uae", price: 17.94, digits: 2, spread: 0.02, leverage: "1:5" },
  { sym: "FAB", name: "First Abu Dhabi Bank", code: "FAB", cat: "uae", price: 16.42, digits: 2, spread: 0.02, leverage: "1:5" },
  { sym: "ENBD", name: "Emirates NBD", code: "ENBD", cat: "uae", price: 24.1, digits: 2, spread: 0.04, leverage: "1:5" },
];

export const CATEGORY_LABEL: Record<Category, string> = {
  forex: "Forex",
  metals: "Metals",
  energy: "Energy",
  indices: "Index CFDs",
  crypto: "Crypto",
  us: "US Stocks",
  uae: "UAE Stocks",
};

export const byCat = (cats: Category[]) => INSTRUMENTS.filter((i) => cats.includes(i.cat));

export type HoursRow = { sym: string; hours: string; note?: string; tz: number; sessions: [number, number][] };

/** Weekday sessions expressed in minutes from server midnight, used for the open/closed badge. */
const allWeek: [number, number][] = [[1, 1438]];
export const HOURS: Record<string, { tz: string; offset: number; rows: HoursRow[] }> = {
  forex: {
    tz: "GMT+2",
    offset: 2,
    rows: ["EURUSD", "GBPUSD", "AUDUSD", "NZDUSD", "USDJPY", "USDCAD", "USDCHF"].map((s) => ({ sym: s, hours: "00:01 (Mon) – 23:58 (Fri)", tz: 2, sessions: allWeek, note: "Major" }))
      .concat(["AUDCHF", "EURGBP", "GBPJPY"].map((s) => ({ sym: s, hours: "00:01 (Mon) – 23:58 (Fri)", tz: 2, sessions: allWeek, note: "Minor" }))),
  },
  energy: {
    tz: "GMT+2",
    offset: 2,
    rows: [
      { sym: "USOIL", hours: "01:01 (Mon) – 23:58 (Fri)", tz: 2, sessions: [[61, 1438]] },
      { sym: "UKOIL", hours: "03:03 (Mon) – 23:58 (Fri)", tz: 2, sessions: [[183, 1438]] },
      { sym: "XNGUSD", hours: "01:01 (Mon) – 23:58 (Fri)", tz: 2, sessions: [[61, 1438]] },
    ],
  },
  indices: {
    tz: "GMT+3",
    offset: 3,
    rows: [
      { sym: "WS30", hours: "01:00 – 23:15 & 23:30 – 23:58 (Mon–Fri)", tz: 3, sessions: [[60, 1395], [1410, 1438]] },
      { sym: "SP500", hours: "01:00 – 23:15 & 23:30 – 23:58 (Mon–Fri)", tz: 3, sessions: [[60, 1395], [1410, 1438]] },
      { sym: "NAS100", hours: "01:00 – 23:15 & 23:30 – 23:58 (Mon–Fri)", tz: 3, sessions: [[60, 1395], [1410, 1438]] },
      { sym: "UK100", hours: "10:01 (Mon) – 23:58 (Fri)", tz: 3, sessions: [[601, 1438]] },
      { sym: "DAX30", hours: "10:01 (Mon–Thu) – 23:58; Fri until 22:58", tz: 3, sessions: [[601, 1438]] },
      { sym: "CAC40", hours: "09:02 (Mon) – 22:58 (Fri)", tz: 3, sessions: [[542, 1378]] },
      { sym: "JPN225", hours: "02:31 – 09:25 & 10:30 – 23:58 (Mon–Fri)", tz: 3, sessions: [[151, 565], [630, 1438]] },
    ],
  },
};

export const FUTURES = {
  metals: [
    { inst: "Gold", sym: "GC_G25", exp: "23-Jan-25" },
    { inst: "Silver", sym: "SI_H25", exp: "20-Feb-25" },
  ],
  energies: [
    { inst: "Crude Oil", sym: "CL_G25", exp: "16-Jan-25" },
    { inst: "Natural Gas", sym: "NG_G25", exp: "24-Jan-25" },
  ],
  indices: [
    { inst: "YM (Dow Jones Mini)", sym: "YM_Z24", exp: "20-Mar-25" },
    { inst: "NQ (Nasdaq 100 Mini)", sym: "NQ_Z24", exp: "20-Mar-25" },
    { inst: "ES (S&P 500 Mini)", sym: "ES_Z24", exp: "20-Mar-25" },
  ],
};
