# Copilot Instructions — Entrypoint operativo

Queste istruzioni sono la fonte principale per qualsiasi Copilot che inizi a lavorare su questo progetto privato. Servono a mantenere continuità e ridurre domande ripetitive.

## Scopo del progetto

- Obiettivo: app per supporto allo studio chitarra (teoria, viewer spartito+tablatura, playback sincronizzato, note→tablatura, trascrizione audio monofonica; OMR e polifonia in roadmap).
- Ambito MVP attuale: libreria musicale TypeScript (notes/scales/caged) + componente Fretboard + pagine Studio (Pentatoniche, Accordi, Scale) + infrastruttura qualità (lint, test, CI).
- KPI iniziali:
  - % user stories MVP completate (US-011, US-012, US-010, US-013, US-014)
  - Tempo medio branch→merge < 2 giorni
  - Daily Log compilati ≥ 90% delle sessioni
  - Copertura test libreria musicale ≥ 70% linee
  - PR con checklist completa al 1° giro ≥ 80%
  - Accessibilità Fretboard (aria-label, focus, tab) OK

## Branch strategy

- main: branch stabile
- feature/<US-ID>-<slug> (es. feature/us-012-fretboard)
- develop: NON usato per ora (lo introduciamo solo se necessario per lavoro parallelo esteso)

## Stile e lingua

- Lingua: Italiano preferito; inglese ammesso per nomi librerie/codice.
- Risposte: sezioni, liste, file blocks. Evitare muri di testo.
- Markdown: quadruple fence per file .md quando si propone codice/struttura.

## Convenzioni

- Issue: "US-xxx: …" o "log: YYYY-MM-DD Titolo"
- Labels: copilot-log, summary-needed, approved, blocked
- Commit: <type>(<scope>): descrizione (US-xxx)
  - Esempio: feat(lib/music): add caged patterns (US-011)

## Diario e log

- Diario: .copilot/copilot-diario.md (indice, stato, riassunti approvati).
- Ogni sessione: issue "Copilot Daily Log".
- Fine step: aggiungi label summary-needed → dopo approvazione: approved → diario aggiornato (manuale per ora).

## Stato sintetico (vedi diario per dettagli)

- US-011 mergeata (libreria musicale).
- US-012 Fretboard in PR draft (completare props, accessibilità, test).
- CHORE-001 qualità (lint/prettier/CI/templates) da avviare.

## Qualità PR

- Prima del push: npx tsc --noEmit; npx vitest run; npm run lint
- PR: descrizione chiara + Closes #N + checklist spuntata

## Prompt utili

1. "Rivedi .copilot/copilot-diario.md e proponi 3 prossimi step."
2. "Genera issue 'Copilot Daily Log' per oggi con obiettivo X."
3. "Prepara descrizione PR per US-012 con acceptance criteria."

## Decisioni aperte

- Node LTS: adottare 20 (aggiornare se serve 22/24 in futuro)
- Adozione Next.js nel repo principale (da confermare)
- Automazione diario (script API GitHub) — rinviata

## Privacy

- Nessun segreto/token nei file. Repository privato.
- CODEOWNERS limita 'approved' a @francescomorgante.

## Checklist per nuovo Copilot

1. Leggi queste istruzioni.
2. Leggi .copilot/copilot-diario.md.
3. Apri/aggiorna issue "Copilot Daily Log".
4. Esegui i prossimi step → label summary-needed → revisione → approved.

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

- Naming branch: feature/<US-ID>-<slug> oppure chore/<id>-<slug>
- Ogni work session:
  1. creare issue log: `log: YYYY-MM-DD <titolo>` usando il template Copilot Daily Log
  2. creare branch relativo e collegarlo all'issue (nel PR scrivi `Closes #<issue>` se appropriato)
  3. aggiornare l'issue con "Azioni svolte" e mettere label `summary-needed` a fine sessione
- Merge policy: PR con checklist completa, CI verde e review (anche self-review se sei da solo); preferisci merge squashed per pulizia history.

Priorità attuale (ordine di lavoro consigliato)

1. CHORE-001 (qualità + CI)
2. US-012 (Fretboard)
3. US-010 (Pentatoniche)
4. US-013 (Accordi)
5. US-001 (Upload & Viewer)

Note su deploy e testing

- Non lavorare direttamente su main: crea branch e PR → Vercel genererà Preview Deploy per testare senza pubblicare su production.
- Il diario e le istruzioni sono in `.copilot/` e `.github/` per non interferire con la build (index.html).
