import { autonomyLevels } from "./autonomy-levels";
import { PresentationDetail } from "../presentation-detail";
import { SdlcQuestionsLink } from "./questions-link";
import { SlideLayout } from "../slide-layout";
/** Пять уровней работы: Human-in-the-loop как цель, Dark Factory как перспектива. */
export function Slide16() {
    return (<SlideLayout number={16} variant="content" title={<>
            Пять уровней: наша цель — Human-in-the-loop
          </>} eyebrow={<>ЧТО ПРЕДСТОИТ / ВЫБЕРИТЕ УРОВЕНЬ</>}>
          <div className="level-steps" role="group" aria-label="Уровень автономности">
            <button type="button" className="level-step" data-level="0" aria-pressed="false">
              <span>0</span><b>Без AI</b>
            </button>
            <button type="button" className="level-step" data-level="1" aria-pressed="false">
              <span>1</span><b>AI-чат</b>
            </button>
            <button type="button" className="level-step" data-level="2" aria-pressed="true">
              <span>2</span><b>Локальный агент<br /><small className="level-here">мы здесь</small></b>
            </button>
            <button type="button" className="level-step" data-level="3" aria-pressed="false">
              <span>3</span><b>Фоновый агент<br /><small className="level-here">цель · HITL</small></b>
            </button>
            <button type="button" className="level-step" data-level="4" aria-pressed="false">
              <span>4</span><b>Dark Factory<br /><small>дальнейшее развитие</small></b>
            </button>
          </div>
          <div className="level-caption" aria-live="polite">
            <strong id="level-name">2 · Локальный агент</strong>
            <p id="level-human">
              Сотрудник ставит задачу и управляет агентом на своём устройстве.
            </p>
          </div>
          <div className="role-lanes">
            <article>
              <div>
                <span className="role-number" aria-hidden="true">01</span>
                <h2>Аналитик</h2>
              </div>
              <strong className="executor">Локальный агент</strong>
              <p className="role-action">Работает с требованиями и источниками.</p>
            </article>
            <article>
              <div>
                <span className="role-number" aria-hidden="true">02</span>
                <h2>Разработчик</h2>
              </div>
              <strong className="executor">Локальный агент</strong>
              <p className="role-action">Работает с кодом и инструментами.</p>
            </article>
            <article>
              <div>
                <span className="role-number" aria-hidden="true">03</span>
                <h2>QA</h2>
              </div>
              <strong className="executor">Локальный агент</strong>
              <p className="role-action">Работает с проверками и результатами.</p>
            </article>
            <SdlcQuestionsLink />
          </div>
          <div className="autonomy-loop" hidden>
            <b id="autonomy-loop-title">Люди задают цель и границы</b><span id="autonomy-loop-steps">Выполнение → проверка → исправление ↺</span><small id="autonomy-loop-decision">Специалисты принимают результат по своим направлениям</small>
          </div>
          <p className="level-change" id="level-change">
            Агент помогает каждой роли, но работа ещё зависит от её локального
            окружения.
          </p>
          <p className="bridge">
            Где HRlink сейчас: не все роли дошли до уровня 2, часть работы ещё
            идёт на уровне 1. На уровне 3 пока нет ни одной роли.
          </p>
          <div className="level-footer">
            <span>Пять способов организации работы</span>
            <PresentationDetail title="Пять уровней: как меняется роль человека" variant="compare" summary="Сравнить уровни">
                <div className="table-scroll">
                  <table>
                    <thead>
                      <tr>
                        <th>Уровень</th>
                        <th>Название</th>
                        <th>Человек</th>
                        <th>AI</th>
                        <th>Что меняется</th>
                      </tr>
                    </thead>
                    <tbody>
                      {autonomyLevels.map((level) => <tr key={level.id}>
                        <td>{level.id}</td>
                        <td>{level.tableName ?? level.name}</td>
                        <td>{level.human}</td>
                        <td>{level.agent}</td>
                        <td>{level.change}</td>
                      </tr>)}
                    </tbody>
                  </table>
                </div>
                <p>
                  От 0 к 1: AI помогает с ответом. От 1 к 2: агент работает с
                  файлами и инструментами. От 2 к 3: самостоятельно выполняет
                  свою задачу в фоне и ждёт решения человека. Это наша цель,
                  Human-in-the-loop (HITL). От 3 к 4: сам проходит переходы между
                  этапами, проверки и исправления. Dark Factory остаётся
                  следующим возможным шагом развития.
                </p>
                <h3>Как устроена ночная работа с человеком в цикле?</h3>
                <p>
                  Человек задаёт работу, границы и критерии проверки.
                  Агент выполняет свою часть в отдельной среде, независимо
                  от ноутбука, в том числе ночью. Затем показывает результат
                  и ждёт решения: принять, доработать по замечаниям или
                  остановить. После доработки результат снова проверяет
                  человек. Отсутствие ответа не разрешает продолжение.
                </p>
                <h3>Где остаются люди?</h3>
                <p>
                  В целевой модели HITL человек участвует после каждой
                  порученной части работы: проверяет результат и определяет
                  следующий шаг. Приёмка по роли включает проверку требований,
                  экспертное ревью кода или проверку продукта. Нерешённые
                  вопросы и выход за границы агент возвращает человеку.
                  В перспективной модели Dark Factory система сама проходит
                  цикл между этапами, а специалисты принимают итог.
                </p>
                <p>
                  Схема описывает способы работы. Команда сейчас на уровне 2, но не
                  во всех ролях: агентом пользуются, но каждый по-своему.
                  Человек задаёт цели и пределы самостоятельности, а система
                  обращается к нему с нерешёнными вопросами.
                </p>
              </PresentationDetail>
            <p className="next-slide">Далее: три шага к Human-in-the-loop.</p>
          </div>
        </SlideLayout>);
}
