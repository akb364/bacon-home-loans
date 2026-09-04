# Bacon Home Loans Property Report Engine

An independent, API-less Next.js application for reusable property analysis and Realtor marketing reports. Phase 1 uses manually researched property inputs, establishes the shared calculation architecture, and delivers the first browser-viewable Real Estate Report Card without credentials, a database, or paid data services.

## Current MVP

- One property and financing intake
- Explicit `unavailable` values instead of invented defaults
- Data provenance (`verified`, `user_entered`, `third_party_estimate`, `calculated_estimate`, `hypothetical_projection`, `unavailable`)
- Decimal-safe fixed-rate mortgage calculation
- Configurable, missing-data-aware Report Card scoring
- “Austin's Take” generated only from calculated category results
- Responsive browser report with print-to-PDF styling
- Local draft persistence for the scaffold stage
- API-less Buying Power comparison with three scenarios, overrides, target payment, five-year loan snapshot, and print-ready client report
- PostgreSQL/Supabase-ready schema that preserves immutable report snapshots
- Manual-first workflow with an optional future RentCast adapter boundary

## Architecture

```text
Property provider (RentCast/manual/future)
              |
              v
      Raw provider response ----> provider_responses (audit/cache)
              |
        provider mapper
              |
              v
      NormalizedProperty -------> property_snapshots (immutable)
              |                          |
              +---- LoanAssumptions -----+
                             |
                    calculation modules
                             |
                    report composition
                             |
                             v
                 reports.report_data_snapshot
                         |          |
                    browser URL   PDF renderer
```

Domain types never import provider response types. A provider owns its transport and mapping. Financial formulas and scoring live in pure TypeScript modules, outside React. A generated report stores the exact property, market, financing, scoring, branding, and co-branding data used at generation time so later API updates cannot silently alter it.

## Folder structure

```text
database/schema.sql              PostgreSQL/Supabase foundation
src/app/                         Next.js UI and report presentation
src/calculations/                Pure financial calculation modules
src/domain/                      Normalized domain contracts
src/providers/                   Replaceable property-data adapters
src/scoring/                     Configurable Report Card engine
src/buying-power/                Scenario domain model, calculations, and tests
```

Planned additions retain the same boundaries:

```text
src/app/api/                     Authenticated server routes
src/app/property/[id]/           Public, property-specific report pages
src/app/reports/[id]/            Saved browser reports
src/app/settings/                Branding, Realtors, scoring weights
src/app/admin/                   Compliance review and publication
src/app/templates/               Browser/PDF report templates
src/calculations/investment.ts   Investment and projection formulas
src/market/fhfa-provider.ts      Separate appreciation data layer
src/pdf/                         Server-side Chromium renderer
src/repositories/                Supabase persistence interfaces
```

## Core decisions

1. **Next.js + TypeScript** provides UI, authenticated server routes, and shareable report URLs in one deployable application.
2. **PostgreSQL through Supabase** is appropriate for authentication, row-level security, relational profiles, and JSON snapshots. Application code should depend on repository interfaces so Supabase remains replaceable.
3. **Provider isolation** keeps RentCast server-side and replaceable. Secrets must only be read in server modules or route handlers; never prefix them with `NEXT_PUBLIC_`.
4. **Snapshots are first-class records.** Normalized current property data can change; generated reports cannot.
5. **HTML is the canonical template.** A later server-side headless Chromium worker should render the same report URL to PDF. The MVP's Export PDF action invokes the browser print dialog.
6. **Decimal.js is used at financial boundaries.** UI formatting occurs only after calculation results are rounded to cents.
7. **Missing scores are excluded.** The engine proportionally rebalances only the configured weights for categories with sufficient data. It does not turn missing information into a neutral or favorable score.
8. **Investment formulas are already isolated.** The initial NOI, cap-rate, cash-on-cash, DSCR, and break-even occupancy module is tested now even though its report UI belongs to a later phase.
9. **The Phase 1 deployment is a static export.** The current MVP has no API routes, so this keeps its hosting artifact simple and portable. Remove `output: "export"` when RentCast server routes, authenticated persistence, or server-side PDF generation are added.

## Scoring methodology

Default weights are stored in `src/scoring/report-card.ts`:

- Price vs. market: 25%
- Affordability: 20%
- Historical appreciation: 20%
- Rental potential: 15%
- Market conditions: 10%
- Taxes and HOA: 10%

The current formulas are transparent MVP heuristics, not appraisal or underwriting rules. Before production, move weight/formula configuration to versioned `report_templates`, document validation ranges with compliance, and store the scoring configuration version in each report snapshot.

## Mortgage formula

For a fixed-rate loan with principal `P`, monthly rate `r`, and `n` payments:

```text
monthly principal and interest = P × r × (1 + r)^n / ((1 + r)^n - 1)
```

At a 0% rate the engine uses `P / n`. Estimated PITI adds monthly taxes, homeowners insurance, and mortgage insurance. Total housing payment also adds HOA. MVP cash to close is down payment + estimated closing costs + points - seller concessions - lender credits, floored at zero. Prepaids and program-specific adjustments are not yet modeled.

## Local development

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

Quality checks:

```bash
npm test
npm run typecheck
npm run build
```

## Database

`database/schema.sql` defines the initial Supabase/PostgreSQL tables. Before connecting production data:

- replace provisional `owner_user_id uuid` fields with foreign keys to the chosen auth model where appropriate;
- enable row-level security on every user-owned table;
- add `auth.uid()` ownership policies;
- add migrations rather than editing a deployed schema in place;
- define retention/encryption policy for raw provider responses;
- never expose service-role credentials to the browser.

## Environment

The API-less MVP needs no `.env.local` file. Draft inputs are stored locally in the browser. The RentCast adapter is dormant and intentionally fails explicitly until API access, endpoint contracts, rate-limit behavior, and sample responses can be verified.

## Incremental roadmap

### Phase 1 completion work

- Connect Supabase auth, repositories, and RLS
- Implement verified RentCast transport/mappers using API fixtures
- Add address autocomplete/geocoding
- Add server-side save/publish routes and immutable snapshot transactions
- Add configurable scoring settings UI and configuration versioning
- Add Realtor and brand profile selection
- Add server-side Chromium PDF generation and object storage
- Add compliance review state before publishing
- Add FHFA provider with geography mapping and dated source citations

### Subsequent reports

1. Buy vs. Rent with scenario and holding-period projections
2. Investment Property Analysis with NOI, cap rate, CoC, DSCR, and yearly projection tables
3. Appreciation Report backed by FHFA history
4. Co-branded Open House Flyer and property landing page with QR code
5. Seller Concession Optimizer with configurable program limits and compliance rules

## Compliance baseline

The MVP report states that it is not an appraisal, underwriting decision, loan approval, or guarantee. Mortgage, property value, rent, appreciation, return, rate, payment, and closing-cost figures are classified by provenance. Production reports should remain in `draft` or `review` status until approved through the compliance workflow.
