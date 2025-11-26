# Diario di lavoro di Copilot

Questo diario raccoglie i log operativi e i riassunti approvati per garantire continuitÃ  tra sessioni.

## Indice (generato/aggiornato)
- [2025-11-24] Analisi progetto â€” App supporto studio chitarra
- [2025-11-25] Milestone: MVP â€” Studio Refactor
- [2025-11-26] Snapshot progetto & Scaletta Milestone
- [2025-11-26] Sessione iniziale: sincronizzazione contesto (da copilot-diary)

> L'indice verrÃ  rigenerato da automation quando miglioreremo lo script (etichetta `summary-needed` / `approved`).

## Stato corrente
- Libreria musicale (US-011) completata e mergeata nel repo pubblico.
- Componente Fretboard (US-012) in PR draft: completare props, accessibilitÃ , test, docs prima di review.
- CHORE-001 (setup qualitÃ : ESLint, Prettier, CI, templates) da implementare per stabilizzare lo sviluppo.
- Decisioni aperte: confermare Node LTS (20), avvio Next.js nel repo principale, prioritÃ  successiva dopo Fretboard (Pentatoniche / Accordi / Scale).

## Azioni svolte nella sessione di oggi (2025-11-26)
- Verificato contenuto originale in francescomorgante/copilot-diary (istructions + diario).
- Creato issue log: 2025-11-26 (francescomorgante/copilot-diary#3) per formalizzare snapshot & next steps.
- Concordato flusso: consolidare file di contesto nel repo pubblico e usare branch/PR + Vercel Preview per i test.
- Preparati i file da spostare nel repo pubblico (istruzioni, template, diario con voce di oggi).

## Prossimi step (prioritÃ )
1. Creare branch docs/add-copilot-context su francescomorgante/morganguitarstudio (public) e copiarvi questi file.
2. Aprire PR verso main e verificare Preview su Vercel.
3. Dopo verifica, lavorare su feature branch per US-012 (Fretboard) e registrare ogni sessione con issue "Copilot Daily Log".

## Note operative
- Il diario Ã¨ mantenuto in .copilot/ per non interferire con i file di build (index.html).
- Per ora l'aggiornamento del diario Ã¨ manuale; successivamente potremo automatizzarlo con GitHub Actions quando il flusso Ã¨ stabile.

## 2025-11-26 — Merge docs/add-copilot-context & CONTRIBUTING.md
- Autore: @francescomorgante (con aiuto di Copilot)
- Branch principali: docs/add-copilot-context (merged), docs/add-contributing-snippet (merged)
- PR:
  - https://github.com/francescomorgante/morganguitarstudio/pull/11
  - https://github.com/francescomorgante/morganguitarstudio/pull/12
- Issue di riferimento: #3
- Obiettivo: pubblicare istruzioni e template per Copilot, aggiungere CONTRIBUTING.md con SOP di sessione.
- Azioni svolte:
  - Aggiunta .github/copilot-instructions.md
  - Aggiunta 3 issue template in .github/ISSUE_TEMPLATE
  - Aggiunta .copilot/copilot-diario.md (base)
  - Aggiunta CONTRIBUTING.md con procedura SOP
- Decisioni / Razionali:
  - Separare modifiche di contesto/documentazione in PR distinte per review più rapide.
  - Tenere diario in repo e aggiornare manualmente tramite PR per avere tracciabilità.
- Blockers: nessuno rilevante.
- Prossimi step:
  1. Creare CHORE-001 (chore/setup-quality) per CI, CODEOWNERS e PR template automatizzati.
  2. Valutare automazione (GitHub Action) che appenda voci al diario al merge.
  3. 
  ```markdown
## 2025-11-26 — Vision pubblicata e analisi progetto
Autore: @francescomorgante (con supporto Copilot)

Sommario
- Aggiunta bozza della Vision in `.copilot/vision.md` (branch `docs/add-vision`, PR aperta).
- Analisi completa del prototipo originario (index.html, pentatoniche / CAGED) e definizione della scaletta di lavoro per le prossime milestone.

Cosa è stato fatto
- Creato e committato il documento di Vision (`.copilot/vision.md`) sul branch `docs/add-vision`.
- Eseguita l'analisi del prototipo: repertorio di bug critici rilevati (es. doppio `<body>`, mancanza meta viewport, punti di accessibilità).
- Preparati draft-issue operativi per la migrazione incrementale del prototipo (PROTOTYPE-001..PROTOTYPE-007).
- Definita la priorità delle attività per l’MVP Studio (estrazione lib/music, Fretboard React/TS, parser MusicXML/GPro, mapNotesToPositions, trascrizione semplice).

Decisioni prese
- Manteniamo il diario ufficiale in `.copilot/copilot-diario.md` (non migriamo il file), e lo useremo come fonte di verità.
- Procedura di lavoro: estrazione di utilità + test prima di refactor UI; prototipo live mantenuto finché non sostituito dalla versione React/TS.
- Conservare feature_flag `tools.paid_mode=false` e logging uso per future possibilità di gating/monetizzazione.

Riferimenti
- Vision file: `.copilot/vision.md` (branch `docs/add-vision`)
- PR della Vision: branch `docs/add-vision` — PR aperta (inserire link PR se disponibile)
- Draft issues: PROTOTYPE-001 .. PROTOTYPE-007 (bozze preparate)
- PR/merge recenti di contesto: https://github.com/francescomorgante/morganguitarstudio/pull/11 , https://github.com/francescomorgante/morganguitarstudio/pull/12
- Issue di riferimento: #3

Prossimi passi immediati
1. Creare issue operative: US-012 (MVP Studio) e TOOLS-001 (skeleton upload/job) — tracciatura e planning.  
2. Estrarre `src/lib/music` e aggiungere unit tests (priorità alta).  
3. Scaffolding componente `Fretboard` React/TS che riusi `lib/music`.  
4. Applicare fix minimi non distruttivi al prototipo (PROTOTYPE-002) in branch separato, se necessario.

Note operative
- Questa voce va committata sul branch `docs/add-vision` e inclusa nella PR esistente, così il reviewer ha visibilità completa del contesto.
- Se preferisci, posso aggiungere qui il link diretto alla PR della Vision non appena me lo fornisci.

---
---
Date: 2025-11-26
PR: #15 — feat(US-010): Refactor Pentatoniche page into reusable Caged component (merged)
Issue: US-010 (#18)
Milestone: Milestone 1
Summary: Refactor della pagina Pentatoniche nel componente riutilizzabile Caged. Aggiunte stories e tests iniziali.
Files:
- src/components/Caged.tsx
- src/stories/Caged.stories.tsx
- tests/components/Caged.spec.tsx
Status: merged
Checks: typecheck OK; tests pass locally; storybook configured (build not run in CI)
Notes: PR principale per US-010; subsequent skeleton extraction handled in PR #21.
---

Date: 2025-11-26
PR: #21 — [WIP] Extract skeleton and relevant modifications from PR #16 (merged)
Issue: US-010 (#18)
Milestone: Milestone 1
Summary: Estratti i file utili dallo skeleton di PR #16 per evitare sovrapposizioni con PR #15. Aggiunto barrel export per componenti.
Files:
- src/components/index.ts
Status: merged
Checks: typecheck OK; tests 7/7
Notes: Se serve integrare ulteriori file da PR #16, aprire PR dedicate.
---

Date: 2025-11-26
PR: #NN — chore(docs): add process templates (PR/issue/roadmap/diary) (merged)
Issue: CHORE-001 (#17)
Milestone: Milestone 1
Summary: Aggiunti template PR/issue, workflow pr-body-check, docs/ROADMAP.md e CONTRIBUTING.md. Il file .copilot/copilot-diario.md non è stato modificato in questa PR.
Files:
- .github/PULL_REQUEST_TEMPLATE.md
- .github/ISSUE_TEMPLATE/feature_request.md
- .github/workflows/pr-body-check.yml
- docs/ROADMAP.md
- CONTRIBUTING.md
Status: merged
Checks: CI/PR checks (verificare risultati)
---
