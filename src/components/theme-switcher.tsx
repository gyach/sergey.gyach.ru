"use client";

import { Monitor, Moon, Sun, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { type ThemeMode, useTheme } from "@/components/theme-provider";

type ThemeOption = {
  Icon: LucideIcon;
  mode: ThemeMode;
};

const themeOptions: ThemeOption[] = [
  { mode: "light", Icon: Sun },
  { mode: "auto", Icon: Monitor },
  { mode: "dark", Icon: Moon }
];

const labels: Record<
  "ru" | "en",
  {
    aria: string;
    options: Record<ThemeMode, string>;
  }
> = {
  ru: {
    aria: "Тема",
    options: {
      light: "Светлая тема",
      auto: "Авто: системная тема",
      dark: "Темная тема"
    }
  },
  en: {
    aria: "Theme",
    options: {
      light: "Light theme",
      auto: "Auto: system theme",
      dark: "Dark theme"
    }
  }
};

export function ThemeSwitcher() {
  const { locale } = useLanguage();
  const { mode, setMode } = useTheme();
  const text = labels[locale];

  return (
    <div className="theme-switcher" role="group" aria-label={text.aria}>
      {themeOptions.map(({ Icon, mode: optionMode }) => {
        const label = text.options[optionMode];

        return (
          <button
            aria-label={label}
            aria-pressed={mode === optionMode}
            className="theme-option"
            key={optionMode}
            onClick={() => setMode(optionMode)}
            title={label}
            type="button"
          >
            <Icon size={15} strokeWidth={2.2} aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}
