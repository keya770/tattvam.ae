import type { Metadata } from "next";
import { AccountsArt, ConditionsArt, RiskArt } from "@/components/art/scenes";
import { InfoPage } from "@/components/blocks/InfoPage";
import { ACCOUNTS } from "@/lib/site";
import { SectionHead } from "@/components/ui/basic";
import { Reveal } from "@/components/ui/motion";

export const metadata: Metadata = { title: "Trading Conditions", description: "Spreads, leverage, swap policies and margin requirements across Bronze, Silver and Gold MT5 accounts." };

function ConditionsTable() {
  const rows: [string, (a: (typeof ACCOUNTS)[number]) => string][] = [
    ["Minimum deposit", (a) => `$${a.deposit.toLocaleString()}`],
    ["Spread from", (a) => a.spread],
    ["Commission", (a) => a.commission],
    ["Swap", (a) => a.swap],
    ["Leverage", () => "Up to 1:2000"],
    ["Stop out", () => "20%"],
    ["Account currencies", () => "AED · USD"],
  ];
  return (
    <section className="section section-cyan">
      <div className="container-x">
        <SectionHead eyebrow="At a glance" title="Account conditions compared" />
        <Reveal>
          <div className="overflow-x-auto rounded-3xl border border-line bg-white shadow-soft">
            <table className="w-full min-w-[640px]">
              <thead className="bg-bg">
                <tr>
                  <th className="px-5 py-4 text-left text-[0.72rem] uppercase tracking-[0.08em] text-soft">Condition</th>
                  {ACCOUNTS.map((a) => <th key={a.id} className="px-5 py-4 text-left text-base font-extrabold">{a.name}</th>)}
                </tr>
              </thead>
              <tbody>
                {rows.map(([k, f]) => (
                  <tr key={k} className="border-t border-line transition-colors hover:bg-bg">
                    <td className="px-5 py-4 text-muted">{k}</td>
                    {ACCOUNTS.map((a) => <td key={a.id} className="px-5 py-4 font-semibold">{f(a)}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <InfoPage
      name="Trading Conditions"
      title="Trading Conditions"
      highlight="Conditions"
      text="Clear, transparent trading conditions across all account types. Know your spreads, leverage, swap policies, and margin requirements before you trade."
      primary="Trade These Conditions"
      art={<ConditionsArt />}
      blocks={[
        { title: "Transparent pricing across every account", text: "Our trading conditions are designed to be straightforward. Spreads, commissions, and swap policies vary by account type so you can choose the structure that fits your strategy — from commission-free accounts to low-spread Gold tiers.", art: <AccountsArt />, photo: { src: "/img/photos/conditions.jpg", badge: ["Spreads from", "0.1 pips"] } },
        { title: "Leverage & margin you can plan around", text: "Leverage varies by instrument class to reflect market risk. Forex majors may be offered up to 1:500, while share CFDs and indices carry lower maximum leverage in line with regulatory best practice.", art: <RiskArt /> },
      ]}
      features={[
        { icon: "eye", title: "No hidden fees", text: "All core costs are disclosed upfront in your account specifications." },
        { icon: "clock", title: "Swap-free option", text: "Bronze accounts offer swap-free trading for eligible clients." },
        { icon: "sliders", title: "Flexible lot sizes", text: "Trade micro lots to manage risk precisely on MT5." },
        { icon: "shield", title: "Negative balance protection", text: "Retail accounts include safeguards against negative balances." },
      ]}
      extra={<ConditionsTable />}
    />
  );
}
