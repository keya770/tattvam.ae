import type { Metadata } from "next";
import { LINKS } from "@/lib/site";
import { NewsArt } from "@/components/art/scenes";
import { CtaBand, PageHero, StatStrip } from "@/components/blocks/sections";
import { Ticker } from "@/components/blocks/quotes";
import { NewsGrid, type NewsItem } from "@/components/blocks/widgets";
import { SectionHead } from "@/components/ui/basic";
import { Reveal } from "@/components/ui/motion";

export const metadata: Metadata = { title: "Market News & Insights", description: "Latest forex, commodities and macro headlines for active traders." };

// Sample headlines — wire `NewsGrid` to your RSS/news API for live data.
const NEWS: NewsItem[] = [
  { title: "Instant View: Bond markets take a drubbing again, 10-year Treasury yields highest since 2002", source: "Investing.com", cat: "Markets", ago: "22m ago", excerpt: "Global yields extend their climb as investors reassess the path of central bank policy." , img: "/img/news/n1.jpg" },
  { title: "European stocks slip to three-month lows as global yields surge", source: "Investing.com", cat: "Stocks", ago: "22m ago" , img: "/img/news/n2.jpg" },
  { title: "Retail investors are aggressively piling into this bold contrarian bet through one ETF", source: "MarketWatch", cat: "Stocks", ago: "18m ago" , img: "/img/news/n3.jpg" },
  { title: "Morgan Stanley initiates PulteGroup stock coverage with $128 target", source: "Investing.com", cat: "Stocks", ago: "18m ago" , img: "/img/news/n4.jpg" },
  { title: "US tells France and Germany to release diesel stocks or face US export ban, sources say", source: "Investing.com", cat: "Commodities", ago: "21m ago" , img: "/img/news/n5.jpg" },
  { title: "Gold holds near record as dollar softens ahead of payrolls data", source: "Market Desk", cat: "Commodities", ago: "34m ago" , img: "/img/news/n6.jpg" },
  { title: "EUR/USD steadies as traders weigh eurozone inflation flash estimate", source: "Market Desk", cat: "Forex", ago: "41m ago" , img: "/img/news/n7.jpg" },
  { title: "Yen firms after hawkish remarks from Bank of Japan officials", source: "Market Desk", cat: "Forex", ago: "52m ago" , img: "/img/news/n8.jpg" },
  { title: "Bitcoin consolidates as ETF flows turn mixed", source: "Market Desk", cat: "Crypto", ago: "1h ago" , img: "/img/news/n9.jpg" },
];

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Platforms" }, { label: "News & Insights" }]}
        eyebrow="Stay Informed"
        title="Market News"
        text="Stay updated with the latest market headlines, explore trading opportunities, and discover macro changes to stay ahead."
        primary={{ label: "Trade the News", href: LINKS.register }}
        secondary={{ label: "Economic Calendar", href: "/economic-calendar" }}
        art={<NewsArt />}
      />
      <Ticker />
      <section className="section-tight">
        <div className="container-x"><StatStrip items={[{ v: "Live", l: "Headlines" }, { v: "Forex", l: "Coverage" }, { v: "Macro", l: "Events" }, { v: "24/5", l: "Updates" }]} /></div>
      </section>
      <section className="section !pt-6">
        <div className="container-x">
          <SectionHead eyebrow="Market Desk" title="Latest Headlines" text="Forex, commodities, and macro headlines for active traders — updating through the session." />
          <Reveal><NewsGrid items={NEWS} /></Reveal>
          <p className="mt-6 text-[0.8rem] text-soft">Third-party headlines aggregated for traders. Full reports open on the original publisher.</p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
