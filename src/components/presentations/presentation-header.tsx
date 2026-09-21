import { BrandLogo } from "./brand-logo";
/** Шапка содержательного слайда по шаблону PowerPoint HRlink. */
export function PresentationHeader({ label }: {
    label: string;
}) {
    return <header className="topbar">
    <BrandLogo />
    <span className="topline" aria-hidden="true"/>
    <span className="toplabel">{label}</span>
    <span className="topnum" aria-hidden="true">01</span>
  </header>;
}
