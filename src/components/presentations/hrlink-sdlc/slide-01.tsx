import { PresentationDetail } from "../presentation-detail";
import { SdlcQuestionsLink } from "./questions-link";
import Image from "next/image";
import { SlideLayout } from "../slide-layout";
/** Текущий SDLC на пути к Dark Factory* — содержание слайда. */
export function Slide01() {
    return (<SlideLayout number={1} variant="cover" title={<>
            Текущий SDLC на пути к Dark Factory<sup className="fn-mark" aria-hidden="true">*</sup>
          </>} eyebrow={<>HRLINK / НАША РАБОТА</>}>
          <p className="lead cover-lead">Как навыки связывают нашу работу</p>
          <div className="wave-band" aria-hidden="true">
            <svg className="brandbook-wave" viewBox="0 0 1920 1080" fill="none" aria-hidden="true">
              <g transform="translate(-50 405.9629) scale(1 -1)">
                <path d="M0 0 C407.165 158 790 239.072 668 54 C546 -131.072 1509.241 185.236 1700 210.118 C2022 252.118 2036 54 2036 54" stroke="#F95623" strokeWidth="8"></path>
              </g>
            </svg>
          </div>
          <div className="hero-route">
            <div className="hero-stop">
              <span className="hero-stage-number">01</span><strong>Постановка на навыках</strong><span>Как работаем сейчас</span>
            </div>
            <div className="hero-stop">
              <span className="hero-stage-number">02</span><strong>Единый процесс аналитики, разработки и QA</strong><span>Направление развития</span>
            </div>
            <div className="hero-stop">
              <span className="hero-stage-number">03</span><strong>Автономный цикл — Dark Factory</strong><span>Стратегическая цель</span>
            </div>
          </div>
          <div className="cover-meta">
            <p className="cover-caption">9 навыков <span>·</span> 5 этапов SDLC</p>
          </div>
          <PresentationDetail title="Как читать презентацию" variant="stage">
              <p>
                SDLC — весь путь изменения продукта: от запроса до разработки,
                проверки и обновления знаний. Здесь показано, как навыки
                помогают нам на каждом этапе.
              </p>
              <p>
                Навык — набор инструкций, по которым работает AI-агент. Для
                каждого этапа разберём, что нужно агенту для работы, что он
                готовит и какие решения остаются за человеком.
              </p>
              <p>
                Слайды 1–10 описывают текущую работу. Слайды 11–16 — что
                предстоит наладить: практику обратной связи, проблемы внедрения
                и путь к Dark Factory. Общий процесс для аналитики, разработки и
                QA ещё предстоит построить. Слайд 17 показывает вопросы
                участников, слайд 18 — контакты автора.
              </p>
            </PresentationDetail>
          <p className="cover-caption cover-footnote" id="cover-footnote">
            <sup className="fn-mark" aria-hidden="true">*</sup>Dark Factory — работа
            без участия человека в самих операциях: люди задают цели и границы,
            система выполняет, проверяет и исправляет.
          </p>
          <div className="cover-author">
            <Image src="/presentations/hrlink/image-1.jpg" alt="Гяч Сергей" width={44} height={44} unoptimized/>
            <div>
              <strong>Гяч Сергей</strong><span className="cover-author-role">Руководитель отдела аналитики HRlink</span><time id="presentation-date"></time>
            </div>
          </div>
          <SdlcQuestionsLink />
        </SlideLayout>);
}
