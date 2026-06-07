import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { defaultLocale, localizedContent, site } from "@/data/site";
import "./globals.css";

const defaultContent = localizedContent[defaultLocale];
const themeInitScript = `(() => {
  const storageKey = "sergey.gyach.ru.theme";
  const validModes = new Set(["light", "auto", "dark"]);
  let shouldPersistMode = false;
  let mode = "auto";

  try {
    const storedMode = window.localStorage.getItem(storageKey);
    if (validModes.has(storedMode)) {
      mode = storedMode;
    } else {
      shouldPersistMode = true;
    }
  } catch {
    shouldPersistMode = false;
  }

  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  const effectiveTheme = mode === "auto" ? systemTheme : mode;
  const root = document.documentElement;

  root.dataset.theme = effectiveTheme;
  root.dataset.themeMode = mode;
  root.style.colorScheme = effectiveTheme;

  if (shouldPersistMode) {
    try {
      window.localStorage.setItem(storageKey, mode);
    } catch {}
  }
})();`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: defaultContent.metadataTitle,
    template: `%s - ${site.name}`
  },
  description: defaultContent.metadataDescription,
  alternates: {
    canonical: site.url
  },
  icons: {
    icon: [
      {
        url: "/icons/icon-light.svg",
        media: "(prefers-color-scheme: light)",
        type: "image/svg+xml",
        sizes: "any"
      },
      {
        url: "/icons/icon-dark.svg",
        media: "(prefers-color-scheme: dark)",
        type: "image/svg+xml",
        sizes: "any"
      }
    ]
  },
  openGraph: {
    title: defaultContent.metadataTitle,
    description: defaultContent.metadataDescription,
    url: site.url,
    siteName: site.domain,
    images: [
      {
        url: "/images/avatar-2026.jpg",
        width: 1254,
        height: 1254,
        alt: defaultContent.heroImageAlt
      }
    ],
    type: "website"
  }
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f9f8" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1117" }
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={defaultLocale} suppressHydrationWarning>
      <body>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        {children}
      </body>
    </html>
  );
}
