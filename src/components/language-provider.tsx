"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore
} from "react";
import { defaultLocale, type Locale } from "@/data/site";

const STORAGE_KEY = "sergey.gyach.ru.locale";
const LANGUAGE_CHANGE_EVENT = "sergey.gyach.ru.locale-change";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function normalizeLocale(value: string | null | undefined): Locale | null {
  if (!value) {
    return null;
  }

  const normalized = value.toLowerCase();

  if (normalized.startsWith("en")) {
    return "en";
  }

  if (normalized.startsWith("ru")) {
    return "ru";
  }

  return null;
}

function getStoredLocale(): Locale | null {
  try {
    return normalizeLocale(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

function getBrowserLocale(): Locale {
  const languageCandidates = [
    ...(navigator.languages ?? []),
    navigator.language
  ];

  for (const language of languageCandidates) {
    const locale = normalizeLocale(language);

    if (locale) {
      return locale;
    }
  }

  return defaultLocale;
}

function persistLocale(locale: Locale) {
  document.documentElement.lang = locale;

  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // Browsers can disable localStorage. The UI still works for this session.
  }
}

function getClientLocale(): Locale {
  return getStoredLocale() ?? getBrowserLocale();
}

function getServerLocale(): Locale {
  return defaultLocale;
}

function subscribeToLocaleChanges(onChange: () => void) {
  function handleStorage(event: StorageEvent) {
    if (event.key === STORAGE_KEY) {
      onChange();
    }
  }

  window.addEventListener("storage", handleStorage);
  window.addEventListener(LANGUAGE_CHANGE_EVENT, onChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(LANGUAGE_CHANGE_EVENT, onChange);
  };
}

export function LanguageProvider({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = useSyncExternalStore(
    subscribeToLocaleChanges,
    getClientLocale,
    getServerLocale
  );

  useEffect(() => {
    persistLocale(locale);
  }, [locale]);

  const setLocale = useCallback((nextLocale: Locale) => {
    persistLocale(nextLocale);
    window.dispatchEvent(new Event(LANGUAGE_CHANGE_EVENT));
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale
    }),
    [locale, setLocale]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}
