export const EN_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
export const IT_NOTES = [
  'Do',
  'Do#',
  'Re',
  'Re#',
  'Mi',
  'Fa',
  'Fa#',
  'Sol',
  'Sol#',
  'La',
  'La#',
  'Si',
];

const NAME_TO_INDEX: Record<string, number> = (() => {
  const map: Record<string, number> = {};
  const en = EN_NOTES;
  const it = IT_NOTES;
  for (let i = 0; i < 12; i++) {
    map[en[i].toUpperCase()] = i;
    map[it[i].toUpperCase()] = i;
  }
  const enharmonics: Record<string, string> = {
    DB: 'C#',
    EB: 'D#',
    GB: 'F#',
    AB: 'G#',
    BB: 'A#',
    'DO#': 'C#',
    'RE#': 'D#',
    'FA#': 'F#',
    'SOL#': 'G#',
    'LA#': 'A#',
  };
  Object.entries(enharmonics).forEach(([flat, sharp]) => {
    map[flat.toUpperCase()] = map[sharp.toUpperCase()];
  });
  return map;
})();

export function noteNameToIndex(name: string): number | null {
  if (!name) return null;
  const key = name.trim().toUpperCase();
  if (key in NAME_TO_INDEX) return NAME_TO_INDEX[key];
  const first = key[0];
  if (first in NAME_TO_INDEX) return NAME_TO_INDEX[first];
  return null;
}
