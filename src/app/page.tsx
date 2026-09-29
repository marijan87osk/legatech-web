import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/src/components/contact-form";
import { EditorialShell } from "@/src/components/editorial-shell";
import { JsonLd } from "@/src/components/json-ld";
import { testimonials } from "@/src/data/client-testimonials";
import { faqItems } from "@/src/data/mock-content";
import { ducijaProject, projectDetails } from "@/src/data/projects";
import { blogPosts, formatBlogDate, summarizeBlogExcerpt } from "@/src/lib/blog";
import { createPageMetadata, organizationJsonLd, websiteJsonLd } from "@/src/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Legatech - Izrada Weba, Shopa i SEO - Legatech",
  description: "Legatech pomaže tvrtkama i obrtima izgraditi brze web stranice, WooCommerce trgovine i organsku vidljivost kroz SEO. Zatražite ponudu.",
  path: "/",
});

const clients = [
  ["krie", "KRIÉ"], ["the-glow", "The Glow"], ["dokkica", "DOKKICA"],
  ["atom", "A.T.O.M."], ["varmos", "Varmos"], ["roxort", "Roxort"],
  ["universum", "Universum"], ["tradingview", "TradingView"],
] as const;

const services = [
  { title: "Izrada web stranica", description: "Brz, responzivan i jasno strukturiran web koji posjetitelje vodi prema upitu.", detail: "Od prvog plana do objave i podrške", href: "/izrada-web-stranica-cijena/" },
  { title: "SEO optimizacija", description: "Tehnički i sadržajni temelji za veću vidljivost u relevantnim Google pretragama.", detail: "Bez nerealnih obećanja i vanity metrika", href: "/seo-optimizacija-cijena/" },
  { title: "Izrada web trgovina", description: "Pregledna kupnja na svakom uređaju, jednostavno upravljanje i prostor za rast.", detail: "Proizvodi, plaćanje, dostava i analitika", href: "/izrada-web-trgovina/" },
  { title: "Održavanje web stranica", description: "Ažuriranja, sigurnosne kopije, provjere i tehnička pomoć kada vam je potrebna.", detail: "Jasan opseg i dogovoreno vrijeme reakcije", href: "/odrzavanje-web-stranica/" },
];

const problems = [
  { title: "Nemate web stranicu", answer: "Dobivate profesionalno mjesto na kojem kupci brzo razumiju tko ste, što nudite i kako vas kontaktirati.", link: "Izrada web stranica", href: "/izrada-web-stranica-cijena/" },
  { title: "Postojeći web izgleda zastarjelo", answer: "Redizajniramo strukturu, sadržaj i vizualni dojam kako bi stranica ponovno gradila povjerenje.", link: "Pogledajte mogućnosti redizajna", href: "/izrada-web-stranica-cijena/" },
  { title: "Ne dobivate dovoljno upita s Googlea", answer: "Otkrivamo tehničke i sadržajne prepreke te gradimo SEO plan usmjeren na relevantne pretrage.", link: "SEO optimizacija", href: "/seo-optimizacija-cijena/" },
  { title: "Želite početi prodavati online", answer: "Planiramo web trgovinu koja kupcima pojednostavljuje pronalazak proizvoda, plaćanje i dostavu.", link: "Izrada web trgovina", href: "/izrada-web-trgovina/" },
  { title: "Web je spor ili nepouzdan", answer: "Provjeravamo performanse, sigurnost i tehničko stanje te rješavamo probleme koji ometaju korisnike.", link: "Održavanje web stranica", href: "/odrzavanje-web-stranica/" },
  { title: "Nemate vremena za održavanje", answer: "Preuzimamo ažuriranja, sigurnosne kopije, provjere i manje izmjene uz jasno definirano vrijeme reakcije.", link: "Paketi održavanja", href: "/odrzavanje-web-stranica/" },
];

const benefits = [
  ["Razgovarate izravno", "Bez prodajnih slojeva i prenošenja informacija kroz veliki tim."],
  ["Znate što plaćate", "Opseg, cijena i rokovi definirani su prije početka rada."],
  ["Web ima poslovni zadatak", "Svaka odluka povezana je s upitima, prodajom ili povjerenjem."],
  ["Podrška ne prestaje objavom", "Po potrebi nastavljamo održavati, pratiti i poboljšavati web."],
];

const process = [
  ["Upoznajemo poslovanje", "Ciljevi, kupci, konkurencija i trenutne prepreke."],
  ["Dogovaramo opseg", "Struktura, sadržaj, funkcionalnosti, cijena i rok."],
  ["Oblikujemo strukturu", "Put posjetitelja i sadržaj koji odgovara na prava pitanja."],
  ["Dizajniramo i razvijamo", "Vizualni sustav i brza, responzivna izvedba."],
  ["Testiramo i objavljujemo", "Sadržaj, obrasci, uređaji, SEO temelji i analitika."],
  ["Ostajemo dostupni", "Edukacija, početna podrška i opcionalno održavanje."],
];

const prices = [
  { title: "Izrada web stranica", description: "Profesionalni web do pet jedinstvenih podstranica.", amount: "Od 500 €" },
  { title: "Izrada web shopa", description: "WooCommerce trgovina s osnovnim katalogom i naplatom.", amount: "Od 1.500 €" },
  { title: "SEO optimizacija", description: "Kontinuirani rad na vidljivosti, sadržaju i tehničkom stanju.", amount: "Od 290 €", period: "mjesečno" },
  { title: "Održavanje", description: "Ažuriranja, sigurnosne provjere, backup i podrška.", amount: "Od 35 €", period: "mjesečno" },
];

function ProjectCard({ project, number }: { project: (typeof projectDetails)[number]; number: number }) {
  return (
    <article className={number === 1 ? "project-featured" : undefined}>
      <Link className="project-image" href={project.href}>
        <Image src={project.image} alt={project.imageAlt} width={960} height={554} sizes={number === 1 ? "(max-width: 700px) 100vw, 55vw" : "(max-width: 700px) 100vw, 42vw"} />
      </Link>
      <div className="project-info">
        <p className="eyebrow">{String(number).padStart(2, "0")} / {project.industry}</p>
        <h3>{project.client}</h3>
        <p className="project-service">{project.serviceLabel}</p>
        <p>{project.challenge}</p>
        <p className="project-result">{project.result.value} {project.result.label}</p>
        <Link className="text-link" href={project.href}>Pogledajte studiju slučaja <span aria-hidden="true">↗</span></Link>
      </div>
    </article>
  );
}

export default function HomePage() {
  const selectedProjects = projectDetails.slice(0, 3);
  return (
    <>
      <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
      <EditorialShell variant="home-v0-page">
        <section className="hero section-dark" aria-labelledby="hero-title">
          <div className="hero-grid container">
            <div className="hero-copy">
              <p className="eyebrow"><span className="signal-dot" aria-hidden="true" />Digitalna agencija iz Osijeka</p>
              <h1 id="hero-title">Web koji radi za <em>vaše poslovanje.</em></h1>
              <p className="hero-lead">Izrada web stranica, trgovina i SEO koji donose više pravih upita.</p>
              <div className="hero-actions">
                <Link className="button button-signal" href="/kontakt/">Zatražite ponudu <span aria-hidden="true">↗</span></Link>
                <a className="button button-outline" href="#projekti">Pogledajte projekte <span aria-hidden="true">↓</span></a>
              </div>
            </div>
            <Link className="hero-work" href={ducijaProject.href} aria-label="Ducija — pogledajte studiju slučaja">
              <div className="hero-work-media"><Image src="/projects/ducija/cover-hero.webp" alt={ducijaProject.imageAlt} width={960} height={554} priority sizes="(max-width: 700px) 100vw, 45vw" /></div>
              <div className="hero-work-caption"><span>Web od nule / {ducijaProject.year}</span><strong>Ducija</strong><small>{ducijaProject.serviceLabel}</small><span className="work-arrow" aria-hidden="true">↗</span></div>
            </Link>
          </div>
          <div className="container hero-meta" aria-label="Način suradnje">
            {["Osobna suradnja", "Transparentne početne cijene", "Podrška nakon objave"].map((item, index) => <div key={item}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></div>)}
          </div>
        </section>

        <section className="client-strip section-dark" id="klijenti" aria-labelledby="clients-title">
          <div className="container client-layout">
            <h2 id="clients-title" className="eyebrow">Odabrani klijenti</h2>
            <div className="client-logos" aria-label="Logotipi odabranih klijenata">
              {clients.map(([src, label]) => <div key={src}><Image src={"/clients/" + src + ".webp"} alt={"Logotip klijenta " + label} width={150} height={60} /></div>)}
            </div>
          </div>
        </section>

        <section className="services section-paper section-space" id="usluge" aria-labelledby="services-title">
          <div className="container">
            <div className="section-intro intro-split"><div><p className="eyebrow">Usluge / 01—04</p><h2 id="services-title">Sve što web treba da podrži rast.</h2></div><p>Četiri povezane usluge, jedan jasan smjer i rješenje prilagođeno stvarnom cilju vašeg poslovanja.</p></div>
            <div className="service-list">
              {services.map((service, index) => <Link className="service-row" href={service.href} key={service.href}><span className="row-number">{String(index + 1).padStart(2, "0")}</span><h3>{service.title}</h3><div><p>{service.description}</p><small>{service.detail}</small></div><span className="row-arrow" aria-hidden="true">↗</span></Link>)}
            </div>
            <div className="service-outcome"><span className="eyebrow">Zajednički cilj</span><p>Web koji privlači, objašnjava i pretvara interes u upit.</p><ol aria-label="Put od vidljivosti do poslovnog rasta">{["Vidljivost", "Povjerenje", "Upit", "Rast"].map((item) => <li key={item}>{item}</li>)}</ol></div>
          </div>
        </section>

        <section className="problems section-dark section-space" aria-labelledby="problems-title">
          <div className="container problem-layout">
            <div className="problem-intro"><p className="eyebrow">Kako pomažemo</p><h2 id="problems-title">Ne trebate još jedan lijep web.</h2><p>Trebate riješiti konkretan problem koji koči vidljivost, prodaju ili svakodnevni rad.</p></div>
            <div className="problem-list">
              {problems.map((problem, index) => <details key={problem.title} open={index === 0}><summary><span>{String(index + 1).padStart(2, "0")}</span>{problem.title}</summary><div className="problem-answer"><p className="eyebrow">Kako pomažemo</p><p>{problem.answer}</p><Link href={problem.href}>{problem.link} <span aria-hidden="true">↗</span></Link></div></details>)}
            </div>
          </div>
        </section>

        <section className="projects section-paper section-space" id="projekti" aria-labelledby="projects-title">
          <div className="container">
            <div className="section-intro project-intro"><p className="eyebrow">Odabrani radovi</p><h2 id="projects-title">Od poslovnog problema do weba koji ima jasnu ulogu.</h2></div>
            <div className="project-stack">
              <ProjectCard project={selectedProjects[0]} number={1} />
              <div className="project-pair">{selectedProjects.slice(1).map((project, index) => <ProjectCard project={project} number={index + 2} key={project.slug} />)}</div>
            </div>
            <div className="project-footer"><Link className="button button-dark" href="/projekti/">Pogledajte sve projekte <span aria-hidden="true">↗</span></Link></div>
          </div>
        </section>

        <section className="testimonials section-dark section-space" id="iskustva" aria-labelledby="testimonials-title">
          <div className="container">
            <div className="section-intro intro-split"><div><p className="eyebrow">Povjerenje iz prve ruke</p><h2 id="testimonials-title">Iskustva suradnje</h2></div><p>Web koji privlači, objašnjava i pretvara interes u upit.</p></div>
            <div className="quote-grid">{testimonials.map((item, index) => <figure className={index === 0 ? "quote-card quote-featured" : "quote-card"} key={item.name}><blockquote>“{item.quote}”</blockquote><figcaption><strong>{item.name}</strong><span>{item.role}, {item.company}</span><small>{item.service}</small></figcaption></figure>)}</div>
            <div className="context-cta"><span>Recite što želite postići.</span><Link href="/kontakt/">Zatražite ponudu <span aria-hidden="true">↗</span></Link></div>
          </div>
        </section>

        <section className="method section-paper section-space" id="zasto-legatech" aria-labelledby="benefits-title">
          <div className="container">
            <div className="section-intro intro-split"><div><p className="eyebrow">Zašto Legatech</p><h2 id="benefits-title">Mali tim znači više fokusa na vaš posao.</h2></div><p>Suradnja je izravna, odluke su objašnjene, a web se gradi oko onoga što poslovanje stvarno treba postići.</p></div>
            <div className="benefit-grid">{benefits.map(([title, description], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
          </div>
        </section>

        <section className="process section-dark section-space" id="proces" aria-labelledby="process-title">
          <div className="container">
            <div className="section-intro intro-split"><div><p className="eyebrow">Kako radimo</p><h2 id="process-title">Jasan proces, bez nagađanja.</h2></div><p>U svakom trenutku znate što radimo, što trebamo od vas i što slijedi.</p></div>
            <ol className="process-list">{process.map(([title, description], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}</ol>
          </div>
        </section>

        <section className="pricing section-paper section-space" id="cijene" aria-labelledby="pricing-title">
          <div className="container">
            <div className="section-intro intro-split"><div><p className="eyebrow">Početne cijene</p><h2 id="pricing-title">Prvo znate okvir. Zatim dogovaramo detalje.</h2></div><p>Cijene vrijede za unaprijed definiran opseg. Konačnu ponudu dobivate nakon kratkih konzultacija.</p></div>
            <div className="pricing-list">{prices.map((price, index) => <article key={price.title}><span className="row-number">{String(index + 1).padStart(2, "0")}</span><div><h3>{price.title}</h3><p>{price.description}</p></div><strong>{price.amount}{price.period && <small>{price.period}</small>}</strong></article>)}</div>
            <div className="pricing-actions"><Link className="button button-dark" href="/cjenik/">Pogledajte detaljan cjenik <span aria-hidden="true">↗</span></Link><Link className="text-link" href="/kontakt/">Zatražite ponudu <span aria-hidden="true">↗</span></Link></div>
          </div>
        </section>

        <section className="faq section-dark section-space" aria-labelledby="faq-title">
          <div className="container faq-layout">
            <div><p className="eyebrow">Česta pitanja</p><h2 id="faq-title">Odgovori prije prvog razgovora.</h2><p>Ako vaše pitanje nije ovdje, opišite projekt i dobit ćete konkretan odgovor.</p></div>
            <div className="faq-list">{faqItems.map((item, index) => <details key={item.question} open={index === 0}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>
          </div>
        </section>

        <section className="journal section-paper section-space" aria-labelledby="journal-title">
          <div className="container">
            <div className="section-intro intro-split"><div><p className="eyebrow">Legatech blog</p><h2 id="journal-title">Praktični odgovori za bolji web.</h2></div></div>
            {blogPosts.length ? <div className="article-grid">{blogPosts.slice(0, 3).map((post) => <Link href={"/blog/" + post.slug + "/"} key={post.slug}><span className="article-meta">{post.categoryLabels[0] ?? "Web i poslovanje"} <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time></span><h3>{post.title}</h3><p>{summarizeBlogExcerpt(post.excerpt)}</p><span className="article-foot">{post.readingMinutes} min čitanja <span aria-hidden="true">↗</span></span></Link>)}</div> : <p className="editorial-empty-note">Prvi stručni vodiči su u pripremi.</p>}
          </div>
        </section>

        <section className="contact section-dark section-space" id="kontakt" aria-labelledby="contact-title">
          <div className="container contact-grid">
            <div className="contact-info"><p className="eyebrow">Zatražite ponudu</p><h2 id="contact-title">Recite što želite postići.</h2><p className="contact-lead">Ukratko opišite poslovanje, trenutni problem i željeni rezultat. Dobit ćete jasan prijedlog sljedećeg koraka.</p><dl><div><dt>Lokacija</dt><dd>Osijek, Hrvatska</dd></div><div><dt>Odgovor</dt><dd>U jednom radnom danu</dd></div><div><dt>Radno vrijeme</dt><dd>08:00-16:00</dd></div></dl><a href="mailto:info@legatech.hr">info@legatech.hr</a><a href="tel:+385997357070">099 735 7070</a></div>
            <ContactForm home />
          </div>
        </section>
      </EditorialShell>
    </>
  );
}
