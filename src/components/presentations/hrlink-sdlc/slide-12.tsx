import Image from "next/image";
import { SlideLayout } from "../slide-layout";
/** Обратная связь — содержание слайда. */
export function Slide12() {
    return (<SlideLayout number={12} variant="content" title={<>Обратная связь</>} eyebrow={<>ЧТО ПРЕДСТОИТ / ОБРАТНАЯ СВЯЗЬ</>}>
          <p className="lead small">
            Аналитик проводит ретроспективу каждой своей постановки. Её цель —
            не поправить один ответ, а найти системные проблемы навыка и
            улучшить его инструкции.
          </p>
          <div className="feedback-sequence">
            <article>
              <span>01</span>
              <h2>Сохранить<br />правку</h2>
              <p>Аналитик коммитит ответ агента,<br />контекст и свою правку</p>
            </article>
            <article>
              <span>02</span>
              <h2>
                Найти<br />
                причину
              </h2>
              <p>
                <code>hrl-retrospect</code> сравнивает первую<br />и окончательную
                версии постановки, выделяет повторяющиеся причины расхождений
              </p>
            </article>
            <article>
              <span>03</span>
              <h2>Принять<br />решение</h2>
              <p>Владелец навыка<br />решает, что изменить</p>
            </article>
            <article>
              <span>04</span>
              <h2>Проверить<br />повторно</h2>
              <p>Исходный запрос<br />и результат правки</p>
            </article>
          </div>
          <p className="callout takeaway">
            Одна правка исправляет один ответ. Системную проблему видно только
            тогда, когда ретроспектива проходит после реализации постановки.
          </p>
          <div className="slide-tail">
            <details open className="detail stage">
              <summary title="Подробнее" aria-label="Кто решает, что изменить в инструкциях">
                Кто решает, что изменить в инструкциях<svg className="control-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 17 17 7 M7 7h10v10"></path>
                </svg>
              </summary>
              <div className="dialog-content">
                <button className="close" type="button" title="Закрыть" aria-label="Закрыть">
                  <svg className="control-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="m6 6 12 12 M18 6 6 18"></path>
                  </svg>
                </button>
                <h2>Кто решает, что изменить в инструкциях</h2>
                <dl>
                  <dt>Что нужно для работы</dt>
                  <dd>
                    Начальная и окончательная версии постановки, материалы
                    задачи, версия навыка и ручная правка аналитика.
                  </dd>
                  <dt>Навыки</dt>
                  <dd>
                    hrl-retrospect сравнивает версии, объясняет различия и
                    предлагает улучшения инструкций.
                  </dd>
                  <dt>Результат</dt>
                  <dd>
                    Предложения по изменению инструкций и сохранённые причины
                    правок. Новая инструкция меняет способ работы агента, но
                    сама модель от этого не обучается.
                  </dd>
                  <dt>За что отвечает человек</dt>
                  <dd>
                    Аналитик отвечает за ретроспективу: сохраняет неудачный
                    ответ и свою правку, запускает hrl-retrospect и передаёт
                    выявленные системные проблемы владельцу навыка. Владелец
                    навыка решает, какие предложения включить в инструкции.
                    После изменения аналитик снова даёт агенту исходный запрос и
                    проверяет, помогло ли оно.
                  </dd>
                </dl>
                <p>
                  Навык работает. Не хватает регулярности: ретроспектива после
                  каждой реализованной постановки пока не стала обязательной
                  практикой, и общего списка замечаний с ответами участникам,
                  которые их оставили, нет.
                </p>
              </div>
            </details>
            <p className="next-slide">
              Далее: десять проблем внедрения и что с ними делать.
            </p>
          </div>
          <a className="questions-link" href="https://forms.gle/oyTGxUvNRTSkAe4X9" target="_blank" rel="noopener noreferrer" aria-label="Задать вопрос — открыть Google Форму в новой вкладке">
            <Image src="/presentations/hrlink/questions-qr.png" width={540} height={540} alt="QR-код формы для вопросов" unoptimized/>
          </a>
        </SlideLayout>);
}
