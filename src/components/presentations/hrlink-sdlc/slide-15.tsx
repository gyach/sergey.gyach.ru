import Image from "next/image";
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
                <svg className="icon" viewBox="0 0 52 54" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="26" cy="13" r="7"></circle>
                  <path d="M13 45v-8a13 13 0 0 1 26 0v8z M7 19a5 5 0 1 0 0 10 M45 19a5 5 0 1 1 0 10 M5 36v9h5 M47 36v9h-5"></path>
                </svg>
                <h2>Аналитик</h2>
              </div>
              <strong className="executor">Локальный агент</strong>
              <p className="role-action">Работает с требованиями и источниками.</p>
            </article>
            <article>
              <div>
                <svg className="icon" viewBox="0 0 52 54" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="7" width={44} height={39} rx="9"></rect>
                  <path d="m19 18-8 8 8 8 m14-16 8 8-8 8 m-4-21-5 26"></path>
                </svg>
                <h2>Разработчик</h2>
              </div>
              <strong className="executor">Локальный агент</strong>
              <p className="role-action">Работает с кодом и инструментами.</p>
            </article>
            <article>
              <div>
                <svg className="icon" viewBox="0 0 52 54" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="22" cy="22" r="15"></circle>
                  <path d="m33 33 14 14 M13 22l6 6 11-13"></path>
                </svg>
                <h2>QA</h2>
              </div>
              <strong className="executor">Локальный агент</strong>
              <p className="role-action">Работает с проверками и результатами.</p>
            </article>
          </div>
          <div className="autonomy-loop" hidden>
            <b>Человек задаёт цель и границы</b><span>Результат → проверка → исправление ↺</span><small>Нерешённые вопросы и выход за заданные границы → человеку</small>
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
            <details open className="detail compare">
              <summary title="Подробнее" aria-label="Пять уровней: как меняется роль человека">
                Сравнить уровни<svg className="control-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 17 17 7 M7 7h10v10"></path>
                </svg>
              </summary>
              <div className="dialog-content">
                <button className="close" type="button" title="Закрыть" aria-label="Закрыть">
                  <svg className="control-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="m6 6 12 12 M18 6 6 18"></path>
                  </svg>
                </button>
                <h2>Пять уровней: как меняется роль человека</h2>
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
                      <tr>
                        <td>0</td>
                        <td>Без AI</td>
                        <td>
                          Аналитик, разработчик и QA сами выполняют работу и
                          передают её дальше
                        </td>
                        <td>Не участвует</td>
                        <td>Человек выполняет все этапы</td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>AI-чат</td>
                        <td>
                          Сотрудник задаёт вопросы, передаёт материалы в чат и
                          использует ответ
                        </td>
                        <td>Подсказывает и помогает с черновиком</td>
                        <td>
                          Человек сам переносит результат в рабочие инструменты
                        </td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Локальный агент</td>
                        <td>
                          Сотрудник ставит задачу и управляет агентом на своём
                          устройстве
                        </td>
                        <td>
                          Работает с доступными файлами и инструментами
                          сотрудника
                        </td>
                        <td>
                          Агент помогает каждой роли, но работа ещё зависит от
                          её локального окружения
                        </td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>Фоновый агент</td>
                        <td>
                          Сотрудник направляет работу и подключается, если есть
                          вопросы или что-то пошло не так
                        </td>
                        <td>
                          Выполняет задачи в отдельной среде, независимо от
                          ноутбука сотрудника
                        </td>
                        <td>
                          Агент работает без постоянного участия человека. Как
                          передавать контекст и результаты между этапами, ещё
                          нужно согласовать
                        </td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>Автономный цикл (Dark Factory)</td>
                        <td>Люди задают цели и наблюдают за результатом</td>
                        <td>
                          Выполняет весь цикл работы в пределах, которые мы
                          задали
                        </td>
                        <td>
                          Система сама выполняет, проверяет и исправляет работу
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  От 0 к 1: AI помогает с ответом. От 1 к 2: агент работает с
                  файлами и инструментами. От 2 к 3: работает в фоне и передаёт
                  результаты дальше по согласованной схеме. От 3 к 4: выполняет
                  весь цикл, включая проверку и исправления.
                </p>
                <p>
                  Схема описывает способы работы. Команда сейчас на уровне 2, но не
                  во всех ролях: агентом пользуются, но каждый по-своему.
                  Человек задаёт цели и пределы самостоятельности, а система
                  обращается к нему с нерешёнными вопросами.
                </p>
              </div>
            </details>
            <p className="next-slide">Далее: три шага к Dark Factory.</p>
          </div>
          <a className="questions-link" href="https://forms.gle/oyTGxUvNRTSkAe4X9" target="_blank" rel="noopener noreferrer" aria-label="Задать вопрос — открыть Google Форму в новой вкладке">
            <Image src="/presentations/hrlink/questions-qr.png" width={540} height={540} alt="QR-код формы для вопросов" unoptimized/>
          </a>
        </SlideLayout>);
}
