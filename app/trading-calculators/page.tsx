import type { Metadata } from "next";
import { LINKS } from "@/lib/site";
import { CalculatorArt } from "@/components/art/scenes";
import { CtaBand, PageHero } from "@/components/blocks/sections";
import { Calculators } from "@/components/blocks/widgets";
import { SectionHead } from "@/components/ui/basic";
import { Reveal } from "@/components/ui/motion";

export const metadata: Metadata = { title: "Trading Calculators", description: "Forex, margin and profit calculators — estimate required margin, pip value, swaps and hypothetical P/L." };

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Platforms" }, { label: "Trading Calculators" }]}
        eyebrow="Get Your Answers"
        title="Trading Calculators"
        text="Trading, Margin, and Profit calculators — estimate required margin, spreads, swaps, and hypothetical P/L before you trade."
        primary={{ label: "Open an Account", href: LINKS.register }}
        secondary={{ label: "View FAQs", href: "/help-centre" }}
        art={<CalculatorArt />}
      />
      <section className="section">
        <div className="container-x">
          <SectionHead eyebrow="Get Your Answers" title="Trading, Margin & Profit Calculators" text="Select your market, pick the instrument and direction, enter prices and contract size, then review value, commission, spread, leverage, margin, and overnight swaps in one view." />
          <Reveal><Calculators /></Reveal>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
