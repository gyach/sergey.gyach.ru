import { SdlcQuestionsLink } from "./questions-link";
import Image from "next/image";
import { SlideLayout } from "../slide-layout";
/** Спасибо за внимание — содержание слайда. */
export function Slide19() {
    return (<SlideLayout number={19} variant="closing" title={<>Спасибо за внимание</>}>
          <div className="contact-layout">
            <Image className="contact-avatar" src="/presentations/hrlink/image-3.jpg" loading="eager" alt="Сергей Гяч" width={1254} height={1254} unoptimized/>
            <div className="contact-info">
              <h2>Сергей Гяч</h2>
              <p className="contact-role">Руководитель отдела аналитики</p>
              <dl className="contact-links">
                <div>
                  <dt>Сайт</dt>
                  <dd>
                    <a href="https://sergey.gyach.ru" target="_blank" rel="noopener noreferrer">sergey.gyach.ru ↗</a>
                  </dd>
                </div>
                <div>
                  <dt>Почта</dt>
                  <dd>
                    <a href="mailto:sergey@gyach.ru">sergey@gyach.ru ↗</a>
                  </dd>
                </div>
                <div>
                  <dt>Telegram</dt>
                  <dd>
                    <a href="https://t.me/gyach" target="_blank" rel="noopener noreferrer">@gyach ↗</a>
                  </dd>
                </div>
              </dl>
              <div className="contact-more">
                <a href="https://max.ru/u/f9LHodD0cOJwNP_K5y_Cy5WZPGaoIyGP7GCynA4IeNgKUAOZIoz7mweMgr0" target="_blank" rel="noopener noreferrer">MAX ↗</a>
                <a href="https://github.com/gyach" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
                <a href="https://habr.com/ru/users/gyach/publications/articles/" target="_blank" rel="noopener noreferrer">Хабр ↗</a>
              </div>
            </div>
            <SdlcQuestionsLink />
          </div>
        </SlideLayout>);
}
