const controlPaths = {
    expand: "M7 17 17 7 M7 7h10v10",
    close: "m6 6 12 12 M18 6 6 18",
    next: "m10 6 6 6-6 6",
    previous: "m14 6-6 6 6 6",
    fullscreen: "M8 3H3v5 M16 3h5v5 M3 16v5h5 M21 16v5h-5",
} as const;
/** Декоративная иконка управления; доступное имя задаётся на кнопке или ссылке. */
export function ControlIcon({ name }: {
    name: keyof typeof controlPaths;
}) {
    return <svg className="control-icon" viewBox="0 0 24 24" aria-hidden="true">
    <path d={controlPaths[name]}/>
  </svg>;
}
const illustrations = {
    analyst: <><circle cx="26" cy="13" r="7"/><path d="M13 45v-8a13 13 0 0 1 26 0v8z M7 19a5 5 0 1 0 0 10 M45 19a5 5 0 1 1 0 10 M5 36v9h5 M47 36v9h-5"/></>,
    document: <path d="M13 5h16l10 10v34H13z M29 5v12h10 M20 26h12 M20 33h12 M20 40h9"/>,
    code: <><rect x="4" y="7" width={44} height={39} rx="9"/><path d="m19 18-8 8 8 8 m14-16 8 8-8 8 m-4-21-5 26"/></>,
    check: <><circle cx="22" cy="22" r="15"/><path d="m33 33 14 14 M13 22l6 6 11-13"/></>,
} as const;
/** Повторяющаяся иллюстрация слайда с общей геометрией и стилем обводки. */
export function PresentationIcon({ name }: {
    name: keyof typeof illustrations;
}) {
    return <svg className="icon" viewBox="0 0 52 54" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    {illustrations[name]}
  </svg>;
}
