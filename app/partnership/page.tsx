import type { Metadata } from "next";
import { PartnershipArt, SupportArt } from "@/components/art/scenes";
import { CtaBand, FeatureGrid, PageHero, Split, StatStrip, Steps } from "@/components/blocks/sections";
import { EnquiryForm } from "@/components/blocks/forms";
import { ArrowLink, Btn, SectionHead } from "@/components/ui/basic";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { ParallaxPhoto, PhotoBadge } from "@/components/ui/scroll";

export const metadata: Metadata = { title: "Partnership", description: "Explore partnership opportunities with Tattvam Capital Securities, subject to due diligence and applicable regulatory requirements." };

const PROGRAMMES = [
  { t: "Introducing brokers", tag: "Client introducers", d: "A professional relationship for introducing brokers and client introducers who share our commitment to responsible client engagement.", dark: true },
  { t: "Market professionals", tag: "Financial services", d: "Financial services professionals can discuss collaboration models, subject to due diligence, contractual approval and applicable regulatory requirements." },
  { t: "Referral partners", tag: "Approved relationships", d: "Eligible marketing and referral partners, and businesses interested in approved distribution relationships, are welcome to start a conversation." },
];

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Partners" }, { label: "Partnership" }]}
        eyebrow="Partnership"
        title="Grow With Tattvam"
        highlight="Grow"
        text="Partnerships built on trust and shared opportunity. We explore mutually beneficial relationships with eligible businesses and individuals who share our commitment to professionalism."
        primary={{ label: "Become a Partner", href: "#apply" }}
        secondary={{ label: "Institutional Liquidity", href: "/institutional-solutions" }}
        art={<PartnershipArt />}
      />
      <section className="section-tight">
        <div className="container-x"><StatStrip items={[{ v: "IB", l: "Introducing brokers" }, { v: "Pro", l: "Market professionals" }, { v: "Trust", l: "Shared opportunity" }, { v: "Terms", l: "Before you begin" }]} /></div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHead eyebrow="Who can explore a partnership" title="Let's build meaningful partnerships" text="All partnerships are subject to due diligence, contractual approval and applicable regulatory requirements." />
          <Stagger className="grid gap-5 lg:grid-cols-3">
            {PROGRAMMES.map((p) => (
              <StaggerItem key={p.t} className="h-full">
                <div className={`group relative flex h-full flex-col overflow-hidden rounded-[28px] border p-8 transition duration-300 hover:-translate-y-2 hover:shadow-deep ${p.dark ? "border-navy bg-navy text-white" : "border-line bg-white"}`}>
                  <span className={`chip mb-4 w-fit ${p.dark ? "!bg-white/10 !text-cyan" : ""}`}>{p.tag}</span>
                  <h3 className="mb-3 !text-2xl">{p.t}</h3>
                  <p className={`mb-6 ${p.dark ? "text-[#cfe3ef]" : "text-muted"}`}>{p.d}</p>
                  <div className="mt-auto">{p.dark ? <a href="#apply" className="btn btn-accent">Enquire Now</a> : <ArrowLink href="#apply">Enquire Now</ArrowLink>}</div>
                  <div className="absolute -bottom-20 -right-20 size-52 rounded-full border-[22px] border-cyan/15 transition-transform duration-700 group-hover:scale-125" />
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section section-cyan">
        <div className="container-x">
          <FeatureGrid cols={3} items={[
            { icon: "handshake", title: "A relationship-led approach", text: "Build a professional relationship supported by communication and dedicated contact points." },
            { icon: "doc", title: "Business development support", text: "Explore approved marketing materials and support designed to help you communicate our services clearly." },
            { icon: "bars", title: "Transparent partnership terms", text: "Understand the applicable commission arrangements, eligibility criteria and responsibilities before entering a partnership. Where available, access reporting tools and account support." },
          ]} />
          <div className="mt-16">
            <SectionHead eyebrow="Partner With Us" title="Let's start a conversation" text="Tell us about your business, your experience and the type of partnership you would like to explore." />
            <Steps cols={4} items={[
              { title: "Introduce", text: "Share your business and your experience in financial markets." },
              { title: "Describe", text: "Tell us the type of partnership you would like to explore." },
              { title: "Review", text: "We complete due diligence and confirm eligibility against the applicable requirements." },
              { title: "Agree", text: "Partnership terms, responsibilities and reporting are set out before you begin." },
            ]} />
          </div>
        </div>
      </section>

      <section id="apply" className="section scroll-mt-24">
        <div className="container-x grid items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal dir="left">
            <div className="eyebrow">Partner desk · one business day</div>
            <h2 className="mb-4">Contact our partnerships team</h2>
            <p className="mb-6 text-muted">Whether you are an introducing broker, a financial markets professional or a business exploring a partnership, tell us about your business and the collaboration you have in mind.</p>
            <ParallaxPhoto src="/img/photos/partnership.jpg" alt="Partners shaking hands in a glass meeting room" badge={<PhotoBadge title="Partner support" value="24/5" />} />
          </Reveal>
          <Reveal dir="right"><EnquiryForm kind="partner" /></Reveal>
        </div>
      </section>
      <CtaBand title="Let's start a conversation" text="Tell us about your business, your experience and the type of partnership you would like to explore." primary={{ label: "Become a Partner", href: "#apply" }} secondary={{ label: "Contact Our Team", href: "/contact-us" }} />
    </>
  );
}
