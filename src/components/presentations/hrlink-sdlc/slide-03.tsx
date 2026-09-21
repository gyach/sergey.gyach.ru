import Image from "next/image";
import { SlideLayout } from "../slide-layout";
/** Пять этапов: от запроса до знаний о продукте — содержание слайда. */
export function Slide03() {
    return (<SlideLayout number={3} variant="content" title={<>
            Пять этапов: от запроса до знаний о продукте
          </>} eyebrow={<>КАРТА / ВЫБЕРИТЕ ЭТАП</>}>
          <div className="process-map">
            <article className="map-node">
              <span className="node-number">01</span>
              <h2>Дискавери</h2>
              <p>Владелец продукта + дизайнер</p>
              <p className="muted">Проблема, факты и объём работы</p>
              <p className="skill-label">hrl-explore · hrl-discovery · hrl-wtf</p>
              <a className="pill dark" href="#slide-04">К слайду 04<svg className="control-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m10 6 6 6-6 6"></path></svg></a>
            </article>
            <article className="map-node">
              <span className="node-number">02</span>
              <h2>Постановка</h2>
              <p>Бизнес-аналитик + системный аналитик + дизайнер</p>
              <p className="muted">История → техническая постановка → задачи</p>
              <p className="skill-label">hrl-analyze · hrl-humanizer · hrl-wtf</p>
              <a className="pill dark" href="#slide-05">К слайдам 05–06<svg className="control-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m10 6 6 6-6 6"></path></svg></a>
            </article>
            <article className="map-node">
              <span className="node-number">03</span>
              <h2>Передача в работу и публикация</h2>
              <p>Аналитик + разработчик</p>
              <p className="muted">
                Задачи и связи в Jira, страницы в Confluence
              </p>
              <p className="skill-label">
                hrl-analyze · hrl-atlassian · hrl-publish
              </p>
              <a className="pill dark" href="#slide-07">К слайду 07<svg className="control-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m10 6 6 6-6 6"></path></svg></a>
            </article>
            <article className="map-node">
              <span className="node-number">04</span>
              <h2>Разработка и QA</h2>
              <p>Разработчик + QA</p>
              <p className="muted">Продукт и результаты проверок</p>
              <p className="skill-label">
                Общий набор навыков ещё предстоит собрать
              </p>
              <a className="pill dark" href="#slide-08">К слайду 08<svg className="control-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m10 6 6 6-6 6"></path></svg></a>
            </article>
            <article className="map-node">
              <span className="node-number">05</span>
              <h2>Документация и обратная связь</h2>
              <p>Аналитик + владелец навыка</p>
              <p className="muted">
                Описание продукта и инструкции навыков; ретроспектива пока не
                регулярна
              </p>
              <p className="skill-label">hrl-living-specs · hrl-retrospect</p>
              <a className="pill dark" href="#slide-09">К слайдам 09 и 12<svg className="control-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m10 6 6 6-6 6"></path></svg></a>
            </article>
          </div>
          <div className="slide-tail">
            <details open className="detail stage">
              <summary title="Подробнее" aria-label="Как связаны этапы">
                Как связаны этапы<svg className="control-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 17 17 7 M7 7h10v10"></path>
                </svg>
              </summary>
              <div className="dialog-content">
                <button className="close" type="button" title="Закрыть" aria-label="Закрыть">
                  <svg className="control-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="m6 6 12 12 M18 6 6 18"></path>
                  </svg>
                </button>
                <h2>Как связаны этапы</h2>
                <p>
                  Каждый этап отвечает на три вопроса: с чего начать, что
                  получить и кто за это отвечает. Дальше слайды раскрывают
                  каждый этап: вход, навыки, результат и ответственность
                  человека.
                </p>
                <p>
                  <b>Три понятия, которые дальше встречаются постоянно.</b>
                  Требования — условия, которые должен выполнять продукт.
                  Постановка — пакет документов задачи: история, техническая
                  постановка и задачи. Описание текущего поведения продукта
                  содержит действующие требования, сценарии и ограничения.
                </p>
                <p>
                  Проходить карту по порядку не обязательно. Любой документ
                  можно подготовить отдельно, и по команде аналитика агент
                  публикует его в Confluence сразу при создании.
                </p>
                <p>
                  Если при разработке или проверке возникают вопросы, мы
                  возвращаемся к требованиям и уточняем решения. Четвёртый этап
                  пока держится на договорённостях людей: как навыки аналитики,
                  разработки и QA будут передавать друг другу данные, ещё
                  предстоит согласовать.
                </p>
              </div>
            </details>
            <p className="next-slide">
              Далее: дискавери — от идеи к понятному запросу.
            </p>
          </div>
          <a className="questions-link" href="https://forms.gle/oyTGxUvNRTSkAe4X9" target="_blank" rel="noopener noreferrer" aria-label="Задать вопрос — открыть Google Форму в новой вкладке">
            <Image src="/presentations/hrlink/questions-qr.png" width={540} height={540} alt="QR-код формы для вопросов" unoptimized/>
          </a>
        </SlideLayout>);
}
