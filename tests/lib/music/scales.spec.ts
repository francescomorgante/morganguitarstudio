import { describe, it, expect } from 'vitest';
import { getScale, getDegreeForNote } from '../../../src/lib/music/scales';

describe('scales', () => {
  it('getScale returns correct indices for A minor pentatonic', () => {
    const { noteIndices } = getScale(9, 'minor');
    expect(noteIndices).toEqual([9, 0, 2, 4, 7]);
  });
  it('getDegreeForNote returns ♭3 for C on A minor pentatonic', () => {
    const degree = getDegreeForNote(0, 9, 'minor');
    expect(degree).toBe('♭3');
  });
});
