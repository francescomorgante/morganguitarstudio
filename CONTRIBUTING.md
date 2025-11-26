# Contributing

Grazie! Linee guida rapide:

- Branch naming:
  - feature/<US-ID>-<slug>
  - chore/<id>-<slug>
- Prima di aprire una PR esegui:
  - npx tsc --noEmit
  - npm run lint
  - npm test
- Usa il PR template presente in .github/PULL_REQUEST_TEMPLATE.md.
- Linka l'issue con "Closes #N" se appropriato.
- Commit message: Conventional commits: <type>(<scope>): descrizione
- Per ogni sessione di lavoro crea un issue con il template "Copilot Daily Log".

## Procedura ricorrente per sessioni di lavoro (SOP)

Segui questa procedura per ogni sessione di lavoro in repo:

1. Preparazione
   - git checkout main
   - git pull origin main
   - git checkout -b <tipo>/<ID>-<slug>

2. Logging
   - Crea una issue usando il template "Copilot Daily Log" (titolo: `log: YYYY-MM-DD <titolo>`).
   - Associa la issue al branch/PR (aggiungi `Closes #<issue>` nel PR se appropriato).

3. Lavoro e verifica locale
   - Esegui sviluppo e test locali.
   - Prima del PR:
     - npx tsc --noEmit
     - npm run lint
     - npm test

4. Pull Request
   - Apri PR verso `main` usando il PR template.
   - Inserisci acceptance criteria e collegamenti alle issue.

5. Post-merge
   - Appendi una voce su `.copilot/copilot-diario.md` con:
     - Data, branch, breve riepilogo, link PR/issue.
   - Cancella branch locale e remoto.

6. Labels & Diary
   - Alla fine della sessione aggiungi label `summary-needed` all'issue; dopo approvazione cambia in `approved`.

Automazioni consigliate (opzionali)
- GitHub Action che, al merge di una PR verso main, appende automaticamente una voce al diario (.copilot/copilot-diario.md) e crea un commit.
- GitHub Action per creare reminder/issues ricorrenti per il diario.
