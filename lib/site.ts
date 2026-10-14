export const LINKS = {
  register: "https://client.tattvammarkets.com/register/",
  demo: "https://client.tattvammarkets.com/register/?demo=1",
  login: "https://client.tattvammarkets.com/login",
  regulator: "https://opr.fscmauritius.org",
  mt5Win: "https://download.mql5.com/cdn/web/metaquotes.software.corp/mt5/mt5setup.exe",
  mt5Mac: "https://download.mql5.com/cdn/web/metaquotes.software.corp/mt5/MetaTrader5.dmg",
  mt5Linux: "https://www.metatrader5.com/en/terminal/help/start_advanced/install_linux",
  mt5Ios: "https://download.mql5.com/cdn/mobile/mt5/ios",
  youtube: "https://www.youtube.com/@Tattvammarkets",
} as const;

export const SOCIALS = [
  { name: "Facebook", href: "https://www.facebook.com/TattvamMarkets/", icon: "facebook" },
  { name: "Instagram", href: "https://www.instagram.com/tattvammarkets/", icon: "instagram" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/tattvam-markets/", icon: "linkedin" },
  { name: "YouTube", href: "https://www.youtube.com/@Tattvammarkets", icon: "youtube" },
  { name: "Telegram", href: "https://t.me/TattvamMarkets", icon: "telegram" },
] as const;

export type NavItem = { label: string; href: string; desc?: string; icon?: string };
export type NavGroup = { label: string; href?: string; items?: NavItem[]; wide?: boolean };

export const NAV: NavGroup[] = [
  {
    label: "Trading",
    wide: true,
    items: [
      { label: "Account Types", href: "/trading-account", desc: "Standard, Advanced & professional", icon: "layers" },
      { label: "Trading Conditions", href: "/trading-conditions", desc: "Spreads, leverage & swaps", icon: "sliders" },
      { label: "Fast Execution", href: "/fast-execution", desc: "Low-latency order routing", icon: "bolt" },
      { label: "Fund Security", href: "/fund-security", desc: "Segregated client funds", icon: "shield" },
      { label: "Risk Management", href: "/risk-management", desc: "Margin, swaps & leverage", icon: "gauge" },
      { label: "Promotions", href: "/promotion", desc: "100% first deposit bonus", icon: "gift" },
    ],
  },
  {
    label: "Markets",
    wide: true,
    items: [
      { label: "All Instruments", href: "/market", desc: "Forex, metals, commodities, indices & stocks", icon: "grid" },
      { label: "Forex", href: "/market/forex-detail", desc: "Currency pairs and exchange rates", icon: "fx" },
      { label: "Precious Metals", href: "/market/uae-shares-detail", desc: "Gold, silver and other metals", icon: "gold" },
      { label: "Commodities", href: "/market/commodities-detail", desc: "Energy and other commodities", icon: "trend" },
      { label: "Indices", href: "/market/indices-detail", desc: "Major stock market indices", icon: "bars" },
      { label: "Stocks", href: "/market/us-shares-detail", desc: "Company shares and share-based instruments", icon: "building" },
    ],
  },
  {
    label: "Platforms",
    items: [
      { label: "Trading Platform", href: "/meta-trader-5", desc: "Charts, orders and account overview", icon: "monitor" },
      { label: "Acuity AI Tools", href: "/acuity", desc: "Signals & market intelligence", icon: "spark" },
      { label: "Trading Calculators", href: "/trading-calculators", desc: "Margin, pip & profit", icon: "calc" },
      { label: "Economic Calendar", href: "/economic-calendar", desc: "High-impact macro events", icon: "calendar" },
      { label: "Learning Centre", href: "/help-centre", desc: "Markets, leverage and risk", icon: "news" },
    ],
  },
  {
    label: "Partners",
    items: [
      { label: "Partnership", href: "/partnership", desc: "IB, Affiliate & Refer a Friend", icon: "handshake" },
      { label: "Institutional Solutions", href: "/institutional-solutions", desc: "Prime liquidity & models", icon: "network" },
    ],
  },
  {
    label: "Company",
    items: [
      { label: "About Us", href: "/about-us", desc: "Who we are", icon: "flag" },
      { label: "Learning Centre", href: "/help-centre", desc: "Markets, leverage and risk", icon: "help" },
      { label: "Contact Us", href: "/contact-us", desc: "Reach our client desk", icon: "chat" },
    ],
  },
];

export const LEGAL_LINKS: NavItem[] = [
  { label: "Client Agreement", href: "/client-agreement" },
  { label: "Client Onboarding Process", href: "/client-onboarding-process" },
  { label: "Complaint Handling Policy", href: "/complaint-handling-policy" },
  { label: "Privacy Policy", href: "/privacy-policy-internal-privacy-controls" },
  { label: "Risk Disclosure Policy", href: "/risk-disclosure-policy" },
];

export const ACCOUNTS = [
  {
    id: "bronze", name: "Standard", tag: "Standard", deposit: 0, priceLabel: "See terms",
    spread: "Published", commission: "In terms", swap: "In terms", leverage: "See terms",
    blurb: "Explore our standard trading conditions and the platform features available to eligible clients.",
  },
  {
    id: "silver", name: "Advanced", tag: "Advanced", deposit: 0, priceLabel: "See terms",
    spread: "Published", commission: "In terms", swap: "In terms", leverage: "See terms", popular: true,
    blurb: "For clients seeking to explore alternative trading conditions, subject to eligibility and the published account terms.",
  },
  {
    id: "gold", name: "Professional", tag: "Enquiries", deposit: 0, priceLabel: "Contact us",
    spread: "On request", commission: "On request", swap: "On request", leverage: "See terms",
    blurb: "Contact our team to discuss your requirements and the services that may be available for professional or institutional business.",
  },
] as const;

export const ACCOUNT_COMMON = [
  "Review applicable spreads and commissions",
  "Review financing charges",
  "Review margin requirements",
  "Review the execution policy",
  "Review product risk disclosures",
  "Subject to eligibility and account terms",
];

export const START_STEPS = [
  { title: "Discover", text: "Explore available markets, trading instruments and platform features." },
  { title: "Register", text: "Submit your application and the information required for verification." },
  { title: "Get started", text: "Review product terms, costs and risk disclosures. Once approved, follow the applicable funding and platform instructions." },
];

export const AWARDS = [
  { year: "2024", title: "Best Online Broker (MENA)", where: "BrokersView Expo · Abu Dhabi" },
  { year: "2024", title: "Best Liquidity Provider", where: "BrokersView Expo · Dubai" },
];
