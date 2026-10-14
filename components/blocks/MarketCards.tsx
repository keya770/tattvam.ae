import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Stagger, StaggerItem } from "@/components/ui/motion";

export const MARKET_CARDS = [
  { href: "/market/forex-detail", t: "Forex", d: "Explore currency pairs and the factors that influence exchange rates.", lev: "Explore", icon: "fx" },
  { href: "/market/uae-shares-detail", t: "Precious Metals", d: "Follow gold, silver and other available metals.", lev: "Explore", icon: "gold" },
  { href: "/market/commodities-detail", t: "Commodities", d: "Markets influenced by global supply, demand and economic developments.", lev: "Explore", icon: "trend" },
  { href: "/market/indices-detail", t: "Indices", d: "Track selected markets through major stock market indices.", lev: "Explore", icon: "bars" },
  { href: "/market/us-shares-detail", t: "Stocks", d: "Selected company shares and share-based instruments, where offered.", lev: "Explore", icon: "building" },
];

export function MarketCards({ exclude }: { exclude?: string }) {
  // Icon cards (no photos) so market photos are never repeated across the site.
  return (
    <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {MARKET_CARDS.filter((m) => m.href !== exclude).map((m, i) => (
        <StaggerItem key={m.href} className="h-full">
          <Link href={m.href} className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-3xl border border-line bg-white p-7 transition duration-500 [transition-timing-function:cubic-bezier(.22,1,.36,1)] hover:-translate-y-2 hover:border-cyan-2 hover:shadow-deep">
            <div className="absolute -right-16 -top-16 size-44 rounded-full bg-[radial-gradient(circle,rgb(92_200_216/.3),transparent_70%)] transition-transform duration-700 group-hover:scale-[1.8]" />
            <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-cyan to-navy transition-transform duration-700 group-hover:scale-x-100" />
            <div className="relative flex items-center justify-between">
              <span className="grid size-12 place-items-center rounded-2xl bg-navy text-white transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"><Icon name={m.icon} className="size-6" /></span>
              <span className="font-mono text-sm font-bold text-line-2">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="relative !mb-0 mt-2 !text-xl">{m.t}</h3>
            <p className="relative text-muted">{m.d}</p>
            <div className="relative mt-auto flex items-center justify-between pt-2">
              <span className="inline-flex items-center gap-1.5 font-bold text-cyan-d">Explore market <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" /></span>
              <span className="rounded-full bg-cyan-50 px-3 py-1 font-mono text-[0.78rem] font-bold text-cyan-d">{m.lev}</span>
            </div>
          </Link>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
