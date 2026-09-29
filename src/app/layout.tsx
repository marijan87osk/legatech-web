import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource/ibm-plex-mono/latin-500.css";
import "@fontsource/ibm-plex-mono/latin-ext-500.css";
import { MobileContactActions } from "@/src/components/mobile-contact-actions";
import { PrivacyTools } from "@/src/components/privacy-tools";
import { siteUrl } from "@/src/lib/seo";
import "./globals.css";
import "./editorial-home.css";
import "./editorial-foundation.css";
import "./editorial-blog.css";
import "./editorial-project.css";
import "./editorial-service.css";
import "./editorial-service-overrides.css";
import "./editorial-inner.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Legatech - Izrada Weba, Shopa i SEO - Legatech",
  description:
    "Legatech pomaže tvrtkama i obrtima izgraditi brze web stranice, WooCommerce trgovine i organsku vidljivost kroz SEO. Zatražite ponudu.",
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
