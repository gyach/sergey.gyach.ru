import type { ReactNode } from "react";
type SlideLayoutProps = {
    number: number;
    title: ReactNode;
    eyebrow?: ReactNode;
    variant?: "cover" | "content" | "section" | "closing";
    children: ReactNode;
};
/** Макеты шаблона HRlink: обложка, содержание, разделитель и заключение.
 * Общие отступы, заголовок и якоря задаются здесь; содержание остаётся серверным.
 */
export function SlideLayout({ number, title, eyebrow, variant = "content", children }: SlideLayoutProps) {
    const suffix = String(number).padStart(2, "0");
    const background = variant === "content" ? "cream" : "blue";
    return <section className={`slide ${background} slide--${variant}`} id={`slide-${suffix}`} aria-labelledby={`title-${suffix}`}>
    <div className="slide-inner">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h1 id={`title-${suffix}`} tabIndex={-1}>{title}</h1>
      {children}
    </div>
  </section>;
}
type CompositionProps = {
    children: ReactNode;
    className?: string;
};
/** Две смысловые колонки по макету кейса из PowerPoint. */
export function ComparisonLayout({ children, className = "" }: CompositionProps) {
    return <div className={`compare ${className}`}>{children}</div>;
}
/** Колонки для процесса, результатов или списка преимуществ из шаблона. */
export function ColumnsLayout({ children, className = "" }: CompositionProps) {
    return <div className={`slide-columns ${className}`}>{children}</div>;
}
/** Прямоугольные блоки на кремовом фоне по макету «Кто мы?». */
export function CardsLayout({ children, className = "" }: CompositionProps) {
    return <div className={`slide-cards ${className}`}>{children}</div>;
}
