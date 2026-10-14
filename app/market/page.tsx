import type { Metadata } from "next";
import { MarketsOverviewArt, UsSharesArt } from "@/components/art/market";
import { CtaBand, PageHero, Split } from "@/components/blocks/sections";
import { QuotesBoard, Ticker } from "@/components/blocks/quotes";
import { Btn, SectionHead } from "@/components/ui/basic";
import { Reveal } from "@/components/ui/motion";
import { MarketCards } from "@/components/blocks/MarketCards";
import { TextReveal } from "@/components/ui/scroll";

export const metadata: Metadata = {
  title: "Markets",
  description: "Explore forex, precious metals, commodities, indices and stocks available through Tattvam Capital Securities.",
};

export default function MarketPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Markets" }]}
        eyebrow="Products"
        title="Discover Opportunities Across Global Markets"
        highlight="Global Markets"
        text="Explore a range of financial instruments and follow the markets that matter to you. Only products approved for this entity are shown."
        primary={{ label: "Contact Our Team", href: "/contact-us" }}
        secondary={{ label: "Account Types", href: "/trading-account" }}
        art={<MarketsOverviewArt />}
      />
      <Ticker />
      <section className="section-tight">
        <div className="container-x">
          <TextReveal
            className="max-w-5xl text-[clamp(1.5rem,3.2vw,2.7rem)] font-extrabold leading-[1.2] tracking-tight text-navy"
            text="Forex, precious metals, commodities, indices and stocks — explore the factors that move each market and the risks that come with them."
          />
        </div>
      </section>
      <section className="section">
        <div className="container-x">
          <SectionHead eyebrow="Market prices" title="Instruments" text="Indicative prices where a feed is available, across forex, metals, commodities, indices and stocks." />
          <Reveal><QuotesBoard cats={["forex", "metals", "energy", "indices", "us"]} limit={10} /></Reveal>
        </div>
      </section>
      <section className="section section-cyan">
        <div className="container-x">
          <SectionHead center eyebrow="Product Markets" title="Explore our markets" text="Open a page for forex, precious metals, commodities, indices or stocks." />
          <MarketCards />
        </div>
      </section>
      <section className="section">
        <div className="container-x">
          <Split
            eyebrow="Multi-Asset Access"
            title="Follow the markets that matter to you"
            media={<UsSharesArt />}
            cta={<Btn href="/contact-us" arrow>Contact Our Team</Btn>}
          >
            <p>Explore currency pairs, precious metals, commodities, indices and selected company shares. The legal nature of each instrument, including whether it is a CFD or an underlying share, will be clearly identified.</p>
            <h3 className="!mb-2 mt-6 text-navy">Understand the product first</h3>
            <p>Prices can respond to economic data, interest rates, supply and demand, earnings and wider market sentiment. Review the applicable product terms before you decide.</p>
          </Split>
        </div>
      </section>
      <CtaBand title="Your Next Move Starts With Knowledge." text="Discover the markets. Understand the risks. Explore the tools available through Tattvam." primary={{ label: "Contact Our Team", href: "/contact-us" }} secondary={{ label: "Learning Centre", href: "/help-centre" }} />
    </>
  );
}
