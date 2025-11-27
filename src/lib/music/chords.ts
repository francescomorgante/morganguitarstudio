/**
 * Chord library - Definitions and utilities for guitar chords
 * Provides chord types, formulas, intervals and utilities for chord construction
 */

export type ChordType = {
  name: string;
  intervals: number[];
  degrees: string[];
  symbol: string;
};

/**
 * Common chord types with their intervals and degrees
 */
export const CHORD_TYPES: Record<string, ChordType> = {
  major: {
    name: 'Maggiore',
    intervals: [0, 4, 7],
    degrees: ['1', '3', '5'],
    symbol: '',
  },
  minor: {
    name: 'Minore',
    intervals: [0, 3, 7],
    degrees: ['1', '♭3', '5'],
    symbol: 'm',
  },
  dominant7: {
    name: 'Settima di dominante',
    intervals: [0, 4, 7, 10],
    degrees: ['1', '3', '5', '♭7'],
    symbol: '7',
  },
  major7: {
    name: 'Settima maggiore',
    intervals: [0, 4, 7, 11],
    degrees: ['1', '3', '5', '7'],
    symbol: 'maj7',
  },
  minor7: {
    name: 'Settima minore',
    intervals: [0, 3, 7, 10],
    degrees: ['1', '♭3', '5', '♭7'],
    symbol: 'm7',
  },
  diminished: {
    name: 'Diminuito',
    intervals: [0, 3, 6],
    degrees: ['1', '♭3', '♭5'],
    symbol: 'dim',
  },
  augmented: {
    name: 'Aumentato',
    intervals: [0, 4, 8],
    degrees: ['1', '3', '#5'],
    symbol: 'aug',
  },
  sus2: {
    name: 'Sospeso secondo',
    intervals: [0, 2, 7],
    degrees: ['1', '2', '5'],
    symbol: 'sus2',
  },
  sus4: {
    name: 'Sospeso quarto',
    intervals: [0, 5, 7],
    degrees: ['1', '4', '5'],
    symbol: 'sus4',
  },
};

/**
 * Position on fretboard for a chord note
 */
export interface ChordPosition {
  string: number; // 1-6 (1 = high E, 6 = low E)
  fret: number; // 0-24 (0 = open string)
  finger?: number; // 0-4 (0 = open, 1-4 = fingers)
  note: string; // Note name (e.g., 'C', 'D#')
  degree: string; // Degree in chord (e.g., '1', '3', '5')
}

/**
 * Chord voicing - a specific fingering/position for a chord
 */
export interface ChordVoicing {
  positions: ChordPosition[];
  startFret: number; // Starting fret for the chord shape
  name: string; // Descriptive name (e.g., 'C major open', 'Am barre')
  difficulty?: 'easy' | 'medium' | 'hard';
}

/**
 * Get chord notes from root and chord type
 */
export function getChord(rootIndex: number, typeKey: string) {
  const type = CHORD_TYPES[typeKey];
  if (!type) throw new Error(`Unknown chord type: ${typeKey}`);
  const noteIndices = type.intervals.map((i) => (rootIndex + i) % 12);
  return { type, noteIndices };
}

/**
 * Get degree for a note in a chord
 */
export function getChordDegreeForNote(
  noteIndex: number,
  rootIndex: number,
  typeKey: string
): string | null {
  const type = CHORD_TYPES[typeKey];
  if (!type) return null;
  const diff = (noteIndex - rootIndex + 12) % 12;
  for (let i = 0; i < type.intervals.length; i++) {
    if (type.intervals[i] === diff) return type.degrees[i];
  }
  return null;
}

/**
 * Common open chord voicings for popular chords
 */
export const OPEN_CHORD_VOICINGS: Record<string, ChordVoicing[]> = {
  C: [
    {
      name: 'C major open',
      startFret: 0,
      difficulty: 'easy',
      positions: [
        { string: 5, fret: 3, finger: 3, note: 'C', degree: '1' },
        { string: 4, fret: 2, finger: 2, note: 'E', degree: '3' },
        { string: 3, fret: 0, finger: 0, note: 'G', degree: '5' },
        { string: 2, fret: 1, finger: 1, note: 'C', degree: '1' },
        { string: 1, fret: 0, finger: 0, note: 'E', degree: '3' },
      ],
    },
  ],
  Am: [
    {
      name: 'A minor open',
      startFret: 0,
      difficulty: 'easy',
      positions: [
        { string: 5, fret: 0, finger: 0, note: 'A', degree: '1' },
        { string: 4, fret: 2, finger: 2, note: 'E', degree: '5' },
        { string: 3, fret: 2, finger: 3, note: 'A', degree: '1' },
        { string: 2, fret: 1, finger: 1, note: 'C', degree: '♭3' },
        { string: 1, fret: 0, finger: 0, note: 'E', degree: '5' },
      ],
    },
  ],
  G: [
    {
      name: 'G major open',
      startFret: 0,
      difficulty: 'easy',
      positions: [
        { string: 6, fret: 3, finger: 2, note: 'G', degree: '1' },
        { string: 5, fret: 2, finger: 1, note: 'B', degree: '3' },
        { string: 4, fret: 0, finger: 0, note: 'D', degree: '5' },
        { string: 3, fret: 0, finger: 0, note: 'G', degree: '1' },
        { string: 2, fret: 0, finger: 0, note: 'B', degree: '3' },
        { string: 1, fret: 3, finger: 3, note: 'G', degree: '1' },
      ],
    },
  ],
  D: [
    {
      name: 'D major open',
      startFret: 0,
      difficulty: 'easy',
      positions: [
        { string: 4, fret: 0, finger: 0, note: 'D', degree: '1' },
        { string: 3, fret: 2, finger: 1, note: 'A', degree: '5' },
        { string: 2, fret: 3, finger: 3, note: 'D', degree: '1' },
        { string: 1, fret: 2, finger: 2, note: 'F#', degree: '3' },
      ],
    },
  ],
  E: [
    {
      name: 'E major open',
      startFret: 0,
      difficulty: 'easy',
      positions: [
        { string: 6, fret: 0, finger: 0, note: 'E', degree: '1' },
        { string: 5, fret: 2, finger: 2, note: 'B', degree: '5' },
        { string: 4, fret: 2, finger: 3, note: 'E', degree: '1' },
        { string: 3, fret: 1, finger: 1, note: 'G#', degree: '3' },
        { string: 2, fret: 0, finger: 0, note: 'B', degree: '5' },
        { string: 1, fret: 0, finger: 0, note: 'E', degree: '1' },
      ],
    },
  ],
  Em: [
    {
      name: 'E minor open',
      startFret: 0,
      difficulty: 'easy',
      positions: [
        { string: 6, fret: 0, finger: 0, note: 'E', degree: '1' },
        { string: 5, fret: 2, finger: 2, note: 'B', degree: '5' },
        { string: 4, fret: 2, finger: 3, note: 'E', degree: '1' },
        { string: 3, fret: 0, finger: 0, note: 'G', degree: '♭3' },
        { string: 2, fret: 0, finger: 0, note: 'B', degree: '5' },
        { string: 1, fret: 0, finger: 0, note: 'E', degree: '1' },
      ],
    },
  ],
};

/**
 * Map chord notes to fretboard positions using simple heuristic
 * This is a basic implementation - can be enhanced with more sophisticated algorithms
 */
export function mapChordToPositions(
  rootNote: string,
  chordType: string,
  tuning: number[] = [4, 9, 2, 7, 11, 4] // Standard tuning
): ChordPosition[] {
  // Check if we have a pre-defined voicing
  const voicingKey = rootNote + (CHORD_TYPES[chordType]?.symbol || '');
  const voicings = OPEN_CHORD_VOICINGS[voicingKey];

  if (voicings && voicings.length > 0) {
    return voicings[0].positions;
  }

  // Fallback: generate simple positions (root note on each string)
  // This is a placeholder - real implementation would use more sophisticated logic
  const positions: ChordPosition[] = [];
  // For now, return empty to avoid incorrect fingerings
  return positions;
}
