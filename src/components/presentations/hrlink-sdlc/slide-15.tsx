import { autonomyLevels } from "./autonomy-levels";
import { PresentationDetail } from "../presentation-detail";
import { SdlcQuestionsLink } from "./questions-link";
import { PresentationIcon } from "../presentation-icons";
import { SlideLayout } from "../slide-layout";
/** Пять уровней перехода к Dark Factory — содержание слайда. */
export function Slide15() {
    return (<SlideLayout number={15} variant="content" title={<>
            Пять уровней перехода к Dark Factory
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
              <span>3</span><b>Фоновый агент</b>
            </button>
            <button type="button" className="level-step" data-level="4" aria-pressed="false">
              <span>4</span><b>Автономный цикл<br /><small>Dark Factory</small></b>
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
                <PresentationIcon name="analyst"/>
                <h2>Аналитик</h2>
              </div>
              <strong className="executor">Локальный агент</strong>
              <p className="role-action">Работает с требованиями и источниками.</p>
            </article>
            <article>
              <div>
                <PresentationIcon name="code"/>
                <h2>Разработчик</h2>
              </div>
              <strong className="executor">Локальный агент</strong>
              <p className="role-action">Работает с кодом и инструментами.</p>
            </article>
            <article>
              <div>
                <PresentationIcon name="check"/>
                <h2>QA</h2>
              </div>
              <strong className="executor">Локальный агент</strong>
              <p className="role-action">Работает с проверками и результатами.</p>
            </article>
          </div>
          <div className="autonomy-loop" hidden>
            <b>Люди задают цель и границы</b><span>Выполнение → проверка → исправление ↺</span><small>Специалисты принимают результат по своим направлениям</small>
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
                  файлами и инструментами. От 2 к 3: работает в фоне и передаёт
                  результаты дальше по согласованной схеме. От 3 к 4: выполняет
                  весь цикл, включая проверку и исправления.
                </p>
                <h3>Почему нельзя просто запустить всё ночью?</h3>
                <p>
                  Удалённый запуск — доступ к агенту в другой среде по команде
                  человека. Фоновая работа — выполнение отдельной операции
                  без постоянного участия сотрудника. Автономный цикл —
                  самостоятельное прохождение выполнения, проверок и
                  исправлений. Для каждого сценария нужны свои критерии
                  приёмки и условия остановки; общий сервер сам по себе
                  их не заменяет.
                </p>
                <h3>Где остаются люди?</h3>
                <p>
                  Сейчас специалисты проверяют промежуточные результаты.
                  В предлагаемой целевой модели система сама проходит этапы.
                  Люди задают цель и границы; специалисты принимают результат
                  по своим направлениям. Приёмка включает экспертное ревью кода
                  и проверку продукта. Нерешённые вопросы и выход за заданные
                  границы система возвращает людям.
                </p>
                <p>
                  Схема описывает способы работы. Команда сейчас на уровне 2, но не
                  во всех ролях: агентом пользуются, но каждый по-своему.
                  Человек задаёт цели и пределы самостоятельности, а система
                  обращается к нему с нерешёнными вопросами.
                </p>
              </PresentationDetail>
            <p className="next-slide">Далее: три шага к Dark Factory.</p>
          </div>
          <SdlcQuestionsLink />
        </SlideLayout>);
}
