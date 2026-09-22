import Image from "next/image";
/** Общая ссылка на форму вопросов SDLC с QR-кодом; открывается в новой вкладке. */
export function SdlcQuestionsLink() {
    return <a className="questions-link" href="https://forms.gle/oyTGxUvNRTSkAe4X9" target="_blank" rel="noopener noreferrer" aria-label="Задать вопрос — открыть Google Форму в новой вкладке">
    <Image src="/presentations/hrlink/questions-qr.svg" width={37} height={37} alt="QR-код формы для вопросов" unoptimized/>
    <span aria-hidden="true">Задать вопрос ↗</span>
  </a>;
}
