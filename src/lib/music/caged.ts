// NOTE: tuning array is [6thString,5th,4th,3rd,2nd,1st] using numeric note indices (0..11).
// Default tuning corresponds to E A D G B E -> numeric indexes: [4,9,2,7,11,4]
export const BOX_PATTERNS_MINOR: Record<string, Record<number, number[]>> = {
  '1': { 6: [5, 8], 5: [5, 7], 4: [5, 7], 3: [5, 7], 2: [5, 8], 1: [5, 8] },
  '2': { 6: [8, 10], 5: [7, 10], 4: [7, 10], 3: [7, 9], 2: [8, 10], 1: [8, 10] },
  '3': { 6: [10, 12], 5: [10, 12], 4: [10, 12], 3: [9, 12], 2: [10, 13], 1: [10, 12] },
  '4': { 6: [12, 15], 5: [12, 15], 4: [12, 14], 3: [12, 14], 2: [13, 15], 1: [12, 15] },
  '5': { 6: [15, 17], 5: [15, 17], 4: [14, 17], 3: [14, 17], 2: [15, 17], 1: [15, 17] },
};

const BASE_MINOR_ROOT_INDEX = 9; // A

export function getRootFretOnSixthString(
  rootIndex: number,
  tuning: number[] = [4, 9, 2, 7, 11, 4]
) {
  const stringIndex = 0; // first element is 6th string (low E)
  for (let fret = 0; fret <= 24; fret++) {
    const noteIndex = (tuning[stringIndex] + fret) % 12;
    if (noteIndex === rootIndex) return fret;
  }
  return 0;
}

export function getTransposedBoxFrets(
  spatialRootIndex: number,
  boxNumber: number,
  tuning: number[] = [4, 9, 2, 7, 11, 4]
) {
  const boxKey = String(boxNumber);
  const baseBox = BOX_PATTERNS_MINOR[boxKey];
  if (!baseBox) return null;

  const baseRootFret6 = getRootFretOnSixthString(BASE_MINOR_ROOT_INDEX, tuning);
  const targetRootFret6 = getRootFretOnSixthString(spatialRootIndex, tuning);
  const delta = targetRootFret6 - baseRootFret6;

  const perString: Record<number, number[]> = {};
  let minFret: number | null = null;
  let maxFret: number | null = null;

  for (const stringNumStr of Object.keys(baseBox)) {
    const stringNum = Number(stringNumStr);
    const frets = baseBox[stringNum];
    const newFrets: number[] = [];
    for (let i = 0; i < frets.length; i++) {
      const nf = frets[i] + delta;
      newFrets.push(nf);
      if (minFret === null || nf < minFret) minFret = nf;
      if (maxFret === null || nf > maxFret) maxFret = nf;
    }
    perString[stringNum] = newFrets;
  }

  return { perString, minFret, maxFret };
}
