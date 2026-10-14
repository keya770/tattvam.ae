import type { ReactNode } from "react";
import { LINKS } from "@/lib/site";
import { CtaBand, FeatureGrid, PageHero, Split } from "@/components/blocks/sections";
import { Btn, SectionHead } from "@/components/ui/basic";
import { ParallaxPhoto, PhotoBadge } from "@/components/ui/scroll";

export type InfoProps = {
  name: string; title: string; highlight?: string; text: string; primary: string;
  art: ReactNode;
  blocks: { title: string; text: string; art: ReactNode; eyebrow?: string; photo?: { src: string; badge: [string, string] } }[];
  features: { icon: string; title: string; text: string }[];
  extra?: ReactNode;
};

export function InfoPage({ name, title, highlight, text, primary, art, blocks, features, extra }: InfoProps) {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Trading" }, { label: name }]}
        eyebrow="Trade With Us"
        title={title}
        highlight={highlight}
        text={text}
        primary={{ label: primary, href: LINKS.register }}
        secondary={{ label: "View Account Types", href: "/trading-account" }}
        art={art}
      />
      <section className="section">
        <div className="container-x grid gap-20 lg:gap-28">
          {blocks.map((b, i) => (
            <Split key={b.title} reverse={i % 2 === 1} bare={!!b.photo} eyebrow={b.eyebrow ?? name} title={b.title} media={b.photo ? <ParallaxPhoto src={b.photo.src} alt={b.title} badge={<PhotoBadge title={b.photo.badge[0]} value={b.photo.badge[1]} />} /> : b.art}
              cta={i === 0 ? <Btn href={LINKS.register} arrow>{primary}</Btn> : <Btn href="/trading-account" variant="ghost">Compare accounts</Btn>}>
              <p>{b.text}</p>
            </Split>
          ))}
        </div>
      </section>
      {extra}
      <section className="section section-cyan">
        <div className="container-x">
          <SectionHead center eyebrow="Key Advantages" title="What sets us apart" />
          <FeatureGrid items={features} numbered />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
