import type { Metadata } from "next";
import { LINKS } from "@/lib/site";
import { Globe } from "@/components/art/Globe";
import { InstitutionalArt, SecurityArt } from "@/components/art/scenes";
import { Awards, BrandBand, CtaBand, FeatureGrid, PageHero, Split, Steps } from "@/components/blocks/sections";
import { ParallaxPhoto, PhotoBadge, TextReveal } from "@/components/ui/scroll";
import { Btn, SectionHead } from "@/components/ui/basic";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";

export const metadata: Metadata = { title: "About Us", description: "Tattvam Capital Securities — a clearer perspective on financial markets, built around knowledge, transparency and responsible business practices." };

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "About Us" }]}
        eyebrow="Company"
        title="About Tattvam Capital Securities"
        highlight="Tattvam"
        text="A clearer perspective on financial markets. Confidence begins with knowledge, transparency and a commitment to responsible business practices."
        primary={{ label: "Contact Our Team", href: "/contact-us" }}
        secondary={{ label: "Contact Us", href: "/contact-us" }}
        art={<Globe />}
      />
      <section className="section-tight">
        <div className="container-x">
          <div className="eyebrow">Our mission</div>
          <TextReveal
            className="max-w-5xl text-[clamp(1.6rem,3.6vw,3rem)] font-extrabold leading-[1.18] tracking-tight text-navy"
            text="Our aim is to build a trading experience that brings together market access, technology and client-focused service."
          />
        </div>
      </section>
      <section className="section">
        <div className="container-x">
          <Split bare eyebrow="01 · Who We Are" title="A Clearer Perspective on Financial Markets" media={<ParallaxPhoto src="/img/photos/team.jpg" alt="Tattvam finance team collaborating in a Dubai office" badge={<PhotoBadge title="UAE office" value="Dubai" />} />} cta={<Btn href="/contact-us" arrow>Contact Our Team</Btn>}>
            <p>At Tattvam Capital Securities, we believe that confidence in financial markets begins with knowledge, transparency and a commitment to responsible business practices. We strive to help clients understand the products available to them, navigate trading platforms and make informed decisions based on their own objectives and understanding of risk.</p>
            <p>With a focus on evolving market needs and long-term relationships, we aim to create value for individual clients, professional market participants and business partners.</p>
          </Split>
          <div className="mt-16"><Awards /></div>
        </div>
      </section>

      <BrandBand eyebrow="Tattvam at a glance" title="Market access, technology and client-focused service" items={[
        { v: "Clear", l: "Product information" },
        { v: "Tools", l: "Trading technology" },
        { v: "Care", l: "Client relationships" },
        { v: "Learn", l: "Market understanding" },
      ]} />

      <section className="section section-cyan">
        <div className="container-x">
          <SectionHead eyebrow="02 · Our Mission & Vision" title="Discover the Core Principles That Guide Us" text="We aim to make every interaction informative, professional and focused on helping clients understand their available options." />
          <Stagger className="grid gap-5 md:grid-cols-2">
            {[
              { t: "Our Mission", d: "To provide an accessible, transparent and technology-driven trading experience supported by professional service and a strong commitment to responsible business practices.", c: "bg-navy text-white" },
              { t: "Our Vision", d: "To become a respected name in financial markets by building lasting relationships, embracing innovation and maintaining high standards of integrity and client service.", c: "bg-cyan-50" },
              { t: "Our Approach", d: "A strong financial services relationship is built over time. Our approach centres on clear information, appropriate processes, continuous improvement and respect for the responsibilities involved in financial markets.", c: "bg-white" },
              { t: "Continuous Learning", d: "We encourage a deeper understanding of financial markets, trading mechanisms and risk management before decisions are made.", c: "bg-white" },
            ].map((m, i) => (
              <StaggerItem key={m.t} className="h-full">
                <div className={`group relative h-full overflow-hidden rounded-[28px] border border-line p-8 transition duration-300 hover:-translate-y-1.5 hover:shadow-lift ${m.c}`}>
                  <span className={`font-mono text-sm font-bold ${i === 0 ? "text-cyan" : "text-cyan-d"}`}>0{i + 1}</span>
                  <h3 className="mb-3 mt-2 !text-2xl">{m.t}</h3>
                  <p className={i === 0 ? "text-[#cfe3ef]" : "text-muted"}>{m.d}</p>
                  <div className="absolute -bottom-16 -right-16 size-44 rounded-full border-[18px] border-cyan/20 transition-transform duration-700 group-hover:scale-125" />
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-8"><Btn href={LINKS.youtube} variant="ghost">Watch on YouTube</Btn></Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHead center eyebrow="03 · Our Values" title="What guides every conversation" text="Clear communication, honest representation and a client-focused approach to financial markets." />
          <FeatureGrid items={[
            { icon: "shield", title: "Integrity", text: "We believe in clear communication, honest representation and professional conduct." },
            { icon: "doc", title: "Transparency", text: "We aim to provide clear information about products, trading conditions, applicable costs and risks." },
            { icon: "spark", title: "Innovation", text: "We embrace technology that helps improve the trading experience." },
            { icon: "chat", title: "Client Focus", text: "We value every relationship and aim to provide responsive, professional support." },
          ]} />
        </div>
      </section>

      <section className="section section-cyan">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
          <Reveal dir="left"><SecurityArt /></Reveal>
          <div>
            <SectionHead eyebrow="Our approach" title="Informative, professional and focused on your options" className="!mb-0" />
          </div>
        </div>
        <div className="container-x mt-6">
          <Steps cols={4} items={[
            { title: "Clear information", text: "Products, costs and risks explained before a decision is made." },
            { title: "Appropriate process", text: "Applications and partnerships follow the relevant checks and terms." },
            { title: "Continuous improvement", text: "Technology and service evolve with the needs of the markets." },
            { title: "Client understanding", text: "Every interaction is focused on the options available to you." },
          ]} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
