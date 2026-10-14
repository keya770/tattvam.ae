import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./Icon";
import { Reveal } from "./motion";
import { Magnetic, TitleReveal } from "./scroll";

type BtnVariant = "primary" | "accent" | "ghost";

export function Btn({
  href, children, variant = "primary", small, arrow, className = "",
}: { href: string; children: ReactNode; variant?: BtnVariant; small?: boolean; arrow?: boolean; className?: string }) {
  const cls = `btn btn-${variant} ${small ? "btn-sm" : ""} ${className}`;
  const inner = (
    <>
      {children}
      {arrow && <Icon name="arrow" className="size-4" />}
    </>
  );
  return (
    <Magnetic strength={6} className={className.includes("w-full") ? "w-full" : ""}>
      {href.startsWith("http") ? (
        <a href={href} className={cls} target="_blank" rel="noopener noreferrer">{inner}</a>
      ) : (
        <Link href={href} className={cls}>{inner}</Link>
      )}
    </Magnetic>
  );
}

export function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  const cls = "group inline-flex items-center gap-1.5 font-bold text-cyan-d";
  const inner = (
    <>
      {children}
      <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
    </>
  );
  return href.startsWith("http") ? <a href={href} className={cls} target="_blank" rel="noopener noreferrer">{inner}</a> : <Link href={href} className={cls}>{inner}</Link>;
}

export function SectionHead({
  eyebrow, title, text, center, className = "",
}: { eyebrow?: string; title: ReactNode; text?: ReactNode; center?: boolean; className?: string }) {
  return (
    <Reveal className={`mb-10 max-w-3xl sm:mb-12 ${center ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      {typeof title === "string" ? <TitleReveal text={title} className="mb-3" /> : <h2 className="mb-3">{title}</h2>}
      {text && <p className="text-[1.06rem] text-muted">{text}</p>}
    </Reveal>
  );
}

export function IconTile({ name }: { name: string }) {
  return (
    <div className="mb-5 grid size-13 place-items-center rounded-2xl bg-gradient-to-br from-cyan to-cyan-2 text-navy shadow-[0_10px_24px_-10px_rgb(19_135_155/.7)] transition-all duration-500 group-hover:-rotate-6 group-hover:scale-110 group-hover:from-navy group-hover:to-navy-2 group-hover:text-cyan">
      <Icon name={name} className="size-6" />
    </div>
  );
}
