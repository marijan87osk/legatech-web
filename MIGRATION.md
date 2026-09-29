# Local redesign migration

Mode: Redesign · Overhaul, using the already approved Legatech preview in `../legatech redizajn2`.

- Preserve: Croatian copy, public routes/slugs, WordPress blog sync, project data, contact submission, analytics, SEO metadata and structured data, privacy tools, and deployment behavior.
- Improve: shared visual tokens, site chrome, page layouts, and reusable presentation components.
- Remove: obsolete visual treatments only after their replacement is verified.
- Design read: editorial digital studio for Croatian small-business owners; variance 6/10, motion 3/10, density 5/10, assets 8/10, brand fidelity 9/10 to the approved preview.
- Visual system: warm paper `#f5f1e8`, ink `#22241f`, terracotta `#b74426`, Manrope and IBM Plex Mono, spacious grid, restrained borders and motion. Use the real Legatech and project assets.
- Highest-risk change: replacing presentation without disconnecting data-driven articles, forms, or SEO contracts.
- Rollback: each integration slice remains local and reviewable in Git; no push or deployment.

Migration order: shared visual foundations and navigation; dynamic blog and project templates; homepage; four service pages; pricing, about, contact, project listing and legal pages; then full functional and visual verification.

## Current local state

- Done: shared editorial colors, typography, navigation and footer; homepage; blog listing and data-driven article template; data-driven project detail template; all four approved service pages with their Croatian content and shared styling.
- Service content and styles are checked-in snapshots generated from the approved local HTML by `scripts/migrate-approved-services.mjs`; local legacy-CSS collision fixes live separately in `editorial-service-overrides.css`.
- The existing WordPress sync produced 39 local articles. The static export, ESLint, and SEO export check pass. The contact form on the new homepage still uses the repository's existing PHP endpoint and validation flow.
- Done in the remaining-route pass: pricing, about, contact, project listing, three legal pages, and 404 now use the editorial shell. The contact page retains the existing live submission component. All demo projects and their assets were removed before launch; the portfolio contains only real work.
- Validation: local `next build` (offline, using the current article snapshot), ESLint, and SEO export check passed. `npm run build` could not refresh WordPress articles because the WordPress REST request failed in this environment; the offline build itself succeeds. There is no `npm test` script in this repository.
- Next: run the controlled production release, verify a real contact submission, then enable and test the WordPress publish-triggered update from `staging2.legatech.hr`.
- This work remains local-only. A push to `main` builds an artifact; deployment requires a manual workflow run until `LEGATECH_AUTO_PUBLISH=true` is set for WordPress events. No push or deployment has been performed.
