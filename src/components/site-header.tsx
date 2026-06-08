import { Menu } from "lucide-react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { type NavItem } from "@/data/site";

type SiteHeaderProps = {
  navItems: NavItem[];
};

export function SiteHeader({ navItems }: SiteHeaderProps) {
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
          <details className="mobile-nav">
            <summary aria-label="Primary navigation">
              <Menu size={18} aria-hidden="true" />
            </summary>
            <nav className="mobile-nav-panel" aria-label="Primary navigation">
              {navItems.map((item) => (
                <a key={item.href} href={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>
          </details>
          <div className="preference-controls">
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
