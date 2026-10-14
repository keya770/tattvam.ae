import type { Metadata } from "next";
import { ExecutionArt, InstitutionalArt, Mt5Art } from "@/components/art/scenes";
import { InfoPage } from "@/components/blocks/InfoPage";

export const metadata: Metadata = { title: "Fast Execution", description: "Ultra-low latency order routing on MetaTrader 5 to reduce slippage when volatility spikes." };

export default function Page() {
  return (
    <InfoPage
      name="Fast Execution"
      title="Fast Execution"
      highlight="Fast"
      text="Ultra-low latency order routing helps your trades reach the market quickly — reducing slippage when volatility spikes."
      primary="Trade with Fast Fills"
      art={<ExecutionArt />}
      blocks={[
        { title: "Speed matters when markets move", text: "Delayed execution can mean missed entries and wider effective spreads. Our infrastructure is optimised for low-latency order transmission, helping ensure your market and pending orders are processed promptly under normal market conditions.", art: <Mt5Art />, photo: { src: "/img/photos/execution.jpg", badge: ["Order routing", "Low latency"] } },
        { title: "Professional infrastructure at every level", text: "From retail traders to introducing brokers, everyone benefits from the same core execution stack. Monitor fill quality directly on MT5 and adjust your strategy with confidence.", art: <InstitutionalArt /> },
      ]}
      features={[
        { icon: "bolt", title: "Market orders", text: "Instant routing to aggregated liquidity providers." },
        { icon: "target", title: "Pending orders", text: "Stop, limit, and stop-limit orders managed on-server." },
        { icon: "server", title: "VPS compatible", text: "Run EAs on a VPS for 24/7 automated strategies." },
        { icon: "monitor", title: "Multi-device", text: "Execute from desktop, web, or mobile MT5 apps." },
      ]}
    />
  );
}
