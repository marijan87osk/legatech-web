"use client";

import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import { type KeyboardEvent, useRef, useState } from "react";

type WebsiteProblem = {
  problem: string;
  shortLabel: string;
  solution: string;
  outcome: string;
};

export function WebsiteProblemDiagnosis({ problems }: { problems: WebsiteProblem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const selectProblem = (index: number) => {
    setActiveIndex(index);
    buttonRefs.current[index]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent, index: number) => {
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
    <div className="webdev-diagnosis">
      <div className="webdev-diagnosis-tabs" role="tablist" aria-label="Problemi postojećih web stranica">
        {problems.map((item, index) => (
          <button
            key={item.problem}
            ref={(element) => { buttonRefs.current[index] = element; }}
            id={`webdev-problem-tab-${index}`}
            type="button"
            role="tab"
            aria-selected={activeIndex === index}
            aria-controls={`webdev-problem-panel-${index}`}
            tabIndex={activeIndex === index ? 0 : -1}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            <span>{item.shortLabel}</span>
            <ArrowRight size={20} aria-hidden="true" />
          </button>
        ))}
      </div>

      <div className="webdev-diagnosis-panels">
        {problems.map((item, index) => (
          <div
            key={item.problem}
            id={`webdev-problem-panel-${index}`}
            className="webdev-diagnosis-panel"
            role="tabpanel"
            aria-labelledby={`webdev-problem-tab-${index}`}
            hidden={activeIndex !== index}
          >
            <span className="mono-label">Kako rješavamo problem</span>
            <h3>{item.problem}</h3>
            <p>{item.solution}</p>
            <div className="webdev-diagnosis-outcome">
              <CheckCircle size={21} weight="bold" aria-hidden="true" />
              <span>{item.outcome}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
