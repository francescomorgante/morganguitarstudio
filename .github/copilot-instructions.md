# Roadmap & Milestones (sintesi operativa)

Scopo: fornire una vista chiara delle milestone principali, delle user story associate e dei branch da usare per lo sviluppo.

Milestone 1 — Setup qualità e infrastruttura (CHORE-001)
- Obiettivo: configurare lint, formatter, tsconfig, workflow CI e template PR/issue.
- User stories / tasks:
  - CHORE-001.1: .eslintrc + Prettier config
  - CHORE-001.2: GitHub Actions CI skeleton (test/lint)
  - CHORE-001.3: tsconfig + script package.json
- Branch: chore/setup-quality
- Acceptance:
  - CI esegue tsc --noEmit, lint e test su push/PR
  - Template PR/issue presenti
  - Documentazione breve in README

Milestone 2 — Libreria musicale (US-011) [COMPLETATA]
- Branch: feat/us-011-music-lib
- Note: mergeata nel repo pubblico; verificare copertura test.

Milestone 3 — Fretboard component (US-012)
- Obiettivo: componente Fretboard interattivo e accessibile.
- Tasks:
  - US-012.1: API props (strings, frets, annotations, viewMode, onNoteClick)
  - US-012.2: test component-level (Vitest)
  - US-012.3: esempi d'uso nella storybook/page demo
  - US-012.4: accessibility: aria labels, keyboard focus
- Branch: feature/us-012-fretboard
- Acceptance:
  - Component builda senza errori TypeScript
  - Test coverage minima per componente (es. >70% su file critici)
  - Demo funzionante su Preview Deploy

Milestone 4 — Pentatoniche, Accordi, Scale (US-010 / US-013 / US-014)
- Branch per ciascuna: feature/us-010-pentatoniche, feature/us-013-accordi, feature/us-014-scale
- Acceptance: funzione/library + esempi + test

Milestone 5 — Upload & Viewer (US-001) (pianificazione tecnica)
- Descrizione: architettura upload, job queue, conversione formati
- Branch iniziale: feature/us-001-upload-viewer

Regole operative rapide
- Naming branch: feature/
