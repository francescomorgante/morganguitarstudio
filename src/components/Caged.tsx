import React, { useMemo } from 'react';
import { getTransposedBoxFrets, getScale, noteNameToIndex, EN_NOTES } from '../lib/music';
import styles from '../styles/caged.module.css';

export interface CagedProps {
  /** Initial root note as numeric index (0-11) or note name (e.g., 'A', 'C#') */
  initialRoot: number | string;
  /** Scale type key (e.g., 'minor', 'major') */
  initialType: string;
  /** View mode: 'boxes' shows CAGED boxes, 'notes' shows note names */
  viewMode: 'boxes' | 'notes';
  /** Number of frets to display (default: 15) */
  fretCount?: number;
  /** Notation style: 'tab' or 'note' (default: 'note') */
  notation?: 'tab' | 'note';
}

const DEFAULT_TUNING = [4, 9, 2, 7, 11, 4]; // E A D G B E

/**
 * Caged component for visualizing CAGED system pentatonic patterns on a guitar fretboard.
 * Refactored from the Pentatoniche page for reusability.
 */
export function Caged({
  initialRoot,
  initialType,
  viewMode,
  fretCount = 15,
  notation = 'note',
}: CagedProps): React.ReactElement {
  // Convert root to numeric index if string
  const rootIndex = useMemo(() => {
    if (typeof initialRoot === 'number') {
      return initialRoot;
    }
    const idx = noteNameToIndex(initialRoot);
    return idx ?? 0;
  }, [initialRoot]);

  // Get scale data
  const scaleData = useMemo(() => {
    try {
      return getScale(rootIndex, initialType);
    } catch {
      return null;
    }
  }, [rootIndex, initialType]);

  // Get box frets for box 1 (default visualization)
  const boxData = useMemo(() => {
    return getTransposedBoxFrets(rootIndex, 1, DEFAULT_TUNING);
  }, [rootIndex]);

  const rootNoteName = EN_NOTES[rootIndex] || 'A';

  // Generate fretboard grid
  const strings = [6, 5, 4, 3, 2, 1]; // string numbers from low to high

  const renderFret = (stringNum: number, fret: number) => {
    const stringIndex = 6 - stringNum; // convert to array index
    const noteIndex = (DEFAULT_TUNING[stringIndex] + fret) % 12;
    const isInScale = scaleData?.noteIndices.includes(noteIndex) ?? false;
    const isRoot = noteIndex === rootIndex;

    // Check if fret is in box pattern
    const isInBox = boxData?.perString[stringNum]?.includes(fret) ?? false;

    const isActive = viewMode === 'boxes' ? isInBox : isInScale;

    const classNames = [
      styles.fret,
      isActive ? styles.active : '',
      isRoot && isActive ? styles.root : '',
    ]
      .filter(Boolean)
      .join(' ');

    const label =
      notation === 'note' && isActive ? EN_NOTES[noteIndex] : isActive ? fret.toString() : '';

    return (
      <div
        key={`${stringNum}-${fret}`}
        className={classNames}
        role="gridcell"
        aria-label={`String ${stringNum}, fret ${fret}${isActive ? `, note ${EN_NOTES[noteIndex]}` : ''}`}
      >
        {label}
      </div>
    );
  };

  return (
    <div className={styles.container} role="region" aria-label={`${rootNoteName} ${initialType} scale`}>
      <div className={styles.controls}>
        <span className={styles.label}>
          Root: {rootNoteName} | Type: {initialType} | View: {viewMode}
        </span>
      </div>
      <div className={styles.fretboard} role="grid" aria-label="Guitar fretboard">
        {strings.map((stringNum) => (
          <div key={stringNum} className={styles.string} role="row">
            {Array.from({ length: fretCount + 1 }, (_, fret) => renderFret(stringNum, fret))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Caged;
