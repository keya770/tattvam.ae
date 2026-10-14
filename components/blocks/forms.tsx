"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, type FormEvent } from "react";

type Kind = "partner" | "institutional" | "contact";

const SELECTS: Record<Exclude<Kind, "contact">, { label: string; name: string; options: string[] }> = {
  partner: { label: "Partnership type", name: "programme", options: ["Introducing broker", "Financial services professional", "Marketing or referral partner", "Distribution relationship", "Other"] },
  institutional: { label: "Business Type", name: "businessType", options: ["Broker / White Label", "Fund / Asset Manager", "Proprietary Desk", "Introducing Broker", "Other"] },
};

export function EnquiryForm({ kind, submitLabel = "Request for Callback" }: { kind: Kind; submitLabel?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "err">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (fd.get("website")) return; // honeypot
    setState("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, ...Object.fromEntries(fd.entries()) }),
      });
      setState(res.ok ? "ok" : "err");
      if (res.ok) form.reset();
    } catch {
      setState("err");
    }
  }

  const sel = kind !== "contact" ? SELECTS[kind] : null;

  return (
    <form onSubmit={onSubmit} className="rounded-[32px] border border-line bg-white p-6 shadow-lift sm:p-9">
      <div className="grid gap-3.5 sm:grid-cols-2">
        {kind === "contact" ? (
          <>
            <div className="field sm:col-span-2"><label htmlFor="f-name">Full Name</label><input id="f-name" name="fullName" required autoComplete="name" /></div>
            <div className="field"><label htmlFor="f-email">Email Address</label><input id="f-email" name="email" type="email" required autoComplete="email" /></div>
            <div className="field"><label htmlFor="f-phone">Phone Number</label><input id="f-phone" name="phone" type="tel" required autoComplete="tel" /></div>
            <div className="field"><label htmlFor="f-country">Country of Residence</label><input id="f-country" name="country" required autoComplete="country-name" /></div>
            <div className="field">
              <label htmlFor="f-type">Type of Enquiry</label>
              <select id="f-type" name="enquiryType" required defaultValue="">
                <option value="" disabled>Please Select</option>
                {["General enquiry", "Client support", "Account enquiry", "Partnership", "Other"].map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="field sm:col-span-2"><label htmlFor="f-msg">Message</label><textarea id="f-msg" name="message" required /></div>
          </>
        ) : (
          <>
            <div className="field"><label htmlFor="f-gn">Given Name</label><input id="f-gn" name="givenName" required autoComplete="given-name" /></div>
            <div className="field"><label htmlFor="f-sn">Surname</label><input id="f-sn" name="surname" required autoComplete="family-name" /></div>
            <div className="field sm:col-span-2"><label htmlFor="f-org">Organization</label><input id="f-org" name="organization" autoComplete="organization" /></div>
            <div className="field"><label htmlFor="f-mob">Mobile Number</label><input id="f-mob" name="mobile" type="tel" required autoComplete="tel" /></div>
            <div className="field"><label htmlFor="f-em">Email Address</label><input id="f-em" name="email" type="email" required autoComplete="email" /></div>
            <div className="field"><label htmlFor="f-c">Country of Residence</label><input id="f-c" name="country" required autoComplete="country-name" /></div>
            <div className="field">
              <label htmlFor="f-sel">{sel!.label}</label>
              <select id="f-sel" name={sel!.name} required defaultValue="">
                <option value="" disabled>Please Select</option>
                {sel!.options.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="field sm:col-span-2"><label htmlFor="f-n">Nature of Inquiry</label><textarea id="f-n" name="inquiry" /></div>
          </>
        )}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      </div>
      <motion.button whileTap={{ scale: 0.97 }} disabled={state === "sending"} className="btn btn-primary mt-6 w-full disabled:opacity-70">
        {state === "sending" ? (
          <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }} className="size-4 rounded-full border-2 border-white/40 border-t-white" />
        ) : null}
        {state === "sending" ? "Sending…" : submitLabel}
      </motion.button>
      <AnimatePresence>
        {state === "ok" && (
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 rounded-xl bg-up-50 p-3.5 text-[0.92rem] font-bold text-up">
            ✓ Thank you — our team will be in touch within one business day.
          </motion.p>
        )}
        {state === "err" && (
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 rounded-xl bg-down-50 p-3.5 text-[0.92rem] font-bold text-down">
            Something went wrong. Please email customersupport@tattvammarkets.com.
          </motion.p>
        )}
      </AnimatePresence>
      <p className="mt-3 text-[0.78rem] text-soft">By submitting this form, you acknowledge our Privacy Policy. Any consent for marketing communications should be obtained separately where required.</p>
    </form>
  );
}
