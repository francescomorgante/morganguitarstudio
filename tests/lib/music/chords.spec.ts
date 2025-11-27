import { describe, it, expect } from 'vitest';
import {
  CHORD_TYPES,
  getChord,
  getChordDegreeForNote,
  OPEN_CHORD_VOICINGS,
  mapChordToPositions,
} from '../../../src/lib/music/chords';

describe('chords library', () => {
  describe('CHORD_TYPES', () => {
    it('should contain all basic chord types', () => {
      expect(CHORD_TYPES).toHaveProperty('major');
      expect(CHORD_TYPES).toHaveProperty('minor');
      expect(CHORD_TYPES).toHaveProperty('dominant7');
      expect(CHORD_TYPES).toHaveProperty('major7');
      expect(CHORD_TYPES).toHaveProperty('minor7');
      expect(CHORD_TYPES).toHaveProperty('diminished');
      expect(CHORD_TYPES).toHaveProperty('augmented');
      expect(CHORD_TYPES).toHaveProperty('sus2');
      expect(CHORD_TYPES).toHaveProperty('sus4');
    });

    it('should have correct intervals for major chord', () => {
      expect(CHORD_TYPES.major.intervals).toEqual([0, 4, 7]);
      expect(CHORD_TYPES.major.degrees).toEqual(['1', '3', '5']);
      expect(CHORD_TYPES.major.name).toBe('Maggiore');
    });

    it('should have correct intervals for minor chord', () => {
      expect(CHORD_TYPES.minor.intervals).toEqual([0, 3, 7]);
      expect(CHORD_TYPES.minor.degrees).toEqual(['1', '♭3', '5']);
      expect(CHORD_TYPES.minor.name).toBe('Minore');
    });

    it('should have correct intervals for dominant7 chord', () => {
      expect(CHORD_TYPES.dominant7.intervals).toEqual([0, 4, 7, 10]);
      expect(CHORD_TYPES.dominant7.degrees).toEqual(['1', '3', '5', '♭7']);
      expect(CHORD_TYPES.dominant7.name).toBe('Settima di dominante');
    });
  });

  describe('getChord', () => {
    it('should return correct notes for C major (1, 3, 5)', () => {
      const cMajor = getChord(0, 'major'); // C = 0
      const expectedNotes = [0, 4, 7]; // C, E, G
      expect(cMajor.noteIndices).toEqual(expectedNotes);
    });

    it('should return correct notes for A minor (2, 4, 6)', () => {
      const aMinor = getChord(9, 'minor'); // A = 9
      const expectedNotes = [9, 0, 4]; // A, C, E
      expect(aMinor.noteIndices).toEqual(expectedNotes);
    });

    it('should return correct notes for G major (3, 5, 7)', () => {
      const gMajor = getChord(7, 'major'); // G = 7
      const expectedNotes = [7, 11, 2]; // G, B, D
      expect(gMajor.noteIndices).toEqual(expectedNotes);
    });

    it('should return correct notes for D major (4, 6, 1)', () => {
      const dMajor = getChord(2, 'major'); // D = 2
      const expectedNotes = [2, 6, 9]; // D, F#, A
      expect(dMajor.noteIndices).toEqual(expectedNotes);
    });

    it('should return correct notes for E major (5, 7, 2)', () => {
      const eMajor = getChord(4, 'major'); // E = 4
      const expectedNotes = [4, 8, 11]; // E, G#, B
      expect(eMajor.noteIndices).toEqual(expectedNotes);
    });

    it('should return correct notes for F dominant7 (6, 1, 3, 5♭)', () => {
      const fDom7 = getChord(5, 'dominant7'); // F = 5
      const expectedNotes = [5, 9, 0, 3]; // F, A, C, E♭
      expect(fDom7.noteIndices).toEqual(expectedNotes);
    });

    it('should return correct notes for B diminished (7, 2♭, 4)', () => {
      const bDim = getChord(11, 'diminished'); // B = 11
      const expectedNotes = [11, 2, 5]; // B, D, F
      expect(bDim.noteIndices).toEqual(expectedNotes);
    });

    it('should handle wrap-around for notes beyond octave', () => {
      const cAug = getChord(0, 'augmented'); // C augmented
      const expectedNotes = [0, 4, 8]; // C, E, G#
      expect(cAug.noteIndices).toEqual(expectedNotes);
    });

    it('should return 4 notes for seventh chords', () => {
      const cMaj7 = getChord(0, 'major7');
      expect(cMaj7.noteIndices).toHaveLength(4);
      expect(cMaj7.noteIndices).toEqual([0, 4, 7, 11]); // C, E, G, B
    });

    it('should return 3 notes for triads', () => {
      const cMajor = getChord(0, 'major');
      expect(cMajor.noteIndices).toHaveLength(3);
    });
  });

  describe('getChordDegreeForNote', () => {
    it('should return correct degree for root note', () => {
      const degree = getChordDegreeForNote(0, 0, 'major'); // C in C major
      expect(degree).toBe('1');
    });

    it('should return correct degree for third in major chord', () => {
      const degree = getChordDegreeForNote(4, 0, 'major'); // E in C major
      expect(degree).toBe('3');
    });

    it('should return correct degree for flat third in minor chord', () => {
      const degree = getChordDegreeForNote(0, 9, 'minor'); // C in A minor
      expect(degree).toBe('♭3');
    });

    it('should return null for note not in chord', () => {
      const degree = getChordDegreeForNote(1, 0, 'major'); // C# not in C major
      expect(degree).toBeNull();
    });
  });

  describe('OPEN_CHORD_VOICINGS', () => {
    it('should contain voicings for 6 common open chords', () => {
      const chordNames = Object.keys(OPEN_CHORD_VOICINGS);
      expect(chordNames).toContain('C');
      expect(chordNames).toContain('Am');
      expect(chordNames).toContain('G');
      expect(chordNames).toContain('D');
      expect(chordNames).toContain('E');
      expect(chordNames).toContain('Em');
      expect(chordNames).toHaveLength(6);
    });

    it('C major voicing should have correct positions', () => {
      const cMajorVoicings = OPEN_CHORD_VOICINGS['C'];
      expect(cMajorVoicings).toHaveLength(1);
      const cMajor = cMajorVoicings[0];
      expect(cMajor.startFret).toBe(0);
      expect(cMajor.positions).toHaveLength(5);
      expect(cMajor.difficulty).toBe('easy');
      // String 5 (A), fret 3, finger 3 = C
      expect(cMajor.positions[0]).toMatchObject({ string: 5, fret: 3, finger: 3 });
    });

    it('G major voicing should use all 6 strings', () => {
      const gMajorVoicings = OPEN_CHORD_VOICINGS['G'];
      const gMajor = gMajorVoicings[0];
      expect(gMajor.positions).toHaveLength(6);
      const strings = gMajor.positions.map((p) => p.string);
      expect(strings).toEqual([6, 5, 4, 3, 2, 1]);
    });

    it('D major voicing should use only 4 strings', () => {
      const dMajorVoicings = OPEN_CHORD_VOICINGS['D'];
      const dMajor = dMajorVoicings[0];
      expect(dMajor.positions).toHaveLength(4);
      const strings = dMajor.positions.map((p) => p.string);
      expect(strings).toEqual([4, 3, 2, 1]);
    });
  });

  describe('mapChordToPositions', () => {
    it('should return an array of positions', () => {
      const positions = mapChordToPositions('C', 'major'); // C major
      expect(Array.isArray(positions)).toBe(true);
    });

    it('should return pre-defined voicing for C major', () => {
      const positions = mapChordToPositions('C', 'major');
      expect(positions.length).toBeGreaterThan(0);
      expect(positions[0]).toMatchObject({ string: 5, fret: 3, note: 'C' });
    });

    it('should be callable for all chord types', () => {
      const chordTypes = Object.keys(CHORD_TYPES) as Array<keyof typeof CHORD_TYPES>;
      chordTypes.forEach((type) => {
        expect(() => mapChordToPositions('C', type)).not.toThrow();
      });
    });
  });
});
