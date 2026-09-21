import Image from "next/image";
import { SlideLayout } from "../slide-layout";
/** Этап 05. Аналитик обновляет описание продукта после релиза — содержание слайда. */
export function Slide09() {
    return (<SlideLayout number={9} variant="content" title={<>
            Этап 05. Аналитик обновляет описание продукта после релиза
          </>} eyebrow={<>ТЕКУЩИЙ ПРОЦЕСС</>}>
          <p className="lead small">
            Изменение вышло в релизе, QA проверил его — описание продукта должно
            отражать новое поведение.
          </p>
          <div className="delta-layout">
            <div className="delta-doc">
              <span className="eyebrow">Описание текущего поведения продукта</span>
              <div></div>
              <div></div>
              <div className="highlight">Затронутый компонент</div>
              <div></div>
              <div></div>
            </div>
            <span className="flow-arrow">+</span>
            <div className="delta-change">
              <span className="eyebrow">Проверенное изменение</span>
              <h2>Что изменилось<br />в поведении</h2>
              <p>Связь с задачей<br />и проверкой реализации</p>
            </div>
            <span className="flow-arrow">→</span>
            <div>
              <p className="skill-label">hrl-living-specs</p>
              <h2>Обновлённое<br />описание продукта</h2>
              <p>Аналитик меняет только<br />затронутые разделы.</p>
            </div>
          </div>
          <div className="slide-tail">
            <details open className="detail stage">
              <summary title="Подробнее" aria-label="Сначала проверить реализацию, затем обновить описание">
                Сначала проверить реализацию, затем обновить описание<svg className="control-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 17 17 7 M7 7h10v10"></path>
                </svg>
              </summary>
              <div className="dialog-content">
                <button className="close" type="button" title="Закрыть" aria-label="Закрыть">
                  <svg className="control-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="m6 6 12 12 M18 6 6 18"></path>
                  </svg>
                </button>
                <h2>Сначала проверить реализацию, затем обновить описание</h2>
                <dl>
                  <dt>Что нужно для работы</dt>
                  <dd>
                    Выпущенное и проверенное изменение, изменения требований и
                    связь с задачей.
                  </dd>
                  <dt>Навыки</dt>
                  <dd>
                    hrl-living-specs сопоставляет проверенное изменение с
                    описанием продукта, находит пересечения с другими
                    компонентами и помогает обновить нужные разделы.
                  </dd>
                  <dt>Результат</dt>
                  <dd>
                    Обновлённые разделы описания текущего поведения продукта. У
                    каждого изменения остаётся связь с задачей.
                  </dd>
                  <dt>За что отвечает человек</dt>
                  <dd>
                    Аналитик проверяет, что из требований реализовано, и
                    обновляет разделы описания затронутых компонентов. Он меняет
                    только то, чего коснулась задача.
                  </dd>
                </dl>
                <p>
                  Нельзя просто перенести планы в описание работающего продукта.
                  То, что ещё не реализовано или не проверено, остаётся в
                  требованиях и открытых вопросах.
                </p>
              </div>
            </details>
            <p className="next-slide">
              Далее: все девять навыков и результаты их работы.
            </p>
          </div>
          <a className="questions-link" href="https://forms.gle/oyTGxUvNRTSkAe4X9" target="_blank" rel="noopener noreferrer" aria-label="Задать вопрос — открыть Google Форму в новой вкладке">
            <Image src="/presentations/hrlink/questions-qr.png" width={540} height={540} alt="QR-код формы для вопросов" unoptimized/>
          </a>
        </SlideLayout>);
}
