import React, { useState } from 'react';
import { Fretboard } from '../components/Fretboard';
import { SCALE_TYPES } from '../lib/music/scales';
import { EN_NOTES } from '../lib/music/notes';
import styles from '../styles/scale.module.css';

export const Scale: React.FC = () => {
  const [rootNote, setRootNote] = useState('C');
  const [scaleType, setScaleType] = useState('majorFull');

  const selectedScale = SCALE_TYPES[scaleType];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Scale Musicali</h1>
        <p>Esplora le scale sulla tastiera della chitarra</p>
      </header>

      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <label htmlFor="root-note">Tonica:</label>
          <select
            id="root-note"
            value={rootNote}
            onChange={(e) => setRootNote(e.target.value)}
            className={styles.select}
          >
            {EN_NOTES.map((note) => (
              <option key={note} value={note}>
                {note}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.controlGroup}>
          <label htmlFor="scale-type">Tipo di scala:</label>
          <select
            id="scale-type"
            value={scaleType}
            onChange={(e) => setScaleType(e.target.value)}
            className={styles.select}
          >
            {Object.entries(SCALE_TYPES).map(([key, scale]) => (
              <option key={key} value={key}>
                {scale.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <section className={styles.theorySection}>
        <h2>Teoria della scala</h2>
        <div className={styles.theoryContent}>
          <div className={styles.theoryItem}>
            <strong>Nome:</strong> {selectedScale.name}
          </div>
          <div className={styles.theoryItem}>
            <strong>Formula:</strong> {selectedScale.degrees.join(' - ')}
          </div>
          <div className={styles.theoryItem}>
            <strong>Intervalli:</strong> {selectedScale.intervals.join(', ')}
          </div>
        </div>
      </section>

      <section className={styles.fretboardSection}>
        <h2>Visualizzazione sulla tastiera</h2>
        <Fretboard
          rootNote={rootNote}
          scaleType={scaleType}
          viewMode="scale"
          theme="light"
          showLabels={true}
        />
      </section>
    </div>
  );
};
