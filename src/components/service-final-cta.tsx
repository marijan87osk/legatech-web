import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

type ServiceFinalCtaProps = {
  headingId: string;
  title: string;
  description: string;
};

export function ServiceFinalCta({ headingId, title, description }: ServiceFinalCtaProps) {
  return (
    <section
      className="section compact-cta-section service-final-cta-section"
      aria-labelledby={headingId}
    >
      <div className="container compact-cta">
        <div>
          <h2 id={headingId}>{title}</h2>
          <p>{description}</p>
        </div>
        <Link className="button button-primary" href="/kontakt">
          Zatražite ponudu <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
