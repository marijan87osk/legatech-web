"use client";

import { ArrowRight } from "@phosphor-icons/react";
import { type KeyboardEvent, useRef, useState } from "react";
import type { MaintenanceRisk } from "@/src/data/website-maintenance";

export function MaintenanceRiskDiagnosis({ risks }: { risks: MaintenanceRisk[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const selectRisk = (index: number) => {
    setActiveIndex(index);
    buttonRefs.current[index]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      selectRisk((index + 1) % risks.length);
    }

    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      selectRisk((index - 1 + risks.length) % risks.length);
    }

    if (event.key === "Home") {
      event.preventDefault();
      selectRisk(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      selectRisk(risks.length - 1);
    }
  };

  return (
    <div className="maintenance-diagnosis">
      <div className="maintenance-diagnosis-tabs" role="tablist" aria-label="Najčešći rizici neodržavanih web stranica">
        {risks.map((risk, index) => (
          <button
            key={risk.shortLabel}
            ref={(element) => {
              buttonRefs.current[index] = element;
            }}
            id={`maintenance-risk-tab-${index}`}
            type="button"
            role="tab"
            aria-selected={activeIndex === index}
            aria-controls={`maintenance-risk-panel-${index}`}
            tabIndex={activeIndex === index ? 0 : -1}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            <span>{risk.shortLabel}</span>
            <ArrowRight size={19} aria-hidden="true" />
          </button>
        ))}
      </div>

      <div className="maintenance-diagnosis-panels">
        {risks.map((risk, index) => (
          <div
            key={risk.risk}
            id={`maintenance-risk-panel-${index}`}
            className="maintenance-diagnosis-panel"
            role="tabpanel"
            aria-labelledby={`maintenance-risk-tab-${index}`}
            hidden={activeIndex !== index}
          >
            <p className="mono-label">Rizik i odgovor</p>
            <h3>{risk.risk}</h3>
            <dl>
              <div><dt>Kako prepoznajemo</dt><dd>{risk.detected}</dd></div>
              <div><dt>Kako smanjujemo rizik</dt><dd>{risk.prevention}</dd></div>
              <div><dt>Ako se dogodi</dt><dd>{risk.response}</dd></div>
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}
