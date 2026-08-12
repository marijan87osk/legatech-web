# Legatech Design Specification

## Purpose

This document is the visual and interaction contract for the Legatech website. It complements `AGENTS.md` and does not replace its information architecture, routes, service boundaries, content rules, or conversion goals.

Customer-facing interface copy must be written in natural Croatian. This document is written in English so design and development decisions remain precise.

## Design Read

Reading this as: a greenfield agency marketing website for Croatian small and medium-sized business owners, with a confident, personal, conversion-focused language, leaning toward a custom editorial-tech aesthetic built with Tailwind CSS.

- `DESIGN_VARIANCE: 7`
- `MOTION_INTENSITY: 5`
- `VISUAL_DENSITY: 4`
- Mode: greenfield
- Primary impression: capable, clear, direct, human
- Avoid: corporate distance, agency theatre, technical jargon, template-like card grids

The design should make a non-technical owner feel that Legatech understands the business problem and can guide the project without unnecessary complexity.

## Design Principles

1. **Business value before technology.** Lead with enquiries, visibility, sales, reliability, and saved time. Technology supports those outcomes.
2. **Work is the main visual proof.** Real project media should carry more visual weight than decorative graphics.
3. **Clarity builds trust.** Pricing language, process, scope, exclusions, and form expectations must be easy to scan.
4. **Personal, not casual.** Use direct Croatian copy and a visible human presence without jokes, emojis, or forced informality.
5. **Controlled creativity.** Use asymmetric composition, varied image ratios, and strong typography while keeping navigation and actions conventional.
6. **Every section earns its place.** A section must explain, prove, differentiate, reduce uncertainty, or move the visitor to the next action.

## Technical Foundation

- Use Next.js App Router and React Server Components by default.
- Use Tailwind CSS v4 and semantic CSS custom properties for design tokens.
- Use `motion/react` only in isolated Client Component leaves.
- Use `@phosphor-icons/react` as the only icon family with a consistent `1.75` stroke weight.
- Load Manrope Variable and IBM Plex Mono through `next/font`.
- Do not add Bootstrap, Material, shadcn/ui, Radix Themes, or another visual system.
- Verify dependencies in `package.json` before importing them.

## Color System

Use one burnt-orange accent family across the complete website. Do not introduce service-specific accent colors.

| Token | Light | Dark | Usage |
| --- | --- | --- | --- |
| `--background` | `#F5F6F2` | `#111416` | Page background |
| `--surface` | `#FFFFFF` | `#1A1E21` | Raised content and form fields |
| `--surface-muted` | `#ECEFEA` | `#22272B` | Quiet grouping and selected states |
| `--text` | `#171A1D` | `#F4F5F1` | Primary text |
| `--text-muted` | `#5C6268` | `#ADB5BC` | Supporting text |
| `--border` | `#D9DDD8` | `#343A3F` | Dividers and controls |
| `--accent` | `#C9441F` | `#FF7657` | CTA, focus, links, active state |
| `--accent-text` | `#FFFFFF` | `#171A1D` | Text placed on accent |
| `--error` | `#A52A2A` | `#FF8D83` | Validation errors only |
| `--success` | `#2F6E4F` | `#7BC69D` | Confirmed form success only |

The light accent with white text has a contrast ratio of approximately `4.85:1`. The dark accent with near-black text has a contrast ratio of approximately `6.64:1`. Both combinations satisfy WCAG AA for normal text.

Theme follows `prefers-color-scheme`. Apply the theme once at the document root. Do not invert individual sections. A manual theme toggle is not part of the first release.

## Typography

### Families

- `Manrope Variable`: navigation, headings, body, buttons, forms, captions.
- `IBM Plex Mono`: prices, verified metrics, compact metadata, code-like technical values.
- Do not use serif type, Inter, gradient text, or mixed-family headline emphasis.

### Scale

| Role | Desktop | Mobile | Notes |
| --- | --- | --- | --- |
| Display / H1 | `clamp(3rem, 6vw, 5.5rem)` | `2.75rem` | 700-800 weight, maximum 2 lines |
| H2 | `clamp(2.25rem, 4vw, 3.75rem)` | `2rem` | Maximum 8 words where possible |
| H3 | `1.5rem-2rem` | `1.375rem` | Clear section hierarchy |
| Lead | `1.125rem/1.75rem` | `1.0625rem/1.625rem` | Maximum 65 characters per line |
| Body | `1rem/1.625rem` | Same | Default reading style |
| Small | `0.875rem/1.375rem` | Same | Metadata and helper text |
| Mono data | `0.8125rem-1rem` | Same | Never use for long prose |

Use tight tracking only for display headings. Eyebrows are optional, never numbered, and limited to at most one per three sections. Do not use uppercase tracking labels above every heading.

## Layout, Spacing, and Shape

- Content maximum: `1280px`.
- Wide media maximum: `1440px`.
- Desktop grid: 12 columns with a `24px` gap.
- Tablet grid: 8 columns with a `20px` gap.
- Mobile: single column with `16px` page gutters.
- Breakpoints: `sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1536`.
- Section spacing: `96-144px` desktop, `64-88px` mobile.
- Component spacing follows an 8px base scale, with 4px allowed for compact metadata.
- All cards, buttons, inputs, menus, and media frames use a `12px` radius.
- Use cards only when a boundary communicates comparison, selection, or hierarchy.
- Use tinted shadows only: `0 18px 60px rgb(24 33 30 / 0.10)` in light mode and `0 18px 60px rgb(0 0 0 / 0.28)` in dark mode.

Z-index scale:

- `0`: page content
- `10`: sticky local navigation
- `20`: site header and mobile menu backdrop
- `30`: mobile menu panel
- `40`: modal or consent layer
- `50`: toast or critical transient feedback

Do not use arbitrary z-index values.

## Brand and Visual Assets

### Wordmark

Until an official logo is delivered, use a text wordmark set as `LEGATECH` in Manrope 800 with slightly tight tracking. It is an interim identifier, not a permanent logo redesign.

### Photography and project media

Use real project screenshots and authentic founder or workspace photography when available. Media should feel observational and useful, not like generic corporate stock.

Required placements:

- Hero: one `4:3` or `5:4` project-led asset, minimum 1200px wide.
- Selected projects: at least three media assets with varied `16:10`, `4:3`, and `3:4` ratios.
- About: one candid horizontal portrait and one detail image of the working environment.
- Service pages: one service-relevant project image or generated conceptual image.

When real assets are unavailable, generate temporary section-specific images at the required aspect ratio and mark them as demo assets. Never construct fake website screenshots from styled `<div>` elements. Never overlay pills or labels on images.

### Icons

Icons clarify actions or concepts. They do not decorate every heading. Use Phosphor icons with accessible names where meaning is not repeated in nearby text.

## Core Components

### Header and navigation

- Height: `72px` desktop, `64px` mobile.
- Desktop remains on one line.
- Wordmark aligns left, primary navigation centers or follows, and `Zatražite ponudu` anchors the right.
- Use service navigation as a compact dropdown only if all four services cannot fit clearly.
- Mobile uses one menu button with a full-height panel, focus trap, Escape close, and restored focus.
- Sticky header may use a solid surface with a subtle bottom border after scroll. No glass blur is required.

### Buttons and text links

- Primary: accent background and `--accent-text`.
- Secondary: transparent background, text color, and one border.
- Text link: visible underline offset or directional Phosphor icon.
- Minimum target size: `44px` by `44px`.
- Active state: `transform: translateY(1px)` or `scale(0.98)`.
- Focus ring: `3px solid var(--accent)` with `2px` offset.
- Labels stay on one line at desktop.

Use one label per intent:

- Quote intent: `Zatražite ponudu`
- Portfolio intent: `Pogledajte projekte`
- Consultation intent: `Dogovorite besplatne konzultacije`
- Detail intent: `Saznajte više`

Do not place the quote and consultation actions next to each other because they serve the same contact intent. The hero pairs `Zatražite ponudu` with `Pogledajte projekte`.

### Section headings

Stack heading and supporting paragraph vertically. The paragraph is optional and capped at 25 words. Do not use the default pattern of a large heading on the left with a small paragraph floating in the top-right corner.

### Service overview

Show exactly four services. Use an asymmetric four-cell grid:

- Website development: 7 columns, prominent copy and one project crop.
- SEO optimization: 5 columns, accent-tinted surface with one verified or demo metric.
- Web shop development: 5 columns, commerce-oriented real or generated image.
- Website maintenance: 7 columns, plain surface with a concise reassurance message.

Each cell links to its dedicated service route. Under 768px, cells stack in the service priority defined in `AGENTS.md`.

### Project presentation

- Project media leads; text remains secondary.
- Show client, service, short challenge, short solution, and one result.
- Keep result typography in IBM Plex Mono.
- Put the `Demo projekt` label outside the image when `mock: true`.
- Hover may scale the image from `1` to `1.025` while the project title shifts by no more than `4px`.
- Project result claims must be labeled as demo until verified.

### Testimonials

- Use one large quote on the homepage, maximum three visual lines.
- Attribution includes name, role, and company.
- A demo testimonial requires a visible `Demo sadržaj` label.
- Do not use ratings, avatar piles, or invented review-platform badges.

### FAQ

- Use native button-driven accordions with `aria-expanded` and associated panel IDs.
- One item opens at a time on mobile. Multiple items may remain open on desktop only if this improves comparison.
- Animate opacity and a small transform, not height through React state on every frame.
- Answers remain readable without JavaScript.

### Enquiry form

Fields appear in this order:

1. Ime i prezime
2. E-mail adresa
3. Naziv tvrtke ili obrta
4. Potrebna usluga
5. Okvirni budžet
6. Kratak opis projekta

The service field contains the four core services plus `Nisam siguran`. Labels always appear above inputs. Placeholders provide examples, never labels. Errors appear below the relevant field and connect through `aria-describedby`.

Required states:

- Idle: clear labels, helper copy where needed, visible submit action.
- Submitting: preserve button width, change copy to `Šaljemo upit...`, disable duplicate submission.
- Success: confirm receipt and explain when the visitor can expect a reply.
- Validation error: focus the first invalid field and retain all entered values.
- Server error: retain values, explain the failure, and show direct email and phone alternatives.

## Homepage Blueprint

The homepage must use at least four distinct layout families. Do not repeat the same image-and-text split more than twice in sequence.

### 1. Header

Use the global header specification. Navigation order: `Usluge`, `Projekti`, `Cjenik`, `O meni`, `Kontakt`, then the primary CTA.

### 2. Asymmetric split hero

- Layout: 7 text columns and 5 media columns.
- Copy stack: optional plain eyebrow, H1, subtext up to 20 words, two CTAs.
- The complete CTA row must appear in the initial viewport.
- Use `min-h-[calc(100dvh-72px)]`, never `h-screen`.
- No trust strip, pricing teaser, feature list, or scroll cue inside the hero.
- Mobile: copy first, media second, both full width.

Suggested working copy for layout testing:

- H1: `Web stranice koje rade za vaše poslovanje.`
- Supporting copy: `Izrada web stranica, trgovina i SEO koji donose više pravih upita.`

### 3. Credibility band

Place it directly below the hero. Use verified client logos only. If no logos are available, replace the wall with three factual principles: direct communication, transparent pricing, and support after launch. Never invent logos solely to fill a row.

### 4. Four-service grid

Use the asymmetric service component. This is the only bento-like composition on the homepage.

### 5. Problems and solutions

Use a two-column diagnostic layout. The left side lists up to six recognizable business problems. Selecting or focusing a problem reveals the related Legatech response on the right. All content remains available in the DOM and stacks as paired blocks on mobile.

### 6. Selected projects

Use one wide lead project followed by two offset project tiles. Avoid a uniform three-column grid. Display no more than three projects on the homepage.

### 7. Why Legatech

Use an open typographic composition with four short benefit statements separated by whitespace, not boxed cards. Anchor the section with an authentic founder or workspace image when available.

### 8. Process

Use a horizontal path on desktop and a vertical path on mobile. Name stages by the work performed:

- Upoznajemo poslovanje
- Dogovaramo opseg
- Oblikujemo strukturu
- Dizajniramo i razvijamo
- Testiramo i objavljujemo
- Ostajemo dostupni

Do not prefix these labels with `Korak`, numbers, or phases.

### 9. Pricing preview

Show four starting-price entries in a `7 + 5` composition. Website and web shop pricing occupy the larger area, while SEO and maintenance form a stacked pair.

- Izrada web stranica: `Od 500 €`
- Izrada web shopa: `Od 1.500 €`
- SEO optimizacija: `Od 290 € mjesečno`
- Održavanje web stranica: `Od 35 € mjesečno`

Include one concise pricing disclaimer and one link to `/cjenik`.

### 10. Testimonial

Use a full-width quote with a restrained portrait or no portrait. Until a real testimonial exists, use the demo testimonial defined below and keep its demo label visible.

### 11. FAQ

Show six to eight high-intent questions covering price, timeline, content, hosting, SEO expectations, ownership, revisions, and support.

### 12. Final CTA and contact

Use a vertically stacked heading and the complete enquiry form. Include direct email and phone below the form as alternatives, not competing CTA buttons.

### 13. Footer

Include main routes, the four services, verified contact details, business information, and legal links. Osijek may appear as factual contact information, not as an atmospheric location strip.

## Page Templates

### Service pages

All service pages share the header, footer, tokens, typography, CTA system, FAQ behavior, and contact entry point. Their middle sections must differ according to the buying decision.

- **Website development:** screenshot-led hero, website problem diagnosis, deliverable groups, relevant projects, build process, package comparison.
- **SEO optimization:** visibility-led hero, search problem breakdown, audit explanation, local SEO context, realistic timeline, recurring package comparison, results with verification status.
- **Web shop development:** commerce media, catalogue and checkout concerns, integration groups, mobile shopping experience, shop packages, relevant commerce project.
- **Website maintenance:** reassurance-led hero, risk prevention, included recurring work, request and response flow, plan comparison, exclusions and support expectations.

Do not use the same section order and only swap headings.

### Projects listing

Use one lead project and an irregular two-column grid for the remaining projects. Filters are allowed only when there are at least six verified projects. Every demo item shows `Demo projekt`.

### Project detail

Order: project hero, business problem, role and services, solution, visual walkthrough, result, related service, next project, CTA. Results must include their verification status in the content model.

### Pricing

The current source of truth is `C:/Users/marian/Desktop/legatech najnoviji/content/cjenik.md`. Do not edit that source from this repository task.

Use a sticky in-page navigation with these anchors:

- `#web-stranice`
- `#web-shopovi`
- `#seo`
- `#odrzavanje`
- `#dodatne-usluge`
- `#uvjeti-suradnje`

Package overview:

| Service | Packages |
| --- | --- |
| Websites | Web Basic from 500 €, Web Business from 850 €, Web Premium from 1.300 € |
| Web shops | Shop Start from 1.500 €, Shop Business from 2.200 €, Shop Advanced from 3.300 € |
| SEO | SEO Local from 290 €/month, SEO Growth from 490 €/month, SEO Authority from 790 €/month |
| Maintenance | Care Basic 35 €/month, Care Plus 59 €/month, Care Business 99 €/month, web shop maintenance from 129 €/month |

Presentation rules:

- Use an asymmetric `3 + 6 + 3` package layout when three packages need comparison. The center package may be larger, but it must not be marked recommended unless Legatech confirms that recommendation.
- Mobile renders packages as a vertical list in ascending price order.
- Keep `Od`, recurring periods, setup fees, timelines, revision counts, training, and included support visually distinct.
- Use grouped disclosures for long inclusion lists. Show the five most decision-relevant items before `Prikaži sve stavke`.
- Group additional options by the categories in the source cjenik. Do not render one giant table.
- Present collaboration terms as a separate accordion after all service pricing.
- Keep the disclaimer visible near the page introduction and again before the final CTA: all prices are informative starting prices and the written offer defines final scope, price, and timing.

### About

Lead with who is behind Legatech, why the agency remains small, and what direct collaboration means for the client. Use real portrait photography when provided. Avoid team grids, fake culture imagery, awards, and generic corporate values.

### Contact

Keep the page deliberately low-friction: short introduction, complete form, expected next step, email, phone, and Osijek. Do not add unrelated services, testimonials, or a large portfolio grid before the form.

### Blog listing and article

The listing uses one featured article and a varied two-column grid. Avoid three equal article cards. Cards show category, title, excerpt, and date. Article pages use a readable `65ch` column, clear heading hierarchy, related service links, and one contextual CTA after the main content.

## Demo Content Contract

The user has explicitly authorized temporary fictional content for layout development. This exception does not turn demo claims into production claims.

Centralize content in typed data modules so replacement does not require component edits. Every fictional client, project, result, testimonial, image, or article must include `mock: true`.

Suggested types:

```ts
type CoreService =
  | "website-development"
  | "seo-optimization"
  | "ecommerce-development"
  | "website-maintenance";

interface Metric {
  label: string;
  value: string;
  period?: string;
  verified: boolean;
}

interface ProjectCaseStudy {
  slug: string;
  client: string;
  industry: string;
  services: CoreService[];
  challenge: string;
  solution: string;
  metrics: Metric[];
  images: string[];
  mock: boolean;
}

interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: CoreService;
  publishedAt: string;
  author: "Legatech";
  mock: boolean;
}
```

Development and preview environments render mock content with the visible label `Demo projekt` or `Demo sadržaj`. The production build must fail when any published item has `mock: true` or any metric has `verified: false`.

### Demo projects

| Client | Industry | Services | Working result | Required media |
| --- | --- | --- | --- | --- |
| Atelier Sloj | Architecture | Website development | `+43,7% kvalificiranih upita u 90 dana` | Homepage, project detail, mobile navigation |
| Biljka 21 | Specialist retail | E-commerce development | `+31,4% dovršenih mobilnih kupnji` | Category, product, cart, checkout |
| Termo Krug | Heating and cooling | SEO optimization | `+58,2% organskih klikova u šest mjeseci` | Service page, Google visibility chart, contact flow |
| Studio Evident | Business consulting | Website development and SEO | `LCP smanjen s 4,2 s na 1,6 s` | Before and after homepage, service page, mobile form |

All four rows are fictional and must render with `Demo projekt`. The numeric claims are layout fixtures, not evidence.

### Demo testimonial

```text
Demo sadržaj
"Od početka smo znali što slijedi, koliko traje i što dobivamo. Nova stranica napokon jasno objašnjava naše usluge."
Petra Vukelić
Vlasnica, Atelier Sloj
```

### Demo blog articles

| Title | Category | Excerpt |
| --- | --- | --- |
| Koliko košta izrada web stranice u 2026.? | Website development | Pregled elemenata koji utječu na cijenu i što očekivati od profesionalne ponude. |
| SEO optimizacija za male tvrtke: što prvo napraviti | SEO optimization | Praktičan redoslijed poteza za bolju vidljivost bez nepotrebnih tehničkih izraza. |
| 7 znakova da je vrijeme za redizajn web stranice | Website development | Kako prepoznati da postojeći web više ne podržava prodaju, povjerenje ili mobilne korisnike. |
| Web shop u Hrvatskoj: što pripremiti prije izrade | E-commerce development | Proizvodi, plaćanje, dostava i sadržaj koji trebaju biti spremni prije početka projekta. |
| Što uključuje održavanje WordPress stranice? | Website maintenance | Objašnjenje ažuriranja, sigurnosnih kopija, provjera i podrške u mjesečnom paketu. |

Use `Legatech` as the demo author. Dates and reading times may be temporary but must also live in centralized content data.

## Motion and Interaction

Motion must communicate hierarchy, feedback, or state change.

- Hero load: opacity `0 to 1` and vertical offset `16px to 0`, duration `500-650ms`.
- Section reveal: `whileInView`, once, opacity plus maximum `20px` vertical movement.
- Stagger: `50-70ms` between directly related items only.
- Button feedback: scale to `0.98` on press.
- Project hover: image scale to `1.025`, title shift up to `4px`.
- Accordion: short opacity and transform transition.
- Do not animate width, height, top, or left.
- Do not use GSAP, scroll hijacking, marquees, magnetic buttons, custom cursors, perpetual loops, or `window.addEventListener("scroll")`.

When `prefers-reduced-motion: reduce` is active, render the final state immediately and retain only color changes needed for feedback.

## Responsive Behavior

- Below 768px, all asymmetric grids collapse to one column.
- Preserve content order based on conversion priority, not desktop visual position.
- Hero copy precedes media.
- Pricing packages stack in ascending price order.
- Project media becomes full width with text below.
- Process becomes a vertical sequence without horizontal scrolling.
- Problems and solutions become paired disclosure blocks.
- Navigation becomes a focus-managed menu.
- Forms use one column and full-width actions.
- Do not reduce body text below 16px.
- Prevent horizontal overflow at 320px viewport width.

## Accessibility and Performance

- Meet WCAG AA for all text, controls, focus states, and validation feedback.
- Target WCAG AAA contrast for hero body copy where practical.
- Use semantic landmarks and a logical heading outline.
- Provide a skip link as the first focusable element.
- Use visible labels and meaningful link text.
- Use alt text that describes the image's purpose, not its decorative style.
- Decorative images use empty alt text.
- All interactive elements work with keyboard only.
- Reserve media dimensions to keep CLS below `0.1`.
- Load hero media with `next/image` priority and responsive `sizes`.
- Keep LCP below `2.5s` and INP below `200ms`.
- Lazy-load below-fold media and Motion client islands.
- Run Lighthouse in light and dark system modes, mobile and desktop.

## Content and Visual Bans

- No em dash or en dash characters in visible website copy.
- No AI-purple gradients, neon glows, gradient headlines, or generic mesh backgrounds.
- No three equal feature cards.
- No repeated split image-and-text layouts.
- No section-number eyebrows, scroll cues, decorative status dots, or version labels.
- No fake browser windows, dashboards, terminals, or screenshots made from `<div>` elements.
- No fake client logos, awards, ratings, certifications, or review-platform badges.
- No unexplained metrics or SEO ranking guarantees.
- No placeholder-as-label form fields.
- No generic stock photos of handshakes, meetings, or people pointing at screens.
- No filler copy such as `unaprijedite`, `revolucionarno`, `besprijekorno`, or `rješenja po mjeri` without a concrete explanation.

## Reference Sites

Use references for pattern study, not visual duplication.

- [Hey Oscar](https://heyoscar.com.au/): concise value proposition, calm process, project-to-contact flow.
- [Sourcewise](https://sourcewise.com.au/): direct small-business language and outcome framing.
- [MadeByShape](https://madebyshape.co.uk/): early project proof, human agency character, strong testimonial moment.
- [KOTA](https://kota.co.uk/): project-led art direction and results attached to work.
- [Huemor](https://huemor.rocks/): problem-first narrative, qualification, pricing and timeline objections.

Do not copy their wording, palette, typography, layouts, motion sequences, claims, or client presentation.

## Pre-Flight Checklist

Before approving any page design or implementation, confirm:

- [ ] The page has one primary intent and one dominant CTA intent.
- [ ] The hero fits the first viewport and contains no more than four text elements.
- [ ] The hero uses a real or clearly marked demo visual.
- [ ] Navigation remains one line at desktop and below 80px high.
- [ ] One accent family and the 12px radius system are used throughout.
- [ ] Light and dark system modes maintain the same hierarchy.
- [ ] Buttons, forms, focus rings, and helper text pass WCAG AA.
- [ ] Every multi-column layout has an explicit mobile fallback.
- [ ] A page with eight or more sections uses at least four layout families.
- [ ] Eyebrow count is no greater than `ceil(section count / 3)`.
- [ ] No two adjacent CTAs represent the same action intent.
- [ ] Long lists use grouping or disclosure instead of repeated bordered rows.
- [ ] Motion has a stated purpose and a reduced-motion fallback.
- [ ] No visible text contains an em dash or en dash.
- [ ] No fake proof appears without a visible demo label.
- [ ] Production data contains no `mock: true` or unverified metric.
- [ ] LCP, INP, and CLS targets remain plausible with the selected media.
- [ ] All visible Croatian copy has been reread for grammar, clarity, and unsupported claims.
