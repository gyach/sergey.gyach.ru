import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { PresentationAnalytics } from "@/components/presentations/presentation-analytics";
import "@/components/presentations/brand.css";
const onest = localFont({
    src: "../../components/presentations/fonts/Onest-Variable.ttf",
    variable: "--font-onest",
    display: "swap",
    weight: "100 900",
});
export const metadata: Metadata = {
    title: { default: "Презентации HRlink", template: "%s · HRlink" },
    description: "Презентации HRlink",
    icons: { icon: "/presentations/hrlink/favicon.svg" },
};
export const viewport: Viewport = { colorScheme: "light", themeColor: "#f9faea" };
/** Изолированное фирменное оформление презентаций, независимое от темы личного сайта. */
export default function PresentationLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return <html lang="ru" className={onest.variable}>
    <body className="hrlink-presentation">
      {children}
      <PresentationAnalytics />
    </body>
  </html>;
}
