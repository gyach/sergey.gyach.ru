import Image from "next/image";
import { SlideLayout, CardsLayout } from "../slide-layout";
/** Что предстоит сделать — содержание слайда. */
export function Slide11() {
    return (<SlideLayout number={11} variant="section" title={<>Что предстоит сделать</>} eyebrow={<>ЧАСТЬ 2 / ЧТО ПРЕДСТОИТ</>}>
          <p className="lead">
            До этого слайда — как мы работаем сейчас. Дальше — то, что ещё не
            налажено.
          </p>
          <CardsLayout className="strategy">
            <article>
              <span className="strategy-num">01</span>
              <h2>Обратная связь</h2>
              <p>
                Улучшение инструкций навыка и обработка обратной связи пока не
                систематизированы
              </p>
              <a className="pill dark" href="#slide-12">К слайду 12<svg className="control-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m10 6 6 6-6 6"></path></svg></a>
            </article>
            <article>
              <span className="strategy-num">02</span>
              <h2>Проблемы внедрения</h2>
              <p>Сложности, с которыми мы столкнулись</p>
              <a className="pill dark" href="#slide-13">К слайду 13<svg className="control-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m10 6 6 6-6 6"></path></svg></a>
            </article>
            <article>
              <span className="strategy-num">03</span>
              <h2>Единая цепочка навыков</h2>
              <p>
                Связать аналитику, разработку и тестирование в общий процесс
              </p>
              <a className="pill dark" href="#slide-14">К слайду 14<svg className="control-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m10 6 6 6-6 6"></path></svg></a>
            </article>
            <article>
              <span className="strategy-num">04</span>
              <h2>Автономность</h2>
              <p>Пять уровней работы и путь к Dark Factory</p>
              <a className="pill dark" href="#slide-15">К слайдам 15–16<svg className="control-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m10 6 6 6-6 6"></path></svg></a>
            </article>
          </CardsLayout>
          <div className="slide-tail">
            <details open className="detail stage">
              <summary title="Подробнее" aria-label="Почему это отдельная часть">
                Почему это отдельная часть<svg className="control-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 17 17 7 M7 7h10v10"></path>
                </svg>
              </summary>
              <div className="dialog-content">
                <button className="close" type="button" title="Закрыть" aria-label="Закрыть">
                  <svg className="control-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="m6 6 12 12 M18 6 6 18"></path>
                  </svg>
                </button>
                <h2>Почему это отдельная часть</h2>
                <p>
                  Первая часть описывает то, что мы делаем уже сегодня: навыки
                  работают, документы выходят в Jira и Confluence, аналитики
                  обновляют описание текущего поведения продукта.
                </p>
                <p>
                  Во второй части собрано то, что зависит от наших
                  договорённостей: как разбирать замечания к работе агента, что
                  мешает внедрению, как связать навыки трёх ролей и какой
                  уровень самостоятельности допустим. Здесь ещё нет ни
                  ответственных, ни измеренных результатов.
                </p>
              </div>
            </details>
            <p className="next-slide">
              Далее: обратная связь — как правки аналитика улучшают инструкции
              навыка.
            </p>
          </div>
          <a className="questions-link" href="https://forms.gle/oyTGxUvNRTSkAe4X9" target="_blank" rel="noopener noreferrer" aria-label="Задать вопрос — открыть Google Форму в новой вкладке">
            <Image src="/presentations/hrlink/questions-qr.png" width={540} height={540} alt="QR-код формы для вопросов" unoptimized/>
          </a>
        </SlideLayout>);
}
