# Roadmap / Mappa Vision → Milestone → Issue → PR

Scopo: mantenere una mappa leggibile che collega la Vision ai milestone, agli issue e alle PR che realizzano il lavoro.

Formato raccomandato (esempio corrente):

- Vision (file: .copilot/vision.md)
  - Milestone 1: titolo breve — obiettivo misurabile
    - US-010: Caged / Pentatoniche — refactor + skeleton (link issue)
      - PR #15 — US-010: Refactor Pentatoniche in Caged component (merged)
      - PR #21 — Extract skeleton and relevant modifications from PR #16 (merged)
      - PR #16 — draft / obsoleta (skeleton originale)
    - US-012: Fretboard — status: open — PR: feature/us-012-fretboard (work planned)
    - US-013: Chords — status: open — PR: feature/us-013-chords (depends on Fretboard)
    - US-014: Scales — status: open — PR: feature/us-014-scales (depends on Fretboard)

Regole:

- Ogni issue che contribuisce alla milestone deve avere il tag della milestone.
- Ogni PR che implementa un issue deve avere nel body "Closes US-XXX" oppure "Closes #NN".
- Aggiorna questa mappa ogni volta che una PR viene mergeata o uno issue cambia stato.
- Link al diario: .copilot/copilot-diario.md (usare il diario canonico per i dettagli operativi).
