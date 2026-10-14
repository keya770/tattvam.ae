import { Btn } from "@/components/ui/basic";
import { HelpArt } from "@/components/art/scenes";

export default function NotFound() {
  return (
    <section className="hero-bg section">
      <div className="container-x grid items-center gap-10 lg:grid-cols-2">
        <div>
          <span className="eyebrow">Error 404</span>
          <h1 className="mb-4">This page has moved off the chart.</h1>
          <p className="mb-8 text-muted">The page you are looking for doesn&apos;t exist or may have been relocated.</p>
          <div className="flex flex-wrap gap-3"><Btn href="/" arrow>Back to Home</Btn><Btn href="/help-centre" variant="ghost">Help Centre</Btn></div>
        </div>
        <HelpArt />
      </div>
    </section>
  );
}
