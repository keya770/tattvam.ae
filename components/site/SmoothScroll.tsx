"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { motion, useScroll, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";

function RouteReset() {
  const lenis = useLenis();
  const path = usePathname();
  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
  }, [path, lenis]);
  return null;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.085,
        smoothWheel: true,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.4,
        anchors: { offset: -96 },
        allowNestedScroll: true,
      }}
    >
      <RouteReset />
      {children}
    </ReactLenis>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-cyan to-navy" />;
}

export function BackToTop() {
  const lenis = useLenis();
  const [show, setShow] = useState(false);
  useLenis(({ scroll }) => setShow(scroll > 700));
  return (
    <motion.button
      aria-label="Back to top"
      onClick={() => lenis?.scrollTo(0)}
      initial={false}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 20, pointerEvents: show ? "auto" : "none" }}
      className="fixed bottom-24 right-4 z-[55] grid size-12 place-items-center rounded-full border border-line bg-white text-navy shadow-lift sm:right-6"
    >
      <Icon name="arrowUp" className="size-5" />
    </motion.button>
  );
}
