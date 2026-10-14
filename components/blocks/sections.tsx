import Link from "next/link";
import type { ReactNode } from "react";
import { AWARDS, LINKS, START_STEPS } from "@/lib/site";
import { Btn, IconTile, SectionHead } from "@/components/ui/basic";
import { Counter, FadeIn, HeroTitle, Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { Trophy } from "@/components/art/scenes";
import { HeroScroll, ScrollDrift } from "@/components/ui/scroll";

/* ---------------- Page hero ---------------- */
type Cta = { label: string; href: string };
export function PageHero({
  eyebrow, title, highlight, text, primary, secondary, art, stats, crumbs, badge,
}: {
  eyebrow?: string; title: string; highlight?: string; text: string; primary?: Cta; secondary?: Cta; art?: ReactNode;
  stats?: { v: string; l: string }[]; crumbs?: { label: string; href?: string }[]; badge?: ReactNode;
}) {
  return (
    <section className="hero-bg grid-bg relative overflow-hidden pb-16 pt-10 sm:pb-24 sm:pt-16">
      <div className="container-x relative grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        <div>
          {crumbs && (
            <FadeIn>
              <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap gap-2 text-[0.85rem] text-muted">
                <Link href="/" className="hover:text-navy">Home</Link>
                {crumbs.map((c) => (
                  <span key={c.label} className="flex gap-2">
                    <span className="opacity-50">/</span>
                    {c.href ? <Link href={c.href} className="hover:text-navy">{c.label}</Link> : <span className="text-navy">{c.label}</span>}
                  </span>
                ))}
              </nav>
            </FadeIn>
          )}
          {badge}
          {eyebrow && <FadeIn><div className="eyebrow">{eyebrow}</div></FadeIn>}
          <HeroTitle text={title} highlight={highlight} className="mb-5" />
          <FadeIn delay={0.35}>
            <p className="max-w-xl text-[clamp(1.02rem,1.4vw,1.16rem)] text-muted">{text}</p>
          </FadeIn>
          {(primary || secondary) && (
            <FadeIn delay={0.5} className="mt-7 flex flex-wrap gap-3">
              {primary && <Btn href={primary.href} arrow>{primary.label}</Btn>}
              {secondary && <Btn href={secondary.href} variant="ghost">{secondary.label}</Btn>}
            </FadeIn>
          )}
          {stats && (
            <FadeIn delay={0.65} className="mt-9 grid max-w-xl grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.l}>
                  <Counter value={s.v} className="block text-2xl font-extrabold text-navy" />
                  <span className="text-[0.84rem] text-muted">{s.l}</span>
                </div>
              ))}
            </FadeIn>
          )}
        </div>
        {art && <HeroScroll className="relative mx-auto w-full max-w-[580px]">{art}</HeroScroll>}
      </div>
    </section>
  );
}

export function RegBadge() {
  return (
    <FadeIn>
      <Link href="/about-us" className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-white py-1.5 pl-1.5 pr-3.5 text-[0.82rem] font-semibold shadow-soft">
        <span className="grid size-6 place-items-center rounded-full bg-cyan-50"><span className="live-dot" /></span>
        Tattvam Capital Securities · Dubai, UAE
      </Link>
    </FadeIn>
  );
}

/* ---------------- Split (text + media) ---------------- */
export function Split({
  eyebrow, title, children, media, reverse, cta, bare,
}: { eyebrow?: string; title: ReactNode; children?: ReactNode; media: ReactNode; reverse?: boolean; cta?: ReactNode; bare?: boolean }) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <Reveal dir={reverse ? "right" : "left"} className={reverse ? "lg:order-2" : ""}>
        {bare ? media : <div className="relative overflow-hidden rounded-[32px] border border-line bg-gradient-to-br from-white to-cyan-50 p-4 shadow-lift sm:p-7">{media}</div>}
      </Reveal>
      <Reveal dir={reverse ? "left" : "right"} delay={0.1}>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h2 className="mb-4">{title}</h2>
        <div className="text-[1.04rem] text-muted [&>p]:mb-4">{children}</div>
        {cta && <div className="mt-6 flex flex-wrap gap-3">{cta}</div>}
      </Reveal>
    </div>
  );
}

/* ---------------- Feature cards ---------------- */
export function FeatureGrid({ items, cols = 4, numbered }: { items: { icon?: string; title: string; text: string }[]; cols?: 2 | 3 | 4; numbered?: boolean }) {
  const gc = cols === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : cols === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2";
  return (
    <Stagger className={`grid gap-5 ${gc}`}>
      {items.map((it, i) => (
        <StaggerItem key={it.title} className="h-full">
          <div className="card card-hover group h-full">
            {numbered && <span className="absolute right-6 top-5 font-mono text-2xl font-bold text-line-2">{String(i + 1).padStart(2, "0")}</span>}
            <IconTile name={it.icon ?? "spark"} />
            <h3 className="mb-2">{it.title}</h3>
            <p className="text-muted">{it.text}</p>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/* ---------------- Stats strip ---------------- */
export function StatStrip({ items, tone = "cyan" }: { items: { v: string; l: string }[]; tone?: "cyan" | "white" }) {
  const cyan = tone === "cyan";
  return (
    <Reveal>
      <div className={`relative grid grid-cols-2 overflow-hidden rounded-3xl md:grid-cols-4 ${cyan ? "bg-[linear-gradient(110deg,#5CC8D8,#9BE1EB)] shadow-[0_24px_50px_-24px_rgb(19_135_155/.6)]" : "border border-line bg-white shadow-soft"}`}>
        {cyan && <div className="pointer-events-none absolute -right-10 -top-16 size-48 animate-spin-slow rounded-full border-[22px] border-white/25 border-t-navy/30" />}
        {items.map((s, i) => (
          <div key={s.l} className={`relative p-6 ${i % 2 === 0 ? "border-r" : "md:border-r"} ${i < 2 ? "border-b md:border-b-0" : ""} ${cyan ? "border-white/40" : "border-line"} last:border-r-0`}>
            <Counter value={s.v} className="block text-[clamp(1.4rem,2.4vw,1.9rem)] font-extrabold text-navy" />
            <span className={`text-[0.9rem] ${cyan ? "font-semibold text-navy/70" : "text-muted"}`}>{s.l}</span>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

export { AccountPlans as Plans } from "@/components/blocks/AccountPlans";

/* ---------------- Steps ---------------- */
export function Steps({ items = START_STEPS, cols = 3 }: { items?: { title: string; text: string }[]; cols?: 3 | 4 }) {
  return (
    <div className="pt-9">
      <Stagger className={`relative grid gap-16 md:gap-6 ${cols === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3"}`}>
        <div className="absolute left-[8%] right-[8%] top-0 hidden h-0.5 bg-[repeating-linear-gradient(90deg,var(--color-cyan)_0_8px,transparent_8px_16px)] opacity-60 lg:block" />
        {items.map((s, i) => (
          <StaggerItem key={s.title}>
            <div className="card relative h-full">
              <div className="relative -mt-[68px] mb-4 grid size-[68px] place-items-center rounded-full border-2 border-cyan bg-white font-mono text-lg font-extrabold shadow-[0_0_0_8px_var(--color-bg)]">
                {String(i + 1).padStart(2, "0")}
              </div>
              <span className="text-[0.75rem] font-extrabold uppercase tracking-[0.12em] text-cyan-d">Step {i + 1}</span>
              <h3 className="mb-2 mt-1">{s.title}</h3>
              <p className="text-muted">{s.text}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

/* ---------------- Awards ---------------- */
export function Awards() {
  return (
    <Stagger className="grid gap-5 md:grid-cols-2">
      {AWARDS.map((a) => (
        <StaggerItem key={a.title}>
          <div className="card card-hover group flex items-center gap-5 !p-6 text-navy">
            <div className="flex-none transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110"><Trophy className="size-[72px]" /></div>
            <div>
              <small className="font-mono font-bold text-cyan-d">{a.year}</small>
              <h3 className="my-0.5">{a.title}</h3>
              <p className="text-[0.9rem] text-muted">{a.where}</p>
            </div>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/* ---------------- CTA band (brand cyan) ---------------- */
export function CtaBand({
  title = "What Are You Waiting For?", text = "Open your account and start trading on MetaTrader 5 — it's easy.",
  primary = { label: "Start Trading", href: LINKS.register }, secondary = { label: "Try Demo", href: LINKS.demo },
}: { title?: string; text?: string; primary?: Cta; secondary?: Cta }) {
  return (
    <section className="section-tight">
      <div className="container-x">
        <Reveal dir="zoom">
          <div className="relative grid items-center gap-7 overflow-hidden rounded-[32px] bg-[linear-gradient(120deg,#5CC8D8_0%,#7FD6E3_45%,#B9EBF2_100%)] p-8 text-navy shadow-[0_30px_60px_-25px_rgb(19_135_155/.55)] sm:p-12 lg:grid-cols-[1.4fr_1fr] lg:p-14">
            <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgb(255_255_255/.35)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/.35)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_80%_50%,#000,transparent_70%)]" />
            <div className="pointer-events-none absolute -bottom-32 -right-20 size-[340px] animate-spin-slow rounded-full border-[40px] border-white/30 border-t-navy/40" />
            <div className="pointer-events-none absolute -left-16 -top-16 size-48 rounded-full bg-white/25 blur-2xl" />
            <div className="relative">
              <h2 className="mb-2">{title}</h2>
              <p className="text-navy/75">{text}</p>
            </div>
            <div className="relative flex flex-wrap gap-3 lg:justify-end">
              <Btn href={primary.href} arrow>{primary.label}</Btn>
              <Btn href={secondary.href} variant="ghost" className="!border-white/70 !bg-white/80 backdrop-blur">{secondary.label}</Btn>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Brand band: full-width cyan section with counters ---------------- */
export function BrandBand({
  eyebrow = "Why traders choose Tattvam", title = "Built on regulation, technology and trust",
  items = [
    { v: "400+", l: "Tradable products" }, { v: "1:2000", l: "Max leverage" },
    { v: "0.1", l: "Spreads from (pips)" }, { v: "24/5", l: "Multilingual support" },
  ],
}: { eyebrow?: string; title?: string; items?: { v: string; l: string }[] }) {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#5CC8D8_0%,#86D9E5_55%,#5CC8D8_100%)] py-16 text-navy sm:py-20">
      <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(rgb(255_255_255/.55)_1.2px,transparent_1.2px)] [background-size:22px_22px] [mask-image:linear-gradient(90deg,transparent,#000_30%,#000_70%,transparent)]" />
      <ScrollDrift distance={120} className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2">
        <div className="whitespace-nowrap text-center text-[clamp(5rem,14vw,12rem)] font-extrabold leading-none tracking-tighter text-white/25">TATTVAM · MARKETS · TATTVAM</div>
      </ScrollDrift>
      <div className="container-x relative">
        <Reveal className="mb-10 max-w-2xl">
          <div className="eyebrow !text-navy before:!bg-navy">{eyebrow}</div>
          <h2>{title}</h2>
        </Reveal>
        <Stagger className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {items.map((s) => (
            <StaggerItem key={s.l}>
              <div className="group rounded-3xl border border-white/50 bg-white/35 p-6 backdrop-blur-md transition duration-300 hover:-translate-y-1.5 hover:bg-white/60">
                <Counter value={s.v} className="block text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold tracking-tight" />
                <span className="text-[0.92rem] font-semibold text-navy/70">{s.l}</span>
                <div className="mt-4 h-1 w-10 rounded-full bg-navy transition-all duration-500 group-hover:w-20" />
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ---------------- Simple numbered list cards (models/advantages) ---------------- */
export function NumberCards({ items, cols = 3 }: { items: { title: string; text: string }[]; cols?: 2 | 3 | 4 }) {
  const gc = cols === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : cols === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2";
  return (
    <Stagger className={`grid gap-5 ${gc}`}>
      {items.map((m, i) => (
        <StaggerItem key={m.title} className="h-full">
          <div className="card card-hover group h-full overflow-hidden">
            <div className="absolute -right-10 -top-10 size-32 rounded-full bg-[radial-gradient(circle,rgb(92_200_216/.25),transparent_70%)] transition-transform duration-500 group-hover:scale-150" />
            <span className="font-mono text-sm font-bold text-cyan-d">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mb-2 mt-2">{m.title}</h3>
            <p className="text-muted">{m.text}</p>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

export { SectionHead };
