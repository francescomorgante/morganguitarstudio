# Titolo della PR
<!-- Usa il formato: feat(US-XXX): breve descrizione -->

## Riferimenti obbligatori
- Issue / Obiettivo (es. US-010 / #18): 
- Milestone: (es. Milestone 1)
- Vision (obbligatorio): .copilot/vision.md
- Diary (obbligatorio): .copilot/copilot-diario.md

## Descrizione sintetica
Breve descrizione di cosa fa la PR e perché contribuisce all'obiettivo indicato nella Vision.

## File principali aggiunti / modificati
- (lista sintetica dei file rilevanti)

## Checklist minima (obbligatoria)
- [ ] Il body della PR include riferimento a un issue (US-###) o un numero di issue (#NN)
- [ ] Typecheck: npx tsc --noEmit
- [ ] Tests: npx vitest run (o spiegare perché non applicabile)
- [ ] Storybook build (se applicabile)
- [ ] Inserita la voce diary standard nel body e link al file .copilot/copilot-diario.md

## Note / Dipendenze
- Se la PR dipende da altre PR/branch indicate qui, linkale (es. dipende da PR #15).
- Decisioni di design rilevanti o trade-off.
