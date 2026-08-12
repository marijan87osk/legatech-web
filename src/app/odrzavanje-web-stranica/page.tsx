import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CloudArrowUp,
  EnvelopeSimple,
  HardDrives,
  ShieldCheck,
  Timer,
} from "@phosphor-icons/react/dist/ssr";
import { ServiceClientLogos } from "@/src/components/client-logo-wall";
import { Faq } from "@/src/components/faq";
import { MaintenanceRiskDiagnosis } from "@/src/components/maintenance-risk-diagnosis";
import { Reveal } from "@/src/components/reveal";
import { ServiceExpectations } from "@/src/components/service-expectations";
import { ServiceFinalCta } from "@/src/components/service-final-cta";
import { SiteFooter } from "@/src/components/site-footer";
import { SiteHeader } from "@/src/components/site-header";
import { TestimonialSlider } from "@/src/components/testimonial-slider";
import { balazProject, barisicPlastProject, ducijaProject } from "@/src/data/projects";
import {
  backupRecovery,
  changeAllowances,
  includedChangeExamples,
  maintenanceAudience,
  maintenanceBenefits,
  maintenanceCadence,
  maintenanceCoverage,
  maintenanceFaq,
  maintenancePackages,
  maintenanceRisks,
  maintenanceTestimonials,
  oneOffGroups,
  supportProcess,
} from "@/src/data/website-maintenance";

export const metadata: Metadata = {
  title: "Održavanje Web Stranica I WordPress Podrška - Legatech",
  description:
    "Redovito WordPress održavanje, backup, sigurnosne provjere, ažuriranja i tehnička podrška. Paketi održavanja od 35 € mjesečno.",
  alternates: {
    canonical: "https://legatech.hr/odrzavanje-web-stranica/",
  },
  openGraph: {
    title: "Održavanje Web Stranica I WordPress Podrška - Legatech",
    description:
      "Redovito WordPress održavanje, backup, sigurnosne provjere, ažuriranja i tehnička podrška. Paketi održavanja od 35 € mjesečno.",
    url: "https://legatech.hr/odrzavanje-web-stranica/",
    type: "website",
  },
};

const relatedServices = [
  {
    title: "Izrada web stranica",
    description: "Kada postojeći web više nije dovoljno stabilna osnova i treba planski redizajn ili novu izvedbu.",
    href: "/izrada-web-stranica-cijena",
  },
  {
    title: "SEO optimizacija",
    description: "Tehničku stabilnost povežite sa sadržajem, vidljivošću i kontinuiranim organskim rastom.",
    href: "/seo-optimizacija-cijena",
  },
  {
    title: "Izrada web trgovina",
    description: "Za WooCommerce prodajni sustav koji tek treba planirati, razviti ili ozbiljnije obnoviti.",
    href: "/izrada-web-trgovina",
  },
];

export default function WebsiteMaintenancePage() {
  return (
    <>
      <a className="skip-link" href="#sadrzaj">Preskočite na sadržaj</a>
      <SiteHeader />

      <main id="sadrzaj" className="inner-page maintenance-page">
        <section className="maintenance-hero" aria-labelledby="maintenance-title">
          <div className="container maintenance-hero-grid">
            <div className="maintenance-hero-copy">
              <p className="mono-label">Održavanje web stranica</p>
              <h1 id="maintenance-title">Održavanje web stranica koje ostaju sigurne, ažurne i dostupne.</h1>
              <p className="maintenance-hero-lead">
                Preuzimamo ažuriranja, sigurnosne kopije, tehničke provjere i podršku kako biste znali tko brine o webu kada nešto treba napraviti.
              </p>
              <div className="maintenance-hero-actions">
                <Link className="button button-primary" href="/kontakt">Zatražite ponudu</Link>
                <a className="button button-secondary" href="#paketi-odrzavanja">Pogledajte pakete</a>
              </div>
              <div className="maintenance-hero-price">
                <span>Početna cijena</span>
                <strong>Od 35 € mjesečno</strong>
                <small>Opseg i vrijeme reakcije ovise o odabranom paketu.</small>
              </div>
            </div>

            <Reveal className="maintenance-hero-placeholder" delay={0.08}>
              <Link className="maintenance-placeholder-field" href={ducijaProject.href} aria-label="Pogledajte studiju slučaja Ducija">
                <Image
                  src={ducijaProject.image}
                  alt={ducijaProject.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 767px) 100vw, 42vw"
                />
              </Link>
              <div className="maintenance-placeholder-caption">
                <span className="project-real-label">Održavanje nakon objave / 2026.</span>
                <div><strong>Ducija</strong><span>Izrada weba, SEO i održavanje</span></div>
              </div>
            </Reveal>
          </div>
        </section>

        <ServiceExpectations
          title="Što možete očekivati od održavanja"
          items={[
            {
              icon: <ShieldCheck size={25} aria-hidden="true" />,
              title: "Preventivna briga",
              description: "Redovite provjere smanjuju rizik problema i pomažu da web ostane pouzdan.",
            },
            {
              icon: <CloudArrowUp size={25} aria-hidden="true" />,
              title: "Pouzdanije kopije",
              description: "Sigurnosne kopije izrađuju se prema paketu i spremaju izvan osnovne instalacije weba.",
            },
            {
              icon: <Timer size={25} aria-hidden="true" />,
              title: "Dogovorena reakcija",
              description: "Svaki paket jasno navodi koliko brzo započinjemo pregled zahtjeva ili tehničkog problema.",
            },
          ]}
          note="Učestalost provjera, sigurnosnih kopija i vrijeme reakcije ovise o odabranom paketu održavanja."
        />

        <ServiceClientLogos />

        <section className="section maintenance-audience-section" aria-labelledby="maintenance-audience-title">
          <div className="container maintenance-audience-layout">
            <Reveal className="maintenance-sticky-intro">
              <p className="mono-label">Za koga je održavanje</p>
              <h2 id="maintenance-audience-title">Web je važan, ali njegovo održavanje nije vaš posao.</h2>
              <p>Mjesečni paket ima smisla kada web podržava prodaju, upite ili svakodnevni rad, a nemate osobu koja će redovito pratiti tehničko stanje.</p>
            </Reveal>
            <div className="maintenance-audience-list">
              {maintenanceAudience.map(([title, description]) => (
                <article key={title}><Check size={21} weight="bold" aria-hidden="true" /><div><h3>{title}</h3><p>{description}</p></div></article>
              ))}
            </div>
          </div>
        </section>

        <section className="section maintenance-risks-section" aria-labelledby="maintenance-risks-title">
          <div className="container">
            <Reveal className="section-heading">
              <h2 id="maintenance-risks-title">Problem je lakše riješiti kada ga uočimo na vrijeme.</h2>
              <p>Odaberite rizik i pogledajte kako ga prepoznajemo, kako smanjujemo vjerojatnost problema i što radimo ako se ipak dogodi.</p>
            </Reveal>
            <MaintenanceRiskDiagnosis risks={maintenanceRisks} />
          </div>
        </section>

        <section className="section maintenance-coverage-section" aria-labelledby="maintenance-coverage-title">
          <div className="container">
            <Reveal className="maintenance-coverage-heading">
              <p className="mono-label">Što održavanje uključuje</p>
              <h2 id="maintenance-coverage-title">Tehnička briga sastoji se od više povezanih provjera.</h2>
              <p>Točan ritam i opseg ovise o paketu, važnosti weba i funkcionalnostima koje treba pratiti.</p>
            </Reveal>
            <div className="maintenance-coverage-grid">
              {maintenanceCoverage.map((item, index) => (
                <Reveal key={item.title} className={`maintenance-coverage-item maintenance-coverage-item-${index + 1}`} delay={index * 0.03}>
                  <span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.text}</p><strong>{item.detail}</strong>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section maintenance-backup-section" aria-labelledby="maintenance-backup-title">
          <div className="container maintenance-backup-layout">
            <Reveal className="maintenance-backup-intro">
              <HardDrives size={38} aria-hidden="true" />
              <h2 id="maintenance-backup-title">Backup vrijedi tek kada iz njega možete sigurno vratiti web.</h2>
              <p>Kopija na istom mjestu nije dovoljna zaštita. Važni su učestalost, odvojena pohrana i odluka koju verziju treba vratiti.</p>
            </Reveal>
            <ol className="maintenance-backup-path">
              {backupRecovery.map(([title, description], index) => (
                <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{description}</p></div></li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section maintenance-cadence-section" aria-labelledby="maintenance-cadence-title">
          <div className="container maintenance-cadence-layout">
            <Reveal className="maintenance-cadence-intro">
              <h2 id="maintenance-cadence-title">Ritam provjera prati važnost weba.</h2>
              <p>Jednostavna prezentacijska stranica i aktivna trgovina nemaju isti rizik ni potrebu za istom učestalošću.</p>
            </Reveal>
            <div className="maintenance-cadence-table" role="table" aria-label="Učestalost aktivnosti održavanja">
              {maintenanceCadence.map((item) => (
                <div key={item.rhythm} className="maintenance-cadence-row" role="row">
                  <strong role="cell">{item.rhythm}</strong><p role="cell">{item.activity}</p><span role="cell">{item.plans}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section maintenance-changes-section" aria-labelledby="maintenance-changes-title">
          <div className="container maintenance-changes-layout">
            <Reveal className="maintenance-changes-copy">
              <p className="mono-label">Manje izmjene</p>
              <h2 id="maintenance-changes-title">Svakodnevni zahvati ne trebaju postati novi projekt.</h2>
              <p>Odabrani paketi uključuju vrijeme za manje sadržajne ili tehničke zadatke unutar postojećeg sustava.</p>
              <ul>{includedChangeExamples.map((item) => <li key={item}><Check size={18} weight="bold" aria-hidden="true" />{item}</li>)}</ul>
            </Reveal>
            <div className="maintenance-allowances">
              {changeAllowances.map(([name, allowance]) => <div key={name}><span>{name}</span><strong>{allowance}</strong></div>)}
              <p>Neiskorišteno vrijeme ne prenosi se u sljedeći mjesec. Veći zahvati procjenjuju se prije rada.</p>
            </div>
          </div>
        </section>

        <section className="section maintenance-support-section" aria-labelledby="maintenance-support-title">
          <div className="container">
            <Reveal className="section-heading narrow-heading">
              <h2 id="maintenance-support-title">Jasan put od zahtjeva do potvrde.</h2>
              <p>Znate što trebate poslati, kada dobivate odgovor i što se događa ako zahvat izlazi iz ugovorenog paketa.</p>
            </Reveal>
            <ol className="maintenance-support-track" tabIndex={0} aria-label="Proces tehničke podrške">
              {supportProcess.map(([title, description], index) => (
                <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{description}</p></li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section maintenance-project-section" aria-labelledby="maintenance-project-title">
          <div className="container maintenance-project-layout">
            <Link className="maintenance-project-image" href={balazProject.href} aria-label="Pogledajte studiju slučaja Odvjetnički ured Balaž">
              <Image
                src={balazProject.image}
                alt={balazProject.imageAlt}
                fill
                sizes="(max-width: 767px) 100vw, 58vw"
              />
            </Link>
            <div className="maintenance-project-copy">
              <div className="maintenance-project-meta">
                <span className="project-real-label">SEO i održavanje</span>
                <span>Odvjetnički ured Balaž</span>
              </div>
              <h2 id="maintenance-project-title">Postojeći web traži kontinuiranu tehničku brigu.</h2>
              <p>Legatech povezuje SEO i održavanje Odvjetničkog ureda Balaž kako bi opsežan uslužni sadržaj ostao vidljiv, a web pouzdan za posjetitelje.</p>
              <ul>
                {balazProject.feature.items.slice(0, 3).map((item) => (
                  <li key={item}><Check size={18} weight="bold" aria-hidden="true" /> {item}</li>
                ))}
              </ul>
              <Link className="text-link" href={balazProject.href}>
                Pogledajte studiju slučaja <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section className="section maintenance-cases-section" aria-labelledby="maintenance-cases-title">
          <div className="container">
            <Reveal className="section-heading">
              <h2 id="maintenance-cases-title">Tehnička kvaliteta ima vrijednost i nakon objave.</h2>
              <p>Ducija pokazuje kontinuiranu brigu nakon objave, a Barišić Plast kako pouzdana tehnička osnova podržava SEO i poslovne upite.</p>
            </Reveal>
            <div className="maintenance-cases-grid">
              {[ducijaProject, barisicPlastProject].map((project, index) => (
                <article key={project.slug} className={`maintenance-case maintenance-case-${index + 1}`}>
                  <Link className="maintenance-case-image" href={project.href} aria-label={`Pogledajte studiju slučaja ${project.client}`}>
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      sizes="(max-width: 767px) 100vw, 50vw"
                    />
                  </Link>
                  <div className="maintenance-case-body">
                    <div className="maintenance-case-meta"><span>{project.serviceLabel}</span>{project.year && <span>{project.year}</span>}</div>
                    <h3>{project.client}</h3>
                    <p className="maintenance-case-type">{project.challenge}</p>
                    <dl>
                      <div><dt>Pristup</dt><dd>{project.solution}</dd></div>
                      <div><dt>Poslovna vrijednost</dt><dd>{project.result.value}: {project.result.label}.</dd></div>
                    </dl>
                    <Link className="text-link" href={project.href}>Pogledajte studiju slučaja <ArrowRight size={18} aria-hidden="true" /></Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="paketi-odrzavanja" className="section maintenance-packages-section" aria-labelledby="maintenance-packages-title">
          <div className="container">
            <Reveal className="maintenance-packages-heading">
              <p className="mono-label">Paketi održavanja</p>
              <h2 id="maintenance-packages-title">Odaberite razinu brige prema važnosti weba.</h2>
              <p>Vrijeme reakcije označava početak pregleda zahtjeva, a ne jamstvo završetka cijelog zahvata unutar tog roka.</p>
            </Reveal>
            <div className="maintenance-package-list">
              {maintenancePackages.map((item) => (
                <article key={item.name} className={`maintenance-package${item.featured ? " is-featured" : ""}`}>
                  <div className="maintenance-package-summary">
                    {item.featured && <span className="maintenance-package-choice">Najčešći odabir</span>}
                    <h3>{item.name}</h3><p>{item.description}</p><strong className="maintenance-package-best">{item.bestFor}</strong>
                    <div className="maintenance-package-price"><strong>{item.price}</strong><span>{item.cadence}</span></div>
                    <dl><div><dt>Reakcija</dt><dd>{item.responseTime}</dd></div><div><dt>Godišnje</dt><dd>{item.annualPrice}</dd></div></dl>
                  </div>
                  <div className="maintenance-package-details">
                    <div className="maintenance-package-rhythm">
                      <div><span>Ažuriranja</span><strong>{item.updateFrequency}</strong></div>
                      <div><span>Backup</span><strong>{item.backupFrequency}</strong></div>
                      <div><span>Uključene izmjene</span><strong>{item.includedTime}</strong></div>
                    </div>
                    <h4>Što paket uključuje</h4>
                    <ul>{item.inclusions.map((inclusion) => <li key={inclusion}><Check size={18} weight="bold" aria-hidden="true" /><span>{inclusion}</span></li>)}</ul>
                  </div>
                </article>
              ))}
            </div>
            <div className="maintenance-package-note">
              <p>Hosting, premium licence, pretplate vanjskih servisa i postojeći tehnički problemi nisu uključeni ako nisu navedeni u pisanoj ponudi.</p>
              <Link className="button button-secondary" href="/cjenik#odrzavanje">Pogledajte detaljan cjenik</Link>
            </div>
          </div>
        </section>

        <section className="section maintenance-oneoff-section" aria-labelledby="maintenance-oneoff-title">
          <div className="container maintenance-oneoff-layout">
            <Reveal className="maintenance-oneoff-intro">
              <h2 id="maintenance-oneoff-title">Mjesečna briga ili pojedinačna intervencija?</h2>
              <p>Paket je namijenjen prevenciji i kontinuitetu. Jednokratni zahvat odgovara jasno ograničenom problemu ili webu koji još nije pod održavanjem.</p>
              <p className="maintenance-oneoff-note">Postojeći problemi prvo se pregledavaju i procjenjuju. Hitnost ne proširuje automatski opseg mjesečnog paketa.</p>
            </Reveal>
            <div className="maintenance-oneoff-groups">
              {oneOffGroups.map((group) => (
                <article key={group.title}><h3>{group.title}</h3><dl>{group.items.map(([name, price]) => <div key={name}><dt>{name}</dt><dd>{price}</dd></div>)}</dl></article>
              ))}
            </div>
          </div>
        </section>

        <section className="section maintenance-testimonials-section" aria-label="Izjave klijenata o suradnji s Legatechom">
          <div className="container"><TestimonialSlider items={maintenanceTestimonials} /></div>
        </section>

        <section className="section maintenance-benefits-section" aria-labelledby="maintenance-benefits-title">
          <div className="container maintenance-benefits-layout">
            <Reveal className="maintenance-sticky-intro">
              <EnvelopeSimple size={36} aria-hidden="true" />
              <h2 id="maintenance-benefits-title">Podrška treba biti tehnička, ali komunikacija ne mora biti komplicirana.</h2>
              <p>Dobivate izravan kontakt, jasno objašnjen opseg i preporuku kada je manji zahvat prerastao održavanje.</p>
            </Reveal>
            <div className="maintenance-benefits-list">
              {maintenanceBenefits.map(([title, description]) => <article key={title}><Check size={21} weight="bold" aria-hidden="true" /><div><h3>{title}</h3><p>{description}</p></div></article>)}
            </div>
          </div>
        </section>

        <section className="section maintenance-faq-section" aria-labelledby="maintenance-faq-title">
          <div className="container faq-layout">
            <Reveal className="faq-intro"><p className="mono-label">Česta pitanja</p><h2 id="maintenance-faq-title">Prije nego što prepustite brigu o webu.</h2><p>Opseg, reakcija, backup, hitne intervencije i postojeći problemi trebaju biti jasni prije početka.</p></Reveal>
            <Faq items={maintenanceFaq} />
          </div>
        </section>

        <section className="section maintenance-related-section" aria-labelledby="maintenance-related-title">
          <div className="container maintenance-related-layout">
            <div><h2 id="maintenance-related-title">Ponekad održavanje otkrije da web treba veći sljedeći korak.</h2><p>Kada problem više nije redovita tehnička briga, povezujemo ga s odgovarajućom Legatech uslugom.</p></div>
            <div className="maintenance-related-list">
              {relatedServices.map((service) => <Link key={service.href} href={service.href}><div><h3>{service.title}</h3><p>{service.description}</p></div><ArrowUpRight size={22} aria-hidden="true" /></Link>)}
              <Link className="maintenance-related-pricing" href="/cjenik">Pogledajte cijeli cjenik <ArrowRight size={18} aria-hidden="true" /></Link>
            </div>
          </div>
        </section>

        <ServiceFinalCta
          headingId="maintenance-final-title"
          title="Niste sigurni koji paket odgovara vašem webu?"
          description="Pošaljite adresu stranice i kratko opišite koliko je web važan poslovanju. Predložit ćemo realnu razinu održavanja."
        />
      </main>

      <SiteFooter />
    </>
  );
}
