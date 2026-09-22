import { PresentationDetail } from "../presentation-detail";
import { SdlcQuestionsLink } from "./questions-link";
import { SlideTail } from "../slide-tail";
import { ControlIcon } from "../presentation-icons";
import { SlideLayout, CardsLayout } from "../slide-layout";
/** Что предстоит сделать — содержание слайда. */
export function Slide12() {
    return (<SlideLayout number={12} variant="section" title={<>Что предстоит сделать</>} eyebrow={<>ЧАСТЬ 2 / ЧТО ПРЕДСТОИТ</>}>
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
              <a className="pill dark" href="#slide-13">К слайду 13<ControlIcon name="next"/></a>
            </article>
            <article>
              <span className="strategy-num">02</span>
              <h2>Проблемы внедрения</h2>
              <p>Сложности, с которыми мы столкнулись</p>
              <a className="pill dark" href="#slide-14">К слайду 14<ControlIcon name="next"/></a>
            </article>
            <article>
              <span className="strategy-num">03</span>
              <h2>Единая цепочка навыков</h2>
              <p>
                Связать аналитику, разработку и тестирование в общий процесс
              </p>
              <a className="pill dark" href="#slide-15">К слайду 15<ControlIcon name="next"/></a>
            </article>
            <article>
              <span className="strategy-num">04</span>
              <h2>Автономность</h2>
              <p>Пять уровней работы и путь к Dark Factory</p>
              <a className="pill dark" href="#slide-16">К слайдам 16–17<ControlIcon name="next"/></a>
            </article>
          </CardsLayout>
          <SlideTail aside={<SdlcQuestionsLink />} next="Далее: обратная связь — как правки аналитика улучшают инструкции навыка.">
            <PresentationDetail title="Почему это отдельная часть" variant="stage">
                <p>
                  Первая часть показывает доступные навыки и текущую работу
                  с постановками, Jira и Confluence. Навык описания поведения
                  продукта тоже есть, но регулярное применение после релизов
                  ещё не налажено.
                </p>
                <p>
                  Во второй части собрано то, что зависит от наших
                  договорённостей: как разбирать замечания к работе агента, что
                  мешает внедрению, как связать навыки трёх ролей и какой
                  уровень самостоятельности допустим. Здесь ещё нет ни
                  ответственных, ни измеренных результатов.
                </p>
              </PresentationDetail>
            </SlideTail>
        </SlideLayout>);
}
