import React, { useState } from 'react';
import { Fretboard } from '../components/Fretboard';
import { ChordDiagram } from '../components/ChordDiagram';
import { EN_NOTES } from '../lib/music/notes';
import { CHORD_TYPES, getChord, OPEN_CHORD_VOICINGS, ChordVoicing } from '../lib/music/chords';
import styles from '../styles/chords.module.css';

export const Chords: React.FC = () => {
  const [rootNote, setRootNote] = useState(0); // C
  const [chordType, setChordType] = useState<keyof typeof CHORD_TYPES>('major');

  // Get selected chord data
  const selectedChord = CHORD_TYPES[chordType];
  const chordResult = getChord(rootNote, chordType);
  const chordNotes = chordResult.noteIndices;
  const rootNoteName = EN_NOTES[rootNote];
  const chordName = `${rootNoteName}${selectedChord.symbol}`;

  // Try to find a pre-defined voicing for this chord
  const voicingList = OPEN_CHORD_VOICINGS[chordName];
  const voicing: ChordVoicing | undefined = voicingList ? voicingList[0] : undefined;

  // Build fretboard annotations from voicing positions or generate simple ones
  const fretboardAnnotations = voicing
    ? voicing.positions.map((pos) => ({
        string: pos.string,
        fret: pos.fret,
        label: pos.degree,
      }))
    : []; // Empty if no voicing available (more sophisticated generation can be added later)

  return (
    <div className={styles.chordsPage}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>Accordi</h1>
        <p className={styles.description}>
          Esplora gli accordi sulla tastiera. Seleziona la tonica e il tipo di accordo per
          visualizzare le posizioni e la teoria.
        </p>
      </header>

      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <label htmlFor="root-note-select" className={styles.label}>
            Tonica
          </label>
          <select
            id="root-note-select"
            className={styles.select}
            value={rootNote}
            onChange={(e) => setRootNote(Number(e.target.value))}
            aria-label="Seleziona la nota fondamentale dell'accordo"
          >
            {EN_NOTES.map((note, index) => (
              <option key={index} value={index}>
                {note}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.controlGroup}>
          <label htmlFor="chord-type-select" className={styles.label}>
            Tipo di accordo
          </label>
          <select
            id="chord-type-select"
            className={styles.select}
            value={chordType}
            onChange={(e) => setChordType(e.target.value as keyof typeof CHORD_TYPES)}
            aria-label="Seleziona il tipo di accordo"
          >
            {Object.entries(CHORD_TYPES).map(([key, chord]) => (
              <option key={key} value={key}>
                {chord.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Theory Section */}
      <section className={styles.theory} aria-label="Teoria dell'accordo">
        <h2 className={styles.theoryTitle}>Teoria: {chordName}</h2>
        <div className={styles.theoryContent}>
          <div className={styles.theoryItem}>
            <span className={styles.theoryLabel}>Nome:</span>
            <span className={styles.theoryValue}>{selectedChord.name}</span>
          </div>
          <div className={styles.theoryItem}>
            <span className={styles.theoryLabel}>Gradi:</span>
            <span className={styles.theoryValue}>{selectedChord.degrees.join(' - ')}</span>
          </div>
          <div className={styles.theoryItem}>
            <span className={styles.theoryLabel}>Intervalli:</span>
            <span className={styles.theoryValue}>{selectedChord.intervals.join(', ')}</span>
          </div>
          <div className={styles.theoryItem}>
            <span className={styles.theoryLabel}>Note:</span>
            <span className={styles.theoryValue}>
              {chordNotes.map((idx) => EN_NOTES[idx]).join(' - ')}
            </span>
          </div>
        </div>
      </section>

      {/* Chord Diagram Section */}
      {voicing && (
        <section className={styles.diagramSection} aria-label="Diagramma accordo">
          <h2 className={styles.sectionTitle}>Posizione {voicing.name}</h2>
          <div className={styles.diagramContainer}>
            <ChordDiagram
              chordName={chordName}
              positions={voicing.positions}
              startFret={voicing.startFret}
              showFingers={true}
              size="large"
            />
          </div>
          <p className={styles.diagramNote}>
            Difficoltà: <span className={styles.difficulty}>{voicing.difficulty}</span>
          </p>
        </section>
      )}

      {!voicing && (
        <section className={styles.diagramSection}>
          <p className={styles.noVoicing}>
            Nessuna diteggiatura pre-definita disponibile per questo accordo.
          </p>
        </section>
      )}

      {/* Fretboard Section */}
      <section className={styles.fretboardSection} aria-label="Tastiera chitarra">
        <h2 className={styles.sectionTitle}>Visualizzazione sulla tastiera</h2>
        <p className={styles.fretboardDescription}>
          Le note evidenziate mostrano tutte le posizioni dell&apos;accordo {chordName} sulla
          tastiera.
        </p>
        <div className={styles.fretboardContainer}>
          <Fretboard
            annotations={fretboardAnnotations}
            viewMode="chord"
            theme="light"
            showLabels={true}
          />
        </div>
      </section>
    </div>
  );
};
