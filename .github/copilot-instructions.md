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
- feature/
