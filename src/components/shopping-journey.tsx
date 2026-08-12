"use client";

import { ArrowRight } from "@phosphor-icons/react";
import { type KeyboardEvent, useRef, useState } from "react";
import type { ShoppingJourneyStep } from "@/src/data/ecommerce-development";

export function ShoppingJourney({ steps }: { steps: ShoppingJourneyStep[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const selectStep = (index: number) => {
    setActiveIndex(index);
    buttonRefs.current[index]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      selectStep((index + 1) % steps.length);
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      selectStep((index - 1 + steps.length) % steps.length);
    }

    if (event.key === "Home") {
      event.preventDefault();
      selectStep(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      selectStep(steps.length - 1);
    }
  };

  const activeStep = steps[activeIndex];

  return (
    <div className="shopping-journey">
      <div className="shopping-journey-tabs" role="tablist" aria-label="Faze mobilnog kupovnog puta">
        {steps.map((step, index) => (
          <button
            key={step.title}
            ref={(element) => {
              buttonRefs.current[index] = element;
            }}
            id={`shopping-journey-tab-${index}`}
            type="button"
            role="tab"
            aria-selected={activeIndex === index}
            aria-controls="shopping-journey-panel"
            tabIndex={activeIndex === index ? 0 : -1}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{step.title}</strong>
            {index < steps.length - 1 && <ArrowRight size={18} aria-hidden="true" />}
          </button>
        ))}
      </div>

      <div
        id="shopping-journey-panel"
        className="shopping-journey-panel"
        role="tabpanel"
        aria-labelledby={`shopping-journey-tab-${activeIndex}`}
      >
        <div className="shopping-journey-stage">
          <span>{activeStep.shortLabel}</span>
          <h3>{activeStep.title}</h3>
        </div>
        <dl>
          <div><dt>Kupac treba</dt><dd>{activeStep.customerNeed}</dd></div>
          <div><dt>Trgovina odgovara</dt><dd>{activeStep.shopResponse}</dd></div>
          <div><dt>Poslovna vrijednost</dt><dd>{activeStep.businessValue}</dd></div>
        </dl>
      </div>
    </div>
  );
}
