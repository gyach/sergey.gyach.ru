import { SdlcQuestionsLink } from "./questions-link";
import Image from "next/image";
import { SlideLayout } from "../slide-layout";
/** SDLC с фоновыми агентами и решениями человека — содержание слайда. */
export function Slide01() {
    return (<SlideLayout number={1} variant="cover" title={<>
            SDLC: агенты работают, человек управляет
          </>} eyebrow={<>HRLINK / НАША РАБОТА</>}>
          <p className="lead cover-lead">Агенты работают в фоне, в том числе ночью, и ждут нашей обратной связи</p>
          <div className="hero-route">
            <div className="hero-stop">
              <span className="hero-stage-number">01</span><strong>Постановка на навыках</strong><span>Как работаем сейчас</span>
            </div>
            <div className="hero-stop">
              <span className="hero-stage-number">02</span><strong>Единый процесс аналитики, разработки и QA</strong><span>Направление развития</span>
            </div>
            <div className="hero-stop">
              <span className="hero-stage-number">03</span><strong>Фоновые агенты<br />Human-in-the-loop<sup className="fn-mark" aria-hidden="true">*</sup></strong><span>Целевая модель</span>
            </div>
          </div>
          <p className="cover-caption cover-footnote" id="cover-footnote">
            <sup className="fn-mark" aria-hidden="true">*</sup>Human-in-the-loop: агент выполняет свою задачу и ждёт решения человека.
            Dark Factory — следующий возможный шаг: система сама проходит весь цикл.
          </p>
          <div className="cover-discussion">
            <div className="cover-discussion-copy">
          <div className="cover-author">
            <Image src="/presentations/hrlink/image-1.jpg" alt="Гяч Сергей" width={44} height={44} unoptimized/>
            <div>
              <strong>Гяч Сергей</strong><span className="cover-author-role">Руководитель отдела аналитики HRlink</span><time id="presentation-date"></time>
            </div>
          </div>
            </div>
            <SdlcQuestionsLink />
          </div>
        </SlideLayout>);
}
