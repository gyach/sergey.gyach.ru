import { PresentationDetail } from "../presentation-detail";
import { SdlcQuestionsLink } from "./questions-link";
import { SlideTail } from "../slide-tail";
import { SlideLayout } from "../slide-layout";
/** Девять навыков: что каждый принимает и отдаёт — содержание слайда. */
export function Slide11() {
    return (<SlideLayout number={11} variant="content" title={<>
            Девять навыков: что каждый принимает и отдаёт
          </>} eyebrow={<>ТЕКУЩИЙ ПРОЦЕСС</>}>
          <div className="skills-overview">
            <div>
              <span className="giant">9</span>
              <p className="lead">навыков закрывают<br />этапы 01–03 и 05</p>
            </div>
            <div className="skill-groups">
              <div>
                <span>Обсуждение и подготовка</span>
                <p>explore → discovery → analyze</p>
              </div>
              <div>
                <span>Исследование, текст и публикация</span>
                <p>wtf · humanizer · atlassian · publish</p>
              </div>
              <div>
                <span>Знания и обратная связь</span>
                <p>living-specs · retrospect</p>
              </div>
            </div>
          </div>
          <p className="callout takeaway">
            Человек ставит задачу, принимает решения и проверяет результат.
          </p>
          <SlideTail aside={<SdlcQuestionsLink />} next="Далее: что предстоит наладить в процессе.">
            <PresentationDetail title="Что умеют девять навыков">
                <div className="skill-directory">
                  <article>
                    <code>hrl-explore</code>
                    <h3>Обсудить идею</h3>
                    <p>
                      Вопрос или сомнение → варианты решения и проверка
                      предположений
                    </p>
                    <p className="muted">
                      Человек выбирает направление обсуждения.
                    </p>
                  </article>
                  <article>
                    <code>hrl-discovery</code>
                    <h3>Провести дискавери</h3>
                    <p>
                      Запрос и сведения о нём → проблема, факты, объём работы и
                      решения
                    </p>
                    <p className="muted">
                      Владелец продукта принимает решения. Неясности и
                      недостающие сведения остаются в открытых вопросах.
                    </p>
                  </article>
                  <article>
                    <code>hrl-wtf</code>
                    <h3>Установить факты</h3>
                    <p>
                      Вопрос и релиз → объяснение того, как работает продукт
                    </p>
                    <p className="muted">
                      Аналитик проверяет, к каким условиям относится вывод.
                    </p>
                  </article>
                  <article>
                    <code>hrl-analyze</code>
                    <h3>Подготовить постановку</h3>
                    <p>
                      Контекст и решения → история, техническая постановка,
                      задачи и ревью
                    </p>
                    <p className="muted">
                      Человек выбирает нужный документ и проверяет его
                      содержание.
                    </p>
                  </article>
                  <article>
                    <code>hrl-humanizer</code>
                    <h3>Уточнить текст</h3>
                    <p>Текст → понятные формулировки без потери смысла</p>
                    <p className="muted">
                      Аналитик проверяет, что смысл требования не изменён.
                    </p>
                  </article>
                  <article>
                    <code>hrl-atlassian</code>
                    <h3>Работать с Jira и Confluence</h3>
                    <p>
                      Запрос к Jira или Confluence → найденные сведения или
                      разрешённые изменения
                    </p>
                    <p className="muted">
                      Аналитик определяет, какие данные получить и что разрешено
                      изменить.
                    </p>
                  </article>
                  <article>
                    <code>hrl-publish</code>
                    <h3>Опубликовать файл из Git</h3>
                    <p>
                      Markdown-файл и место публикации → страница Confluence
                    </p>
                    <p className="muted">
                      Аналитик поручает публикацию и проверяет, что страница
                      открывается и показывает нужный текст.
                    </p>
                  </article>
                  <article>
                    <code>hrl-living-specs</code>
                    <h3>Обновить описание поведения</h3>
                    <p>
                      Проверенное изменение → обновлённые разделы описания
                      продукта
                    </p>
                    <p className="muted">
                      Аналитик проверяет, что изменение реализовано, и сохраняет
                      связь с задачей.
                    </p>
                  </article>
                  <article>
                    <code>hrl-retrospect</code>
                    <h3>Разобрать обратную связь</h3>
                    <p>
                      Начальная и окончательная версии → различия и предложения
                      по улучшению инструкций
                    </p>
                    <p className="muted">
                      Владелец навыка решает, какие предложения включить в
                      инструкции.
                    </p>
                  </article>
                </div>
                <p>
                  <b>Как выбрать навык.</b> Для обсуждения идеи — hrl-explore,
                  для дискавери — hrl-discovery, для постановки — hrl-analyze.
                  Остальные навыки помогают исследовать поведение, уточнять
                  текст, публиковать документы и сохранять знания.
                </p>
                <p>
                  <b>Обозначения ролей.</b> BA, SA, ARCH и QA задают агенту роль
                  при проверке: бизнес-аналитика, системного аналитика,
                  архитектора или тестировщика. Это не означает, что постановку
                  уже проверил сотрудник с такой ролью.
                </p>
                <p>
                  Агент помогает заметить пропуски и посмотреть на постановку с
                  разных сторон. Мы решаем, какие замечания принять, и отвечаем за результат.
                </p>
              </PresentationDetail>
            </SlideTail>
        </SlideLayout>);
}
