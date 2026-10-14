import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LEGAL } from "@/lib/legal";
import { LINKS } from "@/lib/site";
import { LegalArt, OnboardingArt } from "@/components/art/scenes";
import { CtaBand, PageHero } from "@/components/blocks/sections";
import { Toc } from "@/components/blocks/Toc";
import { Reveal } from "@/components/ui/motion";

export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(LEGAL).map((doc) => ({ doc }));
}
export async function generateMetadata({ params }: { params: Promise<{ doc: string }> }): Promise<Metadata> {
  const { doc } = await params;
  const d = LEGAL[doc];
  return d ? { title: d.title, description: d.intro } : {};
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default async function LegalPage({ params }: { params: Promise<{ doc: string }> }) {
  const { doc } = await params;
  const d = LEGAL[doc];
  if (!d) notFound();
  const toc = d.sections.map((s) => ({ id: slug(s.h), label: s.h }));
  return (
    <>
      <PageHero
        crumbs={[{ label: "Policies" }, { label: d.title }]}
        eyebrow="Policies"
        title={d.title}
        text={d.intro}
        primary={{ label: d.primary, href: LINKS.register }}
        secondary={d.next}
        art={doc === "client-onboarding-process" ? <OnboardingArt /> : <LegalArt />}
      />
      <section className="section !pt-8">
        <div className="container-x grid items-start gap-10 lg:grid-cols-[270px_1fr]">
          <Reveal dir="left"><Toc items={toc} /></Reveal>
          <article className="prose-legal rounded-[32px] border border-line bg-white p-6 shadow-soft sm:p-10 lg:p-12">
            {d.sections.map((s, i) => (
              <Reveal key={s.h}>
                <section id={toc[i].id} className="scroll-mt-28 border-b border-line py-7 first:pt-0 last:border-0 last:pb-0">
                  <h2 className="mb-4 flex items-center gap-3 !text-[1.35rem]">
                    <span className="rounded-lg bg-cyan-50 px-2.5 py-1 font-mono text-sm text-cyan-d">{String(i + 1).padStart(2, "0")}</span>
                    {s.h}
                  </h2>
                  {s.body.map((b, j) =>
                    typeof b === "string" ? <p key={j}>{b}</p>
                    : "list" in b ? <ul key={j}>{b.list.map((li) => <li key={li}>{li}</li>)}</ul>
                    : <div key={j} className="my-5 rounded-r-xl border-l-4 border-cyan bg-cyan-50 px-5 py-4 font-semibold !text-navy">{b.callout}</div>,
                  )}
                </section>
              </Reveal>
            ))}
          </article>
        </div>
      </section>
      <CtaBand title="Ready to continue with Tattvam?" text="Open a trading account once you have reviewed this policy, or jump to the next related document." primary={{ label: d.primary, href: LINKS.register }} secondary={d.next} />
    </>
  );
}
