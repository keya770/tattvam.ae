import type { Metadata } from "next";
import { CalculatorArt, OnboardingArt, SecurityArt } from "@/components/art/scenes";
import { InfoPage } from "@/components/blocks/InfoPage";

export const metadata: Metadata = { title: "Client Fund Security", description: "Segregated client funds, PCI-compliant payments and FSC regulatory standards." };

export default function Page() {
  return (
    <InfoPage
      name="Fund Security"
      title="Client Fund Security"
      highlight="Fund Security"
      text="Your capital deserves institutional-grade protection. Client funds are segregated, payments are PCI-compliant, and regulatory standards guide every operational decision."
      primary="Trade with Protected Funds"
      art={<SecurityArt />}
      blocks={[
        { title: "Segregated client funds", text: "Client money is held in segregated bank accounts, separate from Tattvam Capital Markets Ltd operational funds. This structure helps ensure your trading balance is ring-fenced in accordance with regulatory requirements.", art: <OnboardingArt />, photo: { src: "/img/photos/security.jpg", badge: ["Client funds", "Segregated"] } },
        { title: "Secure payments & data protection", text: "Fund your account via bank transfer or major card schemes processed through PCI DSS-compliant payment channels. We apply industry-standard encryption and internal controls to protect your personal and financial data.", art: <CalculatorArt /> },
      ]}
      features={[
        { icon: "flag", title: "Regulated entity", text: "Tattvam Capital Markets Ltd holds FSC Investment Dealer licence." },
        { icon: "wallet", title: "Withdrawal process", text: "Withdrawals processed to verified account holders." },
        { icon: "user", title: "KYC verification", text: "Secure onboarding with identity and address verification." },
        { icon: "doc", title: "Operational transparency", text: "Legal documents and policies published on our website." },
      ]}
    />
  );
}
