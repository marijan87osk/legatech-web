import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource/ibm-plex-mono/latin-500.css";
import "@fontsource/ibm-plex-mono/latin-ext-500.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://legatech.hr"),
  title: "Legatech | Izrada web stranica, SEO i web trgovina",
  description:
    "Legatech pomaže hrvatskim tvrtkama izgraditi brze web stranice, web trgovine i SEO temelje koji podržavaju rast poslovanja.",
  openGraph: {
    title: "Legatech | Web koji radi za vaše poslovanje",
    description:
      "Izrada web stranica, web trgovina, SEO optimizacija i održavanje uz jasan proces i osoban pristup.",
    locale: "hr_HR",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hr">
      <body>{children}</body>
    </html>
  );
}
