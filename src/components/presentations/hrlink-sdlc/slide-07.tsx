import Image from "next/image";
import { SlideLayout } from "../slide-layout";
/** Этап 03. Передача задачи в разработку и публикация — содержание слайда. */
export function Slide07() {
    return (<SlideLayout number={7} variant="content" title={<>
            Этап 03. Передача задачи в разработку и публикация
          </>} eyebrow={<>ТЕКУЩИЙ ПРОЦЕСС</>}>
          <p className="lead small">
            На этапе 02 владелец продукта согласовал историю, архитектор —
            техническую постановку. Аналитик согласует с разработчиком состав
            задач и передаёт пакет в разработку: историю, техническую постановку и задачи, каждая — со
            связью с требованием. Источник правды — Markdown в Git.
          </p>
          <div className="publishing">
            <div className="source-of-truth">
              <svg className="icon" viewBox="0 0 52 54" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 5h16l10 10v34H13z M29 5v12h10 M20 26h12 M20 33h12 M20 40h9"></path></svg><span className="eyebrow">Где хранится исходный текст</span>
              <h2>Markdown<br />в Git</h2>
              <p>Аналитик создаёт или меняет файл</p>
            </div>
            <span className="flow-arrow" aria-hidden="true">→</span>
            <div className="pub-targets">
              <article>
                <h2>Jira</h2>
                <p>Связь запроса, истории и задач</p>
                <code>hrl-atlassian</code>
              </article>
              <article>
                <h2>Confluence</h2>
                <p>
                  Сейчас — каждый документ по команде аналитика. Цель —
                  автоматически, без отдельного запроса
                </p>
                <code>hrl-publish → hrl-atlassian</code>
              </article>
            </div>
          </div>
          <div className="slide-tail">
            <details open className="detail stage">
              <summary title="Подробнее" aria-label="Как создать и опубликовать документ">
                Как создать и опубликовать документ<svg className="control-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 17 17 7 M7 7h10v10"></path>
                </svg>
              </summary>
              <div className="dialog-content">
                <button className="close" type="button" title="Закрыть" aria-label="Закрыть">
                  <svg className="control-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="m6 6 12 12 M18 6 6 18"></path>
                  </svg>
                </button>
                <h2>Как создать и опубликовать документ</h2>
                <dl>
                  <dt>Что нужно для работы</dt>
                  <dd>
                    Запрос аналитика: подготовить документ и опубликовать его.
                    Файл должен быть в выбранной ветке GitLab.
                  </dd>
                  <dt>Навыки</dt>
                  <dd>
                    hrl-analyze создаёт Markdown-файл. hrl-publish публикует его
                    из выбранной ветки Git, затем открывает страницу и проверяет
                    результат. hrl-atlassian создаёт задачи и связи в Jira.
                  </dd>
                  <dt>Результат</dt>
                  <dd>
                    Страница Confluence с нужным содержанием. Обновлённый
                    документ тоже можно опубликовать по команде аналитика.
                    Целевая схема — агент публикует все документы для человека автоматически, без отдельного запроса; сейчас публикация
                    выполняется по команде аналитика.
                  </dd>
                  <dt>За что отвечает человек</dt>
                  <dd>
                    Разработчик подтверждает состав задач; историю владелец продукта и
                  техническую постановку архитектор согласовали ещё на этапе
                  02. Только после подтверждения разработчика аналитик передаёт
                  задачу в работу.
                    Аналитик поручает публикацию и разрешает изменения в Jira,
                    Confluence и Git. Если для публикации нужны commit и push,
                    агент выполняет их только с явного разрешения; сам
                    hrl-publish этих команд не выполняет.
                  </dd>
                </dl>
                <p>
                  Публиковать можно на любом этапе, даже если готов только один
                  документ. Ждать остальные документы или окончания общего ревью
                  не нужно. Исходный текст хранится в Git: если правку внесли
                  прямо в Confluence, её нужно перенести в Git, иначе версии
                  разойдутся.
                </p>
              </div>
            </details>
            <p className="next-slide">
              Далее: за что отвечают аналитик, разработчик и QA.
            </p>
          </div>
          <a className="questions-link" href="https://forms.gle/oyTGxUvNRTSkAe4X9" target="_blank" rel="noopener noreferrer" aria-label="Задать вопрос — открыть Google Форму в новой вкладке">
            <Image src="/presentations/hrlink/questions-qr.png" width={540} height={540} alt="QR-код формы для вопросов" unoptimized/>
          </a>
        </SlideLayout>);
}
