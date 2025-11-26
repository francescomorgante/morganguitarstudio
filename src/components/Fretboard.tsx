import React, { useMemo, useCallback, useState } from 'react';
import { noteNameToIndex, EN_NOTES, getScale } from '../lib/music';
import { getTransposedBoxFrets } from '../lib/music/caged';
import styles from '../styles/fretboard.module.css';

/**
 * Tuning configuration as an array of note indices (0-11) for each string.
 * Default is standard tuning: E A D G B E = [4, 9, 2, 7, 11, 4]
 */
export type Tuning = number[];

/**
 * View mode determines what is displayed on the fretboard.
 * - 'scale': show all notes in a scale
 * - 'pentatonic': show pentatonic scale
 * - 'chord': show chord notes
 * - 'notes': show individual notes (free mode)
 */
export type ViewMode = 'scale' | 'pentatonic' | 'chord' | 'notes';

/**
 * Orientation of the fretboard.
 * - 'horizontal': left-to-right (standard guitar view)
 * - 'vertical': top-to-bottom
 */
export type Orientation = 'horizontal' | 'vertical';

/**
 * Theme for the fretboard appearance.
 * Can be a preset ('light' | 'dark') or a custom theme object.
 */
export type FretboardTheme = 'light' | 'dark' | CustomTheme;

/**
 * Custom theme configuration with color overrides.
 */
export interface CustomTheme {
  root?: string;
  active?: string;
  background?: string;
  stringColor?: string;
  fretColor?: string;
  highlighted?: string;
}

/**
 * Note annotation with label and optional color.
 */
export interface NoteAnnotation {
  /** String number (1-6, or 1-n for custom string count) */
  string: number;
  /** Fret number (0 = open string) */
  fret: number;
  /** Label to display (e.g., 'R' for root, '3' for third) */
  label: string;
  /** Optional color for the annotation */
  color?: string;
}

/**
 * Position on the fretboard.
 */
export interface FretboardPosition {
  string: number;
  fret: number;
}

/**
 * Props for the Fretboard component.
 */
export interface FretboardProps {
  // ===== Base Props (from vision) =====
  
  /** Number of strings (default: 6 for guitar) */
  strings?: number;
  
  /** Number of frets to display (default: 15) */
  frets?: number;
  
  /** Tuning configuration as array of note indices (default: standard E A D G B E) */
  tuning?: Tuning;
  
  /** View mode: scale/pentatonic/chord/notes */
  viewMode: ViewMode;
  
  /** Root note as numeric index (0-11) or note name (e.g., 'C', 'A#') */
  rootNote?: number | string;
  
  /** CAGED pattern ID (1-5 for C, A, G, E, D boxes) */
  patternId?: number;

  /** Scale type to use (default: 'minor') */
  scaleType?: string;

  /** Whether to show labels on notes (default: true) */
  showLabels?: boolean;  /** Callback when a note is clicked */
  onNoteClick?: (string: number, fret: number, noteIndex: number) => void;

  // ===== Additional Props =====
  
  /** Custom annotations to display on specific positions */
  annotations?: NoteAnnotation[];
  
  /** Highlighted notes (array of note indices 0-11) */
  highlightedNotes?: number[];
  
  /** Currently selected position (for visual feedback) */
  selectedPosition?: FretboardPosition;
  
  /** Whether to show fingering numbers (1-4) */
  fingeringNumbers?: boolean;
  
  /** Positions that are disabled/grayed out */
  disabledPositions?: FretboardPosition[];
  
  /** Orientation: horizontal or vertical (default: horizontal) */
  orientation?: Orientation;
  
  /** Whether to show fret numbers (default: true) */
  showFretNumbers?: boolean;
  
  /** Whether to show fretboard inlays (dot markers) */
  showInlays?: boolean;
  
  /** Theme for appearance (default: 'light') */
  theme?: FretboardTheme;
  
  /** Whether the fretboard is interactive (default: true) */
  interactive?: boolean;
  
  /** Currently focused note (for keyboard navigation) */
  focusedNote?: FretboardPosition;
  
  /** Callback when focus changes (for accessibility) */
  onFocusChange?: (position: FretboardPosition | null) => void;
}

const DEFAULT_TUNING: Tuning = [4, 9, 2, 7, 11, 4]; // E A D G B E
const INLAY_FRETS = [3, 5, 7, 9, 12, 15, 17, 19, 21]; // Standard inlay positions
const DOUBLE_INLAY_FRETS = [12, 24]; // Double dot markers

/**
 * Fretboard component for interactive guitar fretboard visualization.
 * Supports multiple view modes, CAGED patterns, custom tunings, and full accessibility.
 */
export function Fretboard({
  strings = 6,
  frets = 15,
  tuning = DEFAULT_TUNING,
  viewMode,
  rootNote,
  patternId,
  scaleType = 'minor',
  showLabels = true,
  onNoteClick,
  annotations = [],
  highlightedNotes = [],
  selectedPosition,
  fingeringNumbers = false,
  disabledPositions = [],
  orientation = 'horizontal',
  showFretNumbers = true,
  showInlays = true,
  theme = 'light',
  interactive = true,
  focusedNote,
  onFocusChange,
}: FretboardProps): React.ReactElement {
  
  // Internal focus state if not controlled
  const [internalFocus, setInternalFocus] = useState<FretboardPosition | null>(null);
  const currentFocus = focusedNote ?? internalFocus;

  // Convert root note to numeric index
  const rootIndex = useMemo(() => {
    if (rootNote === undefined) return null;
    if (typeof rootNote === 'number') return rootNote;
    const idx = noteNameToIndex(rootNote);
    if (idx === null) {
      console.warn(`Fretboard: Invalid note name "${rootNote}"`);
    }
    return idx;
  }, [rootNote]);

  // Get scale data if rootNote is provided
  const scaleData = useMemo(() => {
    if (rootIndex === null) return null;
    if (viewMode === 'notes') return null; // Free mode, no scale

    try {
      return getScale(rootIndex, scaleType);
    } catch {
      return null;
    }
  }, [rootIndex, viewMode, scaleType]);

  // Get CAGED pattern data if patternId is provided
  const cagedPattern = useMemo(() => {
    if (!patternId || rootIndex === null || viewMode !== 'pentatonic') return null;
    
    try {
      return getTransposedBoxFrets(rootIndex, patternId, tuning);
    } catch {
      return null;
    }
  }, [patternId, rootIndex, viewMode, tuning]);  // Check if a position is disabled
  const isPositionDisabled = useCallback(
    (string: number, fret: number): boolean => {
      return disabledPositions.some((pos) => pos.string === string && pos.fret === fret);
    },
    [disabledPositions]
  );

  // Check if a position is selected
  const isPositionSelected = useCallback(
    (string: number, fret: number): boolean => {
      return selectedPosition?.string === string && selectedPosition?.fret === fret;
    },
    [selectedPosition]
  );

  // Check if a position is focused
  const isPositionFocused = useCallback(
    (string: number, fret: number): boolean => {
      return currentFocus?.string === string && currentFocus?.fret === fret;
    },
    [currentFocus]
  );

  // Get annotation for a position
  const getAnnotation = useCallback(
    (string: number, fret: number): NoteAnnotation | undefined => {
      return annotations.find((ann) => ann.string === string && ann.fret === fret);
    },
    [annotations]
  );

  // Handle note click
  const handleNoteClick = useCallback(
    (string: number, fret: number, noteIndex: number) => {
      if (!interactive) return;
      if (isPositionDisabled(string, fret)) return;
      
      onNoteClick?.(string, fret, noteIndex);
      
      // Update focus
      const newFocus = { string, fret };
      setInternalFocus(newFocus);
      onFocusChange?.(newFocus);
    },
    [interactive, isPositionDisabled, onNoteClick, onFocusChange]
  );

  // Render a single fret
  const renderFret = (stringNum: number, fret: number) => {
    const stringIndex = strings - stringNum; // convert to array index (0-based)
    const noteIndex = (tuning[stringIndex] + fret) % 12;

    const isInScale = scaleData?.noteIndices.includes(noteIndex) ?? false;
    const isRoot = rootIndex !== null && noteIndex === rootIndex;
    const isHighlighted = highlightedNotes.includes(noteIndex);
    const isDisabled = isPositionDisabled(stringNum, fret);
    const isSelected = isPositionSelected(stringNum, fret);
    const isFocused = isPositionFocused(stringNum, fret);
    const annotation = getAnnotation(stringNum, fret);

    // Check if in CAGED pattern
    const isInCaged = cagedPattern?.perString[stringNum]?.includes(fret) ?? false;

    // Determine if note should be active based on view mode
    let isActive = false;
    if (viewMode === 'notes') {
      isActive = isHighlighted; // Free mode: only show highlighted notes
    } else if (viewMode === 'pentatonic' && cagedPattern) {
      isActive = isInCaged; // Use CAGED pattern positions
    } else {
      isActive = isInScale;
    }    const classNames = [
      styles.fret,
      isActive ? styles.active : '',
      isRoot && isActive ? styles.root : '',
      isHighlighted ? styles.highlighted : '',
      isDisabled ? styles.disabled : '',
      isSelected ? styles.selected : '',
      isFocused ? styles.focused : '',
      annotation ? styles.annotated : '',
    ]
      .filter(Boolean)
      .join(' ');

    // Determine label to display
    let label = '';
    if (showLabels && isActive && !isDisabled) {
      if (annotation) {
        label = annotation.label;
      } else if (fingeringNumbers && cagedPattern) {
        // Calculate fingering number (1-4) based on fret position within pattern
        const minFret = cagedPattern.minFret ?? 0;
        const fretOffset = fret - minFret;
        if (fretOffset >= 0 && fretOffset <= 3) {
          label = String(fretOffset + 1); // Fingers 1-4
        }
      } else {
        label = EN_NOTES[noteIndex];
      }
    }

    const ariaLabel = `String ${stringNum}, fret ${fret}, note ${EN_NOTES[noteIndex]}${
      isActive ? ' (in scale)' : ''
    }${isRoot ? ' (root)' : ''}${isDisabled ? ' (disabled)' : ''}`;

    return (
      <div
        key={`${stringNum}-${fret}`}
        className={classNames}
        role="gridcell"
        aria-label={ariaLabel}
        onClick={() => handleNoteClick(stringNum, fret, noteIndex)}
        tabIndex={interactive && !isDisabled ? 0 : -1}
        style={annotation?.color ? { backgroundColor: annotation.color } : undefined}
      >
        {label}
      </div>
    );
  };

  // Render fret inlays (dot markers)
  const renderInlays = () => {
    if (!showInlays) return null;

    return (
      <div className={styles.inlays} aria-hidden="true">
        {Array.from({ length: frets + 1 }, (_, fret) => {
          const isInlay = INLAY_FRETS.includes(fret);
          const isDouble = DOUBLE_INLAY_FRETS.includes(fret);
          
          if (!isInlay) return null;

          return (
            <div key={fret} className={styles.inlay} data-fret={fret}>
              <span className={styles.inlayDot} />
              {isDouble && <span className={styles.inlayDot} />}
            </div>
          );
        })}
      </div>
    );
  };

  // Render fret numbers
  const renderFretNumbers = () => {
    if (!showFretNumbers) return null;

    return (
      <div className={styles.fretNumbers} aria-label="Fret numbers">
        {Array.from({ length: frets + 1 }, (_, fret) => (
          <div key={fret} className={styles.fretNumber}>
            {fret > 0 ? fret : ''}
          </div>
        ))}
      </div>
    );
  };

  // Render string rows
  const stringNumbers = Array.from({ length: strings }, (_, i) => strings - i);

  // Apply custom theme if provided
  const customThemeStyle = typeof theme === 'object' ? {
    '--fretboard-root-color': theme.root,
    '--fretboard-active-color': theme.active,
    '--fretboard-bg-color': theme.background,
    '--fretboard-string-color': theme.stringColor,
    '--fretboard-fret-color': theme.fretColor,
    '--fretboard-highlighted-color': theme.highlighted,
  } as React.CSSProperties : undefined;

  const themeClass = typeof theme === 'string' ? theme : 'custom';

  const containerClassNames = [
    styles.container,
    styles[themeClass],
    styles[orientation],
    !interactive ? styles.nonInteractive : '',
  ]
    .filter(Boolean)
    .join(' ');

  const rootNoteName = rootIndex !== null ? EN_NOTES[rootIndex] : 'N/A';
  const ariaLabelText = `Fretboard: ${rootNoteName} ${viewMode}, ${frets} frets, ${strings} strings`;

  return (
    <div className={containerClassNames} role="region" aria-label={ariaLabelText} style={customThemeStyle}>
      <div className={styles.controls}>
        <span className={styles.label}>
          Root: {rootNoteName} | View: {viewMode} 
          {patternId && ` | Pattern: ${patternId}`}
        </span>
      </div>
      
      <div className={styles.fretboardWrapper}>
        {renderInlays()}
        {renderFretNumbers()}
        
        <div className={styles.fretboard} role="grid" aria-label="Guitar fretboard">
          {stringNumbers.map((stringNum) => (
            <div key={stringNum} className={styles.string} role="row" aria-label={`String ${stringNum}`}>
              {Array.from({ length: frets + 1 }, (_, fret) => renderFret(stringNum, fret))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Fretboard;
