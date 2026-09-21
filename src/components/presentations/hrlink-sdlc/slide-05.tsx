import Image from "next/image";
import { SlideLayout } from "../slide-layout";
/** Этап 02. Бизнес-аналитик: история согласована с владельцем продукта — содержание слайда. */
export function Slide05() {
    return (<SlideLayout number={5} variant="content" title={<>
            Этап 02. Бизнес-аналитик: история согласована с владельцем продукта
          </>} eyebrow={<>ТЕКУЩИЙ ПРОЦЕСС</>}>
          <p className="lead small">
            Бизнес-аналитик вместе с агентом превращает решения владельца
            продукта в историю. До согласования агент в роли BA проводит ревью и
            указывает недоработки.
          </p>
          <div className="trace-flow">
            <div>
              <span className="eyebrow">С чего начать</span><strong>Решения</strong>
              <p>
                Проблема, польза<br />и объём работы<br />от владельца продукта
              </p>
            </div>
            <span className="flow-arrow">→</span>
            <div>
              <span className="eyebrow">Ревью агента · чек-лист BA</span><strong>Смысл</strong>
              <p>
                Проблема, ценность, границы<br />и сценарии; чек-лист BA —<br />типовые
                ошибки прошлых историй
              </p>
            </div>
            <span className="flow-arrow">→</span>
            <div>
              <span className="eyebrow">Результат</span><strong>История</strong>
              <p>
                Согласована<br />с владельцем продукта;<br />открытые вопросы
                записаны
              </p>
            </div>
          </div>
          <div className="route-strip">
            <span>Бизнес-аналитик · hrl-analyze</span><b>Решения → история → ревью BA → согласование с владельцем
              продукта</b>
          </div>
          <p className="callout">
            <code>hrl-humanizer</code> убирает тяжёлые и двусмысленные обороты,
            не меняя смысла истории.
          </p>
          <div className="slide-tail">
            <details open className="detail stage">
              <summary title="Подробнее" aria-label="Как бизнес-аналитик готовит историю">
                Как бизнес-аналитик готовит историю<svg className="control-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 17 17 7 M7 7h10v10"></path>
                </svg>
              </summary>
              <div className="dialog-content">
                <button className="close" type="button" title="Закрыть" aria-label="Закрыть">
                  <svg className="control-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="m6 6 12 12 M18 6 6 18"></path>
                  </svg>
                </button>
                <h2>Как бизнес-аналитик готовит историю</h2>
                <dl>
                  <dt>Что нужно для работы</dt>
                  <dd>
                    Запрос на изменение, сведения о текущей ситуации,
                    подтверждённые по коду, и решения владельца продукта.
                  </dd>
                  <dt>Навыки</dt>
                  <dd>
                    hrl-analyze создаёт или уточняет историю: объясняет, какую
                    проблему решает изменение, что оно даст пользователю и какой
                    объём работы согласован. Затем агент в роли BA проводит
                    ревью: понятно ли, какую проблему решаем, кому поможет
                    изменение и какие ситуации нужно учесть. Проверка идёт по
                    чек-листу BA, собранному из типовых ошибок прошлых историй;
                    недоработки перечисляются до того, как история уйдёт на
                    согласование. hrl-humanizer убирает двусмысленные и тяжёлые
                    обороты, сохраняя смысл.
                  </dd>
                  <dt>Результат</dt>
                  <dd>
                    История, согласованная с владельцем продукта, и список
                    вопросов, на которые пока не хватает данных.
                  </dd>
                  <dt>За что отвечает человек</dt>
                  <dd>
                    Бизнес-аналитик решает, какие замечания ревью принять, и
                    правит историю. Владелец продукта подтверждает пользу и
                    объём изменения; согласование фиксируется до передачи
                    истории системному аналитику.
                  </dd>
                </dl>
                <p>
                  История — описание изменения с точки зрения пользователя: кто
                  и чего хочет добиться, что мешает сейчас и что должно стать
                  иначе. Историю можно заказать отдельно, не проходя всю карту.
                </p>
              </div>
            </details>
            <p className="next-slide">
              Далее: как системный аналитик превращает историю в техническую
              постановку.
            </p>
          </div>
          <a className="questions-link" href="https://forms.gle/oyTGxUvNRTSkAe4X9" target="_blank" rel="noopener noreferrer" aria-label="Задать вопрос — открыть Google Форму в новой вкладке">
            <Image src="/presentations/hrlink/questions-qr.png" width={540} height={540} alt="QR-код формы для вопросов" unoptimized/>
          </a>
        </SlideLayout>);
}
