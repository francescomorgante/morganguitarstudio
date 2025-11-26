export type ScaleType = {
  name: string;
  intervals: number[];
  degrees: string[];
};

export const SCALE_TYPES: Record<string, ScaleType> = {
  minor: {
    name: 'Pentatonica minore',
    intervals: [0, 3, 5, 7, 10],
    degrees: ['1', '♭3', '4', '5', '♭7'],
  },
  major: {
    name: 'Pentatonica maggiore',
    intervals: [0, 2, 4, 7, 9],
    degrees: ['1', '2', '3', '5', '6'],
  },
  majorFull: {
    name: 'Scala maggiore',
    intervals: [0, 2, 4, 5, 7, 9, 11],
    degrees: ['1', '2', '3', '4', '5', '6', '7'],
  },
  minorNatural: {
    name: 'Scala minore naturale',
    intervals: [0, 2, 3, 5, 7, 8, 10],
    degrees: ['1', '2', '♭3', '4', '5', '♭6', '♭7'],
  },
};

export function getScale(rootIndex: number, typeKey: string) {
  const type = SCALE_TYPES[typeKey];
  if (!type) throw new Error(`Unknown scale type: ${typeKey}`);
  const noteIndices = type.intervals.map((i) => (rootIndex + i) % 12);
  return { type, noteIndices };
}

export function getDegreeForNote(noteIndex: number, rootIndex: number, typeKey: string) {
  const type = SCALE_TYPES[typeKey];
  if (!type) return null;
  const diff = (noteIndex - rootIndex + 12) % 12;
  for (let i = 0; i < type.intervals.length; i++) {
    if (type.intervals[i] === diff) return type.degrees[i];
  }
  return null;
}
