import type { Metadata } from "next";
import { LINKS } from "@/lib/site";
import { AcuityArt, CalculatorArt, Mt5Art } from "@/components/art/scenes";
import { CtaBand, PageHero, Split, Steps } from "@/components/blocks/sections";
import { Mt5Guide } from "@/components/blocks/Mt5Guide";
import { Btn, SectionHead } from "@/components/ui/basic";
import { ParallaxPhoto, PhotoBadge } from "@/components/ui/scroll";
import { Tabs } from "@/components/ui/interactive";
import { Icon } from "@/components/ui/Icon";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";

export const metadata: Metadata = { title: "Trading Platform", description: "Monitor markets, analyse charts, manage orders and review your account. Platform names and features are confirmed before publication." };

const DL = [
  { icon: "windows", l: "Windows", s: "Desktop terminal", h: LINKS.mt5Win },
  { icon: "apple", l: "macOS", s: "Desktop terminal", h: LINKS.mt5Mac },
  { icon: "phone", l: "iOS", s: "iPhone & iPad", h: LINKS.mt5Ios },
  { icon: "linux", l: "Linux", s: "Install guide", h: LINKS.mt5Linux },
];

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Platforms" }, { label: "MetaTrader 5" }]}
        eyebrow="Platforms"
        title="Trading Technology Designed Around You"
        highlight="Around You"
        text="A trading platform should help you access market prices, analyse charts, manage orders and monitor your positions in one place."
        primary={{ label: "Explore the Platform", href: "#mt5-download" }}
        secondary={{ label: "Contact Our Team", href: "/contact-us" }}
        art={<Mt5Art />}
      />
      <section className="section">
        <div className="container-x">
          <Split bare eyebrow="Platform features" title="The tools to navigate the markets" media={<ParallaxPhoto src="/img/photos/mt5-desk.jpg" alt="Laptop and smartphone showing trading charts" badge={<PhotoBadge title="Where supported" value="Desktop · browser · mobile" />} />} cta={<Btn href="/contact-us" arrow>Contact Our Team</Btn>}>
            <p>At Tattvam Capital Securities, our platform offering is intended to provide clients with access to the tools and information required to manage their trading activity. Platform availability, features and third-party product names will be confirmed before publication.</p>
            <ul className="checks mt-4 sm:grid-cols-2">
              {["Market monitoring", "Charting and technical analysis", "Order management", "Account overview", "Access across devices, where supported"].map((x) => <li key={x}>{x}</li>)}
            </ul>
          </Split>
        </div>
      </section>

      <section id="mt5-download" className="section scroll-mt-24 bg-white">
        <div className="container-x">
          <SectionHead center eyebrow="Get the App" title="Download MetaTrader 5" text="Get the MT5 app for desktop or mobile — then log in with your Tattvam account." />
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DL.map((d) => (
              <StaggerItem key={d.l}>
                <a href={d.h} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-3xl border border-line bg-white p-5 transition hover:-translate-y-1.5 hover:border-navy hover:shadow-lift">
                  <span className="grid size-14 place-items-center rounded-2xl bg-navy text-white transition-transform group-hover:scale-110"><Icon name={d.icon} className="size-7" /></span>
                  <span className="flex-1"><b className="block text-lg">{d.l}</b><small className="text-muted">{d.s}</small></span>
                  <Icon name="download" className="size-5 text-cyan-d transition-transform group-hover:translate-y-0.5" />
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHead eyebrow="Android & iOS" title="How It Works" text="Login, trade, chart, and manage tools, properties, Tradays, expiry dates, commission rates, and swap charges on MetaTrader 5 mobile." />
          <Reveal><Mt5Guide /></Reveal>
        </div>
      </section>

      <section className="section section-cyan">
        <div className="container-x">
          <SectionHead eyebrow="Platforms" title="Trade on Mobile, Desktop & Web" text="One MetaTrader 5 account — trade, chart, and manage positions on every device." />
          <Reveal>
            <Tabs items={[
              { id: "m", label: "Mobile", content: <Split title="Access the platform on your mobile device" media={<AcuityArt />}><p>Access the platform on your mobile device for convenient trading with the official MetaTrader 5 app for Android and iOS.</p></Split> },
              { id: "d", label: "Desktop", content: <Split title="Full-power desktop terminal" media={<Mt5Art />}><p>Advanced charting, Expert Advisors, the strategy tester and depth of market on Windows, macOS and Linux.</p></Split> },
              { id: "w", label: "WebTrader", content: <Split title="Trade straight from your browser" media={<CalculatorArt />}><p>No downloads needed — log in from any modern browser and keep your workspace synced with your mobile and desktop apps.</p></Split> },
            ]} />
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHead eyebrow="Get started" title="How to Get Started with MT5" />
          <Steps cols={4} items={[
            { title: "Download", text: "Download MT5 for Windows, iOS, or Linux from the Get the App section." },
            { title: "Login", text: "When launching the platform for the first time, click on File and select Login to Trade Account." },
            { title: "Credentials", text: "Enter your Tattvam account login credentials — find your login ID in the client portal under My Accounts." },
            { title: "Trade", text: "Place market, pending, and stop orders — then analyse price with 3 chart types and 9 timeframes." },
          ]} />
        </div>
      </section>
      <CtaBand secondary={{ label: "Client Login", href: LINKS.login }} />
    </>
  );
}
