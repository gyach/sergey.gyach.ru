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
