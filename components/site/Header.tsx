"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";
import { LINKS, NAV, type NavGroup } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";

function isActive(path: string, g: NavGroup) {
  return g.items?.some((i) => path === i.href || (i.href !== "/market" && path.startsWith(i.href))) || (g.items?.some((i) => i.href === "/market") && path.startsWith("/market"));
}

export function Header() {
  const path = usePathname();
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);

  const [hidden, setHidden] = useState(false);
  useLenis(({ scroll, direction }) => {
    setScrolled(scroll > 8);
    // Hide on scroll down, reveal on scroll up (WaveRun-style)
    if (scroll < 200) setHidden(false);
    else if (direction === 1) setHidden(true);
    else if (direction === -1) setHidden(false);
  });
  useEffect(() => {
    setOpen(false);
    setHover(null);
  }, [path]);
  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    document.body.style.overflow = open ? "hidden" : "";
  }, [open, lenis]);

  return (
    <>
      {/* Top bar */}
      <div className="bg-navy text-[0.8rem] text-[#cfe3ef]">
        <div className="container-x flex min-h-9 items-center justify-between gap-3">
          <div className="flex items-center gap-5">
            <Link href="/about-us" className="inline-flex items-center gap-2 hover:text-white">
              <span className="size-2 rounded-full bg-[#4ee0a6] animate-ping-soft" />
              Tattvam Capital Securities
            </Link>
            <span className="hidden opacity-70 md:inline">Dubai, UAE</span>
            <Link href="/contact-us" className="hidden hover:text-white lg:inline">Contact our team</Link>
          </div>
          <div className="flex items-center gap-4">
            <a href={LINKS.login} target="_blank" rel="noopener noreferrer" className="hidden hover:text-white sm:inline">Client Login</a>
            <div className="flex gap-1">
              <span className="font-bold text-white">EN</span>
              <span className="opacity-40">·</span>
              <a href="https://tattvammarkets.com/ar" className="opacity-70 hover:opacity-100">AR</a>
              <span className="opacity-40">·</span>
              <a href="https://tattvammarkets.com/hi" className="opacity-70 hover:opacity-100">HI</a>
            </div>
          </div>
        </div>
      </div>

      <header className={`sticky top-0 z-50 border-b backdrop-blur-xl backdrop-saturate-150 transition-all duration-500 [transition-timing-function:cubic-bezier(.22,1,.36,1)] ${hidden && !open && !hover ? "-translate-y-full" : "translate-y-0"} ${scrolled ? "border-line bg-white/90 shadow-soft" : "border-transparent bg-white/75"}`}>
        <nav className="container-x flex h-[72px] items-center gap-4 lg:h-[76px]">
          <Link href="/" className="flex-none" aria-label="Tattvam Markets home">
            <Image src="/img/logo.png" alt="Tattvam" width={600} height={133} priority className="h-8 w-[144px] sm:h-9 sm:w-[162px]" />
          </Link>

          {/* Desktop menu */}
          <ul className="ml-auto hidden items-center gap-0.5 xl:flex" onMouseLeave={() => setHover(null)}>
            <li>
              <Link href="/" className={`rounded-xl px-3 py-2.5 text-[0.93rem] font-semibold hover:bg-cyan-50 ${path === "/" ? "text-cyan-d" : ""}`}>Home</Link>
            </li>
            {NAV.map((g) => (
              <li key={g.label} className="relative" onMouseEnter={() => setHover(g.label)}>
                <button
                  onClick={() => setHover(hover === g.label ? null : g.label)}
                  aria-expanded={hover === g.label}
                  className={`flex items-center gap-1 rounded-xl px-3 py-2.5 text-[0.93rem] font-semibold transition-colors hover:bg-cyan-50 ${isActive(path, g) ? "text-cyan-d" : ""} ${hover === g.label ? "bg-cyan-50" : ""}`}
                >
                  {g.label}
                  <Icon name="chev" className={`size-3.5 transition-transform ${hover === g.label ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {hover === g.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, x: "-50%" }}
                      animate={{ opacity: 1, y: 0, x: "-50%" }}
                      exit={{ opacity: 0, y: 6, x: "-50%" }}
                      transition={{ duration: 0.18 }}
                      className={`absolute left-1/2 top-[calc(100%+10px)] rounded-2xl border border-line bg-white p-2.5 shadow-deep before:absolute before:inset-x-0 before:-top-3 before:h-3 ${g.wide ? "grid w-[580px] grid-cols-2 gap-0.5" : "w-[310px]"}`}
                    >
                      {g.items!.map((it) => (
                        <Link key={it.href} href={it.href} className={`group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-bg ${path === it.href ? "bg-cyan-50" : ""}`}>
                          <span className="grid size-10 flex-none place-items-center rounded-xl bg-cyan-50 text-cyan-d transition-transform group-hover:scale-110">
                            <Icon name={it.icon ?? "spark"} className="size-5" />
                          </span>
                          <span>
                            <b className="block text-[0.93rem]">{it.label}</b>
                            <small className="block text-[0.8rem] leading-snug text-muted">{it.desc}</small>
                          </span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-2 xl:ml-3">
            <a href={LINKS.demo} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm hidden md:inline-flex">Try Demo</a>
            <a href={LINKS.register} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm hidden sm:inline-flex">Start Trading</a>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid size-11 place-items-center rounded-xl border border-line-2 bg-white xl:hidden"
            >
              <span className="relative block h-3.5 w-5">
                <motion.span animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className="absolute left-0 top-0 h-0.5 w-5 rounded bg-navy" />
                <motion.span animate={{ opacity: open ? 0 : 1 }} className="absolute left-0 top-1.5 h-0.5 w-5 rounded bg-navy" />
                <motion.span animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} className="absolute left-0 top-3 h-0.5 w-5 rounded bg-navy" />
              </span>
            </button>
          </div>
        </nav>

      </header>
        {/* Mobile drawer */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 34 }}
              data-lenis-prevent
              className="fixed inset-0 z-[80] overflow-y-auto bg-white px-5 pb-32 xl:hidden"
            >
              <div className="sticky top-0 z-10 -mx-5 mb-2 flex h-[72px] items-center justify-between border-b border-line bg-white px-5">
                <Image src="/img/logo.png" alt="Tattvam" width={600} height={133} className="h-8 w-[144px]" />
                <button onClick={() => setOpen(false)} aria-label="Close menu" className="grid size-11 place-items-center rounded-xl border border-line-2">
                  <Icon name="close" className="size-5" />
                </button>
              </div>
              <Link href="/" className="flex border-b border-line py-4 text-[1.05rem] font-semibold">Home</Link>
              {NAV.map((g, gi) => {
                const on = mobileGroup === g.label;
                return (
                  <motion.div key={g.label} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + gi * 0.05 }} className="border-b border-line">
                    <button onClick={() => setMobileGroup(on ? null : g.label)} className="flex w-full items-center justify-between py-4 text-[1.05rem] font-semibold">
                      {g.label}
                      <Icon name="chev" className={`size-4 transition-transform ${on ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence initial={false}>
                      {on && (
                        <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                          <div className="grid gap-1 pb-3">
                            {g.items!.map((it) => (
                              <Link key={it.href} href={it.href} className="flex items-center gap-3 rounded-xl p-2.5 hover:bg-bg">
                                <span className="grid size-9 place-items-center rounded-lg bg-cyan-50 text-cyan-d"><Icon name={it.icon ?? "spark"} className="size-[18px]" /></span>
                                <span><b className="block text-[0.93rem]">{it.label}</b><small className="text-[0.8rem] text-muted">{it.desc}</small></span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
              <div className="grid grid-cols-2 gap-3 pt-6">
                <a href={LINKS.demo} className="btn btn-ghost">Try Demo</a>
                <a href={LINKS.register} className="btn btn-primary">Start Trading</a>
                <a href={LINKS.login} className="btn btn-ghost col-span-2">Client Login</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
    </>
  );
}
