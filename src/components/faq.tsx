"use client";

import { Plus } from "@phosphor-icons/react";
import { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

export function Faq({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <div className="faq-item" key={item.question}>
            <h3>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`faq-panel-${index}`}
                onClick={() => setOpenIndex(open ? null : index)}
              >
                <span>{item.question}</span>
                <Plus className={open ? "is-open" : ""} size={22} aria-hidden="true" />
              </button>
            </h3>
            <div id={`faq-panel-${index}`} className="faq-panel" hidden={!open}>
              <p>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
