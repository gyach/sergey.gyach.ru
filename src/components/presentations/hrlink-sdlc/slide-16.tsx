import Image from "next/image";
import { SlideLayout, ColumnsLayout } from "../slide-layout";
/** Три шага к Dark Factory — содержание слайда. */
export function Slide16() {
    return (<SlideLayout number={16} variant="content" title={<>Три шага к Dark Factory</>} eyebrow={<>ЧТО ПРЕДСТОИТ / СЛЕДУЮЩИЙ ШАГ И ЦЕЛЬ</>}>
          <ColumnsLayout className="strategy">
            <article>
              <span className="eyebrow">Что есть сейчас</span><span className="strategy-num">01</span>
              <h2>Постановка<br />на навыках</h2>
              <p>Запрос, факты,<br />требования, задачи,<br />ревью и знания</p>
            </article>
            <article>
              <span className="eyebrow">Направление развития</span><span className="strategy-num">02</span>
              <h2>Единый процесс аналитики,<br />разработки и QA</h2>
              <p>
                Общий контекст,<br />передача результатов между ролями,<br />автоматическая публикация документов
              </p>
            </article>
            <article>
              <span className="eyebrow">Стратегическая цель</span><span className="strategy-num">03</span>
              <h2>Автономный цикл —<br />Dark Factory</h2>
              <p>Исполнение → результат<br />→ проверка → исправление ↺</p>
            </article>
          </ColumnsLayout>
          <div className="human-escalation takeaway">
            Человек задаёт цель и границы. Нерешённые вопросы и выход за границы
            система возвращает человеку.
          </div>
          <div className="slide-tail">
            <details open className="detail">
              <summary title="Подробнее" aria-label="Dark Factory — цель дальнейшей работы">
                Dark Factory — цель дальнейшей работы<svg className="control-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 17 17 7 M7 7h10v10"></path>
                </svg>
              </summary>
              <div className="dialog-content">
                <button className="close" type="button" title="Закрыть" aria-label="Закрыть">
                  <svg className="control-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="m6 6 12 12 M18 6 6 18"></path>
                  </svg>
                </button>
                <h2>Dark Factory — цель дальнейшей работы</h2>
                <p>
                  На основе постановки система должна выполнить изменение
                  продукта, проверить его, исправить ошибки и повторить
                  проверку. Для этого предстоит связать работу агентов и
                  передачу результатов между ними.
                </p>
                <p>
                  Мы определяем, как следить за работой системы, что ей
                  разрешено делать самостоятельно и когда она должна обратиться
                  к человеку. Автоматический выпуск в рабочую среду требует
                  отдельного решения. Действующие разрешения сохраняются.
                </p>
                <p>
                  Фоновый запуск сам по себе ещё не означает автономную работу.
                  Важно, чтобы система доводила изменение до проверенного
                  результата и справлялась с исправлениями в согласованных
                  пределах.
                </p>
                <p>
                  В этой презентации показаны возможности текущих навыков
                  подготовки постановки. Общий автономный процесс остаётся
                  целью: ещё нужно проверить, как система выполняет изменение,
                  находит ошибки и исправляет их.
                </p>
              </div>
            </details>
            <p className="next-slide">Далее: вопросы участников.</p>
          </div>
          <a className="questions-link" href="https://forms.gle/oyTGxUvNRTSkAe4X9" target="_blank" rel="noopener noreferrer" aria-label="Задать вопрос — открыть Google Форму в новой вкладке">
            <Image src="/presentations/hrlink/questions-qr.png" width={540} height={540} alt="QR-код формы для вопросов" unoptimized/>
          </a>
        </SlideLayout>);
}
