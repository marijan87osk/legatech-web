import Link from "next/link";
import { EditorialShell } from "@/src/components/editorial-shell";

export default function NotFound() {
  return (
    <EditorialShell variant="company-v0-page">
      <section className="enf-section"><div className="container"><p className="ec-eyebrow">404</p><h1>Ova stranica ne postoji.</h1><p>Adresa je možda promijenjena ili je sadržaj uklonjen.</p><Link className="ep-button" href="/">Povratak na naslovnu <span aria-hidden="true">↗</span></Link></div></section>
    </EditorialShell>
  );
}
