import type { Metadata } from "next";
import Link from "next/link";
import { InstitutionalArt, PartnershipArt, SupportArt } from "@/components/art/scenes";
import { NumberCards, PageHero, Split, StatStrip } from "@/components/blocks/sections";
import { EnquiryForm } from "@/components/blocks/forms";
import { Btn, SectionHead } from "@/components/ui/basic";
import { Icon } from "@/components/ui/Icon";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { ParallaxPhoto, PhotoBadge } from "@/components/ui/scroll";

export const metadata: Metadata = { title: "Institutional Solutions", description: "Prime liquidity, competitive commissions and custom partnership models for brokers, funds and professional desks." };

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Partners" }, { label: "Institutional Solutions" }]}
        eyebrow="Why Tattvam?"
        title="Partner With Confidence"
        highlight="Confidence"
        text="Build a stronger partnership with the infrastructure, support and trading conditions your business needs — from prime liquidity to shared growth."
        primary={{ label: "Let's Connect", href: "#partner-form" }}
        secondary={{ label: "Partnership Programmes", href: "/partnership" }}
        art={<InstitutionalArt />}
      />
      <section className="section-tight">
        <div className="container-x"><StatStrip items={[{ v: "24/5", l: "Multilingual support" }, { v: "Multi-asset", l: "Global market access" }, { v: "Fast", l: "Payouts" }, { v: "Prime", l: "Infrastructure" }]} /></div>
      </section>

      <section className="section">
        <div className="container-x grid gap-20 lg:gap-28">
          <Split bare eyebrow="Built For Your Growth" title="More than an institutional programme" media={<ParallaxPhoto src="/img/photos/institutional.jpg" alt="Institutional trading floor" badge={<PhotoBadge title="Multilingual support" value="24/5" />} />} cta={<Btn href="#partner-form" arrow>Let&apos;s Connect</Btn>}>
            <p>Everything you need to grow your client network and maximise earning potential — competitive conditions, dedicated support, and the trading infrastructure behind Tattvam.</p>
          </Split>
          <div>
            <SectionHead eyebrow="How It Works" title="Start earning in 3 steps" text="Register, connect your flow, and grow with commissions from client activity — backed by Tattvam infrastructure and a dedicated desk." />
            <NumberCards items={[
              { title: "Register — join the Tattvam partner programme", text: "Share your desk details and commercial profile. We align liquidity, commissions, and support so you can onboard with a structure that fits your business." },
              { title: "Refer — share access", text: "Connect clients through your dedicated link and onboard them with a clear, compliant process." },
              { title: "Earn — grow together", text: "Receive commissions from activity. Flexible rewards, scalable earnings, and transparent reporting keep the partnership clear as you grow." },
            ]} />
          </div>
        </div>
      </section>

      <section className="section section-cyan">
        <div className="container-x">
          <SectionHead center eyebrow="Key Benefits" title="Network your opportunity" />
          <Stagger className="flex flex-wrap justify-center gap-3">
            {["Competitive commissions", "Fast payouts", "Multi-asset global market access", "24/5 multilingual support", "Transparent reporting", "Dedicated partner desk"].map((b) => (
              <StaggerItem key={b}>
                <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-3 font-semibold shadow-soft transition hover:-translate-y-1 hover:border-cyan-2">
                  <Icon name="check" className="size-4 text-cyan-d" />{b}
                </span>
              </StaggerItem>
            ))}
          </Stagger>
          <div className="mt-16">
            <SectionHead eyebrow="Partnership Models" title="Choose your model" text="Flexible models. Scalable growth. Combine commercial structures with institutional liquidity so your network and your desk can earn more, faster." />
            <NumberCards items={[
              { title: "Revenue Share", text: "Build long-term earnings from client trading — commercial structures aligned with ongoing activity." },
              { title: "CPA", text: "Receive fixed payouts for qualified referrals, with clear terms and fast settlement." },
              { title: "Hybrid", text: "Combine CPA and revenue share to maximise earning potential as your book scales." },
              { title: "Custom", text: "Flexible agreements tailored to your growth objectives, volumes, and technology stack." },
              { title: "Flexible Rewards", text: "Commission models aligned with your business — not a one-size-fits-all rate card." },
              { title: "Advanced Reporting", text: "Stay informed with real-time performance analytics and transparent partner reporting." },
            ]} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <Reveal dir="zoom">
            <div className="relative overflow-hidden rounded-[36px] bg-[linear-gradient(140deg,var(--color-navy),var(--color-ink))] p-8 text-white sm:p-12">
              <div className="pointer-events-none absolute -right-24 -top-24 size-80 animate-spin-slow rounded-full border-[36px] border-cyan/20 border-t-cyan/60" />
              <span className="eyebrow !text-cyan">Earn More. Grow Faster.</span>
              <h2 className="mb-3 max-w-2xl">Your network. Our infrastructure. Shared growth.</h2>
              <p className="max-w-2xl text-[#cfe3ef]">Competitive commissions, fast payouts, and dedicated support — engineered for partners, introducing brokers, and high-volume desks.</p>
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[["24/5", "Dedicated support", "Multilingual assistance throughout your partnership"], ["Multi-asset", "Market access", "FX, metals, energies, indices and more"], ["Fast", "Payouts", "Clear commissions and timely settlement"], ["One desk", "Partner dashboard", "Simple onboarding and scalable opportunities"]].map(([a, b, c]) => (
                  <div key={b} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                    <b className="block text-2xl text-cyan">{a}</b>
                    <span className="font-bold">{b}</span>
                    <p className="mt-1 text-[0.88rem] text-[#9fbcd2]">{c}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-cyan">
        <div className="container-x">
          <SectionHead eyebrow="Who Can Partner?" title="Partner advantages" text="Tattvam Markets partners with introducing brokers, funds, and professional desks from Dubai and Mauritius — combining FSC-authorised infrastructure with commercial models built for shared growth." />
          <NumberCards cols={4} items={[
            { title: "Financial professionals", text: "Desks, advisors, and professional introducers who want institutional conditions with commercial structures that scale." },
            { title: "Community organisers & influencers", text: "Turn your network into revenue with a dedicated referral path, partner dashboard, and support that stays with you." },
            { title: "Brokers & white labels", text: "Deep liquidity, competitive commissions, and a prime desk that works as an extension of yours." },
            { title: "Scalable earnings", text: "Grow client activity with dedicated support, transparent reporting, and models from CPA to custom agreements." },
          ]} />
        </div>
      </section>

      <section id="partner-form" className="section scroll-mt-24">
        <div className="container-x grid items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal dir="left">
            <div className="eyebrow">Let&apos;s Connect</div>
            <h2 className="mb-4">Scan the opportunity. Start the conversation.</h2>
            <p className="mb-6 text-muted">Share your details below. Our partnership and prime desk team will follow up — competitive commissions, fast onboarding, and a model tailored to how you grow.</p>
            <div className="rounded-[28px] border border-line bg-gradient-to-br from-white to-cyan-50 p-5"><SupportArt /></div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link href="/partnership#apply" className="group rounded-2xl border border-line bg-white p-5 transition hover:border-navy">
                <b className="flex items-center justify-between">Partnership Programmes <Icon name="arrow" className="size-4 transition group-hover:translate-x-1" /></b>
                <small className="text-muted">IB, Affiliate, and Refer a Friend — one enquiry to get started.</small>
              </Link>
            </div>
          </Reveal>
          <Reveal dir="right"><EnquiryForm kind="institutional" /></Reveal>
        </div>
      </section>
    </>
  );
}
