"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export function RiskBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let dismissed = false;
    try { dismissed = sessionStorage.getItem("tv-risk") === "1"; } catch {}
    if (!dismissed) setShow(true);
  }, []);
  const close = () => {
    setShow(false);
    try { sessionStorage.setItem("tv-risk", "1"); } catch {}
  };
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="region"
          aria-label="Risk warning"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 200, damping: 24 }}
          className="fixed inset-x-3 bottom-3 z-[60] mx-auto flex max-w-[880px] items-center gap-3 rounded-2xl bg-navy py-3 pl-4 pr-3 text-[0.84rem] text-[#dbe9f3] shadow-deep sm:inset-x-4 sm:bottom-4 sm:pl-5"
        >
          <span className="hidden size-2 flex-none rounded-full bg-cyan sm:block" />
          <p className="m-0">
            <b className="text-white">Risk Warning:</b> CFDs involve significant risk and may result in loss of capital.{" "}
            <Link href="/risk-disclosure-policy" className="font-bold text-cyan">Learn more</Link>
          </p>
          <button onClick={close} aria-label="Dismiss risk warning" className="ml-auto grid size-8 flex-none place-items-center rounded-lg bg-white/10 text-white hover:bg-white/20">✕</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
