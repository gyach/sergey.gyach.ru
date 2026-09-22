import { PresentationHeader } from "@/components/presentations/presentation-header";
import type { Metadata } from "next";
import { DeckEnhancer } from "@/components/presentations/deck-enhancer";
import { PresentationFooter } from "@/components/presentations/presentation-footer";
import { Slide01 } from "@/components/presentations/hrlink-sdlc/slide-01";
import { Slide02 } from "@/components/presentations/hrlink-sdlc/slide-02";
import { Slide03 } from "@/components/presentations/hrlink-sdlc/slide-03";
import { Slide04 } from "@/components/presentations/hrlink-sdlc/slide-04";
import { Slide05 } from "@/components/presentations/hrlink-sdlc/slide-05";
import { Slide06 } from "@/components/presentations/hrlink-sdlc/slide-06";
import { Slide07 } from "@/components/presentations/hrlink-sdlc/slide-07";
import { Slide08 } from "@/components/presentations/hrlink-sdlc/slide-08";
import { Slide09 } from "@/components/presentations/hrlink-sdlc/slide-09";
import { Slide10 } from "@/components/presentations/hrlink-sdlc/slide-10";
import { Slide11 } from "@/components/presentations/hrlink-sdlc/slide-11";
import { Slide12 } from "@/components/presentations/hrlink-sdlc/slide-12";
import { Slide13 } from "@/components/presentations/hrlink-sdlc/slide-13";
import { Slide14 } from "@/components/presentations/hrlink-sdlc/slide-14";
import { Slide15 } from "@/components/presentations/hrlink-sdlc/slide-15";
import { Slide16 } from "@/components/presentations/hrlink-sdlc/slide-16";
import { Slide17 } from "@/components/presentations/hrlink-sdlc/slide-17";
import { Slide18 } from "@/components/presentations/hrlink-sdlc/slide-18";
import { Slide19 } from "@/components/presentations/hrlink-sdlc/slide-19";
import "./sdlc.css";
export const metadata: Metadata = {
    title: "SDLC: от запроса к автономности",
    description: "Текущий SDLC HRlink: девять навыков, пять этапов и путь к Dark Factory.",
    alternates: { canonical: "https://sergey.gyach.ru/presentations/hrlink-sdlc/" },
};
/** Серверная страница: все слайды доступны в статическом экспорте и без JavaScript. */
export default function SdlcPresentation() {
    return <>
    <div className="deck">
      <PresentationHeader label="SDLC · возможности навыков"/>
      <main className="sdlc-slides"><Slide01 /><Slide02 /><Slide03 /><Slide04 /><Slide05 /><Slide06 /><Slide07 /><Slide08 /><Slide09 /><Slide10 /><Slide11 /><Slide12 /><Slide13 /><Slide14 /><Slide15 /><Slide16 /><Slide17 /><Slide18 /><Slide19 /></main>
      <PresentationFooter />
    </div>
    <p className="nojs-only">Все слайды и пояснения можно читать подряд. Для показа по одному слайду нужен JavaScript.</p>
    <div id="status" className="status-message" role="status"/>
    <DeckEnhancer />
  </>;
}
