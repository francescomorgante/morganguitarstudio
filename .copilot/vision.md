# Visione del progetto — MorganGuitarStudio

Data: 2025-11-26  
Autore (bozza): @francescomorgante (collaborazione Copilot)

Scopo: fornire a contributori, Copilot agent e collaboratori una singola fonte di verità che descrive cosa è l’app, chi sono gli utenti, quali funzioni offre, il piano di lavoro per le prime milestone, i vincoli tecnici e la strategia per trasformare funzioni gratuite in servizi a pagamento in modo controllato.

---

## 1 — Sintesi veloce
MorganGuitarStudio è una web‑app educativa e toolset per chitarristi, docenti e studenti che trasforma teoria musicale in pratica sul manico (fretboard). Le funzioni principali permettono di visualizzare scale, pentatoniche e accordi sul manico, importare partiture/tab (MusicXML, GuitarPro), ottenere una visualizzazione sincronizzata tab↔manico e trascrivere semplici tracce monofoniche da registrazione. Funzionalità avanzate (trascrizione audio di qualità maggiore, OMR da PDF, export avanzati) saranno introdotte in seguito come servizi a pagamento.

---

## 2 — Utenti target e valore
- Studente principiante: capire velocemente dove mettere le dita e fare esercizi mirati.  
- Musicista in apprendimento: confrontare voicings, esercitare posizioni, generare backing/trascrizioni.  
- Insegnante: preparare esercizi e lesson basate su pattern visivi e tablature.  
- Sviluppatore/integrazione: riusare il componente Fretboard in altri contesti (widget, lessons).

Valore: riduzione del tempo di passaggio dalla teoria alla pratica, con interfacce chiare e modificabili.

---

## 3 — Macro‑sezioni dell’app
- Sezione Studio (MVP, gratuita): Fretboard interattivo, modalità Scale / Pentatonic / Chord, import MusicXML/GuitarPro, mapping tab→manico, editing/override diteggiature, trascrizione semplice (monofonica).
- Sezione Tools (futuro, initially free then paid): upload e conversione di partiture/audio in tab professionali, export (GuitarPro, MusicXML, PDF), servizi automatici di trascrizione avanzata. Implementare gratuità iniziale e gating successivo tramite feature flags e sistema credits.

---

## 4 — Funzionalità chiave (MVP)
- Fretboard component (props: strings, frets, tuning, viewMode, rootNote, patternId, showLabels, onNoteClick).
- Ingestione file: MusicXML e GuitarPro (prioritari).
- Parser → internal model NoteEvent {pitch, midi, start, duration}.
- mapNotesToPositions(tuning, frets, NoteEvent[]) → PositionedNotes con heuristics di fingering.
- Visualizzazione manuale: tab render + fretboard SVG; click sincronizzati; editing del posizionamento (solo posizioni valide).
- Trascrizione semplice client‑side per monofonia (record → pitch detect → bozza tab).
- Storybook + unit tests per utils critici (getScale, mapNotesToPositions).

Limiti iniziali: niente PDF/OMR, niente autoscroll automatico, limite duration trascrizioni (es. 30s) per contenimento costi.

---

## 5 — Regole di qualità e UX (scelte operative)
- Diteggiatura: algoritmo produce una "miglior" proposta e opzioni alternative; l’utente può cambiare ma solo su posizioni valide (stesso pitch). Undo/redo disponibile.
- CAGED: usare box CAGED come vincolo e proporre per ogni box la diteggiatura migliore; mostrare box in mini‑preview + manico principale; alternative per ciascun box.
- Editing: non permettere operazioni che producono note con pitch errato o diteggiature impossibili.
- Accessibilità base: focus keyboard, aria‑labels su note/celle.
- Convenzioni: branch feature/us-012-fretboard, conventional commits, PR con acceptance criteria e storybook preview.

---

## 6 — Architettura tecnica (high level)
- Frontend: React + TypeScript (Vite or Next.js), Storybook.
- Utils musica: tonal.js / teoria.js; xml2js for MusicXML; guitarpro‑parser for GuitarPro.
- Rendering notazione/tab: VexFlow (opzione) o renderer custom.
- Fretboard: componente SVG React custom (massimo controllo).
- Trascrizione (fase 1): client‑side WebAudio + pitch detection (pitchfinder/YIN) → bozza serverlessless. Later: backend job queue + worker.
- Storage/Jobs/Monetization (preparazione): progetto job-based (upload → storage → queue → worker) con usage logging e feature_flag tools.paid_mode=false per abilitare gating futuro.
- DB: Postgres / Supabase per jobs, usage, users, credits quando necessario.

---

## 7 — Piano di lavoro (milestone principali)
Milestone A — CHORE-001 (setup infra): lint, formatter, test runner, PR/Issue template, Storybook CI — 1–2 giorni.  
Milestone B — US-011 / US-010 (lib/music + rifattorizzazione Pentatoniche): notes/scales/caged utils + component base — 2–4 giorni.  
Milestone C — US-012 (MVP Studio): parsing MusicXML/GPro, mapNotesToPositions, fretboard render, tab render, edit flow, stories, tests — 7–12 giorni.  
Milestone D — Trascrizione semplice (monofonica client-side) + story — 2–4 giorni.  
Milestone E — Tools skeleton (upload/jobs/usage & feature_flag) per monetizzazione futura — 1–2 giorni.  
Milestone F — Integrazioni avanzate (OMR, audio transcription server-side, Stripe billing) — planning & budget separately (weeks/months).

Stima totale MVP Studio (Milestones B+C+D+tests): ~9–16 giorni (1 dev).

---

## 8 — Monetizzazione e strategie "free now, paid later"
- Implementare pipeline job & usage logging subito (anche se processiamo gratuitamente) e introdurre feature_flag tools.paid_mode=false.
- Policy di free usage: limiti anonimi (es. max 3 conversioni/day, max 30s/file), limiti per account registrato più permissivi.
- Quando si attiva paid_mode: server verifica credits/subscription prima di processare il job; client mostra CTA per acquisto senza cambiare API.
- Pagamenti: Stripe (Checkout + webhook). Storage retention policy e metrica costi operativi per definire pricing.

---

## 9 — Rischi principali e mitigazioni
- Trascrizione audio/polyphony imprecisa → mitigare con bozza modificabile e usare soluzioni commerciali per qualità.
- OMR (PDF) = errori → post‑editing obbligatorio e fase post‑MVP.
- Costi server/processing → rate limiting, retention e feature-flag.
- Ambiguità fingering (più posizioni per una nota) → guidare utente con heuristics e presets; consentire modifica controllata.

---

## 10 — Acceptance criteria (MVP Studio)
- Import MusicXML/GuitarPro → internal NoteEvent list ricavata correttamente per 3 esempi test.
- mapNotesToPositions produce posizioni valide per esempi C major scale, A minor pentatonic, G major triad.
- UI: tab renderer + fretboard SVG mostrano highlights correttamente; click sincronizzati; editing valido.
- Storybook con almeno 3 stories e test unitari per utils principali.
- Trascrizione client-side: record <=30s → bozza tab editabile.

---

## 11 — Documentazione, collaborazione e policy Copilot
- Questo documento è la base della vision: prima di modifiche strutturali significative o cambi di priorità, aprire issue con riferimento a questa vision.
- Convenzione PR: includere Acceptance Criteria e link alla storybook preview; usare label `copilot-draft` per PR generati da Copilot che richiedono review umana.
- Copilot non deve marcare PR ready-to-merge senza approvazione umana esplicita.

---

## 12 — Prossimi passi consigliati (operativi)
1. Confermiamo questo testo.  
2. Creiamo issue US-012 (MVP Studio) e TOOLS-001 (skeleton upload/job) basate su questo documento.  
3. Scaffolding del branch feature/us-012-fretboard con parser stub e component skeleton per produrre la prima PR/preview.

---

Nota: questa è una bozza di vision collaborativa. Non verrà inserita nel repo finché non mi dai conferma. Quando confermi, la salvo in `.copilot/vision.md` in un branch `docs/add-vision` e apro la PR con link nella tua checklist.