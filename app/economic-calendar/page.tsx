import type { Metadata } from "next";
import { LINKS } from "@/lib/site";
import { AcuityArt, CalendarArt } from "@/components/art/scenes";
import { CtaBand, PageHero, Split } from "@/components/blocks/sections";
import { EconomicCalendar } from "@/components/blocks/widgets";
import { SectionHead } from "@/components/ui/basic";
import { Reveal } from "@/components/ui/motion";

export const metadata: Metadata = { title: "Economic Calendar", description: "Track high-impact macro events — CPI, NFP and central bank decisions." };

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Platforms" }, { label: "Economic Calendar" }]}
        eyebrow="Trading Tools"
        title="Economic Calendar"
        text="Track high-impact macro events — paired with Analysis IQ and strategy insights from the Tattvam trading tools suite."
        primary={{ label: "Trade Around Events", href: LINKS.register }}
        secondary={{ label: "Market News", href: "/news-insights" }}
        art={<CalendarArt />}
      />
      <section className="section">
        <div className="container-x">
          <Split eyebrow="Trading Tools" title="Trade the Event, Not the Noise" media={<AcuityArt />}>
            <p>Track high-impact macro releases — CPI, NFP, and central bank decisions — paired with Analysis IQ commentary on MetaTrader 5.</p>
            <p>Filter by impact level, note release times in GMT, and pair the calendar with live market news, Analysis IQ, and the weekly strategy newsletter.</p>
          </Split>
        </div>
      </section>
      <section className="section section-cyan">
        <div className="container-x">
          <SectionHead eyebrow="This week" title="Economic Calendar" />
          <Reveal><EconomicCalendar /></Reveal>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
