import type { ReactNode } from "react";
import { ControlIcon } from "./presentation-icons";
type PresentationDetailProps = {
    title: string;
    summary?: ReactNode;
    variant?: "stage" | "problem" | "compare";
    children: ReactNode;
};
/** Пояснение доступно без JavaScript; контроллер превращает его в диалог.
 * Сохраняет DOM-контракт: summary, .dialog-content, .close и заголовок h2.
 */
export function PresentationDetail({ title, summary, variant, children }: PresentationDetailProps) {
    return <details open className={variant ? "detail " + variant : "detail"}>
    <summary title="Подробнее" aria-label={title}>
      {summary ?? title}<ControlIcon name="expand"/>
    </summary>
    <div className="dialog-content">
      <button className="close" type="button" title="Закрыть" aria-label="Закрыть">
        <ControlIcon name="close"/>
      </button>
      <h2>{title}</h2>
      {children}
    </div>
  </details>;
}
