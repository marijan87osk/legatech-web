import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { SiteFooter } from "@/src/components/site-footer";
import { SiteHeader } from "@/src/components/site-header";

export default function NotFound() {
  return <><SiteHeader /><main id="sadrzaj"><section className="section not-found-section"><div className="container"><p className="mono-label">404</p><h1>Ova stranica ne postoji.</h1><p>Adresa je možda promijenjena ili je sadržaj uklonjen.</p><Link className="button button-primary" href="/"><ArrowLeft size={18} aria-hidden="true" /> Povratak na naslovnu</Link></div></section></main><SiteFooter /></>;
}
