import React from 'react';
import { ChordPosition } from '../lib/music/chords';
import styles from '../styles/chordDiagram.module.css';

export interface ChordDiagramProps {
  /** Name of the chord (e.g., 'C', 'Am', 'G7') */
  chordName: string;
  /** Positions of notes on the fretboard */
  positions: ChordPosition[];
  /** Starting fret for the diagram (default: 0 for open chords) */
  startFret?: number;
  /** Number of frets to display (default: 5) */
  fretsToShow?: number;
  /** Whether to show finger numbers (default: true) */
  showFingers?: boolean;
  /** Size of the diagram (default: 'medium') */
  size?: 'small' | 'medium' | 'large';
}

export const ChordDiagram: React.FC<ChordDiagramProps> = ({
  chordName,
  positions,
  startFret = 0,
  fretsToShow = 5,
  showFingers = true,
  size = 'medium',
}) => {
  const strings = 6;
  const isOpenChord = startFret === 0;

  // Calculate which strings are played
  const playedStrings = new Set(positions.map((p) => p.string));
  const mutedStrings = Array.from({ length: strings }, (_, i) => i + 1).filter(
    (s) => !playedStrings.has(s)
  );

  const sizeClass = `diagram-${size}`;

  return (
    <div
      className={`${styles.chordDiagram} ${styles[sizeClass]}`}
      role="img"
      aria-label={`Chord diagram for ${chordName}`}
    >
      <div className={styles.chordName}>{chordName}</div>

      {!isOpenChord && startFret > 0 && <div className={styles.fretNumber}>{startFret}fr</div>}

      <svg viewBox="0 0 100 140" className={styles.diagram} xmlns="http://www.w3.org/2000/svg">
        {/* Nut (for open chords) or top line */}
        {isOpenChord && (
          <rect x="10" y="10" width="80" height="3" fill="currentColor" className={styles.nut} />
        )}

        {/* Frets */}
        {Array.from({ length: fretsToShow + 1 }).map((_, i) => {
          const y = 10 + (i * 120) / fretsToShow;
          const strokeWidth = i === 0 && !isOpenChord ? 3 : 1;
          return (
            <line
              key={`fret-${i}`}
              x1="10"
              y1={y}
              x2="90"
              y2={y}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              className={styles.fret}
            />
          );
        })}

        {/* Strings */}
        {Array.from({ length: strings }).map((_, i) => {
          const x = 10 + (i * 80) / (strings - 1);
          return (
            <line
              key={`string-${i}`}
              x1={x}
              y1="10"
              x2={x}
              y2="130"
              stroke="currentColor"
              strokeWidth="1"
              className={styles.string}
            />
          );
        })}

        {/* Open/Muted indicators above nut */}
        {Array.from({ length: strings }).map((_, i) => {
          const stringNum = i + 1;
          const x = 10 + (i * 80) / (strings - 1);
          const y = 0;

          // Check if string has an open note (fret 0)
          const hasOpen = positions.some((p) => p.string === stringNum && p.fret === 0);
          if (hasOpen) {
            return (
              <circle
                key={`open-${i}`}
                cx={x}
                cy={y}
                r="3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className={styles.openString}
              />
            );
          }

          // Check if string is muted
          const isMuted = mutedStrings.includes(stringNum);
          if (isMuted) {
            return (
              <g key={`muted-${i}`}>
                <line
                  x1={x - 3}
                  y1={y - 3}
                  x2={x + 3}
                  y2={y + 3}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className={styles.mutedString}
                />
                <line
                  x1={x - 3}
                  y1={y + 3}
                  x2={x + 3}
                  y2={y - 3}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className={styles.mutedString}
                />
              </g>
            );
          }

          return null;
        })}

        {/* Finger positions */}
        {positions
          .filter((p) => p.fret > 0) // Only show fretted notes (not open strings)
          .map((pos, idx) => {
            const stringIndex = pos.string - 1;
            const fretIndex = pos.fret - startFret;

            if (fretIndex < 0 || fretIndex > fretsToShow) return null;

            const x = 10 + (stringIndex * 80) / (strings - 1);
            const y = 10 + ((fretIndex - 0.5) * 120) / fretsToShow;

            return (
              <g key={`pos-${idx}`}>
                <circle cx={x} cy={y} r="5" fill="currentColor" className={styles.fingerDot} />
                {showFingers && pos.finger && pos.finger > 0 && (
                  <text
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="6"
                    fill="white"
                    className={styles.fingerNumber}
                  >
                    {pos.finger}
                  </text>
                )}
              </g>
            );
          })}
      </svg>

      {/* String labels (optional) */}
      <div className={styles.stringLabels}>
        {Array.from({ length: strings }).map((_, i) => (
          <span key={`label-${i}`} className={styles.stringLabel}>
            {strings - i}
          </span>
        ))}
      </div>
    </div>
  );
};
