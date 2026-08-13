"use client";

import { openCookieSettingsEvent } from "@/src/lib/analytics";

interface CookieSettingsButtonProps {
  className?: string;
}

export function CookieSettingsButton({ className = "footer-cookie-button" }: CookieSettingsButtonProps) {
  return (
    <button
      className={className}
      type="button"
      onClick={() => window.dispatchEvent(new Event(openCookieSettingsEvent))}
    >
      Postavke kolačića
    </button>
  );
}
