"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useIntroReady } from "@/components/site/Preloader";
import { Btn } from "@/components/ui/basic";

const STATS = [
  { v: "Forex", l: "Currencies" },
  { v: "Metals", l: "Precious metals" },
  { v: "Indices", l: "Market indices" },
  { v: "Stocks", l: "Share markets" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const ready = useIntroReady();
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.35]);

  return (
    <section ref={ref} className="relative isolate min-h-[calc(100svh-7.2rem)] overflow-hidden bg-ink text-white">
      <motion.div style={reduce ? undefined : { y }} className="absolute inset-x-0 -top-[8%] h-[120%]">
        <Image
          src="/img/photos/hero-trader.jpg"
          alt="Trader working at a multi-screen desk in a bright Dubai office"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%]"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,38,59,0.78)_0%,rgba(23,52,79,0.62)_42%,rgba(15,38,59,0.84)_100%)]" />

      <motion.div style={reduce ? undefined : { opacity: fade }} className="container-x relative flex min-h-[calc(100svh-7.2rem)] flex-col items-center justify-center py-20 text-center">
        <div className="w-full max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-5 text-[0.95rem] font-semibold tracking-wide text-white/75 sm:text-[1.05rem]"
        >
          Your market. Your strategy. Your next move.
        </motion.p>
        <h1 className="text-balance text-[clamp(2.5rem,5.6vw,4.6rem)] leading-[0.98] text-white">
          {"Trade Global Markets With Confidence".split(" ").map((w, i) => (
            <span key={w} className="inline-block overflow-hidden align-bottom">
              <motion.span
                className="inline-block"
                initial={{ y: "110%" }}
                animate={ready ? { y: 0 } : undefined}
                transition={{ duration: 0.85, delay: 0.08 + i * 0.06, ease: EASE }}
              >
                {w}
              </motion.span>
              {i < 4 ? "\u00a0" : ""}
            </span>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
          className="mx-auto mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-white/78 sm:text-[1.15rem]"
        >
          Access global financial markets through a trading experience built around transparency, technology and informed decision-making.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, delay: 0.58, ease: EASE }}
          className="mx-auto mt-10 grid w-full max-w-3xl grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4"
        >
          {STATS.map((s) => (
            <div key={s.l}>
              <div className="text-[1.35rem] font-extrabold tracking-tight sm:text-[1.7rem]">{s.v}</div>
              <div className="text-[0.84rem] text-white/65">{s.l}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, delay: 0.72, ease: EASE }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Btn href="/market" className="!bg-white !text-navy hover:!bg-cyan-50">Explore Markets</Btn>
          <Btn href="/about-us" variant="ghost" className="!border-transparent !bg-transparent !text-white hover:!bg-white/10">Discover Tattvam</Btn>
        </motion.div>
        <p className="mx-auto mt-8 max-w-xl text-[0.78rem] leading-relaxed text-white/55">
          Account features, costs and eligibility are set out in the relevant terms and risk disclosures.
        </p>
        </div>
      </motion.div>
    </section>
  );
}
