import { PresentationDetail } from "../presentation-detail";
import { SdlcQuestionsLink } from "./questions-link";
import { SlideTail } from "../slide-tail";
import { SlideLayout } from "../slide-layout";
/** Этап 05. Аналитик обновляет описание продукта после релиза — содержание слайда. */
export function Slide09() {
    return (<SlideLayout number={9} variant="content" title={<>
            Этап 05. Аналитик обновляет описание продукта после релиза
          </>} eyebrow={<>ТЕКУЩИЙ ПРОЦЕСС / ВНЕДРЯЕМ ПРАКТИКУ</>}>
          <p className="lead small">
            Навык работает; регулярное обновление документации после релизов
            ещё внедряем. В описание попадает только проверенное поведение.
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
          <SlideTail next="Далее: все девять навыков и результаты их работы.">
            <PresentationDetail title="Сначала проверить реализацию, затем обновить описание" variant="stage">
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
              </PresentationDetail>
            </SlideTail>
          <SdlcQuestionsLink />
        </SlideLayout>);
}
