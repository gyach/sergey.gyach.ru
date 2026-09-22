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
              <a className="contact-site-qr" href="https://sergey.gyach.ru/" target="_blank" rel="noopener noreferrer" aria-label="Открыть сайт Сергея Гяча в новой вкладке">
                <Image src="/presentations/hrlink/site-qr.svg" width={33} height={33} alt="QR-код сайта sergey.gyach.ru" unoptimized/>
                <span aria-hidden="true">Открыть сайт ↗</span>
              </a>
            </div>
          </div>
        </SlideLayout>);
}
