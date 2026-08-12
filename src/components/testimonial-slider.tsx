"use client";

import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState, type CSSProperties } from "react";
import type { Testimonial } from "@/src/data/client-testimonials";

type TestimonialSliderProps = {
  items: Testimonial[];
};

export function TestimonialSlider({ items }: TestimonialSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const activeItem = items[activeIndex];
  const hasMultipleItems = items.length > 1;

  const showPrevious = () => {
    setActiveIndex((current) => (current === 0 ? items.length - 1 : current - 1));
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % items.length);
  };

  return (
    <div className="testimonial-slider">
      <div className="testimonial-slider-rail">
        <div>
          <p className="testimonial-kicker">Iskustva suradnje</p>
        </div>

        <div className="testimonial-controls">
          <span className="testimonial-count" aria-live="polite">
            {String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </span>
          {hasMultipleItems && (
            <div className="testimonial-buttons">
              <button type="button" onClick={showPrevious} aria-label="Prethodna izjava klijenta">
                <ArrowLeft size={21} aria-hidden="true" />
              </button>
              <button type="button" onClick={showNext} aria-label="Sljedeća izjava klijenta">
                <ArrowRight size={21} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="testimonial-stage">
        <AnimatePresence mode="wait" initial={false}>
          <motion.figure
            key={activeIndex}
            initial={reduceMotion ? false : { opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, x: -20 }}
            transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <blockquote>“{activeItem.quote}”</blockquote>
            <figcaption>
              <span>
                <strong>{activeItem.name}</strong>
                {activeItem.role}, {activeItem.company}
              </span>
              <span>{activeItem.service}</span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      {hasMultipleItems && (
        <div
          className="testimonial-tabs"
          aria-label="Odaberite izjavu klijenta"
          style={{ "--testimonial-count": items.length } as CSSProperties}
        >
          {items.map((item, index) => (
            <button
              key={item.name}
              type="button"
              className={index === activeIndex ? "is-active" : undefined}
              onClick={() => setActiveIndex(index)}
              aria-label={`Prikaži izjavu: ${item.company}`}
              aria-pressed={index === activeIndex}
            >
              {item.company}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
