import Image from "next/image";
import { SlideLayout } from "../slide-layout";
/** Этап 04. Здесь цепочка навыков прерывается — содержание слайда. */
export function Slide08() {
    return (<SlideLayout number={8} variant="content" title={<>
            Этап 04. Здесь цепочка навыков прерывается
          </>} eyebrow={<>ТЕКУЩИЙ ПРОЦЕСС</>}>
          <p className="lead small">
            У разработки и QA сейчас свои наборы навыков. Как они принимают
            постановку и возвращают результат аналитику, ещё не согласовано.
          </p>
          <div className="handoff-grid">
            <article>
              <svg className="icon" viewBox="0 0 52 54" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 5h16l10 10v34H13z M29 5v12h10 M20 26h12 M20 33h12 M20 40h9"></path>
              </svg>
              <h2>Аналитик</h2>
              <p>Отвечает на вопросы.</p>
            </article>
            <article>
              <svg className="icon" viewBox="0 0 52 54" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="7" width={44} height={39} rx="9"></rect>
                <path d="m19 18-8 8 8 8 m14-16 8 8-8 8 m-4-21-5 26"></path>
              </svg>
              <h2>Разработчик</h2>
              <p>
                Реализует изменение. Корректирует постановку по фактической
                реализации; изменения требований согласует с аналитиком.
              </p>
            </article>
            <article>
              <svg className="icon" viewBox="0 0 52 54" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="22" cy="22" r="15"></circle>
                <path d="m33 33 14 14 M13 22l6 6 11-13"></path>
              </svg>
              <h2>QA</h2>
              <p>
                Проверяет реализацию. Фиксирует результат и найденные дефекты.
              </p>
            </article>
          </div>
          <div className="return-line takeaway">
            ← Наши вопросы при разработке уточняют требования, обратная связь помогает системно улучшать навыки.
          </div>
          <p className="callout">
            Следующий шаг — договориться, как навыки трёх ролей будут передавать
            работу друг другу.
          </p>
          <div className="slide-tail">
            <details open className="detail stage">
              <summary title="Подробнее" aria-label="Что участники передают друг другу">
                Что участники передают друг другу<svg className="control-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 17 17 7 M7 7h10v10"></path>
                </svg>
              </summary>
              <div className="dialog-content">
                <button className="close" type="button" title="Закрыть" aria-label="Закрыть">
                  <svg className="control-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="m6 6 12 12 M18 6 6 18"></path>
                  </svg>
                </button>
                <h2>Что участники передают друг другу</h2>
                <dl>
                  <dt>Что нужно для работы</dt>
                  <dd>
                    Постановка, задачи, принятые решения, условия проверки и
                    ожидаемые результаты.
                  </dd>
                  <dt>Навыки</dt>
                  <dd>
                    Сейчас навыки помогают готовить постановку. Объединить их с
                    навыками разработки и QA ещё предстоит: нужно договориться,
                    какие данные и результаты навыки передают друг другу и как
                    возвращают замечания.
                  </dd>
                  <dt>Результат</dt>
                  <dd>
                    Реализация, результаты проверок, воспроизводимые дефекты,
                    уточнённые требования.
                  </dd>
                  <dt>За что отвечает человек</dt>
                  <dd>
                    Разработчик отвечает за реализацию, QA — за проверку
                    продукта, аналитик — за содержание требований. Если
                    требование вызывает вопросы, мы обращаемся к аналитику,
                    который его подготовил.
                  </dd>
                </dl>
              </div>
            </details>
            <p className="next-slide">
              Далее: как обновить описание продукта после релиза.
            </p>
          </div>
          <a className="questions-link" href="https://forms.gle/oyTGxUvNRTSkAe4X9" target="_blank" rel="noopener noreferrer" aria-label="Задать вопрос — открыть Google Форму в новой вкладке">
            <Image src="/presentations/hrlink/questions-qr.png" width={540} height={540} alt="QR-код формы для вопросов" unoptimized/>
          </a>
        </SlideLayout>);
}
