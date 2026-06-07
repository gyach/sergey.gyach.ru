"use client";

import { localeLabels, type Locale } from "@/data/site";
import { useLanguage } from "@/components/language-provider";

const locales: Locale[] = ["ru", "en"];

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const ariaLabel = locale === "ru" ? "Язык" : "Language";

  return (
    <div className="language-switcher" role="group" aria-label={ariaLabel}>
      {locales.map((item) => (
        <button
          aria-pressed={locale === item}
          className="language-option"
          key={item}
          onClick={() => setLocale(item)}
          type="button"
        >
          {localeLabels[item]}
        </button>
      ))}
    </div>
  );
}
