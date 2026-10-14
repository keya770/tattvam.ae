import Image from "next/image";
import Link from "next/link";
import { LINKS } from "@/lib/site";
import { Awards, CtaBand, Plans } from "@/components/blocks/sections";
import { HomeHero } from "@/components/blocks/HomeHero";
import { QuotesBoard, Ticker } from "@/components/blocks/quotes";
import { Btn } from "@/components/ui/basic";
import { Icon } from "@/components/ui/Icon";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";

const WHY = [
  { title: "Clear", text: "Trading information is presented so eligible clients can review conditions before they decide." },
  { title: "Tools", text: "Monitor prices, charts and orders from desktop, browser or mobile where the platform is supported." },
  { title: "Support", text: "A client desk in Dubai is available when you need help understanding the next step." },
  { title: "Learn", text: "Review markets, leverage, margin and risk before you open or fund an account." },
];

const MARKETS = [
  { title: "Forex", tag: "Currencies", text: "Explore currency pairs and follow the factors influencing exchange rates across global economies.", href: "/market/forex-detail", img: "/img/ae/forex.jpeg", cta: "Explore Forex" },
  { title: "Precious Metals", tag: "Gold & silver", text: "Follow gold, silver and other available metals as economic conditions and market sentiment evolve.", href: "/market/uae-shares-detail", img: "/img/ae/metals.jpeg", cta: "Explore Metals" },
  { title: "Commodities", tag: "Supply & demand", text: "Understand the markets influenced by global supply, demand and economic developments.", href: "/market/commodities-detail", img: "/img/ae/commodities.jpeg", cta: "Explore Commodities" },
  { title: "Indices", tag: "Benchmarks", text: "Track the performance of selected markets through major stock market indices.", href: "/market/indices-detail", img: "/img/ae/indices.jpeg", cta: "Explore Indices" },
  { title: "Stocks", tag: "Companies", text: "Discover selected company shares and, where offered, stock-based trading instruments.", href: "/market/us-shares-detail", img: "/img/ae/stocks.jpeg", cta: "Explore Stocks" },
];

const STEPS = [
  { n: "01", title: "Discover", text: "Explore available markets, trading instruments and platform features." },
  { n: "02", title: "Register", text: "Submit your application and the information required for verification." },
  { n: "03", title: "Get started", text: "Review product terms, costs and risk disclosures, then follow the funding and platform instructions once your account is approved." },
];

const HEADLINES = [
  { t: "Instant View: Bond markets take a drubbing again, 10-year Treasury yields highest since 2002", img: "/img/news/n1.jpg", m: "12m ago" },
  { t: "European stocks slip to three-month lows as global yields surge", img: "/img/news/n2.jpg", m: "16m ago" },
  { t: "Morgan Stanley initiates PulteGroup stock coverage with $128 target", img: "/img/news/n3.jpg", m: "20m ago" },
  { t: "US tells France and Germany to release diesel stocks or face US export ban, sources say", img: "/img/news/n4.jpg", m: "24m ago" },
  { t: "Retail investors are aggressively piling into this bold contrarian bet through one ETF", img: "/img/news/n5.jpg", m: "28m ago" },
];

const PLATFORMS = [
  ["windows", "Windows", LINKS.mt5Win],
  ["apple", "macOS", LINKS.mt5Mac],
  ["linux", "Linux", LINKS.mt5Linux],
] as const;

export default function Home() {
  return (
    <>
      <HomeHero />

      <div className="bg-navy text-white">
        <div className="container-x flex flex-wrap items-center justify-center gap-x-8 gap-y-2 py-4 text-[0.95rem]">
          <span className="font-semibold text-white/80">Tattvam Capital Securities</span>
          <span className="hidden h-4 w-px bg-white/25 sm:block" />
          <span className="inline-flex items-center gap-2"><span className="size-2 rounded-full bg-cyan" /> Dubai, United Arab Emirates</span>
        </div>
      </div>
      <Ticker />

      <section className="section bg-[linear-gradient(180deg,#f3fafc_0%,#e7f4f8_100%)]">
        <div className="container-x">
          <Reveal className="mb-10 max-w-2xl">
            <p className="mb-3 text-[0.78rem] font-extrabold uppercase tracking-[0.16em] text-cyan-d">Why Tattvam</p>
            <h2>Built around what matters to traders</h2>
          </Reveal>
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((item) => (
              <StaggerItem key={item.title} className="h-full">
                <article className="h-full rounded-[24px] bg-white p-6 shadow-[0_16px_40px_-28px_rgba(23,52,79,0.45)]">
                  <h3 className="mb-2 !text-[1.35rem]">{item.title}</h3>
                  <p className="text-[0.95rem] leading-relaxed text-muted">{item.text}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-3 text-[0.78rem] font-extrabold uppercase tracking-[0.16em] text-cyan-d">Trading Accounts</p>
            <h2 className="mb-3">Find the Account That Fits Your Needs</h2>
            <p className="text-[1.05rem] text-muted">Account options are designed to present trading conditions clearly, so eligible clients can understand the available features and select an account appropriate to their needs.</p>
          </Reveal>
          <Plans />
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink text-white">
        <div className="container-x grid items-end gap-10 py-20 lg:grid-cols-[1.05fr_.95fr] lg:py-28">
          <Reveal>
            <p className="mb-4 text-[0.78rem] font-extrabold uppercase tracking-[0.16em] text-cyan">Trading platform</p>
            <h2 className="max-w-xl text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.98] text-white">The tools to navigate the markets.</h2>
            <p className="mt-5 max-w-lg text-[1.05rem] text-white/70">Monitor prices, use charts and indicators, manage orders and review your account from desktop, browser or mobile where supported.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-[28px] bg-white text-navy shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)]">
              <div className="relative h-44 sm:h-52">
                <Image src="/img/photos/mt5-desk.jpg" alt="Trading desk with multiple market screens" fill sizes="(max-width: 1024px) 100vw, 46vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
              </div>
              <div className="-mt-8 divide-y divide-line px-3 pb-3 sm:px-4">
                {PLATFORMS.map(([ic, label, href]) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-2xl px-3 py-4 transition hover:bg-cyan-50">
                    <span className="grid size-12 place-items-center rounded-2xl bg-navy text-white"><Icon name={ic} className="size-6" /></span>
                    <span className="min-w-0 flex-1">
                      <b className="block text-[1.05rem]">MetaTrader 5 · {label}</b>
                      <span className="text-[0.88rem] text-muted">Charts, orders and account tools</span>
                    </span>
                    <Icon name="arrow" className="size-5 text-soft transition group-hover:translate-x-1 group-hover:text-navy" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0c1c2c] py-20 text-white sm:py-24">
        <p aria-hidden className="pointer-events-none absolute left-1/2 top-10 w-[140%] -translate-x-1/2 text-center text-[clamp(3.2rem,9vw,8rem)] font-extrabold leading-none tracking-tight text-white/[0.06]">
          Explore global markets
        </p>
        <div className="container-x relative pt-16 sm:pt-24">
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] lg:grid lg:grid-cols-6 lg:overflow-visible">
            {MARKETS.map((m, i) => (
              <Link
                key={m.title}
                href={m.href}
                className={`group relative min-h-[300px] w-[78vw] max-w-[420px] flex-none snap-center overflow-hidden rounded-[28px] sm:w-[46vw] lg:w-auto lg:max-w-none lg:col-span-3 ${i === 0 ? "lg:row-span-2 lg:min-h-[520px]" : "lg:min-h-[248px]"}`}
              >
                <Image src={m.img} alt="" fill sizes="(max-width: 1024px) 80vw, 40vw" className="object-cover transition duration-700 [transition-timing-function:cubic-bezier(.22,1,.36,1)] group-hover:scale-105" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,28,44,0.15)_0%,rgba(12,28,44,0.88)_100%)] transition duration-500 group-hover:bg-[linear-gradient(180deg,rgba(12,28,44,0.05)_0%,rgba(12,28,44,0.92)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                  <span className="mb-2 block text-[0.75rem] font-bold uppercase tracking-[0.14em] text-cyan">{m.tag}</span>
                  <h3 className={`text-white ${i === 0 ? "!text-[2rem] sm:!text-[2.4rem]" : "!text-[1.45rem]"}`}>{m.title}</h3>
                  <p className={`mt-2 text-white/75 ${i === 0 ? "max-w-md text-[1rem]" : "line-clamp-2 text-[0.9rem]"}`}>{m.text}</p>
                  <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[0.88rem] font-bold text-navy transition duration-300 group-hover:bg-cyan">
                    {m.cta} <Icon name="arrow" className="size-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/market" className="inline-flex items-center gap-1.5 font-bold text-white">
              View all instruments <Icon name="arrow" className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <p className="mb-3 text-[0.78rem] font-extrabold uppercase tracking-[0.16em] text-cyan-d">Markets & Instruments</p>
              <h2 className="max-w-xl">Discover Opportunities Across Global Markets</h2>
            </Reveal>
          </div>
          <QuotesBoard cats={["forex", "metals", "energy", "indices", "us"]} limit={7} />
        </div>
      </section>

      <section className="section bg-bg-2">
        <div className="container-x">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <Reveal>
              <p className="mb-3 text-[0.78rem] font-extrabold uppercase tracking-[0.16em] text-cyan-d">How to Start</p>
              <h2 className="max-w-xl">Your Trading Journey Starts Here</h2>
              <p className="mt-3 max-w-xl text-[1.05rem] text-muted">Discover the markets, complete your application, and review the terms before you begin.</p>
            </Reveal>
            <Reveal className="flex flex-wrap gap-3">
              <Btn href="/trading-account" arrow>Learn How to Get Started</Btn>
              <Btn href="/contact-us" variant="ghost">Contact Our Team</Btn>
            </Reveal>
          </div>
          <Stagger className="mt-10 grid gap-4 md:grid-cols-3">
            {STEPS.map((s) => (
              <StaggerItem key={s.n} className="h-full">
                <article className="h-full rounded-[24px] bg-white p-7 shadow-soft">
                  <span className="font-mono text-[0.8rem] font-bold tracking-[0.14em] text-cyan-d">{s.n}</span>
                  <h3 className="mb-2 mt-3 !text-[1.45rem]">{s.title}</h3>
                  <p className="text-[0.98rem] leading-relaxed text-muted">{s.text}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[420px]">
            <Image src="/img/photos/team.jpg" alt="Tattvam team in the Dubai office" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            <div className="absolute inset-0 bg-navy/25" />
          </div>
          <div className="flex items-center bg-white px-6 py-16 sm:px-12 lg:px-16">
            <Reveal>
              <p className="mb-3 text-[0.78rem] font-extrabold uppercase tracking-[0.16em] text-cyan-d">Who We Are</p>
              <h2 className="mb-4 max-w-lg">A clearer perspective on financial markets</h2>
              <p className="mb-7 max-w-lg text-[1.05rem] text-muted">At Tattvam Capital Securities, confidence in financial markets begins with knowledge, transparency and a commitment to responsible business practices.</p>
              <div className="flex flex-wrap gap-3">
                <Btn href="/about-us" arrow>About Tattvam</Btn>
                <Btn href="/fund-security" variant="ghost">Fund Security</Btn>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="mb-3 text-[0.78rem] font-extrabold uppercase tracking-[0.16em] text-cyan-d">Market Wire</p>
            <h2 className="mb-3">Latest Headlines</h2>
            <p className="mb-6 text-[1.05rem] text-muted">Forex, commodities, and macro headlines for active traders — updating through the session.</p>
            <Btn href="/news-insights" variant="ghost" arrow>View all news</Btn>
          </Reveal>
          <div className="divide-y divide-line">
            {HEADLINES.map((h) => (
              <Link key={h.t} href="/news-insights" className="group flex items-center gap-4 py-4">
                <span className="relative size-16 flex-none overflow-hidden rounded-2xl sm:size-[72px]">
                  <Image src={h.img} alt="" fill sizes="72px" className="object-cover transition duration-500 group-hover:scale-105" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="mb-1 flex gap-2 text-[0.75rem] font-semibold text-soft"><span className="text-cyan-d">Markets</span><span>· {h.m}</span></span>
                  <b className="line-clamp-2 leading-snug transition-colors group-hover:text-cyan-d">{h.t}</b>
                </span>
                <Icon name="arrow" className="size-5 flex-none text-soft transition group-hover:translate-x-1 group-hover:text-cyan-d" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-bg-2">
        <div className="container-x">
          <Reveal className="mb-10 max-w-2xl">
            <p className="mb-3 text-[0.78rem] font-extrabold uppercase tracking-[0.16em] text-cyan-d">Recognition</p>
            <h2>Award-winning broker in the MENA region</h2>
          </Reveal>
          <Awards />
        </div>
      </section>

      <section className="section bg-[linear-gradient(180deg,#eaf8fb,#f7fbfc)]">
        <div className="container-x grid items-center gap-8 lg:grid-cols-[1.1fr_.9fr]">
          <Reveal>
            <p className="mb-3 text-[0.78rem] font-extrabold uppercase tracking-[0.16em] text-cyan-d">Learning</p>
            <h2 className="mb-3">Knowledge is part of the journey</h2>
            <p className="mb-6 max-w-xl text-[1.05rem] text-muted">Learn trading basics, leverage and margin, analysis and risk management before you make a decision.</p>
            <Btn href="/help-centre" arrow>Explore Our Learning Centre</Btn>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="relative aspect-[16/11] overflow-hidden rounded-[28px]">
              <Image src="/img/photos/support.jpg" alt="Client support conversation at a desk" fill sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand title="Your Next Move Starts With Knowledge." text="Discover the markets. Understand the risks. Explore the tools available through Tattvam." primary={{ label: "Contact Our Team", href: "/contact-us" }} secondary={{ label: "Explore Partnerships", href: "/partnership" }} />
    </>
  );
}
