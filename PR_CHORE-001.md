# chore(infra): CHORE-001 Setup quality infrastructure

## Riferimenti obbligatori

- Issue / Obiettivo: Closes #17 (CHORE-001)
- Milestone: Milestone 1 MVP
- Vision (obbligatorio): .copilot/vision.md - Sezione 7 "Tecnologie e stack"
- Diary (obbligatorio): .copilot/copilot-diario.md

## Descrizione sintetica

Implementa l'infrastruttura completa di qualità del codice per il progetto, come richiesto dalla Vision (Sezione 7) e dalla Milestone 1. Questa PR stabilisce gli standard di qualità automatizzati che saranno applicati a tutte le future PR, garantendo coerenza di stile, type safety e test coverage.

**Componenti implementati:**

1. **Prettier** - Formattazione automatica del codice
2. **ESLint v9** - Linting con supporto TypeScript, React e Prettier
3. **Script npm** - Comandi per lint:fix, format e format:check
4. **CI workflow** - Validazione automatica lint + format + tests su ogni PR
5. **i18n skeleton** - Struttura base per internazionalizzazione (IT/EN)
6. **CONTRIBUTING.md** - Documentazione completa per sviluppatori

## File principali aggiunti / modificati

### Nuovi file

- `.prettierrc.json` - Configurazione Prettier (semi, singleQuote, printWidth 100)
- `.prettierignore` - File da escludere dalla formattazione
- `eslint.config.mjs` - ESLint v9 flat config con TypeScript + React + Prettier
- `locales/it.json` - Traduzioni italiane (Studio/Pentatoniche/Accordi/Scale)
- `locales/en.json` - Traduzioni inglesi (Studio/Pentatonic/Chords/Scales)

### File modificati

- `package.json` - Aggiunti script (lint:fix, format, format:check) + dipendenze (prettier, eslint-plugin-react, eslint-plugin-react-hooks, eslint-config-prettier, eslint-plugin-prettier)
- `.github/workflows/ci.yml` - Aggiunti step "Lint check" e "Format check"
- `CONTRIBUTING.md` - Sezione "Quality gate" espansa con comandi e workflow completo

### File rimossi

- `.eslintrc.js` - Sostituito da `eslint.config.mjs` (ESLint v9 richiede flat config)

## Checklist minima (obbligatoria)

- [x] Il body della PR include riferimento a un issue (#17)
- [x] Typecheck: `npx tsc --noEmit` ✅ (0 errori)
- [x] Tests: `npx vitest run` ✅ (43/43 passati)
- [x] Lint: `npm run lint` ✅ (0 errori)
- [x] Format: `npm run format:check` ✅ (tutto formattato)
- [x] Storybook build: Non applicabile (nessuna modifica componenti)
- [x] Inserita la voce diary standard nel body (vedi sotto)

## Quality Checks - Tutti passati ✅

```bash
# TypeScript
npx tsc --noEmit
✅ 0 errori

# ESLint
npm run lint
✅ 0 errori / 0 warning

# Prettier
npm run format:check
✅ Tutti i file formattati correttamente

# Test Suite
npx vitest run
✅ Test Files  3 passed (3)
✅ Tests  43 passed (43)
```

## Dettagli tecnici

### Migrazione ESLint v9

- **Motivazione**: ESLint 9.x richiede il nuovo formato "flat config"
- **Soluzione**: Convertito `.eslintrc.js` → `eslint.config.mjs`
- **Plugin integrati**:
  - `@typescript-eslint` (type checking)
  - `eslint-plugin-react` (React best practices)
  - `eslint-plugin-react-hooks` (hooks rules)
  - `eslint-plugin-prettier` (integrazione Prettier)
- **Regole custom**:
  - `react/react-in-jsx-scope: off` (React 19 non richiede import)
  - `@typescript-eslint/no-explicit-any: warn` (permesso ma discouraged)
  - `@typescript-eslint/no-unused-vars: warn` (con argsIgnorePattern: '^\_')

### CI Workflow

Aggiunti 2 step al workflow esistente (dopo TypeScript check):

1. **Lint check** - Esegue `npm run lint` per validare regole ESLint
2. **Format check** - Esegue `npm run format:check` per verificare formattazione Prettier

Se uno di questi step fallisce, la PR viene bloccata automaticamente.

### i18n Skeleton

Creata struttura base per internazionalizzazione con traduzioni esempio per le pagine Studio:

- **locales/it.json** - Traduzioni italiane
- **locales/en.json** - Traduzioni inglesi
- **Scope**: Pentatoniche (5 pattern CAGED), Accordi, Scale
- **Prossimi step**: Integrare con react-i18next o simile in US-013/US-014

## Note / Dipendenze

**Dipendenze**: Nessuna - questa PR è standalone e propedeutica a tutte le future PR.

**Breaking changes**: Nessuno - tutti i file esistenti passano i nuovi controlli senza modifiche.

**Decisioni di design**:

1. **ESLint v9 flat config**: Adottato il nuovo standard richiesto da ESLint 9.x (formato `.mjs` perché package.json ha `"type": "commonjs"`)
2. **Prettier printWidth: 100**: Bilanciamento tra leggibilità e utilizzo schermo moderno
3. **ESLint rules a "warn"**: Permette sviluppo iterativo senza bloccare eccessivamente (errori solo per problemi critici)
4. **i18n JSON semplice**: Per ora file JSON statici, integrazione react-i18next rinviata a quando necessario

**Post-merge**:

- Chiudere issue #17
- Aggiornare diary con entry completa
- US-013 e US-014 potranno procedere con qualità garantita

---

## 📝 Diary Entry

**Data**: 2025-11-27  
**Branch**: `chore/chore-001-setup-quality`  
**PR**: #[TBD]  
**Issue**: #17 (CHORE-001)  
**Commit**: `43ec197`

**Obiettivo**: Implementare infrastruttura qualità completa (Prettier, ESLint v9, CI lint/format, i18n skeleton, docs)

**Azioni svolte**:

1. Creato config Prettier (`.prettierrc.json`, `.prettierignore`) con regole standard React/TypeScript
2. Migrato ESLint da v8 legacy config a v9 flat config (`eslint.config.mjs`)
3. Integrati plugin: TypeScript ESLint, React, React Hooks, Prettier
4. Aggiunti npm scripts: `lint:fix`, `format`, `format:check`
5. Aggiornato CI workflow: 2 nuovi step (lint check, format check) dopo typecheck
6. Creato skeleton i18n con `locales/it.json` e `locales/en.json` (traduzioni Studio pages)
7. Espanso CONTRIBUTING.md con sezione Quality gate dettagliata (comandi, workflow, auto-fix)
8. Installate dipendenze: prettier, eslint-config-prettier, eslint-plugin-prettier, eslint-plugin-react, eslint-plugin-react-hooks
9. Rimosso `.eslintrc.js` (obsoleto), sostituito con `eslint.config.mjs`

**File modificati**:

- `package.json` (+3 scripts, +7 devDependencies)
- `.github/workflows/ci.yml` (+2 steps)
- `CONTRIBUTING.md` (sezione 4 espansa)
- `.prettierrc.json` (nuovo)
- `.prettierignore` (nuovo)
- `eslint.config.mjs` (nuovo)
- `locales/it.json` (nuovo)
- `locales/en.json` (nuovo)
- `.eslintrc.js` (rimosso)

**Risultati quality checks**:

- ✅ TypeScript: 0 errori (`npx tsc --noEmit`)
- ✅ ESLint: 0 errori (`npm run lint`)
- ✅ Prettier: tutto formattato (`npm run format:check`)
- ✅ Test: 43/43 passati (`npx vitest run`)

**Status**: Ready for review  
**Note**: ESLint migrato a v9 flat config (breaking change nella configurazione, ma 100% backward compatible per il codice esistente). Tutte le future PR devono passare lint + format check in CI.
