"use client";

import { CheckCircle, WarningCircle } from "@phosphor-icons/react";
import { FormEvent, useId, useRef, useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";
type FieldErrors = Partial<Record<"name" | "email" | "company" | "service" | "budget" | "description", string>>;

interface ApiResponse {
  ok?: boolean;
  message?: string;
  errors?: FieldErrors;
}

export function ContactForm() {
  const formId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [startedAt, setStartedAt] = useState(() => Date.now());

  const fieldId = (name: string) => `${formId}-${name}`;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setStatus("submitting");
    setMessage("");
    setErrors({});
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...data, formStartedAt: startedAt }),
      });
      const result = await response.json().catch(() => ({})) as ApiResponse;
      if (!response.ok || !result.ok) {
        setErrors(result.errors ?? {});
        setMessage(result.message ?? "Upit trenutačno nije moguće poslati. Pokušajte ponovno ili nam se javite e-mailom.");
        setStatus("error");
        return;
      }
      form.reset();
      setStatus("success");
    } catch {
      setMessage("Nije moguće povezati se sa servisom za slanje. Provjerite vezu ili nam pišite na info@legatech.hr.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="form-success" role="status" tabIndex={-1}>
        <CheckCircle size={38} weight="regular" aria-hidden="true" />
        <h3>Upit je poslan.</h3>
        <p>Hvala na informacijama. Javit ćemo se s prijedlogom sljedećeg koraka u jednom radnom danu.</p>
        <button className="button button-secondary" type="button" onClick={() => { setStartedAt(Date.now()); setStatus("idle"); }}>
          Pošaljite novi upit
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} className="contact-form" onSubmit={handleSubmit} noValidate={false} aria-busy={status === "submitting"}>
      {status === "error" && <div className="form-error" role="alert"><WarningCircle size={22} aria-hidden="true" /><p>{message}</p></div>}
      <div className="form-honeypot" aria-hidden="true">
        <label htmlFor={fieldId("website")}>Web stranica</label>
        <input id={fieldId("website")} name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="form-grid">
        <div className="field">
          <label htmlFor={fieldId("name")}>Ime i prezime</label>
          <input id={fieldId("name")} name="name" autoComplete="name" required minLength={2} maxLength={100} placeholder="Vaše ime" aria-describedby={errors.name ? fieldId("name-error") : undefined} />
          {errors.name && <span className="field-error" id={fieldId("name-error")}>{errors.name}</span>}
        </div>
        <div className="field">
          <label htmlFor={fieldId("email")}>E-mail adresa</label>
          <input id={fieldId("email")} name="email" type="email" autoComplete="email" required maxLength={190} placeholder="ime@tvrtka.hr" aria-describedby={errors.email ? fieldId("email-error") : undefined} />
          {errors.email && <span className="field-error" id={fieldId("email-error")}>{errors.email}</span>}
        </div>
        <div className="field">
          <label htmlFor={fieldId("company")}>Naziv tvrtke ili obrta</label>
          <input id={fieldId("company")} name="company" autoComplete="organization" maxLength={150} placeholder="Naziv poslovanja" aria-describedby={errors.company ? fieldId("company-error") : undefined} />
          {errors.company && <span className="field-error" id={fieldId("company-error")}>{errors.company}</span>}
        </div>
        <div className="field">
          <label htmlFor={fieldId("service")}>Potrebna usluga</label>
          <select id={fieldId("service")} name="service" required defaultValue="" aria-describedby={errors.service ? fieldId("service-error") : undefined}>
            <option value="" disabled>Odaberite uslugu</option>
            <option>Izrada web stranica</option><option>SEO optimizacija</option><option>Izrada web trgovina</option><option>Održavanje web stranica</option><option>Nisam siguran</option>
          </select>
          {errors.service && <span className="field-error" id={fieldId("service-error")}>{errors.service}</span>}
        </div>
        <div className="field field-full">
          <label htmlFor={fieldId("budget")}>Okvirni budžet</label>
          <select id={fieldId("budget")} name="budget" required defaultValue="" aria-describedby={errors.budget ? fieldId("budget-error") : undefined}>
            <option value="" disabled>Odaberite raspon</option>
            <option>Do 1.000 €</option><option>1.000 € - 2.500 €</option><option>2.500 € - 5.000 €</option><option>Više od 5.000 €</option><option>Nisam siguran</option>
          </select>
          {errors.budget && <span className="field-error" id={fieldId("budget-error")}>{errors.budget}</span>}
        </div>
        <div className="field field-full">
          <label htmlFor={fieldId("description")}>Kratak opis projekta</label>
          <textarea id={fieldId("description")} name="description" rows={6} required minLength={20} maxLength={4000} placeholder="Opišite čime se bavite, što trebate i koji rezultat želite postići." aria-describedby={errors.description ? fieldId("description-error") : undefined} />
          {errors.description && <span className="field-error" id={fieldId("description-error")}>{errors.description}</span>}
        </div>
      </div>
      <div className="form-footer">
        <p>Slanjem upita pristajete da navedene podatke koristimo isključivo za odgovor na vaš upit.</p>
        <button className="button button-primary" type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Šaljemo…" : "Pošaljite upit"}
        </button>
      </div>
    </form>
  );
}
