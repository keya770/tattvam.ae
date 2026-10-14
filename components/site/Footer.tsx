import Image from "next/image";
import Link from "next/link";
import { LEGAL_LINKS, NAV, SOCIALS } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";

export function Footer() {
  const cols = [
    { h: "Trading", items: NAV[0].items! },
    { h: "Markets", items: NAV[1].items! },
    { h: "Platforms & Partners", items: [...NAV[2].items!, ...NAV[3].items!] },
    { h: "Company & Legal", items: [...NAV[4].items!, ...LEGAL_LINKS] },
  ];
  return (
    <footer className="relative overflow-hidden bg-[linear-gradient(180deg,#EAF8FB_0%,#D3F0F5_100%)] pt-16">
      <div className="h-1 w-full bg-gradient-to-r from-cyan via-navy to-cyan absolute top-0 left-0" />
      <div className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[clamp(5rem,18vw,16rem)] font-extrabold leading-none tracking-tighter text-white/60" aria-hidden>TATTVAM</div>
      <div className="container-x relative">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-[1.5fr_repeat(4,1fr)]">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Image src="/img/logo.png" alt="Tattvam" width={600} height={133} className="mb-4 h-10 w-[180px]" />
            <p className="max-w-sm text-[0.92rem] text-muted">
              Tattvam Capital Securities. Market access, technology and client-focused service — with clear information about products, costs and risks.
            </p>
            <div className="mt-5 flex gap-2">
              {SOCIALS.map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name} className="grid size-10 place-items-center rounded-xl border border-white bg-white text-navy shadow-soft transition hover:-translate-y-1 hover:bg-navy hover:text-white">
                  <Icon name={s.icon} className="size-[18px]" />
                </a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.h}>
              <h4 className="mb-3.5 text-[0.78rem] uppercase tracking-[0.12em] text-soft">{c.h}</h4>
              <ul className="grid gap-2.5">
                {c.items.map((i) => (
                  <li key={i.href}><Link href={i.href} className="text-[0.92rem] text-muted transition-colors hover:text-cyan-d">{i.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-3 border-t border-navy/10 py-7 text-[0.82rem] leading-relaxed text-muted">
          <p>
            <strong className="text-navy">Tattvam Capital Securities</strong> — Dubai, United Arab Emirates. Product availability, account features and platform names are subject to the applicable terms and regulatory requirements.
          </p>
          <p>
            <strong className="text-navy">Risk Warning:</strong> Trading leveraged products involves a high risk of losing money. You should understand how the products work and whether you can afford the risk. Please read our{" "}
            <Link href="/risk-disclosure-policy" className="font-semibold text-cyan-d">Risk Disclosure Policy</Link>. Educational content on this website is for general information and is not individual financial advice.
          </p>
          <p>Services are not intended for distribution in any country or jurisdiction where that distribution would be contrary to local law or regulation.</p>
        </div>
        <div className="flex flex-wrap justify-between gap-4 border-t border-navy/10 pb-28 pt-5 text-[0.85rem] text-soft">
          <span>© {new Date().getFullYear()} Tattvam Capital Securities. All rights reserved.</span>
          <span>Dubai, United Arab Emirates</span>
        </div>
      </div>
    </footer>
  );
}
