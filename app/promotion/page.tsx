import type { Metadata } from "next";
import { LINKS, SOCIALS } from "@/lib/site";
import { PromoArt } from "@/components/art/scenes";
import { CtaBand, PageHero, StatStrip } from "@/components/blocks/sections";
import { Btn, SectionHead } from "@/components/ui/basic";
import { Accordion } from "@/components/ui/interactive";
import { Icon } from "@/components/ui/Icon";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { PROMO_TERMS } from "@/lib/promo";

export const metadata: Metadata = { title: "Promotions — 100% First Deposit Bonus", description: "100% first deposit bonus up to $500 plus a 20% re-deposit bonus up to $2,000 on an eligible Gold account." };

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Trading" }, { label: "Promotions" }]}
        eyebrow="Deposit Bonus"
        title="Promotions"
        text="Get a 100% first deposit bonus up to $500, plus a 20% re-deposit bonus up to $2,000 on an eligible Gold trading account."
        primary={{ label: "Claim Bonus", href: LINKS.register }}
        secondary={{ label: "Bonus Terms", href: "#terms" }}
        art={<PromoArt />}
      />
      <section className="section-tight">
        <div className="container-x"><StatStrip items={[{ v: "100%", l: "First Deposit Bonus" }, { v: "$500", l: "Max First Bonus" }, { v: "20%", l: "Re-Deposit Bonus" }, { v: "$2,000", l: "Max Re-Deposit" }]} /></div>
      </section>

      <section className="section">
        <div className="container-x grid items-start gap-12 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="Deposit Bonus" title="100% First Deposit Bonus up to $500" text="Fund an eligible Gold trading account and receive a 100% bonus on your first qualifying deposit, up to $500. After a Stop Out, a 20% re-deposit bonus may be available up to $2,000." className="!mb-6" />
            <Stagger className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[["100%", "First deposit match"], ["$500", "Maximum first bonus"], ["20%", "Re-deposit bonus"], ["$2,000", "Maximum re-deposit"], ["1:2000", "Gold account leverage"], ["Swap-Free", "Subject to account terms"]].map(([a, b]) => (
                <StaggerItem key={b}>
                  <div className="rounded-2xl border border-line bg-white p-4 transition hover:-translate-y-1 hover:shadow-soft"><b className="block text-xl">{a}</b><small className="text-muted">{b}</small></div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <Reveal dir="right">
            <div className="rounded-[32px] border border-line bg-white p-7 shadow-lift sm:p-9">
              <h3 className="mb-5 !text-xl">How to claim your bonus</h3>
              <ol className="grid gap-4">
                {["Open an eligible Gold trading account.", "Make a qualifying first deposit.", "Receive a 100% bonus, credited up to $500.", "After a Stop Out, a 20% re-deposit bonus may be claimed up to $2,000."].map((s, i) => (
                  <li key={s} className="flex items-start gap-4">
                    <span className="grid size-9 flex-none place-items-center rounded-full bg-navy font-mono text-sm font-bold text-white">{String(i + 1).padStart(2, "0")}</span>
                    <span className="pt-1.5">{s}</span>
                  </li>
                ))}
              </ol>
              <Btn href={LINKS.register} arrow className="mt-7 w-full">Claim Bonus</Btn>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-tight section-cyan">
        <div className="container-x flex flex-wrap items-center justify-between gap-6">
          <Reveal><h3 className="!text-2xl">Follow us for more updates on upcoming promotions</h3></Reveal>
          <Reveal className="flex flex-wrap gap-2">
            {SOCIALS.filter((s) => s.name !== "YouTube").map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 font-semibold transition hover:-translate-y-1 hover:border-navy">
                <Icon name={s.icon} className="size-4" />{s.name}
              </a>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="terms" className="section scroll-mt-24">
        <div className="container-x max-w-4xl">
          <SectionHead eyebrow="Legal" title="Bonus Promotion – Terms and Conditions" />
          <Reveal>
            <Accordion items={PROMO_TERMS.map((t) => ({
              q: t.h,
              a: <>{t.body.map((b, j) => typeof b === "string" ? <p key={j}>{b}</p> : <ul key={j}>{b.map((x) => <li key={x}>{x}</li>)}</ul>)}</>,
            }))} />
          </Reveal>
        </div>
      </section>
      <CtaBand title="Claim your 100% first deposit bonus" text="Open an eligible Gold account and fund it to receive up to $500 in bonus credit." primary={{ label: "Claim Bonus", href: LINKS.register }} secondary={{ label: "Account Types", href: "/trading-account" }} />
    </>
  );
}
