import type { Metadata } from "next";
import { SupportArt } from "@/components/art/scenes";
import { PageHero } from "@/components/blocks/sections";
import { EnquiryForm } from "@/components/blocks/forms";
import { Icon } from "@/components/ui/Icon";
import { ParallaxPhoto, PhotoBadge } from "@/components/ui/scroll";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";

export const metadata: Metadata = { title: "Contact Us", description: "Contact Tattvam Capital Securities in Dubai for general enquiries, client support and partnerships." };

const CHANNELS = [
  { icon: "mail", t: "General Enquiries", d: "Questions about our services" },
  { icon: "chat", t: "Client Support", d: "Account and platform assistance" },
  { icon: "handshake", t: "Partnerships", d: "Explore a business relationship", h: "/partnership" },
  { icon: "tower", t: "UAE Office", d: "Tattvam Capital Securities, Dubai, United Arab Emirates" },
];

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Company" }, { label: "Contact Us" }]}
        eyebrow="Support"
        title="Let's Talk"
        highlight="Talk"
        text="We're here to help. Whether you have a question about our services, need assistance with an account enquiry, or want to explore a partnership, our team is ready to hear from you."
        primary={{ label: "Send an Enquiry", href: "#enquiry" }}
        secondary={{ label: "Learning Centre", href: "/help-centre" }}
        art={<SupportArt />}
      />
      <section className="section">
        <div className="container-x grid items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <Reveal>
              <div className="eyebrow">01 · Support</div>
              <h2 className="mb-3">We're here to help</h2>
              <p className="mb-8 text-muted">General enquiries, client support and partnerships. Our UAE office is in Dubai, United Arab Emirates.</p>
            </Reveal>
            <ParallaxPhoto src="/img/photos/contact.jpg" alt="Tattvam client lounge in a bright modern office" aspect="aspect-[16/10]" className="mb-6" badge={<PhotoBadge title="UAE office" value="Dubai" />} />
            <Stagger className="grid gap-3 sm:grid-cols-2">
              {CHANNELS.map((c) => {
                const inner = (
                  <div className="group h-full rounded-2xl border border-line bg-white p-5 transition hover:-translate-y-1 hover:border-cyan-2 hover:shadow-soft">
                    <span className="mb-3 grid size-11 place-items-center rounded-xl bg-cyan-50 text-cyan-d transition group-hover:bg-navy group-hover:text-white"><Icon name={c.icon} className="size-5" /></span>
                    <b className="block">{c.t}</b>
                    <small className="break-words text-muted">{c.d}</small>
                  </div>
                );
                return <StaggerItem key={c.t} className="h-full">{c.h ? <a href={c.h} className="block h-full">{inner}</a> : inner}</StaggerItem>;
              })}
            </Stagger>
          </div>
          <Reveal dir="right" className="scroll-mt-28" >
            <div id="enquiry" className="mb-4 scroll-mt-28"><div className="eyebrow">Enquiry</div><h2 className="!text-3xl">Send us an enquiry</h2><p className="mt-2 text-muted">Complete the form and our team will direct your enquiry to the appropriate department.</p></div>
            <EnquiryForm kind="contact" submitLabel="Submit Enquiry" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
