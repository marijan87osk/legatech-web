import { ApprovedServicePage, approvedServiceMetadata } from "@/src/components/approved-service-page";

export const metadata = approvedServiceMetadata("odrzavanje-web-stranica");

export default function OdrzavanjeWebStranicaPage() {
  return <ApprovedServicePage route="odrzavanje-web-stranica" />;
}
