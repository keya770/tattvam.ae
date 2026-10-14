"use client";

import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useIntroReady } from "@/components/site/Preloader";
import { useEffect, useRef, useState, type ReactNode } from "react";

const SPRING = { stiffness: 120, damping: 26, mass: 0.4 };

/** Moves children vertically at a different speed than the page (subtle parallax). */
export function ParallaxY({ children, speed = 60, className }: { children: ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [speed, -speed]), SPRING);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/** Hero wrapper: content drifts up and fades slightly as the hero scrolls away. */
export function HeroScroll({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, 120]), SPRING);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const ready = useIntroReady();
  return (
    <motion.div ref={ref} style={{ y, opacity, scale }} className={className}>
      <motion.div
        initial={{ opacity: 0, scale: 0.86, filter: "blur(12px)" }}
        animate={ready ? { opacity: 1, scale: 1, filter: "blur(0px)", transitionEnd: { filter: "none" } } : undefined}
        transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/**
 * Real photo with a clip-path reveal on enter and an inner parallax drift while scrolling.
 */
export function ParallaxPhoto({
  src, alt, className = "", aspect = "aspect-[16/11]", badge, priority,
}: { src: string; alt: string; className?: string; aspect?: string; badge?: ReactNode; priority?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useSpring(useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]), SPRING);
  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: "inset(12% 12% 12% 12% round 32px)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 32px)", opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1] }}
      className={`relative overflow-hidden rounded-[32px] shadow-deep ${aspect} ${className}`}
    >
      <motion.div style={{ y }} className="absolute inset-[-10%]">
        <Image src={src} alt={alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" priority={priority} />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/25 via-transparent to-transparent" />
      {badge && <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto">{badge}</div>}
    </motion.div>
  );
}

/** Small glass badge used on photos. */
export function PhotoBadge({ title, value, tone = "cyan" }: { title: string; value: string; tone?: "cyan" | "navy" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="inline-flex items-center gap-3 rounded-2xl border border-white/60 bg-white/85 px-4 py-3 shadow-lift backdrop-blur-md"
    >
      <span className={`grid size-9 place-items-center rounded-xl ${tone === "cyan" ? "bg-cyan text-navy" : "bg-navy text-cyan"}`}>
        <span className="size-2 rounded-full bg-current animate-ping-soft" />
      </span>
      <span>
        <small className="block text-[0.72rem] font-bold uppercase tracking-wider text-muted">{title}</small>
        <b className="text-[0.98rem]">{value}</b>
      </span>
    </motion.div>
  );
}

/** Horizontal drift tied to scroll (for big outlined words / decorative rows). */
export function ScrollDrift({ children, distance = 160, className }: { children: ReactNode; distance?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useSpring(useTransform(scrollYProgress, [0, 1], [distance, -distance]), SPRING);
  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      <motion.div style={{ x }}>{children}</motion.div>
    </div>
  );
}

/* ==================================================================
   WaveRun-style scroll effects
   ================================================================== */

/** Big statement text: words light up from faint to solid as you scroll through it (scrubbed). */
export function TextReveal({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.4"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((w, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return <RevealWord key={i} word={w} range={[start, end]} progress={scrollYProgress} />;
      })}
    </p>
  );
}
function RevealWord({ word, range, progress }: { word: string; range: [number, number]; progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [6, 0]);
  const blur = useTransform(progress, range, [4, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);
  return (
    <motion.span style={{ opacity, y, filter }} className="mr-[0.25em] inline-block">
      {word}
    </motion.span>
  );
}

/** Section title: words rise and de-blur in sequence when they enter the viewport. */
export function TitleReveal({ text, as = "h2", className = "" }: { text: string; as?: "h2" | "h3"; className?: string }) {
  const Tag = motion[as];
  const words = text.split(" ");
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      transition={{ staggerChildren: 0.07 }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-bottom" aria-hidden>
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "105%", filter: "blur(8px)", opacity: 0 },
              show: { y: 0, filter: "blur(0px)", opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}

/** Magnetic hover: child follows the cursor slightly (desktop pointers only). */
export function Magnetic({ children, strength = 10, className = "" }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useSpring(0, { stiffness: 260, damping: 18 });
  const y = useSpring(0, { stiffness: 260, damping: 18 });
  return (
    <motion.span
      ref={ref}
      style={{ x, y }}
      className={`inline-flex ${className}`}
      onMouseMove={(e) => {
        if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
        const r = ref.current!.getBoundingClientRect();
        x.set(((e.clientX - r.left) / r.width - 0.5) * 2 * strength);
        y.set(((e.clientY - r.top) / r.height - 0.5) * 2 * strength);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.span>
  );
}

/**
 * Full-bleed cover image that starts as an inset rounded card and expands to
 * the full viewport width as it scrolls into view (scrubbed), with inner parallax.
 */
export function ExpandingCover({
  src, alt, children,
}: { src: string; alt: string; children?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const p = useSpring(scrollYProgress, SPRING);
  const inset = useTransform(p, [0, 1], [8, 0]);
  const radius = useTransform(p, [0, 1], [36, 0]);
  const clipPath = useTransform([inset, radius] as never, ([i, r]: number[]) => `inset(${i}% ${i}% 0% ${i}% round ${r}px)`);
  const { scrollYProgress: thru } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(thru, [0, 1], ["-12%", "12%"]);
  const imgScale = useTransform(p, [0, 1], [1.25, 1.08]);
  return (
    <section ref={ref} className="relative h-[92vh] min-h-[560px] overflow-hidden">
      <motion.div style={{ clipPath }} className="absolute inset-0 overflow-hidden">
        <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-[-12%]">
          <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/35 to-navy/10" />
      </motion.div>
      <div className="relative flex h-full items-end">{children}</div>
    </section>
  );
}

/**
 * Pinned horizontal gallery: the section sticks while vertical scroll moves the
 * card track sideways (desktop). On small screens it becomes a swipeable row.
 */
export function HorizontalGallery({ items, head }: { items: GalleryItem[]; head: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  useEffect(() => {
    const m = () => track.current && setDist(Math.max(0, track.current.scrollWidth - window.innerWidth + 40));
    m();
    window.addEventListener("resize", m);
    return () => window.removeEventListener("resize", m);
  }, []);
  const x = useTransform(p, [0, 1], [0, -dist]);
  const bar = useTransform(p, [0, 1], ["0%", "100%"]);
  return (
    <>
      {/* Desktop: pinned */}
      <section ref={ref} className="relative hidden lg:block" style={{ height: `${items.length * 65 + 60}vh` }}>
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="container-x mb-10 flex items-end justify-between gap-8">
            <div className="max-w-2xl">{head}</div>
            <div className="mb-3 h-1 w-48 overflow-hidden rounded-full bg-line"><motion.div style={{ width: bar }} className="h-full bg-cyan" /></div>
          </div>
          <motion.div ref={track} style={{ x }} className="flex w-max gap-6 pl-[max(20px,calc((100vw-1180px)/2))] pr-10">
            {items.map((it, i) => <GalleryCard key={it.href} it={it} i={i} />)}
          </motion.div>
        </div>
      </section>
      {/* Mobile / tablet: swipe */}
      <section className="section lg:hidden">
        <div className="container-x mb-8">{head}</div>
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none]">
          {items.map((it, i) => <div key={it.href} className="w-[82vw] max-w-[420px] flex-none snap-center"><GalleryCard it={it} i={i} /></div>)}
        </div>
      </section>
    </>
  );
}

type GalleryItem = { title: string; text: string; href: string; tag: string; img?: string; art?: ReactNode };

function GalleryCard({ it, i }: { it: GalleryItem; i: number }) {
  return (
    <a href={it.href} className="group relative block aspect-[3/4] w-full flex-none overflow-hidden rounded-[28px] bg-navy lg:w-[30vw] lg:max-w-[460px] lg:aspect-[4/5]">
      {it.img ? (
        <Image src={it.img} alt={it.title} fill sizes="(max-width: 1024px) 82vw, 30vw" className="object-cover transition-transform duration-[1400ms] [transition-timing-function:cubic-bezier(.22,1,.36,1)] group-hover:scale-110" />
      ) : (
        <div className="absolute inset-0 bg-[linear-gradient(160deg,#EAF8FB,#8FDCE7_60%,#5CC8D8)]">
          <div className="absolute inset-x-[6%] top-[8%] transition-transform duration-[1400ms] [transition-timing-function:cubic-bezier(.22,1,.36,1)] group-hover:scale-105">{it.art}</div>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
      <span className="absolute left-5 top-5 rounded-full bg-white/85 px-3 py-1 font-mono text-[0.78rem] font-bold text-navy backdrop-blur">{String(i + 1).padStart(2, "0")} · {it.tag}</span>
      <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
        <h3 className="mb-2 !text-[clamp(1.5rem,2.4vw,2.2rem)]">{it.title}</h3>
        <p className="mb-4 max-w-sm text-[0.95rem] text-white/80">{it.text}</p>
        <span className="inline-flex items-center gap-2 rounded-full bg-cyan px-4 py-2 text-[0.85rem] font-bold text-navy transition-transform duration-500 group-hover:translate-x-1">Explore market →</span>
      </div>
    </a>
  );
}

/** Big outlined words drifting sideways with scroll (two rows, opposite directions). */
export function BigMarquee({ words, className = "" }: { words: string[]; className?: string }) {
  const line = [...words, ...words, ...words].join("  ·  ");
  return (
    <div className={`relative overflow-hidden py-10 sm:py-14 ${className}`} aria-hidden>
      <ScrollDrift distance={220}>
        <div className="whitespace-nowrap text-[clamp(3rem,9vw,8rem)] font-extrabold leading-none tracking-tighter text-transparent [-webkit-text-stroke:1.5px_#5CC8D8]">{line}</div>
      </ScrollDrift>
      <ScrollDrift distance={-220}>
        <div className="-ml-[30%] whitespace-nowrap text-[clamp(3rem,9vw,8rem)] font-extrabold leading-none tracking-tighter text-navy/90">{line}</div>
      </ScrollDrift>
    </div>
  );
}

/** 3D tilt that follows the cursor (desktop only). */
export function Tilt({ children, className = "", max = 7 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(0, { stiffness: 200, damping: 20 });
  const ry = useSpring(0, { stiffness: 200, damping: 20 });
  const gx = useSpring(50, { stiffness: 200, damping: 20 });
  const gy = useSpring(50, { stiffness: 200, damping: 20 });
  const glow = useTransform([gx, gy] as never, ([x, y]: number[]) => `radial-gradient(420px circle at ${x}% ${y}%, rgba(92,200,216,0.18), transparent 60%)`);
  return (
    <motion.div
      ref={ref}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={`relative ${className}`}
      onMouseMove={(e) => {
        if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
        const r = ref.current!.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        ry.set((px - 0.5) * 2 * max); rx.set(-(py - 0.5) * 2 * max);
        gx.set(px * 100); gy.set(py * 100);
      }}
      onMouseLeave={() => { rx.set(0); ry.set(0); gx.set(50); gy.set(50); }}
    >
      {children}
      <motion.div style={{ background: glow }} className="pointer-events-none absolute inset-0 rounded-[inherit]" />
    </motion.div>
  );
}

/**
 * Sticky stacking cards: each card pins under the previous one and the earlier
 * cards scale back as you scroll (desktop). Falls back to a normal list on mobile.
 */
export function StackCards({ items }: { items: { title: string; text: string; tag?: string; tone?: "navy" | "cyan" | "white" }[] }) {
  return (
    <div className="relative">
      {items.map((it, i) => (
        <StackCard key={it.title} it={it} i={i} n={items.length} />
      ))}
    </div>
  );
}
function StackCard({ it, i, n }: { it: { title: string; text: string; tag?: string; tone?: "navy" | "cyan" | "white" }; i: number; n: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - (n - i) * 0.04]);
  const tone = it.tone ?? (["navy", "cyan", "white"] as const)[i % 3];
  const cls = tone === "navy" ? "bg-navy text-white" : tone === "cyan" ? "bg-[linear-gradient(135deg,#5CC8D8,#9BE1EB)] text-navy" : "bg-white text-navy border border-line";
  return (
    <div ref={ref} className="md:sticky md:h-[62vh]" style={{ top: `calc(110px + ${i * 28}px)` }}>
      <motion.div style={{ scale }} className={`mb-6 flex min-h-[300px] origin-top flex-col justify-between overflow-hidden rounded-[32px] p-8 shadow-deep sm:p-12 md:h-[52vh] ${cls}`}>
        <div className="flex items-start justify-between gap-6">
          <span className={`font-mono text-sm font-bold ${tone === "navy" ? "text-cyan" : "text-navy/60"}`}>{it.tag ?? `Step ${String(i + 1).padStart(2, "0")}`}</span>
          <span className={`text-[clamp(4rem,10vw,8rem)] font-extrabold leading-none tracking-tighter ${tone === "navy" ? "text-white/10" : "text-navy/10"}`}>{String(i + 1).padStart(2, "0")}</span>
        </div>
        <div className="max-w-2xl">
          <h3 className="mb-3 !text-[clamp(1.8rem,3.6vw,3rem)]">{it.title}</h3>
          <p className={`text-[1.08rem] ${tone === "navy" ? "text-white/75" : "text-navy/70"}`}>{it.text}</p>
        </div>
      </motion.div>
    </div>
  );
}
