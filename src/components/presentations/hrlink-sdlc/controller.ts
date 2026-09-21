type SheetCell = {
    v?: string | number | null;
};
type SheetPayload = {
    status?: string;
    table?: {
        cols?: {
            label?: string;
        }[];
        rows?: {
            c?: (SheetCell | null)[];
        }[];
    };
};
type QuestionState = {
    active: boolean;
    items: {
        text: string;
        name: string;
    }[];
    page: number;
    date: string;
    loaded: boolean;
    pending: (() => void) | null;
    sequence: number;
};
type QuestionElements = {
    refresh: HTMLButtonElement;
    previous: HTMLButtonElement;
    following: HTMLButtonElement;
    list: HTMLOListElement;
    status: HTMLElement;
    empty: HTMLElement;
    pages: HTMLElement;
    page: HTMLElement;
    date: HTMLElement;
};
/** Находит обязательный элемент серверного макета; ошибка выявляет нарушение контракта. */
function required<T extends HTMLElement = HTMLElement>(scope: ParentNode, selector: string): T {
    const element = scope.querySelector<T>(selector);
    if (!element)
        throw new Error(`Не найден элемент презентации: ${selector}`);
    return element;
}
/** Получает элемент с фиксированным идентификатором из серверного макета. */
function byId<T extends HTMLElement = HTMLElement>(id: string): T {
    return required<T>(document, `#${id}`);
}
/** Добавляет интерактивность статическим слайдам; возвращает полную очистку подписок. */
export function mountPresentation() {
    const abort = new AbortController();
    const frames = new Set<number>();
    const originalTitle = document.title;
    const instanceId = crypto.randomUUID().replaceAll("-", "");
    const callbacks = window as unknown as Record<string, ((payload: SheetPayload) => void) | undefined>;
    /** Привязывает обработчик к жизненному циклу страницы. */
    function listen<K extends keyof (WindowEventMap & DocumentEventMap)>(target: EventTarget, type: K, listener: (event: (WindowEventMap & DocumentEventMap)[K]) => void) {
        target.addEventListener(type, listener as EventListener, { signal: abort.signal });
    }
    /** Планирует измерение геометрии с отменой при размонтировании. */
    function frame(callback: FrameRequestCallback) {
        const id = requestAnimationFrame((time) => { frames.delete(id); callback(time); });
        frames.add(id);
    }
    const root = document.documentElement;
    const slides = [...document.querySelectorAll<HTMLElement>(".slide")];
    const levelSlide = slides.find((s) => s.querySelector(".level-steps")) || null;
    const levelButtons = [...document.querySelectorAll<HTMLButtonElement>(".level-step")];
    const questionSlide = slides.find((s) => s.querySelector("#questions-host")) || null;
    let shownSlide = -1;
    const details = [...document.querySelectorAll<HTMLDetailsElement>("details.detail")];
    let current = 0;
    let opened: HTMLDetailsElement | null = null;
    let origin: HTMLElement | null = null;
    for (const d of details) {
        d.open = false;
        const summary = required(d, ":scope > summary");
        summary.setAttribute("aria-expanded", "false");
        const panel = required(d, ".dialog-content");
        panel.setAttribute("tabindex", "-1");
        const heading = required(panel, "h2");
        heading.id = "dialog-title-" + details.indexOf(d);
        panel.setAttribute("role", "dialog");
        panel.setAttribute("aria-modal", "true");
        panel.setAttribute("aria-labelledby", heading.id);
        listen(summary, "click", (ev) => {
            ev.preventDefault();
            openDetail(d, summary);
        });
        listen(required(d, ".close"), "click", () => closeDetail());
        listen(d, "click", (ev) => {
            if (ev.target === d)
                closeDetail();
        });
    }
    /** Открывает пояснение и переводит фокус на кнопку закрытия. */
    function openDetail(d: HTMLDetailsElement, from: HTMLElement) {
        if (opened)
            closeDetail(false);
        opened = d;
        origin = from;
        d.open = true;
        from.setAttribute("aria-expanded", "true");
        document.body.classList.add("modal-open");
        required(d, ".close").focus();
    }
    /** Закрывает пояснение и при необходимости возвращает фокус. */
    function closeDetail(restore = true) {
        if (!opened)
            return;
        const old = opened;
        opened = null;
        old.open = false;
        required(old, "summary").setAttribute("aria-expanded", "false");
        document.body.classList.remove("modal-open");
        if (restore && origin && origin.isConnected)
            origin.focus();
        origin = null;
    }
    const questionView: QuestionState = {
        active: false,
        items: [],
        page: 0,
        date: "",
        loaded: false,
        pending: null,
        sequence: 0,
    };
    // Ссылки живут до завершения cleanup, даже когда React уже удалил DOM страницы.
    const questionNodes: QuestionElements = {
        refresh: byId("questions-refresh"), previous: byId("questions-previous"),
        following: byId("questions-following"), list: byId("questions-list"),
        status: byId("questions-status"), empty: byId("questions-empty"),
        pages: byId("questions-pages"), page: byId("questions-page"), date: byId("questions-date"),
    };
    const questionElement = <K extends keyof QuestionElements>(name: K): QuestionElements[K] => questionNodes[name];
    /** Определяет текущую дату по Москве независимо от настроек устройства зрителя. */
    function questionToday() {
        return new Intl.DateTimeFormat("sv-SE", {
            timeZone: "Europe/Moscow",
        }).format(new Date());
    }
    /** Читает календарную дату ячейки Google Sheets без преобразования часового пояса браузера. */
    function questionCellDate(cell: SheetCell | null | undefined) {
        const value = String(cell?.v ?? "");
        const parts = value.match(/^Date\((\d{4}),(\d{1,2}),(\d{1,2})(?:,|\))/);
        if (parts)
            return `${parts[1]}-${String(Number(parts[2]) + 1).padStart(2, "0")}-${parts[3].padStart(2, "0")}`;
        const local = value.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})(?:\s|$)/);
        if (local)
            return `${local[3]}-${local[2].padStart(2, "0")}-${local[1].padStart(2, "0")}`;
        const iso = value.match(/^(\d{4}-\d{2}-\d{2})(?:[ T]|$)/);
        return iso ? iso[1] : null;
    }
    /** Отрисовывает четыре вопроса на странице; ответы всегда остаются обычным текстом. */
    function renderQuestions() {
        const state = questionView;
        state.page = Math.min(state.page, Math.max(0, Math.ceil(state.items.length / 4) - 1));
        const list = questionElement("list");
        list.replaceChildren();
        list.start = state.page * 4 + 1;
        state.items
            .slice(state.page * 4, state.page * 4 + 4)
            .forEach((item) => {
            const li = document.createElement("li");
            const text = document.createElement("div");
            text.textContent = item.text;
            li.append(text);
            if (item.name) {
                const author = document.createElement("small");
                author.className = "question-author";
                author.textContent = item.name;
                li.append(author);
            }
            list.append(li);
        });
        list.hidden = !state.items.length;
        questionElement("empty").hidden =
            !state.loaded || !!state.items.length;
        questionElement("pages").hidden = state.items.length <= 4;
        questionElement("previous").disabled = state.page === 0;
        questionElement("following").disabled =
            (state.page + 1) * 4 >= state.items.length;
        questionElement("page").textContent =
            `${state.page + 1} / ${Math.max(1, Math.ceil(state.items.length / 4))}`;
    }
    /** Читает публичную таблицу через штатный JSONP-интерфейс Google Visualization. */
    function refreshQuestions() {
        const state = questionView;
        if (!state.active || document.hidden || state.pending)
            return;
        const date = questionToday();
        if (state.date !== date) {
            state.date = date;
            state.items = [];
            state.page = 0;
            state.loaded = false;
            renderQuestions();
        }
        questionElement("date").textContent =
            date.split("-").reverse().join(".") + " · Москва";
        questionElement("refresh").disabled = true;
        const name = "hrlinkQuestions" + instanceId + "_" + ++state.sequence;
        const script = document.createElement("script");
        /** Освобождает ресурсы запроса и игнорирует его запоздалый ответ. */
        function cleanup() {
            clearTimeout(timeout);
            script.onerror = null;
            script.remove();
            state.pending = null;
            callbacks[name] = () => { };
            setTimeout(() => {
                delete callbacks[name];
            }, 60000);
            questionElement("refresh").disabled = false;
        }
        /** Сохраняет уже загруженные вопросы при сбое и явно отмечает их состояние. */
        function failed() {
            if (abort.signal.aborted || state.pending !== cleanup)
                return;
            cleanup();
            questionElement("status").textContent = state.loaded
                ? "Не удалось обновить. Показаны ранее загруженные вопросы."
                : "Не удалось загрузить вопросы. Нажмите «Обновить».";
        }
        callbacks[name] = (payload) => {
            if (abort.signal.aborted || state.pending !== cleanup)
                return;
            if (!payload ||
                payload.status !== "ok" ||
                !payload.table ||
                !Array.isArray(payload.table.cols) ||
                !Array.isArray(payload.table.rows)) {
                failed();
                return;
            }
            const cols = payload.table.cols;
            const timestamp = cols.findIndex((col) => String(col.label ?? "").trim() === "Отметка времени");
            const question = cols.findIndex((col) => String(col.label ?? "").trim() === "Ваш вопрос");
            const author = cols.findIndex((col) => String(col.label ?? "").trim() === "Имя (необязательно)");
            if (timestamp < 0 || question < 0) {
                failed();
                return;
            }
            const rows = payload.table.rows;
            if (rows.some((row) => row.c?.[timestamp]?.v != null &&
                !questionCellDate(row.c[timestamp]))) {
                failed();
                return;
            }
            const items = rows
                .filter((row) => questionCellDate(row.c?.[timestamp]) === date)
                .map((row) => ({
                text: String(row.c?.[question]?.v ?? "").trim(),
                name: author >= 0 ? String(row.c?.[author]?.v ?? "").trim() : "",
            }))
                .filter((item) => item.text);
            cleanup();
            if (questionToday() !== date) {
                refreshQuestions();
                return;
            }
            const changed = JSON.stringify(items) !== JSON.stringify(state.items);
            state.items = items;
            state.loaded = true;
            if (changed || !items.length)
                renderQuestions();
            questionElement("status").textContent =
                `Вопросов: ${items.length} · Обновлено ${new Date().toLocaleTimeString("ru-RU", { timeZone: "Europe/Moscow" })}`;
        };
        const timeout = setTimeout(failed, 12000);
        state.pending = cleanup;
        script.onerror = failed;
        const url = new URL("https://docs.google.com/spreadsheets/d/1ekqwODrD8z4tWhRfBOhPJdxXONsWtvChe5pGCCDnEs4/gviz/tq");
        url.searchParams.set("gid", "1430810838");
        url.searchParams.set("headers", "1");
        url.searchParams.set("tq", "select A, B, C");
        url.searchParams.set("tqx", "out:json;responseHandler:" + name);
        url.searchParams.set("_", String(Date.now()));
        script.src = url.href;
        document.head.append(script);
    }
    /** Включает загрузку только на слайде вопросов, отменяет запрос при уходе. */
    function updateQuestions(active: boolean) {
        const entered = active && !questionView.active;
        questionView.active = active;
        if (!active && questionView.pending)
            questionView.pending();
        if (entered)
            refreshQuestions();
    }
    listen(questionElement("refresh"), "click", refreshQuestions);
    listen(questionElement("previous"), "click", () => {
        questionView.page--;
        renderQuestions();
        questionElement("list").scrollTop = 0;
    });
    listen(questionElement("following"), "click", () => {
        questionView.page++;
        renderQuestions();
        questionElement("list").scrollTop = 0;
    });
    listen(document, "visibilitychange", refreshQuestions);
    const questionsInterval = setInterval(refreshQuestions, 15000);
    /** Применяет якорь URL, видимость слайдов и состояние навигации. */
    function showSlide(focusHeading = false) {
        const hadModal = !!opened;
        const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : document.body;
        closeDetail(false);
        const m = location.hash.match(/^#slide-(\d{2})$/);
        const idx = m ? Number(m[1]) - 1 : -1;
        current = idx >= 0 && idx < slides.length ? idx : 0;
        if (idx !== current)
            history.replaceState(null, "", "#slide-01");
        const entered = shownSlide !== current;
        updateQuestions(slides[current] === questionSlide);
        shownSlide = current;
        if (entered && slides[current] === levelSlide)
            setLevel(0);
        slides.forEach((s, i) => {
            s.classList.toggle("active", i === current);
            s.setAttribute("aria-hidden", String(i !== current));
        });
        document.querySelectorAll<HTMLAnchorElement>(".contents-list a").forEach((a) => {
            if (a.hash === location.hash)
                a.setAttribute("aria-current", "page");
            else
                a.removeAttribute("aria-current");
        });
        required(document, ".counter").textContent =
            String(current + 1).padStart(2, "0") +
                " / " +
                String(slides.length).padStart(2, "0");
        const blue = slides[current].classList.contains("blue");
        root.style.setProperty("--page", blue ? "var(--blue)" : "var(--cream)");
        byId<HTMLButtonElement>("prev").disabled = current === 0;
        byId<HTMLButtonElement>("next").disabled =
            current === slides.length - 1;
        required(document, ".topnum").textContent = String(current + 1).padStart(2, "0");
        document.title =
            String(current + 1).padStart(2, "0") +
                " · " +
                required(slides[current], "h1").textContent +
                " · HRlink";
        const previousSlide = previousFocus.closest(".slide");
        if (focusHeading === true ||
            hadModal ||
            (previousSlide && !previousSlide.classList.contains("active")))
            required(slides[current], "h1").focus({ preventScroll: true });
        fitSlide();
        window.scrollTo({ top: 0, behavior: "instant" });
        frame(() => {
            fitSlide();
            window.scrollTo({ top: 0, behavior: "instant" });
        });
    }
    /** Масштабирует активный слайд, если его содержимое не помещается между шапкой и панелью навигации. */
    function fitSlide() {
        const slide = slides[current];
        const inner = slide?.querySelector<HTMLElement>(".slide-inner");
        if (!inner)
            return;
        inner.removeAttribute("data-fit");
        inner.style.removeProperty("--fit");
        inner.style.minHeight = "";
        if (window.innerWidth <= 900)
            return;
        const header = required(document, ".topbar");
        const footer = required(document, ".footer");
        const available = window.innerHeight -
            (header ? header.getBoundingClientRect().height : 0) -
            (footer ? footer.getBoundingClientRect().height : 0);
        if (available <= 0)
            return;
        const top = inner.getBoundingClientRect().top;
        let bottom = top;
        for (const child of inner.children) {
            const cs = getComputedStyle(child);
            if (cs.display === "none" ||
                cs.position === "absolute" ||
                cs.position === "fixed")
                continue;
            bottom = Math.max(bottom, child.getBoundingClientRect().bottom +
                (parseFloat(cs.marginBottom) || 0));
        }
        const needed = bottom - top + (parseFloat(getComputedStyle(inner).paddingBottom) || 0);
        if (needed <= available + 1)
            return;
        const apply = (value: number) => {
            const fit = Math.max(0.6, Math.floor(value * 1000) / 1000);
            inner.setAttribute("data-fit", "");
            inner.style.setProperty("--fit", String(fit));
            inner.style.minHeight = Math.floor(available / fit) + "px";
            return fit;
        };
        let fit = apply(available / needed);
        // Контрольная проверка в экранных координатах: документ не должен быть выше окна.
        for (let pass = 0; pass < 2 && fit > 0.6; pass++) {
            const over = document.documentElement.scrollHeight - window.innerHeight;
            if (over <= 1)
                break;
            fit = apply(fit * (window.innerHeight / document.documentElement.scrollHeight));
        }
    }
    let fitTimer: ReturnType<typeof setTimeout> | undefined;
    listen(window, "resize", () => {
        clearTimeout(fitTimer);
        fitTimer = setTimeout(fitSlide, 80);
    });
    /** Записывает переход в историю и показывает выбранный слайд. */
    function navigate(hash: string, focusHeading = false) {
        if (hash !== location.hash)
            history.pushState(null, "", hash);
        showSlide(focusHeading);
    }
    /** Возвращает выбранный уровень автономности. */
    function currentLevel() {
        return levelButtons.findIndex((b) => b.getAttribute("aria-pressed") === "true");
    }
    /** Переключает уровень внутри слайда 15, затем соседний слайд. */
    function go(delta: number) {
        if (slides[current] === levelSlide) {
            const l = currentLevel() + delta;
            if (l >= 0 && l < levelButtons.length) {
                setLevel(l);
                return;
            }
        }
        const n = Math.min(slides.length - 1, Math.max(0, current + delta));
        if (n !== current)
            navigate("#slide-" + String(n + 1).padStart(2, "0"));
    }
    listen(byId("prev"), "click", () => go(-1));
    listen(byId("next"), "click", () => go(1));
    const previousScrollRestoration = history.scrollRestoration;
    history.scrollRestoration = "manual";
    listen(window, "hashchange", () => showSlide());
    listen(window, "popstate", () => showSlide());
    listen(window, "load", () => {
        window.scrollTo({ top: 0, behavior: "instant" });
        frame(() => window.scrollTo({ top: 0, behavior: "instant" }));
    });
    listen(document, "click", (ev) => {
        if (!(ev.target instanceof Element))
            return;
        const a = ev.target.closest<HTMLAnchorElement>('a[href^="#slide-"]');
        if (a) {
            ev.preventDefault();
            if (a.hash === location.hash) {
                closeDetail();
                window.scrollTo({ top: 0, behavior: "instant" });
            }
            else
                navigate(a.hash, true);
        }
    });
    listen(document, "keydown", (ev) => {
        if (!(ev.target instanceof Element))
            return;
        if (opened) {
            if (ev.key === "Escape") {
                ev.preventDefault();
                closeDetail();
                return;
            }
            if (ev.key === "Tab") {
                const items = [
                    ...opened.querySelectorAll<HTMLElement>('.dialog-content a[href],.dialog-content button:not([disabled]),.dialog-content [tabindex="0"]'),
                ].filter((x) => x.getClientRects().length);
                if (!items.length)
                    return;
                const first = items[0], last = items[items.length - 1];
                if (ev.shiftKey &&
                    (document.activeElement === first ||
                        !opened.contains(document.activeElement))) {
                    ev.preventDefault();
                    last.focus();
                }
                else if (!ev.shiftKey &&
                    (document.activeElement === last ||
                        !opened.contains(document.activeElement))) {
                    ev.preventDefault();
                    first.focus();
                }
            }
            return;
        }
        const level = ev.target.closest(".level-step");
        if (level &&
            ["ArrowLeft", "ArrowRight", "Home", "End"].includes(ev.key)) {
            ev.preventDefault();
            if (ev.key === "Home")
                setLevel(0);
            else if (ev.key === "End")
                setLevel(levelButtons.length - 1);
            else
                go(ev.key === "ArrowRight" ? 1 : -1);
            if (slides[current] === levelSlide)
                levelButtons[currentLevel()]?.focus();
            return;
        }
        if (ev.target.matches("input,textarea,select,[contenteditable]"))
            return;
        if (ev.key === "ArrowRight" || ev.key === "PageDown") {
            ev.preventDefault();
            go(1);
        }
        else if (ev.key === "ArrowLeft" || ev.key === "PageUp") {
            ev.preventDefault();
            go(-1);
        }
    });
    const levelData = [
        [
            "0",
            "Без AI",
            "Аналитик, разработчик и QA сами выполняют работу и передают её дальше",
            "Не участвует",
            "Человек выполняет все этапы",
        ],
        [
            "1",
            "AI-чат",
            "Сотрудник задаёт вопросы, передаёт материалы в чат и использует ответ",
            "Подсказывает и помогает с черновиком",
            "Человек сам переносит результат в рабочие инструменты",
        ],
        [
            "2",
            "Локальный агент",
            "Сотрудник ставит задачу и управляет агентом на своём устройстве",
            "Работает с доступными файлами и инструментами сотрудника",
            "Агент помогает каждой роли, но работа ещё зависит от её локального окружения",
        ],
        [
            "3",
            "Фоновый агент",
            "Сотрудник направляет работу и подключается, если есть вопросы или что-то пошло не так",
            "Выполняет задачи в отдельной среде, независимо от ноутбука сотрудника",
            "Агент работает без постоянного участия человека. Как передавать контекст и результаты между этапами, ещё нужно согласовать",
        ],
        [
            "4",
            "Автономный цикл",
            "Люди задают цели и наблюдают за результатом",
            "Выполняет весь цикл работы в пределах, которые мы задали",
            "Система сама выполняет, проверяет и исправляет работу",
        ],
    ];
    const roleWork = [
        "Работает с требованиями и источниками.",
        "Работает с кодом и инструментами.",
        "Работает с проверками и результатами.",
    ];
    const executors = [
        "Человек",
        "Человек + AI-чат",
        "Локальный агент",
        "Фоновый агент",
        "Агенты в автономном цикле",
    ];
    /** Обновляет описание работы ролей для выбранного уровня 0–4. */
    function setLevel(i: number) {
        document
            .querySelectorAll<HTMLButtonElement>(".level-step")
            .forEach((b, n) => b.setAttribute("aria-pressed", String(i === n)));
        byId("level-name").textContent =
            i + " · " + levelData[i][1];
        byId("level-human").textContent = levelData[i][2];
        byId("level-change").textContent = levelData[i][4];
        document
            .querySelectorAll(".executor")
            .forEach((x) => (x.textContent = executors[i]));
        document
            .querySelectorAll<HTMLElement>(".role-action")
            .forEach((x, n) => (x.textContent =
            i === 0
                ? "Сам выполняет работу и передаёт результат дальше."
                : i === 1
                    ? "Сотрудник передаёт материалы в чат и использует ответ."
                    : i === 2
                        ? roleWork[n]
                        : i === 3
                            ? "Выполняет задачи в фоне, независимо от ноутбука."
                            : "Выполняет свою часть работы и передаёт результат другим агентам."));
        required(document, ".autonomy-loop").hidden = i !== 4;
        required<HTMLElement>(document, ".role-lanes").dataset.level = String(i);
        if (typeof fitSlide === "function")
            fitSlide();
    }
    document
        .querySelectorAll<HTMLButtonElement>(".level-step")
        .forEach((b) => listen(b, "click", () => setLevel(Number(b.dataset.level))));
    let statusTimer: ReturnType<typeof setTimeout> | undefined;
    /** Показывает временное доступное уведомление. */
    function status(t: string) {
        const s = byId("status");
        s.textContent = t;
        clearTimeout(statusTimer);
        statusTimer = setTimeout(() => (s.textContent = ""), 5500);
    }
    listen(byId<HTMLButtonElement>("fullscreen"), "click", async () => {
        try {
            if (document.fullscreenElement) {
                await document.exitFullscreen();
            }
            else if (document.documentElement.requestFullscreen) {
                await document.documentElement.requestFullscreen();
            }
            else {
                status("Полный экран недоступен. Обычный просмотр продолжает работать. / Fullscreen unavailable.");
            }
        }
        catch {
            status("Браузер отклонил полный экран. Навигация доступна. / Fullscreen denied.");
        }
    });
    listen(document, "fullscreenchange", () => {
        byId<HTMLButtonElement>("fullscreen")
            .setAttribute("aria-pressed", String(!!document.fullscreenElement));
    });
    // Дата показа по московскому времени обновляется и в открытой вкладке.
    /** Обновляет дату показа по московскому времени. */
    function updatePresentationDate() {
        const now = new Date();
        const date = byId<HTMLTimeElement>("presentation-date");
        date.textContent = new Intl.DateTimeFormat("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric",
            timeZone: "Europe/Moscow",
        }).format(now);
        date.dateTime = new Intl.DateTimeFormat("en-CA", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            timeZone: "Europe/Moscow",
        }).format(now);
    }
    updatePresentationDate();
    const dateInterval = setInterval(updatePresentationDate, 60000);
    listen(document, "visibilitychange", updatePresentationDate);
    root.classList.add("js");
    showSlide();
    if (document.fonts && document.fonts.ready)
        document.fonts.ready.then(() => { if (!abort.signal.aborted)
            fitSlide(); });
    return () => {
        abort.abort();
        questionView.active = false;
        questionView.pending?.();
        clearInterval(questionsInterval);
        clearInterval(dateInterval);
        clearTimeout(fitTimer);
        clearTimeout(statusTimer);
        frames.forEach(cancelAnimationFrame);
        closeDetail(false);
        root.classList.remove("js");
        root.style.removeProperty("--page");
        document.body.classList.remove("modal-open");
        history.scrollRestoration = previousScrollRestoration;
        document.title = originalTitle;
    };
}
