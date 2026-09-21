import { LanguageProvider } from "@/components/language-provider";
import { LocalizedHome } from "@/components/localized-home";
import { ThemeProvider } from "@/components/theme-provider";

export default function Home() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <LocalizedHome />
      </LanguageProvider>
    </ThemeProvider>
  );
}
