import type { ReactNode } from "react";
type SlideTailProps = {
    next: string;
    children?: ReactNode;
    aside?: ReactNode;
};
/** Нижняя строка слайда: необязательное пояснение и переход к следующей теме. */
export function SlideTail({ next, children, aside }: SlideTailProps) {
    if (aside) {
        return <div className="slide-tail slide-tail--aside">
      <div className="slide-tail-copy">
        {children}
        <p className="next-slide">{next}</p>
      </div>
      {aside}
    </div>;
    }
    return <div className="slide-tail">
    {children}
    <p className="next-slide">{next}</p>
  </div>;
}
