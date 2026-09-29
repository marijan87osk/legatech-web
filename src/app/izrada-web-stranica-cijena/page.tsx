import { ApprovedServicePage, approvedServiceMetadata } from "@/src/components/approved-service-page";

export const metadata = approvedServiceMetadata("izrada-web-stranica-cijena");

export default function IzradaWebStranicaCijenaPage() {
  return <ApprovedServicePage route="izrada-web-stranica-cijena" />;
}
