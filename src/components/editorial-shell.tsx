import type { ReactNode } from "react";
import { EditorialFooter } from "./editorial-footer";
import { EditorialHeader } from "./editorial-header";

interface EditorialShellProps {
  children: ReactNode;
  variant: "home-v0-page" | "blog-v0-page" | "project-v0-page" | "service-v0-page" | "pricing-v0-page" | "company-v0-page" | "legal-v0-page";
}

export function EditorialShell({ children, variant }: EditorialShellProps) {
  return (
    <div className={`editorial-site ${variant}`}>
      <a className="skip-link" href="#sadrzaj">Preskočite na sadržaj</a>
      <EditorialHeader />
      <main id="sadrzaj">{children}</main>
      <EditorialFooter />
    </div>
  );
}
