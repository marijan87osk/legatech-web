import { ApprovedServicePage, approvedServiceMetadata } from "@/src/components/approved-service-page";

export const metadata = approvedServiceMetadata("izrada-web-trgovina");

export default function IzradaWebTrgovinaPage() {
  return <ApprovedServicePage route="izrada-web-trgovina" />;
}
