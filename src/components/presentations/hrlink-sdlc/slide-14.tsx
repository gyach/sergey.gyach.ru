import Image from "next/image";
import { SlideLayout } from "../slide-layout";
/** Единая цепочка навыков — содержание слайда. */
export function Slide14() {
    return (<SlideLayout number={14} variant="content" title={<>Единая цепочка навыков</>} eyebrow={<>ЧТО ПРЕДСТОИТ / ЕДИНЫЙ ПРОЦЕСС</>}>
          <p className="lead small">
            Цель — связать навыки аналитики, разработки и тестирования:
            результат одной роли становится входом для следующей.
          </p>
          <div className="feedback-sequence">
            <article>
              <span>01</span>
              <b className="chain-role">Аналитика</b>
              <h2>Требования<br />и решения</h2>
              <p>
                Передаёт согласованный объём изменения, ограничения и критерии
                приёмки.
              </p>
            </article>
            <article>
              <span>02</span>
              <b className="chain-role">Разработка</b>
              <h2>Реализация<br />и ограничения</h2>
              <p>
                Передаёт изменение продукта и результаты проверок. Возвращает
                вопросы к требованиям.
              </p>
            </article>
            <article>
              <span>03</span>
              <b className="chain-role">Тестирование</b>
              <h2>Результаты<br />и замечания</h2>
              <p>
                Сопоставляет поведение продукта с требованиями. Передаёт дефекты
                на исправление.
              </p>
            </article>
          </div>
          <p className="callout takeaway">
            Нам предстоит согласовать общий контекст задачи, состав передаваемых
            результатов и условия перехода между ролями.
          </p>
          <p>
            Ошибки реализации возвращаются в разработку, вопросы к требованиям —
            в аналитику. После исправлений мы повторяем проверку.
          </p>
          <div className="slide-tail">
            <p className="next-slide">
              Далее: какую самостоятельность можно передать агентам.
            </p>
          </div>
          <a className="questions-link" href="https://forms.gle/oyTGxUvNRTSkAe4X9" target="_blank" rel="noopener noreferrer" aria-label="Задать вопрос — открыть Google Форму в новой вкладке">
            <Image src="/presentations/hrlink/questions-qr.png" width={540} height={540} alt="QR-код формы для вопросов" unoptimized/>
          </a>
        </SlideLayout>);
}
