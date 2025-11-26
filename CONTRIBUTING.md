# Contributing - Regole sintetiche

1. Vision e roadmap
   - La Vision è in `.copilot/vision.md` e descrive gli obiettivi a medio/lungo termine.
   - Le milestone mappano i passi concreti per realizzare la Vision (v. docs/ROADMAP.md).

2. Issue / PR policy
   - Crea sempre un issue (US-###) per lavori significativi e assegna la milestone corretta.
   - Quando apri una PR:
     - Usa il template PR (.github/PULL_REQUEST_TEMPLATE.md).
     - Collega la PR a un issue (US-### o #NN) e alla Vision.
     - Inserisci una voce diary standard nel body della PR che sarà poi copiato nel file canonico .copilot/copilot-diario.md al merge.
     - Non chiudere issue senza aggiornare il diary.

3. Diario operativo
   - Il diario canonico è: `.copilot/copilot-diario.md`. Usalo sempre.
   - Prima del merge, inserisci la voce diary nel body PR; dopo il merge copia la voce nel file canonico.
   - Non creare file diary duplicati.

4. Quality gate
   - Tutte le PR devono passare i controlli qualità locali PRIMA del push:
     ```bash
     npx tsc --noEmit        # TypeScript check (0 errori)
     npm run lint            # ESLint check (0 errori)
     npm run format:check    # Prettier check (tutti formattati)
     npx vitest run          # Test suite (tutti passanti)
     ```
   - Per auto-fix lint/format issues:
     ```bash
     npm run lint:fix        # Fix automatico problemi ESLint
     npm run format          # Formatta tutto il codice con Prettier
     ```
   - Un workflow CI valida automaticamente typecheck, lint, format e test su ogni PR.

5. Automazioni
   - Il workflow pr-body-check verifica che ogni PR includa riferimento a issue/vision/diary.
