# feat(chords): implement US-013 complete chords system (US-013)

## Riferimenti obbligatori

- **Issue / Obiettivo**: US-013 - Pagina Accordi
- **Milestone**: Milestone 1 - MVP Studio
- **Vision**: `.copilot/vision.md` - sezione "Pagine Studio" (US-013)
- **Diary**: `.copilot/copilot-diario.md`

## Descrizione sintetica

Implementazione completa del sistema accordi per il progetto Morgan Guitar Studio, inclusa:

- **Libreria musicale `chords.ts`**: completa US-011 (mancava il modulo accordi)
- **Componente `ChordDiagram`**: visualizzazione SVG accessibile dei diagrammi accordi
- **Pagina `Chords`**: interfaccia utente completa per esplorare accordi con teoria, diagramma e fretboard

Questa PR contribuisce alla Vision fornendo agli studenti uno strumento interattivo per:

1. Visualizzare diteggiature standard degli accordi più comuni
2. Comprendere la teoria (gradi e intervalli) dietro ogni accordo
3. Vedere tutte le posizioni delle note dell'accordo sulla tastiera

**Nota importante**: Include `chords.ts` che completa US-011 (music library) - era stato marcato completo ma mancava il modulo accordi.

## File principali aggiunti / modificati

### Libreria musicale

- **`src/lib/music/chords.ts`** (270 righe): Libreria accordi completa
  - 9 tipi di accordi (major, minor, dominant7, major7, minor7, diminished, augmented, sus2, sus4)
  - 6 diteggiature open predefinite (C, Am, G, D, E, Em)
  - Funzioni: `getChord()`, `getChordDegreeForNote()`, `mapChordToPositions()`
  - Interfaces: `ChordType`, `ChordPosition`, `ChordVoicing`
- **`src/lib/music/index.ts`**: Aggiunto export per chords

### Componenti

- **`src/components/ChordDiagram.tsx`** (158 righe): Componente SVG per diagrammi accordi
  - Visualizzazione verticale classica (strings + frets)
  - Indicatori corde mute (X) e aperte (O)
  - Numeri dita opzionali
  - 3 varianti dimensione (small/medium/large)
  - Accessibilità completa (role="img", aria-label)

### Pagine

- **`src/pages/Chords.tsx`** (154 righe): Pagina principale accordi
  - Selettori per tonica (12 note) e tipo accordo (9 tipi)
  - Sezione teoria (nome, gradi, intervalli, note)
  - Diagramma accordo (se disponibile voicing predefinita)
  - Integrazione Fretboard per visualizzare tutte le posizioni

### Styling

- **`src/styles/chordDiagram.module.css`** (155 righe): Stili ChordDiagram
- **`src/styles/chords.module.css`** (214 righe): Stili pagina Chords
  - Layout responsive
  - Dark mode support
  - Mobile-friendly (<768px)

### Storybook

- **`src/stories/ChordDiagram.stories.tsx`** (9 stories): ChordDiagram in varie configurazioni
  - 6 accordi comuni (C, Am, G, D, E, Em)
  - 3 varianti dimensione e opzioni
- **`src/stories/Chords.stories.tsx`** (2 stories): Pagina Chords con documentazione

### Test suite

- **`tests/lib/music/chords.spec.ts`** (25 test): Test libreria accordi
  - CHORD_TYPES definitions
  - getChord() per 10 esempi diversi
  - getChordDegreeForNote()
  - OPEN_CHORD_VOICINGS
  - mapChordToPositions()
- **`tests/components/ChordDiagram.spec.tsx`** (15 test): Test componente
  - Rendering (chord name, SVG, finger positions)
  - Size variants
  - Accessibility (role, aria-label)
  - String labels
  - Open/muted strings
- **`tests/pages/Chords.spec.tsx`** (27 test): Test pagina
  - Page structure
  - Selectors e interazioni
  - Theory section
  - Diagram section
  - Fretboard integration
  - Accessibility

## Acceptance Criteria (da US-013)

✅ **Libreria accordi**

- [x] Implementata libreria con formule per 9 chord types comuni
- [x] Interfacce TypeScript per ChordType, ChordPosition, ChordVoicing

✅ **Mapping note → posizioni**

- [x] Funzione `mapChordToPositions()` implementata
- [x] 6 voicing predefinite per accordi open comuni (C, Am, G, D, E, Em)
- [x] Mapping testato con 10+ esempi di accordi diversi

✅ **Componente ChordDiagram**

- [x] Visualizzazione SVG accessibile (aria-label, role="img")
- [x] Indicatori corde mute/aperte
- [x] Numeri dita opzionali
- [x] Test copertura rendering e accessibility

✅ **Pagina Chords**

- [x] Selettori tonica + tipo accordo
- [x] Teoria (gradi, intervalli)
- [x] ChordDiagram integrato
- [x] Fretboard per visualizzare tutte le posizioni
- [x] Layout responsive

✅ **Stories Storybook**

- [x] Stories per ChordDiagram (9 stories)
- [x] Stories per Chords page (2 stories)

## Checklist minima (obbligatoria)

- [x] Il body della PR include riferimento a US-013
- [x] **Typecheck**: `npx tsc --noEmit` ✅ 0 errori
- [x] **Tests**: `npx vitest run` ✅ 132/132 passed (67 nuovi test)
  - 25 test lib/music/chords.spec.ts
  - 15 test components/ChordDiagram.spec.tsx
  - 27 test pages/Chords.spec.tsx
- [x] **ESLint**: `npm run lint` ✅ 0 warnings
- [x] **Prettier**: `npm run format` ✅ tutti formattati
- [x] **Storybook build**: applicabile ✅ 11 nuove stories
- [x] Inserita la voce diary standard (vedi sotto)

## Test Coverage Summary

| Categoria           | File                  | Tests   | Status |
| ------------------- | --------------------- | ------- | ------ |
| Library             | chords.spec.ts        | 25      | ✅     |
| Component           | ChordDiagram.spec.tsx | 15      | ✅     |
| Page                | Chords.spec.tsx       | 27      | ✅     |
| **Totale nuovi**    |                       | **67**  | **✅** |
| **Totale progetto** |                       | **132** | **✅** |

## Note / Dipendenze

### Completamento US-011

Questa PR include `src/lib/music/chords.ts` che era parte di US-011 (music library) ma era rimasto incompiuto. US-011 era stato marcato completo ma includeva solo `notes.ts`, `scales.ts` e `caged.ts`. Con questa PR, US-011 è ora veramente completo al 100%.

### Decisioni di design

1. **Pre-defined voicings vs algoritmo generativo**:
   - Implementate 6 diteggiature open comuni hardcoded per qualità immediata
   - `mapChordToPositions()` ha placeholder per futuro algoritmo sofisticato
   - Questo approccio garantisce diteggiature corrette e idiomatiche da subito

2. **Rinominata funzione per evitare conflitti**:
   - `getDegreeForNote()` → `getChordDegreeForNote()` in chords.ts
   - `getDegreeForNote()` già esistente in scales.ts
   - Evita ambiguità nell'export da `lib/music/index.ts`

3. **ChordDiagram separato da Fretboard**:
   - ChordDiagram: vista verticale compatta per singola diteggiatura
   - Fretboard: vista orizzontale estesa per tutte le posizioni
   - Complementari, non ridondanti

4. **Accessibilità**:
   - Tutti i selectors hanno aria-label descrittive
   - ChordDiagram ha role="img" e aria-label con nome accordo
   - Test specifici per accessibilità

### Prossimi step suggeriti

- Aggiungere più voicings (barre chords, inversioni)
- Implementare algoritmo generativo per posizioni accordi
- Estendere a chord extensions (9th, 11th, 13th)

## Voce Diary

```markdown
### 2025-11-27 - US-013: Chords page (PR #XX)

**Obiettivo**: Implementare pagina accordi completa con libreria, diagrammi e integrazione fretboard.

**Azioni svolte**:

1. Creato `src/lib/music/chords.ts` (270 righe):
   - 9 chord types con intervalli e gradi
   - 6 open voicings predefinite (C, Am, G, D, E, Em)
   - Funzioni: getChord(), getChordDegreeForNote(), mapChordToPositions()
2. Implementato componente `ChordDiagram` (158 righe):
   - SVG verticale con strings/frets/dots
   - Indicatori open/mute strings
   - 3 size variants, accessibility completa
3. Creata pagina `Chords` (154 righe):
   - Selettori root note + chord type
   - Sezione teoria (gradi, intervalli, note)
   - ChordDiagram + Fretboard integration
4. Styling responsive + dark mode (369 righe CSS)
5. Storybook: 11 stories (9 ChordDiagram + 2 Chords)
6. Test suite: 67 test (25 lib + 15 component + 27 page)
7. Quality checks: TypeScript ✅, ESLint ✅, Prettier ✅, Tests 132/132 ✅

**Risultato**: US-013 completa. Include anche chords.ts che completa US-011 (music library). Tutti i test passano, accessibilità verificata, documentazione completa.

**Commit**: feat(chords): implement US-013 complete chords system (29b8464)

**Decisioni tecniche**:

- Pre-defined voicings per qualità immediata vs algoritmo generativo futuro
- Rinominata getChordDegreeForNote() per evitare conflitto con scales.ts
- ChordDiagram separato da Fretboard per usi complementari
```

---

## Come usare questa descrizione

1. Vai su GitHub: https://github.com/francescomorgante/morganguitarstudio/pull/new/feature/us-013-chords
2. Copia tutto il contenuto di questo file nel corpo della PR
3. Sostituisci `#XX` nella voce Diary con il numero effettivo della PR
4. Clicca "Create pull request"
5. Dopo il merge, aggiorna `.copilot/copilot-diario.md` con la voce Diary
