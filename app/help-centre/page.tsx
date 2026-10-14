import type { Metadata } from "next";
import { HelpArt } from "@/components/art/scenes";
import { CtaBand, PageHero, Split } from "@/components/blocks/sections";
import { Btn, SectionHead } from "@/components/ui/basic";
import { ParallaxPhoto, PhotoBadge } from "@/components/ui/scroll";
import { Accordion } from "@/components/ui/interactive";
import { Reveal } from "@/components/ui/motion";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = { title: "Learning Centre", description: "Understand financial markets, leverage, analysis and risk management before you trade." };

const FAQ = [
  { q: "Trading for beginners", a: "Understand the basics of financial markets, trading instruments and how a trade works. Our learning centre explains these ideas in clear, accessible language." },
  { q: "Forex fundamentals", a: "Learn about currency pairs, pips, spreads, market sessions and exchange rates, and the factors that can move currencies." },
  { q: "Understanding leverage and margin", a: "Discover how leverage affects the exposure of a position and why it can magnify both profits and losses." },
  { q: "Technical analysis", a: "Explore charts, trends, support and resistance, and common technical indicators used to examine market behaviour." },
  { q: "Fundamental analysis", a: "Learn how economic announcements, central bank decisions and company news may influence markets." },
  { q: "Risk management", a: "Understand position sizing, stop-loss orders, margin requirements and the importance of managing potential losses." },
  { q: "Market updates", a: "Follow educational commentary on relevant market developments and scheduled economic events. This content is for general information. It is not a guarantee of results or a substitute for individual financial advice." },
];

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Company" }, { label: "Learning Centre" }]}
        eyebrow="Support"
        title="Understand the Markets. Build Your Knowledge."
        highlight="Your Knowledge."
        text="Financial markets have their own terminology, mechanisms and risks. Our learning centre explains these concepts in clear, accessible language."
        primary={{ label: "Learn Trading Basics", href: "#topics" }}
        secondary={{ label: "Contact Us", href: "/contact-us" }}
        art={<HelpArt />}
      />
      <section className="section">
        <div className="container-x">
          <Split bare eyebrow="01 · Learning Centre" title="Knowledge is part of the journey" media={<ParallaxPhoto src="/img/photos/support.jpg" alt="Tattvam client support specialist" badge={<PhotoBadge title="For information" value="Not advice" />} />} cta={<Btn href="/contact-us" variant="ghost">Contact Us</Btn>}>
            <p>Whether you are learning about currency pairs for the first time or following economic developments, these resources can help you build a stronger understanding of financial markets.</p>
            <p>Educational content is provided for general informational purposes. It is not a guarantee of results or a substitute for individual financial advice.</p>
          </Split>
        </div>
      </section>
      <section className="section section-cyan relative overflow-hidden">
        <div className="pointer-events-none absolute -left-40 top-20 size-[460px] animate-spin-slow rounded-full border-[56px] border-cyan/15 border-t-cyan/40" />
        <div className="container-x relative grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <SectionHead eyebrow="Topics" title="Explore the learning centre" text="Trading basics, forex, leverage, analysis, risk management and market updates." className="!mb-8" />
            <Reveal delay={0.1}>
              <div className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(150deg,#17344F,#0F263B)] p-7 text-white shadow-deep">
                <div className="pointer-events-none absolute -right-14 -top-14 size-44 animate-spin-slow rounded-full border-[18px] border-cyan/25 border-t-cyan" />
                <span className="mb-4 grid size-12 place-items-center rounded-2xl bg-cyan text-navy"><Icon name="chat" className="size-6" /></span>
                <h3 className="mb-2 !text-xl text-white">Keep learning</h3>
                <p className="mb-6 text-[0.95rem] text-white/70">Our goal is to help visitors understand financial markets and the risks associated with trading.</p>
                <div className="grid grid-cols-2 gap-3">
                  {[["24/5", "Support"], ["< 24h", "Email reply"]].map(([v, l]) => (
                    <div key={l} className="rounded-2xl border border-white/10 bg-white/5 p-3.5"><b className="block text-xl text-cyan">{v}</b><small className="text-white/60">{l}</small></div>
                  ))}
                </div>
                <div className="mt-6"><Btn href="/contact-us" variant="accent" arrow>Contact Us</Btn></div>
              </div>
            </Reveal>
          </div>
          <div id="topics" className="scroll-mt-28"><Accordion items={FAQ.map((f) => ({ q: f.q, a: <p>{f.a}</p> }))} /></div>
        </div>
      </section>
      <CtaBand title="Keep learning" text="Educational content is for general information. It is not a guarantee of results or individual financial advice." primary={{ label: "Explore Articles", href: "/news-insights" }} secondary={{ label: "Contact Our Team", href: "/contact-us" }} />
    </>
  );
}
