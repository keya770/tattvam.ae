import type { Metadata } from "next";
import { AccountsArt } from "@/components/art/scenes";
import { CtaBand, PageHero, Plans, Split, Steps } from "@/components/blocks/sections";
import { Btn, SectionHead } from "@/components/ui/basic";
import { ParallaxPhoto, PhotoBadge } from "@/components/ui/scroll";

export const metadata: Metadata = { title: "Account Types", description: "Standard, Advanced and professional account options. Review the published terms before you open an account." };

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Trading" }, { label: "Account Types" }]}
        eyebrow="Account Types"
        title="Find the Account That Fits Your Needs"
        highlight="Your Needs"
        text="Every trader has different requirements. Our account options present trading conditions clearly, so eligible clients can understand the available features."
        primary={{ label: "Compare Accounts", href: "#bronze" }}
        secondary={{ label: "Contact Our Team", href: "/contact-us" }}
        stats={[{ v: "Standard", l: "Account" }, { v: "Advanced", l: "Account" }, { v: "Professional", l: "Enquiries" }, { v: "Clear", l: "Information" }]}
        art={<AccountsArt />}
      />
      <section className="section">
        <div className="container-x">
          <Split bare eyebrow="01 · Account Types" title="Clear information. Informed decisions." media={<ParallaxPhoto src="/img/photos/accounts.jpg" alt="Professional reviewing account options on a tablet" badge={<PhotoBadge title="Before you open" value="Read the terms" />} />} cta={<Btn href="/contact-us" variant="ghost">Contact Our Team</Btn>}>
            <p>Before opening an account, review the applicable spreads, commissions, financing charges, margin requirements, execution policy and product risk disclosures. Account features and eligibility requirements are subject to the relevant terms and regulatory requirements.</p>
          </Split>
        </div>
      </section>
      <section className="section section-cyan">
        <div className="container-x">
          <SectionHead center eyebrow="Compare" title="Standard, Advanced and professional enquiries" text="Features and eligibility are subject to the relevant terms. Contact the team for professional or institutional requirements." />
          <Plans detailed />
        </div>
      </section>
      <section className="section">
        <div className="container-x">
          <SectionHead eyebrow="How to Start" title="Your Trading Journey Starts Here" text="Discover the markets, submit your application, then review the terms, costs and risk disclosures." />
          <Steps />
        </div>
      </section>
      <CtaBand title="Clear information. Informed decisions." text="Review spreads, commissions, financing, margin and risk disclosures before you open an account." primary={{ label: "Contact Our Team", href: "/contact-us" }} secondary={{ label: "Trading Conditions", href: "/trading-conditions" }} />
    </>
  );
}
