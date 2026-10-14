"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ACCOUNT_COMMON, ACCOUNTS } from "@/lib/site";
import { Btn } from "@/components/ui/basic";
import { Icon } from "@/components/ui/Icon";
import { Tilt } from "@/components/ui/scroll";

const TIERS = {
  bronze: {
    rail: "linear-gradient(90deg,#f8e0c8,#d08a4c 42%,#8a4e22)",
    medal: "linear-gradient(160deg,#f6d2ae 0%,#c4844a 48%,#7a421c 100%)",
  },
  silver: {
    rail: "linear-gradient(90deg,#dff7fb,#5cc8d8 46%,#8fdce7)",
    medal: "linear-gradient(160deg,#eef3f7 0%,#9aabbc 46%,#5d6d7e 100%)",
  },
  gold: {
    rail: "linear-gradient(90deg,#fff4cc,#d4af37 46%,#8a6a12)",
    medal: "linear-gradient(160deg,#ffe9a3 0%,#d4af37 48%,#8a6410 100%)",
  },
} as const;

const CHECKS = ACCOUNT_COMMON.filter((c) => !c.includes("Leverage"));

type Account = (typeof ACCOUNTS)[number];

export function AccountPlans({ detailed = false }: { detailed?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.35"] });
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 24, mass: 0.45 });
  const [desk, setDesk] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setDesk(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const glow = useTransform(progress, [0.15, 0.5, 0.9], [0.25, 0.85, 0.35]);
  const glowOpacity = useTransform(glow, (v) => (reduce ? 0.4 : v));

  return (
    <div ref={ref} className="relative mx-auto max-w-[1140px] pt-6">
      <motion.div
        aria-hidden
        style={{ opacity: glowOpacity }}
        className="pointer-events-none absolute left-1/2 top-[18%] h-[62%] w-[min(520px,70%)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(92_200_216/0.55),transparent_68%)] blur-2xl"
      />
      <div className="relative grid items-stretch gap-6 lg:grid-cols-3 lg:gap-5 lg:[perspective:1400px]">
        {ACCOUNTS.map((a, i) => (
          <PlanCard key={a.id} account={a} index={i} progress={progress} detailed={detailed} desk={desk} reduce={!!reduce} />
        ))}
      </div>
    </div>
  );
}

function PlanCard({
  account: a, index: i, progress, detailed, desk, reduce,
}: {
  account: Account; index: number; progress: MotionValue<number>; detailed: boolean; desk: boolean; reduce: boolean;
}) {
  const popular = "popular" in a && a.popular;
  const tier = TIERS[a.id];
  const dark = popular;

  const y = useTransform(progress, [0, 0.48, 1], popular ? [78, -26, 18] : i === 0 ? [54, 10, 26] : [62, 14, 30]);
  const yMobile = useTransform(progress, [0, 0.5, 1], [32, 0, 10]);
  const scale = useTransform(progress, [0, 0.48, 1], popular ? [0.94, 1.045, 1] : [0.985, 1, 0.99]);
  const rotate = useTransform(progress, [0, 0.48, 1], i === 0 ? [-2.4, 0, 0.7] : i === 2 ? [2.4, 0, -0.7] : [0, 0, 0]);
  const sheen = useTransform(progress, [0.08, 0.78], ["108%", "-42%"]);
  const depth = useTransform(progress, [0.1, 0.48, 1], popular ? [0.22, 0.62, 0.34] : [0.1, 0.28, 0.16]);
  const boxShadow = useTransform(depth, (d) =>
    popular
      ? `0 34px 70px -28px rgba(15,38,59,${0.45 + d * 0.4}), 0 0 0 1px rgba(92,200,216,${0.12 + d * 0.45})`
      : `0 22px 44px -26px rgba(23,52,79,${0.18 + d})`,
  );

  const specs: [string, string][] = [
    ["Spreads", a.spread],
    ["Commission", a.commission.replace(" Commission", "")],
    ["Financing", a.swap],
    ["Margin", a.leverage],
  ];

  return (
    <motion.div
      className={`relative h-full ${popular ? "z-10 lg:-mt-2" : "z-0"}`}
      style={reduce ? undefined : desk ? { y, scale, rotate, boxShadow } : { y: yMobile, boxShadow }}
    >
      <motion.div
        className="h-full"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <Tilt className="h-full rounded-[28px]" max={desk ? 5 : 0}>
          {popular && (
            <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[0.7rem] font-extrabold tracking-[0.08em] text-navy shadow-lift ring-1 ring-navy/10">
                <span className="size-1.5 rounded-full bg-cyan-d" />
                Most Popular
              </span>
            </div>
          )}
          <article
            id={a.id}
            className={`group relative flex h-full scroll-mt-28 flex-col overflow-hidden rounded-[28px] p-6 sm:p-7 ${
              dark
                ? "bg-[linear-gradient(180deg,#1c4566_0%,#12283d_55%,#0f2436_100%)] text-white"
                : "bg-white text-navy ring-1 ring-line"
            }`}
          >
            <div className="absolute inset-x-0 top-0 h-[3px]" style={{ background: tier.rail }} />
            <div aria-hidden className="pointer-events-none absolute inset-x-6 top-0 h-10 opacity-50 blur-lg" style={{ background: tier.rail }} />
            <div className={`pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ${dark ? "ring-white/10" : "ring-white"}`} />
            {!reduce && (
              <motion.div
                aria-hidden
                style={{ left: sheen }}
                className={`pointer-events-none absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent ${dark ? "via-white/20" : "via-white/35"} to-transparent`}
              />
            )}
            <span className={`pointer-events-none absolute -right-2 top-14 font-mono text-[5.4rem] font-bold leading-none tracking-tighter ${dark ? "text-white/[0.06]" : "text-navy/[0.045]"}`}>
              0{i + 1}
            </span>

            <div className="relative mb-5 flex items-start justify-between gap-3 pt-1">
              <div
                className="relative grid size-14 place-items-center rounded-full text-white shadow-[inset_0_-5px_8px_rgba(0,0,0,.28),0_10px_18px_-10px_rgba(0,0,0,.55)]"
                style={{ background: tier.medal }}
              >
                <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/50" />
                <Icon name="medal" className="relative size-6" />
              </div>
              <span className={`rounded-full px-2.5 py-1 text-[0.72rem] font-extrabold tracking-wide ${dark ? "bg-white/10 text-cyan" : "bg-cyan-50 text-cyan-d"}`}>
                {a.tag}
              </span>
            </div>

            <p className={`relative font-mono text-[0.78rem] font-bold tracking-[0.16em] ${dark ? "text-cyan" : "text-cyan-d"}`}>0{i + 1}</p>
            <h3 className={`relative !text-[1.65rem] ${dark ? "!text-white" : ""}`}>{a.name} Account</h3>
            <p className={`relative mt-2 text-[0.95rem] leading-relaxed ${dark ? "text-white/72" : "text-muted"}`}>{a.blurb}</p>

            <div className={`relative mt-5 flex items-end justify-between gap-3 border-b pb-4 ${dark ? "border-white/10" : "border-line"}`}>
              <span className="text-[1.85rem] font-extrabold leading-none tracking-tight">{a.priceLabel}</span>
              <span className={`mb-1 text-[0.7rem] font-bold uppercase tracking-[0.14em] ${dark ? "text-white/45" : "text-soft"}`}>Account terms</span>
            </div>

            <div className={`relative my-4 grid grid-cols-2 gap-px overflow-hidden rounded-2xl ${dark ? "bg-white/10" : "bg-line"}`}>
              {specs.map(([k, v]) => (
                <div key={k} className={`px-3.5 py-3 ${dark ? "bg-white/[0.04]" : "bg-[#f7fafc]"}`}>
                  <small className={`block text-[0.7rem] font-semibold uppercase tracking-[0.08em] ${dark ? "text-white/45" : "text-soft"}`}>{k}</small>
                  <b className="mt-0.5 block text-[0.95rem]">{v}</b>
                </div>
              ))}
            </div>

            <motion.ul
              className="relative mb-7 grid gap-2.5"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              variants={{ show: { transition: { staggerChildren: reduce ? 0 : 0.045, delayChildren: 0.12 } } }}
            >
              {CHECKS.map((c) => (
                <motion.li
                  key={c}
                  variants={{
                    hidden: { opacity: 0, x: reduce ? 0 : -10 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  className="flex items-start gap-2.5 text-[0.92rem] leading-snug"
                >
                  <span className={`mt-0.5 grid size-[18px] flex-none place-items-center rounded-full ${dark ? "bg-cyan/20 text-cyan" : "bg-cyan-50 text-cyan-d"}`}>
                    <Icon name="check" className="size-3" />
                  </span>
                  <span className={dark ? "text-white/80" : "text-navy/80"}>{c}</span>
                </motion.li>
              ))}
            </motion.ul>

            <div className="relative mt-auto grid gap-2.5">
              <Btn href="/contact-us" variant={popular ? "accent" : "primary"} className="w-full">Contact Our Team</Btn>
              {!detailed && (
                <Btn
                  href={`/trading-account#${a.id}`}
                  variant="ghost"
                  className={popular ? "w-full !border-white/25 !bg-white/5 !text-white hover:!border-white/70" : "w-full"}
                >
                  See {a.name} Details
                </Btn>
              )}
            </div>
          </article>
        </Tilt>
      </motion.div>
    </motion.div>
  );
}
