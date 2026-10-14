import type { Metadata } from "next";
import { LINKS } from "@/lib/site";
import { AcuityArt, CalendarArt, NewsArt, SupportArt } from "@/components/art/scenes";
import { CtaBand, NumberCards, PageHero, Split } from "@/components/blocks/sections";
import { Btn, SectionHead } from "@/components/ui/basic";
import { Reveal } from "@/components/ui/motion";

export const metadata: Metadata = { title: "Acuity — AI Trading Intelligence", description: "Real-time insights, AI-powered signals and market sentiment analysis integrated with your Tattvam MT5 workflow." };

const LANGS = ["English", "Arabic", "Hindi", "Japanese", "Chinese", "Turkish", "Russian", "Portuguese", "French", "Spanish"];

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Platforms" }, { label: "Acuity" }]}
        eyebrow="Platforms"
        title="Maximize Your Trading Potential with Acuity"
        highlight="Acuity"
        text="An all-in-one trading intelligence platform for real-time insights, actionable signals, and market sentiment analysis — integrated with your Tattvam MetaTrader 5 workflow."
        primary={{ label: "Activate Acuity", href: LINKS.register }}
        secondary={{ label: "MetaTrader 5", href: "/meta-trader-5" }}
        art={<AcuityArt />}
      />
      <section className="section">
        <div className="container-x">
          <Split eyebrow="Analysis IQ" title="Your gateway to high-quality trade ideas and expert market analysis" media={<NewsArt />}>
            <p>The confidence bar allows you to filter trade ideas between 0%–100%, calculated using a proprietary formula. Metrics include trend, analyst performance, and sentiment analysis data.</p>
            <p>Every trade idea features precise target levels, confidence ratings, and ongoing updates — streamlining your ability to identify and time trades effectively.</p>
            <p>Combining seasoned technical analysts with advanced AI technology, we perform thorough market analysis to provide resilient risk/reward trade ideas for traders of all levels.</p>
          </Split>
        </div>
      </section>
      <section className="section section-cyan">
        <div className="container-x">
          <SectionHead center eyebrow="AI-Powered Trading Signals" title="See AI-powered signals for the 50 most traded assets" text="Access detailed, real-time market intelligence on the top 50 assets, including forex, indices, commodities, and more." />
          <NumberCards items={[
            { title: "High-confidence signals", text: "Find high-confidence signals that highlight the best trade opportunities in real time." },
            { title: "Clear strategies", text: "Get accompanying trading strategies verified by a team of expert analysts." },
            { title: "Actionable entry points", text: "Get actionable entry points and stop levels based on AI-powered analysis." },
          ]} />
          <Reveal className="mt-8 flex justify-center"><Btn href={LINKS.register} arrow>Get Acuity Signals</Btn></Reveal>
        </div>
      </section>
      <section className="section">
        <div className="container-x grid gap-20 lg:gap-28">
          <Split reverse eyebrow="Telegram" title="Stay ahead of the markets with our exclusive daily newsletter" media={<SupportArt />}
            cta={<><Btn href={LINKS.register} arrow>Unlock Acuity Alerts</Btn><Btn href={LINKS.login} variant="ghost">Client Portal Login</Btn></>}>
            <p>Delivering expert trading signals, in-depth market analysis, and key economic insights. Powered by Acuity&apos;s AI-driven technology and human expertise — premium signals are available via Telegram in:</p>
            <div className="flex flex-wrap gap-2">{LANGS.map((l) => <span key={l} className="rounded-full border border-line bg-white px-3.5 py-1.5 text-[0.85rem] font-semibold text-navy">{l}</span>)}</div>
          </Split>
          <Split eyebrow="Dynamic Emails" title="Real-time updates delivered to your inbox" media={<CalendarArt />}>
            <p>A revolutionary email solution that delivers instant updates, personalized recommendations, and real-time market insights irrespective of when the email is sent or opened.</p>
            <p>Delivering real-time data directly to traders&apos; inboxes ensures timely, relevant content precisely when they need it.</p>
          </Split>
        </div>
      </section>
      <section className="pb-6">
        <div className="container-x">
          <p className="rounded-2xl border border-line bg-white p-5 text-[0.8rem] leading-relaxed text-muted">
            <b className="text-navy">Disclaimer:</b> Acuity Trading offers market data, signals, and insights for informational purposes only and does not constitute financial or investment advice provided by Tattvam Markets. Investment Research &amp; Analysis is created by Acuity Research Limited, a company incorporated in England and Wales (Company No. 07428345) which is authorised and regulated by the Financial Conduct Authority (FRN 787261). Acuity products may be provided by Acuity Trading Limited (UK) / Acuity Trading SL (Spain), which is not authorised or regulated. This statement is provided for information only and should not be considered a financial promotion or investment advice.
          </p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
