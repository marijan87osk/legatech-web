import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource/ibm-plex-mono/latin-500.css";
import "@fontsource/ibm-plex-mono/latin-ext-500.css";
import { MobileContactActions } from "@/src/components/mobile-contact-actions";
import { PrivacyTools } from "@/src/components/privacy-tools";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://legatech.hr"),
  title: "Legatech - Izrada Weba, Shopa i SEO - Legatech",
  description:
    "Legatech pomaže tvrtkama i obrtima izgraditi brze web stranice, WooCommerce trgovine i organsku vidljivost kroz SEO. Zatražite ponudu.",
  alternates: {
    canonical: "https://legatech.hr/",
  },
  openGraph: {
    title: "Legatech - Izrada Weba, Shopa i SEO - Legatech",
    description:
      "Legatech pomaže tvrtkama i obrtima izgraditi brze web stranice, WooCommerce trgovine i organsku vidljivost kroz SEO. Zatražite ponudu.",
    url: "https://legatech.hr/",
    locale: "hr_HR",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hr">
      <body>
        {children}
        <MobileContactActions />
        <PrivacyTools />
      </body>
    </html>
  );
}
