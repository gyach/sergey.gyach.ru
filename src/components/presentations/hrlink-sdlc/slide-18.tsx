import { SdlcQuestionsLink } from "./questions-link";
import { SlideLayout } from "../slide-layout";
/** Вопросы участников — содержание слайда. */
export function Slide18() {
    return (<SlideLayout number={18} variant="content" title={<>Вопросы участников</>} eyebrow={<>Обсуждение</>}>
          <p className="lead small">Вопросы за сегодня · московское время</p>
          <div className="questions-discussion">
          <div id="questions-host">
            <div className="questions-toolbar">
              <span id="questions-date"></span><button type="button" id="questions-refresh">Обновить</button>
            </div>
            <p id="questions-status" role="status">Загружаем вопросы…</p>
            <p id="questions-empty" hidden>
              Сегодня вопросов пока нет. Отправьте свой через QR-код или задайте
              его голосом.
            </p>
            <ol id="questions-list" tabIndex={0} aria-label="Вопросы участников" hidden></ol>
            <nav id="questions-pages" aria-label="Страницы вопросов" hidden>
              <button type="button" id="questions-previous">Назад</button><span id="questions-page"></span><button type="button" id="questions-following">Далее</button>
            </nav>
          </div>
            <SdlcQuestionsLink />
          </div>
          <p className="next-slide">Далее: контакты автора.</p>
        </SlideLayout>);
}
