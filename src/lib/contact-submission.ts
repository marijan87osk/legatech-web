import { trackContactLeadOnce } from "./analytics";

export type ContactFieldErrors = Partial<Record<"name" | "email" | "company" | "service" | "budget" | "description", string>>;

type SubmissionResult =
  | { status: "ignored" }
  | { status: "success" }
  | { status: "error"; message: string; errors: ContactFieldErrors };

const failureMessage = "Upit trenutačno nije moguće poslati. Pokušajte ponovno ili nam se javite e-mailom.";
const connectionMessage = "Nije moguće povezati se sa servisom za slanje. Provjerite vezu ili nam pišite na info@legatech.hr.";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function fieldErrors(value: unknown): ContactFieldErrors {
  if (!isRecord(value)) return {};
  const errors: ContactFieldErrors = {};
  for (const key of ["name", "email", "company", "service", "budget", "description"] as const) {
    if (typeof value[key] === "string") errors[key] = value[key];
  }
  return errors;
}

// One controller per form: the synchronous lock also covers submits before React
// has rendered the disabled button. Only an explicit new-enquiry action resets it.
export function createContactSubmission(
  request: typeof fetch = fetch,
  trackLead: (receipt: string) => void = trackContactLeadOnce,
) {
  let pending = false;
  let completed = false;

  return {
    get locked() { return pending || completed; },
    reset() { if (!pending) completed = false; },
    async submit(payload: Record<string, unknown>): Promise<SubmissionResult> {
      if (pending || completed) return { status: "ignored" };
      pending = true;
      try {
        const response = await request("/api/contact.php", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        const parsed: unknown = await response.json().catch(() => null);
        const result = isRecord(parsed) ? parsed : {};
        if (
          !response.ok || result.ok !== true || result.sent !== true ||
          typeof result.submissionId !== "string" || !/^[a-f0-9]{16}$/.test(result.submissionId)
        ) {
          return {
            status: "error",
            message: typeof result.message === "string" ? result.message : failureMessage,
            errors: fieldErrors(result.errors),
          };
        }

        completed = true;
        try { trackLead(result.submissionId); } catch { /* Delivery already succeeded. */ }
        return { status: "success" };
      } catch {
        return { status: "error", message: connectionMessage, errors: {} };
      } finally {
        pending = false;
      }
    },
  };
}
