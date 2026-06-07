"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore
} from "react";

export type ThemeMode = "light" | "auto" | "dark";
export type EffectiveTheme = "light" | "dark";

const STORAGE_KEY = "sergey.gyach.ru.theme";
const THEME_CHANGE_EVENT = "sergey.gyach.ru.theme-change";
const DEFAULT_THEME_MODE: ThemeMode = "auto";

type ThemeSnapshot = `${ThemeMode}:${EffectiveTheme}`;

type ThemeContextValue = {
  effectiveTheme: EffectiveTheme;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function normalizeThemeMode(value: string | null | undefined): ThemeMode | null {
  if (value === "light" || value === "auto" || value === "dark") {
    return value;
  }

  return null;
}

function getStoredThemeMode(): ThemeMode | null {
  try {
    return normalizeThemeMode(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

function getSystemTheme(): EffectiveTheme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function resolveTheme(mode: ThemeMode): EffectiveTheme {
  return mode === "auto" ? getSystemTheme() : mode;
}

function applyTheme(mode: ThemeMode, effectiveTheme = resolveTheme(mode)) {
  document.documentElement.dataset.theme = effectiveTheme;
  document.documentElement.dataset.themeMode = mode;
  document.documentElement.style.colorScheme = effectiveTheme;
}

function persistThemeMode(mode: ThemeMode) {
  applyTheme(mode);

  try {
    window.localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    // Browsers can disable localStorage. The selected theme still applies.
  }
}

function getClientThemeSnapshot(): ThemeSnapshot {
  const mode = getStoredThemeMode() ?? DEFAULT_THEME_MODE;
  return `${mode}:${resolveTheme(mode)}`;
}

function getServerThemeSnapshot(): ThemeSnapshot {
  return `${DEFAULT_THEME_MODE}:light`;
}

function subscribeToThemeChanges(onChange: () => void) {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  function handleStorage(event: StorageEvent) {
    if (event.key === STORAGE_KEY) {
      onChange();
    }
  }

  window.addEventListener("storage", handleStorage);
  window.addEventListener(THEME_CHANGE_EVENT, onChange);

  if (typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", onChange);
  } else {
    mediaQuery.addListener(onChange);
  }

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(THEME_CHANGE_EVENT, onChange);

    if (typeof mediaQuery.removeEventListener === "function") {
      mediaQuery.removeEventListener("change", onChange);
    } else {
      mediaQuery.removeListener(onChange);
    }
  };
}

export function ThemeProvider({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const snapshot = useSyncExternalStore(
    subscribeToThemeChanges,
    getClientThemeSnapshot,
    getServerThemeSnapshot
  );
  const [mode, effectiveTheme] = snapshot.split(":") as [
    ThemeMode,
    EffectiveTheme
  ];

  useEffect(() => {
    applyTheme(mode, effectiveTheme);

    try {
      if (getStoredThemeMode() === null) {
        window.localStorage.setItem(STORAGE_KEY, mode);
      }
    } catch {
      // Browsers can disable localStorage. The selected theme still applies.
    }
  }, [effectiveTheme, mode]);

  const setMode = useCallback((nextMode: ThemeMode) => {
    persistThemeMode(nextMode);
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      effectiveTheme,
      mode,
      setMode
    }),
    [effectiveTheme, mode, setMode]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}
