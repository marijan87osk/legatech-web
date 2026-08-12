"use client";

import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import { type KeyboardEvent, useRef, useState } from "react";
import type { SeoProblem } from "@/src/data/seo-optimization";

export function SeoProblemDiagnosis({ problems }: { problems: SeoProblem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const selectProblem = (index: number) => {
    setActiveIndex(index);
    buttonRefs.current[index]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      selectProblem((index + 1) % problems.length);
    }

    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      selectProblem((index - 1 + problems.length) % problems.length);
    }

    if (event.key === "Home") {
      event.preventDefault();
      selectProblem(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      selectProblem(problems.length - 1);
    }
  };

  return (
    <div className="seo-diagnosis">
      <div className="seo-diagnosis-tabs" role="tablist" aria-label="Najčešći SEO problemi">
        {problems.map((item, index) => (
          <button
            key={item.shortLabel}
            ref={(element) => {
              buttonRefs.current[index] = element;
            }}
            id={`seo-problem-tab-${index}`}
            type="button"
            role="tab"
            aria-selected={activeIndex === index}
            aria-controls={`seo-problem-panel-${index}`}
            tabIndex={activeIndex === index ? 0 : -1}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            <span>{item.shortLabel}</span>
            <ArrowRight size={20} aria-hidden="true" />
          </button>
        ))}
      </div>

      <div className="seo-diagnosis-panels">
        {problems.map((item, index) => (
          <div
            key={item.problem}
            id={`seo-problem-panel-${index}`}
            className="seo-diagnosis-panel"
            role="tabpanel"
            aria-labelledby={`seo-problem-tab-${index}`}
            hidden={activeIndex !== index}
          >
            <p className="mono-label">Legatech pristup</p>
            <h3>{item.problem}</h3>
            <p>{item.solution}</p>
            <div className="seo-diagnosis-outcome">
              <CheckCircle size={22} weight="bold" aria-hidden="true" />
              <span>{item.outcome}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
