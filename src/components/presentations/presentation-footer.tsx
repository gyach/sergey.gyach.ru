import { PresentationDetail } from "./presentation-detail";
import { ControlIcon } from "./presentation-icons";
/** Навигация и оглавление презентации SDLC. */
export function PresentationFooter() {
    return (<footer className="footer">
      <div className="footer-left">
        <a href="#slide-03" title="Карта процесса">Карта процесса</a>
        <PresentationDetail title="19 слайдов · оглавление" summary="Оглавление">
            <ol className="contents-list">
              <li>
                <a href="#slide-01"><span>01</span>Текущий SDLC на пути к Dark Factory</a>
              </li>
              <li>
                <a href="#slide-02"><span>02</span>Что было и что изменилось</a>
              </li>
              <li>
                <a href="#slide-03"><span>03</span>Пять этапов: от запроса до знаний о
                  продукте</a>
              </li>
              <li>
                <a href="#slide-04"><span>04</span>Этап 01. Дискавери: от идеи к понятному
                  запросу</a>
              </li>
              <li>
                <a href="#slide-05"><span>05</span>Этап 02. Бизнес-аналитик: история согласована
                  с владельцем продукта</a>
              </li>
              <li>
                <a href="#slide-06"><span>06</span>Этап 02. Системный аналитик: техническая постановка согласована с
            архитектором</a>
              </li>
              <li>
                <a href="#slide-07"><span>07</span>Результаты аналитики</a>
              </li>
              <li>
                <a href="#slide-08"><span>08</span>Этап 03. Передача задачи в разработку и публикация</a>
              </li>
              <li>
                <a href="#slide-09"><span>09</span>Этап 04. Единую цепочку навыков ещё предстоит собрать</a>
              </li>
              <li>
                <a href="#slide-10"><span>10</span>Этап 05. Аналитик обновляет описание продукта
                  после релиза</a>
              </li>
              <li>
                <a href="#slide-11"><span>11</span>Девять навыков: что каждый принимает и
                  отдаёт</a>
              </li>
              <li>
                <a href="#slide-12"><span>12</span>Что предстоит сделать</a>
              </li>
              <li>
                <a href="#slide-13"><span>13</span>Обратная связь</a>
              </li>
              <li>
                <a href="#slide-14"><span>14</span>Десять проблем внедрения и что с ними
                  делать</a>
              </li>
              <li>
                <a href="#slide-15"><span>15</span>Единая цепочка навыков</a>
              </li>
              <li>
                <a href="#slide-16"><span>16</span>Пять уровней перехода к Dark Factory</a>
              </li>
              <li>
                <a href="#slide-17"><span>17</span>Три шага к Dark Factory</a>
              </li>
              <li>
                <a href="#slide-18"><span>18</span>Вопросы участников</a>
              </li>
              <li>
                <a href="#slide-19"><span>19</span>Спасибо за внимание</a>
              </li>
            </ol>
            <p className="muted">
              Стрелки ← → переключают слайды. Escape закрывает окно с
              подробностями. Пока окно открыто, стрелки не переключают слайд.
            </p>
          </PresentationDetail>
        <button id="fullscreen" type="button" title="Полный экран" aria-pressed="false">
          Полный экран<ControlIcon name="fullscreen"/>
        </button>
      </div>
      <span className="footer-note">HRLINK · ОТ ЗАПРОСА К АВТОНОМНОСТИ</span>
      <nav className="prevnext" aria-label="Навигация">
        <span className="separator"></span>
        <button id="prev" type="button" title="Назад">
          <ControlIcon name="previous"/>Назад
        </button>
        <button id="next" type="button" title="Далее">
          Далее<ControlIcon name="next"/></button><span className="counter" aria-live="polite">01 / 19</span>
      </nav>
    </footer>);
}
