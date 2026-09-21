import type { ReactNode } from "react";
type SlideTailProps = {
    next: string;
    children?: ReactNode;
};
/** Нижняя строка слайда: необязательное пояснение и переход к следующей теме. */
export function SlideTail({ next, children }: SlideTailProps) {
    return <div className="slide-tail">
    {children}
    <p className="next-slide">{next}</p>
  </div>;
}
