# Diario di lavoro di Copilot

Questo diario raccoglie i log operativi e i riassunti approvati per garantire continuità tra sessioni.

## Indice (generato/aggiornato)
- [2025-11-24] Analisi progetto — App supporto studio chitarra
- [2025-11-25] Milestone: MVP — Studio Refactor
- [2025-11-26] Snapshot progetto & Scaletta Milestone
- [2025-11-26] Sessione iniziale: sincronizzazione contesto (da copilot-diary)

> L'indice verrà rigenerato da automation quando miglioreremo lo script (etichetta `summary-needed` / `approved`).

## Stato corrente
- Libreria musicale (US-011) completata e mergeata nel repo pubblico.
- Componente Fretboard (US-012) in PR draft: completare props, accessibilità, test, docs prima di review.
- CHORE-001 (setup qualità: ESLint, Prettier, CI, templates) da implementare per stabilizzare lo sviluppo.
- Decisioni aperte: confermare Node LTS (20), avvio Next.js nel repo principale, priorità successiva dopo Fretboard (Pentatoniche / Accordi / Scale).

## Azioni svolte nella sessione di oggi (2025-11-26)
- Verificato contenuto originale in francescomorgante/copilot-diary (istructions + diario).
- Creato issue log: 2025-11-26 (francescomorgante/copilot-diary#3) per formalizzare snapshot & next steps.
- Concordato flusso: consolidare file di contesto nel repo pubblico e usare branch/PR + Vercel Preview per i test.
- Preparati i file da spostare nel repo pubblico (istruzioni, template, diario con voce di oggi).

## Prossimi step (priorità)
1. Creare branch docs/add-copilot-context su francescomorgante/morganguitarstudio (public) e copiarvi questi file.
2. Aprire PR verso main e verificare Preview su Vercel.
3. Dopo verifica, lavorare su feature branch per US-012 (Fretboard) e registrare ogni sessione con issue "Copilot Daily Log".

## Note operative
- Il diario è mantenuto in .copilot/ per non interferire con i file di build (index.html).
- Per ora l'aggiornamento del diario è manuale; successivamente potremo automatizzarlo con GitHub Actions quando il flusso è stabile.
