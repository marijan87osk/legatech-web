import type { ReactNode } from "react";

interface ServiceExpectationItem {
  description: string;
  icon: ReactNode;
  title: string;
}

interface ServiceExpectationsProps {
  items: readonly [ServiceExpectationItem, ServiceExpectationItem, ServiceExpectationItem];
  note: string;
  title: string;
}

export function ServiceExpectations({ items, note, title }: ServiceExpectationsProps) {
  return (
    <section className="service-expectations" aria-labelledby="service-expectations-title">
      <div className="container">
        <h2 id="service-expectations-title" className="sr-only">{title}</h2>
        <div className="service-expectations-grid">
          {items.map((item) => (
            <article key={item.title}>
              {item.icon}
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
        <p className="service-expectations-note">{note}</p>
      </div>
    </section>
  );
}
