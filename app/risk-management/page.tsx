import type { Metadata } from "next";
import { CalculatorArt, ConditionsArt, RiskArt } from "@/components/art/scenes";
import { InfoPage } from "@/components/blocks/InfoPage";
import { SectionHead } from "@/components/ui/basic";
import { Stagger, StaggerItem } from "@/components/ui/motion";

export const metadata: Metadata = { title: "Risk Management", description: "Position sizing, margin awareness and the safeguards built into our regulated MT5 offering." };

function Formulas() {
  const f = [
    { k: "Required margin", v: "(Volume × Contract × Price) ÷ Leverage", n: "Margin is held while a position is open." },
    { k: "Swap timing", v: "Charged at 21:00 GMT", n: "Triple swap on Wednesday (FX) and Friday (other assets)." },
    { k: "Stop out", v: "Margin level ≤ 20%", n: "Positions are closed to protect your account." },
  ];
  return (
    <section className="section section-cyan">
      <div className="container-x">
        <SectionHead eyebrow="Formulas" title="Margin, Swaps & Leverage" text="Required margin follows (volume × price) / leverage. Overnight swaps apply at 21:00 GMT with triple charges on Wednesday for FX and Friday for other asset classes." />
        <Stagger className="grid gap-5 md:grid-cols-3">
          {f.map((x) => (
            <StaggerItem key={x.k}>
              <div className="card card-hover h-full">
                <span className="eyebrow !mb-2">{x.k}</span>
                <p className="mb-2 rounded-xl bg-navy px-4 py-3 font-mono text-[0.95rem] font-semibold !text-cyan">{x.v}</p>
                <p className="text-[0.92rem] text-muted">{x.n}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <InfoPage
      name="Risk Management"
      title="Risk Management"
      highlight="Risk"
      text="Protect capital with disciplined position sizing, margin awareness, and the safeguards built into our regulated MT5 offering."
      primary="Trade with Risk Controls"
      art={<RiskArt />}
      blocks={[
        { eyebrow: "Protect Capital", title: "Risk Controls on MT5", text: "Trade with awareness of margin requirements, leverage limits, and the safeguards that apply to regulated retail accounts at Tattvam Capital Markets.", art: <ConditionsArt /> },
        { eyebrow: "Plan Every Trade", title: "Size positions before you trade", text: "Use the Tattvam trading calculators to estimate margin, pip value and overnight swaps — then set stop-loss and take-profit levels that match your risk tolerance.", art: <CalculatorArt /> },
      ]}
      features={[
        { icon: "target", title: "Stop-loss orders", text: "Define your maximum loss on every position." },
        { icon: "trend", title: "Take-profit orders", text: "Lock in gains automatically at your target." },
        { icon: "gauge", title: "Margin awareness", text: "Monitor margin level and stop-out thresholds live on MT5." },
        { icon: "shield", title: "Negative balance protection", text: "Safeguards for regulated retail accounts." },
      ]}
      extra={<Formulas />}
    />
  );
}
