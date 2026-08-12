"use client";

import { ArrowRight } from "@phosphor-icons/react";
import { useState } from "react";

const problems = [
  {
    problem: "Nemate web stranicu",
    solution:
      "Dobivate profesionalno mjesto na kojem kupci brzo razumiju tko ste, što nudite i kako vas kontaktirati.",
    link: "/izrada-web-stranica-cijena",
    linkLabel: "Izrada web stranica",
  },
  {
    problem: "Postojeći web izgleda zastarjelo",
    solution:
      "Redizajniramo strukturu, sadržaj i vizualni dojam kako bi stranica ponovno gradila povjerenje.",
    link: "/izrada-web-stranica-cijena",
    linkLabel: "Pogledajte mogućnosti redizajna",
  },
  {
    problem: "Ne dobivate dovoljno upita s Googlea",
    solution:
      "Otkrivamo tehničke i sadržajne prepreke te gradimo SEO plan usmjeren na relevantne pretrage.",
    link: "/seo-optimizacija-cijena",
    linkLabel: "SEO optimizacija",
  },
  {
    problem: "Želite početi prodavati online",
    solution:
      "Planiramo web trgovinu koja kupcima pojednostavljuje pronalazak proizvoda, plaćanje i dostavu.",
    link: "/izrada-web-trgovina",
    linkLabel: "Izrada web trgovina",
  },
  {
    problem: "Web je spor ili nepouzdan",
    solution:
      "Provjeravamo performanse, sigurnost i tehničko stanje te rješavamo probleme koji ometaju korisnike.",
    link: "/odrzavanje-web-stranica",
    linkLabel: "Održavanje web stranica",
  },
  {
    problem: "Nemate vremena za održavanje",
    solution:
      "Preuzimamo ažuriranja, sigurnosne kopije, provjere i manje izmjene uz jasno definirano vrijeme reakcije.",
    link: "/odrzavanje-web-stranica",
    linkLabel: "Paketi održavanja",
  },
];

export function ProblemSolver() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = problems[activeIndex];

  return (
    <div className="problem-solver">
      <div className="problem-list" role="tablist" aria-label="Česti poslovni problemi">
        {problems.map((item, index) => (
          <button
            key={item.problem}
            id={`problem-${index}`}
            type="button"
            role="tab"
            aria-selected={activeIndex === index}
            aria-controls="problem-panel"
            tabIndex={activeIndex === index ? 0 : -1}
            onClick={() => setActiveIndex(index)}
          >
            <span>{item.problem}</span>
            <ArrowRight size={20} aria-hidden="true" />
          </button>
        ))}
      </div>
      <div
        id="problem-panel"
        className="problem-answer"
        role="tabpanel"
        aria-labelledby={`problem-${activeIndex}`}
      >
        <span className="mono-label">Kako pomažemo</span>
        <p>{active.solution}</p>
        <a className="text-link" href={active.link}>
          {active.linkLabel}
          <ArrowRight size={18} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
