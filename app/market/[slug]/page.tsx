import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { FUTURES, HOURS, INSTRUMENTS, type Category } from "@/lib/markets";
import { CommoditiesArt, ForexArt, IndicesArt, UaeSharesArt, UsSharesArt } from "@/components/art/market";
import { AcuityArt, ExecutionArt, Mt5Art, RiskArt, CalendarArt } from "@/components/art/scenes";
import { CtaBand, FeatureGrid, PageHero, Split, StatStrip } from "@/components/blocks/sections";
import { HoursTable, LiveChart, QuotesBoard, Ticker } from "@/components/blocks/quotes";
import { MarketCards } from "@/components/blocks/MarketCards";
import { Btn, SectionHead } from "@/components/ui/basic";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { BigMarquee, ParallaxPhoto, PhotoBadge } from "@/components/ui/scroll";

type Detail = {
  name: string; title: string; highlight: string; text: string; cta: string;
  secondary: { label: string; href: string };
  art: ReactNode; cats: Category[]; stats: { v: string; l: string }[];
  liveTitle: string;
  s1: { eyebrow: string; title: string; text: string; art: ReactNode };
  s2: { eyebrow: string; title: string; text: string; art: ReactNode; photo?: string };
  photo: { src: string; alt: string; badge: [string, string] };
  points: string[];
  features: { icon: string; title: string; text: string }[];
  hours?: (keyof typeof HOURS)[];
  futures?: (keyof typeof FUTURES)[];
};

const DETAILS: Record<string, Detail> = {
  "forex-detail": {
    photo: { src: "/img/ae/forex-page.jpeg", alt: "EUR-GBP and USD-JPY prices on a forex chart", badge: ["Forex", "Currency pairs"] },
    name: "Forex",
    title: "Explore the Forex Market",
    highlight: "Forex",
    text: "Forex is the global marketplace where currencies are exchanged. Currency prices are influenced by economic data, interest rates, central bank decisions and geopolitical developments.",
    cta: "Explore Forex",
    secondary: { label: "Account Types", href: "/trading-account" },
    art: <ForexArt />,
    cats: ["forex"],
    stats: [{ v: "Pairs", l: "Selected currencies" }, { v: "Data", l: "Economic releases" }, { v: "Rates", l: "Central banks" }, { v: "Risk", l: "As well as opportunity" }],
    liveTitle: "Forex — Market prices",
    s1: { eyebrow: "Currency Markets", title: "Discover the factors that move currencies", text: "Explore selected currency pairs and learn how exchange-rate movements can create trading opportunities as well as risks.", art: <Mt5Art /> },
    s2: { eyebrow: "How forex works", title: "Understand the market before you trade", text: "Interest rates, economic data, central bank decisions and geopolitical developments can all influence currency prices.", art: <ExecutionArt /> },
    points: ["Selected currency pairs", "Economic data and interest rates", "Central bank decisions", "Opportunities and risks"],
    features: [
      { icon: "fx", title: "Currency pairs", text: "Follow exchange rates across global economies." },
      { icon: "calendar", title: "Economic data", text: "See how releases can influence currency prices." },
      { icon: "gauge", title: "Interest rates", text: "Central bank decisions are a core part of the forex story." },
      { icon: "shield", title: "Risk as well as opportunity", text: "Exchange-rate movements can create both. Understand them before you decide." },
    ],
    hours: ["forex"],
  },
  "commodities-detail": {
    photo: { src: "/img/ae/commodities-page.jpeg", alt: "Commodity market chart beside energy and agriculture imagery", badge: ["Commodities", "Supply & demand"] },
    name: "Commodities",
    title: "Understand Commodity Markets",
    highlight: "Commodity",
    text: "Commodity markets are influenced by global production, consumption, weather, supply chains and geopolitical developments.",
    cta: "Explore Commodities",
    secondary: { label: "Forex", href: "/market/forex-detail" },
    art: <CommoditiesArt />,
    cats: ["energy"],
    stats: [{ v: "Energy", l: "Where offered" }, { v: "Supply", l: "Production" }, { v: "Demand", l: "Consumption" }, { v: "Events", l: "Weather & geopolitics" }],
    liveTitle: "Commodities — Market prices",
    s1: { eyebrow: "Commodity Markets", title: "Explore available commodity instruments", text: "Explore information about available energy and other commodity instruments, including the factors that can affect their prices.", art: <RiskArt /> },
    s2: { eyebrow: "What moves prices", title: "Production, consumption and supply chains", text: "Weather, supply chains and geopolitical developments can change how commodity markets behave. Learn the factors before you trade.", art: <CalendarArt /> },
    points: ["Energy and other commodities", "Global production and consumption", "Weather and supply chains", "Geopolitical developments"],
    features: [
      { icon: "trend", title: "Energy markets", text: "Follow instruments influenced by global supply and demand." },
      { icon: "calendar", title: "Weather and seasons", text: "Production and consumption can shift with the calendar." },
      { icon: "gauge", title: "Supply chains", text: "Disruptions can change prices across commodity markets." },
      { icon: "shield", title: "Know the product terms", text: "Available instruments are shown subject to the applicable product terms." },
    ],
    hours: ["energy"],
    futures: ["metals", "energies"],
  },
  "indices-detail": {
    photo: { src: "/img/ae/indices-page.jpeg", alt: "City skyline representing global stock market indices", badge: ["Indices", "Market benchmarks"] },
    name: "Indices",
    title: "Follow Global Market Indices",
    highlight: "Indices",
    text: "Stock market indices track the performance of selected groups of securities and provide a view of activity across markets or sectors.",
    cta: "Explore Indices",
    secondary: { label: "Commodities", href: "/market/commodities-detail" },
    art: <IndicesArt />,
    cats: ["indices"],
    stats: [{ v: "Markets", l: "Selected groups" }, { v: "Sectors", l: "A wider view" }, { v: "Events", l: "What can move them" }, { v: "Learn", l: "Before you trade" }],
    liveTitle: "Indices — Market prices",
    s1: { eyebrow: "Market Indices", title: "Learn how indices work", text: "Learn which economic events may influence indices and what you should understand before trading index-based products.", art: <Mt5Art /> },
    s2: { eyebrow: "Before you trade", title: "A view across markets or sectors", text: "Indices summarise the performance of selected securities. Understand the product before you decide whether it fits your objectives.", art: <CalendarArt /> },
    points: ["Selected groups of securities", "Markets and sectors", "Economic events that may influence prices", "Understand the product first"],
    features: [
      { icon: "bars", title: "Market benchmarks", text: "Indices track how a selected group of securities is performing." },
      { icon: "trend", title: "A wider view", text: "Use them to follow activity across a market or sector." },
      { icon: "calendar", title: "Economic events", text: "Learn which announcements may influence index prices." },
      { icon: "shield", title: "Index-based products", text: "Review what you should understand before trading them." },
    ],
    hours: ["indices"],
    futures: ["indices"],
  },
  "us-shares-detail": {
    photo: { src: "/img/ae/stocks-page.jpeg", alt: "Stock exchange hall with market price boards", badge: ["Stocks", "Company shares"] },
    name: "Stocks",
    title: "Explore Stock Markets",
    highlight: "Stock",
    text: "Company share prices can be affected by earnings, business performance, sector developments and wider economic conditions.",
    cta: "Explore Stocks",
    secondary: { label: "Indices", href: "/market/indices-detail" },
    art: <UsSharesArt />,
    cats: ["us"],
    stats: [{ v: "Shares", l: "Selected companies" }, { v: "Earnings", l: "Business results" }, { v: "Sectors", l: "Industry news" }, { v: "Clear", l: "Instrument type" }],
    liveTitle: "Stocks — Market prices",
    s1: { eyebrow: "Stock Markets", title: "Companies and share-based instruments", text: "Learn about the companies and share-based instruments available through our offering. The legal nature of each instrument, including whether it is a CFD or an underlying share, will be clearly identified.", art: <Mt5Art /> },
    s2: { eyebrow: "What can move a share", title: "Earnings, performance and the wider economy", text: "Company share prices can respond to earnings, business performance, sector developments and wider economic conditions.", art: <AcuityArt /> },
    points: ["Selected company shares", "Share-based instruments where offered", "Earnings and business performance", "CFD or share, clearly identified"],
    features: [
      { icon: "building", title: "Company shares", text: "Follow selected companies and the news that can move them." },
      { icon: "trend", title: "Business performance", text: "Earnings and sector developments can change a share price." },
      { icon: "doc", title: "Clearly identified", text: "Each instrument states whether it is a CFD or an underlying share." },
      { icon: "shield", title: "Where offered", text: "Only instruments in the approved offering are presented." },
    ],
  },
  "uae-shares-detail": {
    photo: { src: "/img/ae/metals-page.jpeg", alt: "Gold and silver bars with coins in front of a price chart", badge: ["Metals", "Gold & silver"] },
    name: "Precious Metals",
    title: "Discover Precious Metals Markets",
    highlight: "Metals",
    text: "Gold and silver are closely followed by traders around the world. Their prices can respond to interest rates, currency movements, inflation expectations, industrial demand and changes in market sentiment.",
    cta: "Explore Metals",
    secondary: { label: "Commodities", href: "/market/commodities-detail" },
    art: <UaeSharesArt />,
    cats: ["metals"],
    stats: [{ v: "Gold", l: "Closely followed" }, { v: "Silver", l: "Industrial demand" }, { v: "Rates", l: "And currencies" }, { v: "Terms", l: "Apply to each product" }],
    liveTitle: "Precious Metals — Market prices",
    s1: { eyebrow: "Precious Metals", title: "Learn about gold, silver and other metals", text: "Learn about precious metals and explore the trading instruments available through Tattvam, subject to the applicable product terms.", art: <Mt5Art /> },
    s2: { eyebrow: "What can move metals", title: "Rates, currencies and market sentiment", text: "Prices can respond to interest rates, currency movements, inflation expectations, industrial demand and changes in market sentiment.", art: <RiskArt /> },
    points: ["Gold and silver", "Interest rates and currencies", "Inflation expectations", "Subject to product terms"],
    features: [
      { icon: "gold", title: "Gold and silver", text: "Two of the metals traders follow most closely around the world." },
      { icon: "gauge", title: "Interest rates", text: "Rate expectations can change how metals are priced." },
      { icon: "fx", title: "Currency movements", text: "Metals often respond when major currencies move." },
      { icon: "shield", title: "Product terms apply", text: "Instruments are available subject to the applicable product terms." },
    ],
  },
};

export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(DETAILS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = DETAILS[slug];
  return d ? { title: d.title, description: d.text } : {};
}

export default async function MarketDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = DETAILS[slug];
  if (!d) notFound();
  const syms = INSTRUMENTS.filter((i) => d.cats.includes(i.cat)).map((i) => i.sym);

  return (
    <>
      <PageHero
        crumbs={[{ label: "Markets", href: "/market" }, { label: d.name }]}
        eyebrow="Products"
        title={d.title}
        highlight={d.highlight}
        text={d.text}
        primary={{ label: d.cta, href: "/contact-us" }}
        secondary={d.secondary}
        art={d.art}
      />
      <Ticker syms={syms.length > 4 ? syms : [...syms, ...INSTRUMENTS.filter((i) => i.cat === "forex").map((i) => i.sym)]} />

      <section className="section-tight">
        <div className="container-x"><StatStrip items={d.stats} /></div>
      </section>

      {/* Live chart + highlights */}
      <section className="section !pt-6">
        <div className="container-x grid items-center gap-10 lg:grid-cols-[1.25fr_1fr]">
          <Reveal dir="left"><LiveChart cats={d.cats} /></Reveal>
          <div>
            <SectionHead eyebrow="Learn the market" title={`What to know about ${d.name}`} text="Follow the factors that can move prices, and review the product terms before you decide." className="!mb-6" />
            <Stagger className="grid gap-3">
              {d.points.map((p, i) => (
                <StaggerItem key={p}>
                  <div className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-4 transition hover:border-cyan-2 hover:shadow-soft">
                    <span className="grid size-10 flex-none place-items-center rounded-xl bg-cyan-50 font-mono text-sm font-extrabold text-cyan-d transition group-hover:bg-navy group-hover:text-white">{String(i + 1).padStart(2, "0")}</span>
                    <b>{p}</b>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal className="mt-7"><Btn href="/contact-us" arrow>{d.cta}</Btn></Reveal>
          </div>
        </div>
      </section>

      <section className="section section-cyan">
        <div className="container-x">
          <SectionHead eyebrow="Market prices" title={d.liveTitle} text="Indicative prices where a feed is available. Displayed instruments should match the products approved for this entity." />
          <Reveal><QuotesBoard cats={d.cats} showTabs={d.cats.length > 1} limit={12} title={d.liveTitle} /></Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-20 lg:gap-28">
          <Split bare eyebrow={d.s1.eyebrow} title={d.s1.title} media={<ParallaxPhoto src={d.photo.src} alt={d.photo.alt} badge={<PhotoBadge title={d.photo.badge[0]} value={d.photo.badge[1]} />} />} cta={<Btn href="/contact-us" arrow>{d.cta}</Btn>}>
            <p>{d.s1.text}</p>
          </Split>
          <Split reverse bare={!!d.s2.photo} eyebrow={d.s2.eyebrow} title={d.s2.title} media={d.s2.photo ? <ParallaxPhoto src={d.s2.photo} alt={d.s2.title} badge={<PhotoBadge title="Energy CFDs" value="WTI · Brent · Gas" tone="navy" />} /> : d.s2.art} cta={<Btn href="/trading-conditions" variant="ghost">Trading Conditions</Btn>}>
            <p>{d.s2.text}</p>
          </Split>
        </div>
      </section>

      <BigMarquee words={syms.slice(0, 6)} />

      <section className="section section-cyan">
        <div className="container-x">
          <SectionHead center eyebrow="Key Advantages" title="What sets us apart" />
          <FeatureGrid items={d.features} numbered />
        </div>
      </section>

      {(d.hours || d.futures) && (
        <section className="section">
          <div className="container-x">
            {d.hours && (
              <>
                <SectionHead eyebrow="Sessions" title="Live Trading Hours" text="Session status updates automatically against server time." />
                <Reveal><HoursTable groups={d.hours} /></Reveal>
              </>
            )}
            {d.futures && (
              <div className={d.hours ? "mt-16" : ""}>
                <SectionHead eyebrow="Schedule" title="Contract Expiry" text="Current futures contracts and their expiry dates." />
                <Stagger className={`grid gap-5 ${d.futures.length > 1 ? "md:grid-cols-2" : ""}`}>
                  {d.futures.map((k) => (
                    <StaggerItem key={k} className="min-w-0">
                      <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-soft">
                        <div className="border-b border-line px-5 py-4 font-extrabold">Future {k[0].toUpperCase() + k.slice(1)}</div>
                        <div className="overflow-x-auto">
                          <table className="w-full min-w-[420px]">
                            <thead className="bg-bg"><tr>{["Instrument", "Symbol", "Expiry"].map((h) => <th key={h} className="px-5 py-3 text-left text-[0.72rem] font-bold uppercase tracking-[0.08em] text-soft">{h}</th>)}</tr></thead>
                            <tbody>
                              {FUTURES[k].map((f) => (
                                <tr key={f.sym} className="border-t border-line">
                                  <td className="px-5 py-3.5 font-semibold">{f.inst}</td>
                                  <td className="px-5 py-3.5"><code className="rounded-md bg-cyan-50 px-2 py-0.5 font-mono text-[0.85rem] text-cyan-d">{f.sym}</code> <span className="chip ml-1 !bg-up-50 !text-up">Current</span></td>
                                  <td className="px-5 py-3.5 font-mono text-[0.9rem]">{f.exp}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            )}
          </div>
        </section>
      )}

      <section className={`section ${d.hours || d.futures ? "section-cyan" : ""}`}>
        <div className="container-x">
          <SectionHead eyebrow="Product Markets" title="Explore other markets" />
          <MarketCards exclude={`/market/${slug}`} />
        </div>
      </section>

      <CtaBand title={`Learn more about ${d.name}`} text="Review the product terms, costs and risk disclosures, or speak with our team." primary={{ label: d.cta, href: "/contact-us" }} secondary={{ label: "Learning Centre", href: "/help-centre" }} />
    </>
  );
}
