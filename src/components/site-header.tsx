"use client";

import { useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { type NavItem } from "@/data/site";

type SiteHeaderProps = {
  navItems: NavItem[];
};

export function SiteHeader({ navItems }: SiteHeaderProps) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMobileNavOpen) {
      return;
    }

    const closeOnOutsidePointerDown = (event: PointerEvent) => {
      const target = event.target;

      if (
        target instanceof Node &&
        mobileNavRef.current &&
        !mobileNavRef.current.contains(target)
      ) {
        setIsMobileNavOpen(false);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileNavOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsidePointerDown);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePointerDown);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMobileNavOpen]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="header-actions">
          <nav className="nav-links desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mobile-nav" ref={mobileNavRef}>
            <button
              className="mobile-nav-trigger"
              type="button"
              aria-label="Primary navigation"
              aria-controls="mobile-navigation"
              aria-expanded={isMobileNavOpen}
              onClick={() => setIsMobileNavOpen((isOpen) => !isOpen)}
            >
              <Menu size={18} aria-hidden="true" />
            </button>
            {isMobileNavOpen ? (
              <nav
                className="mobile-nav-panel"
                id="mobile-navigation"
                aria-label="Primary navigation"
              >
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            ) : null}
          </div>
          <div className="preference-controls">
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
