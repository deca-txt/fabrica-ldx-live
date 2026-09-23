# M-1 — visual and navigation QA

**Status local + GitHub Pages:** PASS — 2026-09-23  
**Branch:** `fix/konecta-screen-navigation`

## Referências e tokens

Sources and token rationale: [BRAND_TOKENS.md](BRAND_TOKENS.md). The primary and supporting violet values were observed in current CSS served by `konecta.com/br`; prior coral/orange/green/lilac accents were removed from the product system.

## Screen routes

- `#/home` — one-viewport entry.
- `#/explore` — explicit challenge/catalog path choice.
- `#/needs` — 12-card multi-select checklist; selected IDs are in the hash.
- `#/results?ids=...` — matching solutions, edit needs and full catalog links.
- `#/catalog` — all solutions, filterable by category.
- `#/solution/:id` — solution detail; fullscreen within the app viewport on mobile.
- `#/process` — six-step independent screen.

## Checks

- `node --check assets/js/app.js` — PASS.
- `node --check assets/js/catalog-data.js` — PASS; data file was not changed.
- `git diff --check` — PASS.
- Chromium interaction walk: Home → Explore → Needs → Results → Solution → Back; Catalog → Category → Solution → Back; Home → Process → Browser Back — PASS.
- 20 solutions, 12 need options, multi-select, result count, refresh restoration and filter category — PASS.
- Enter opens routes/details; Escape returns; focus is restored to originating solution card — PASS.
- Home route × viewport matrix, no horizontal overflow: 1440×900, 1024×768, 768×1024, 390×844 — PASS.
- Route × viewport matrix for Home, Explore, Needs, Results, Catalog, Solution Detail and Process at all four sizes — PASS. Detail fills the mobile app viewport; Needs primary action stays visible; process is a vertical sequence on mobile.
- Browser console/page errors during interaction walk — 0.

## Screenshots

- [Home desktop · 1440×900](evidence/m1-home-desktop.png)
- [Home mobile · 390×844](evidence/m1-home-mobile.png)
- [Needs mobile · 390×844](evidence/m1-needs-mobile.png)
- [Results mobile · 390×844](evidence/m1-results-mobile.png)
- [Solution detail mobile · 390×844](evidence/m1-detail-mobile.png)
- [Process mobile · 390×844](evidence/m1-process-mobile.png)

**Public deployment:** PASS — https://deca-txt.github.io/fabrica-ldx-live/ served the integrated M-1 at production HEAD `dc084cde042dfbfa92593eba300dbe630a7e3b31`; Pages workflow 35815673759 completed successfully. Repeated the interaction walk and full route × viewport matrix on the public URL. Public CSS/JS/font response failures: 0; console/page errors: 0.
