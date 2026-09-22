import Image from "next/image";
import { SlideLayout } from "../slide-layout";
/** Спасибо за внимание — содержание слайда. */
export function Slide19() {
    return (<SlideLayout number={19} variant="closing" title={<>Спасибо за внимание</>}>
          <div className="contact-layout">
            <figure className="speaker-badge" aria-label="Бейдж Сергея Гяча, HRlink">
              <svg className="badge-fastener" viewBox="1165 0 125 374" aria-hidden="true">
                <defs>
                  <filter id="badge-blue-key" colorInterpolationFilters="sRGB">
                    <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  20 0 -20 0 2" />
                  </filter>
                  <filter id="badge-card-key" colorInterpolationFilters="sRGB">
                    <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -2 -2 -2 0 4" />
                  </filter>
                  <clipPath id="badge-fastener-top"><rect x="1165" y="0" width="125" height="322" /></clipPath>
                  <clipPath id="badge-fastener-bottom"><rect x="1190" y="322" width="70" height="52" /></clipPath>
                </defs>
                <image href="/presentations/hrlink/brand/badge-reference.jpg" width="1920" height="1080" filter="url(#badge-blue-key)" clipPath="url(#badge-fastener-top)" />
                <image href="/presentations/hrlink/brand/badge-reference.jpg" width="1920" height="1080" filter="url(#badge-card-key)" clipPath="url(#badge-fastener-bottom)" />
              </svg>
              <svg className="badge-template" viewBox="1044 0 366 916" aria-hidden="true">
                <defs>
                  <clipPath id="badge-card-crop"><rect x="1044" y="322" width="366" height="594" rx="14" /></clipPath>
                </defs>
                <image href="/presentations/hrlink/brand/badge-reference.jpg" width="1920" height="1080" clipPath="url(#badge-card-crop)" />
                <circle cx="1226.5" cy="606.5" r="110" fill="#f9faea" />
                <rect x="1070" y="734" width="264" height="83" fill="#f9faea" />
                <rect x="1070" y="847" width="264" height="48" fill="#f9faea" />
                <circle cx="1226" cy="373" r="18" fill="#d7ebff" />
              </svg>
              <div className="badge-portrait">
                <Image src="/presentations/hrlink/sergey-badge-photo.png" loading="eager" alt="Сергей Гяч" width={853} height={1280} unoptimized />
              </div>
              <figcaption className="badge-caption">
                <strong>сергей<br />гяч</strong>
                <span>руководитель<br />отдела аналитики</span>
              </figcaption>
            </figure>
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
