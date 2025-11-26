import React from 'react';
import { getScale, getTransposedBoxFrets } from '../lib/music';
import { noteNameToIndex } from '../lib/music/notes';
import styles from '../styles/caged.module.css';

export interface CagedProps {
  /** Initial root note (0-11 for pitch class index, or note name like 'A', 'C#') */
  initialRoot: number | string;
  /** Scale type key (e.g. 'minor', 'major') */
  initialType: string;
  /** View mode: 'boxes' to show CAGED box patterns, 'notes' to show individual notes */
  viewMode: 'boxes' | 'notes';
  /** Number of frets to display (default: 12) */
  fretCount?: number;
  /** Notation style: 'tab' for tablature, 'note' for standard notation (default: 'tab') */
  notation?: 'tab' | 'note';
}

/**
 * Caged component skeleton for visualizing CAGED system patterns on guitar fretboard.
 * Uses getScale and getTransposedBoxFrets from the music library.
 */
export default function Caged({
  initialRoot,
  initialType,
  viewMode,
  fretCount = 12,
  notation = 'tab',
}: CagedProps): React.ReactElement {
  // Resolve root to numeric index
  const rootIndex =
    typeof initialRoot === 'number'
      ? initialRoot
      : (noteNameToIndex(initialRoot) ?? 0);

  // Get scale info
  const scaleInfo = getScale(rootIndex, initialType);

  // Get box pattern for first box as example
  const boxFrets = getTransposedBoxFrets(rootIndex, 1);

  return (
    <div className={styles.cagedContainer} data-testid="caged-component">
      <div className={styles.header}>
        <span className={styles.title}>
          CAGED: {scaleInfo.type.name} (Root: {rootIndex})
        </span>
        <span className={styles.mode}>
          Mode: {viewMode} | Notation: {notation}
        </span>
      </div>
      <div className={styles.fretboard}>
        {/* Fretboard placeholder */}
        <p>Frets: {fretCount}</p>
        <p>Note indices: {scaleInfo.noteIndices.join(', ')}</p>
        {boxFrets && (
          <p>
            Box 1 range: fret {boxFrets.minFret} - {boxFrets.maxFret}
          </p>
        )}
      </div>
    </div>
  );
}
