import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ChordDiagram } from '../../src/components/ChordDiagram';
import { OPEN_CHORD_VOICINGS } from '../../src/lib/music/chords';

describe('ChordDiagram component', () => {
  const cMajor = OPEN_CHORD_VOICINGS['C'][0];

  describe('rendering', () => {
    it('should render chord name', () => {
      render(
        <ChordDiagram chordName="C" positions={cMajor.positions} startFret={cMajor.startFret} />
      );
      expect(screen.getByText('C')).toBeInTheDocument();
    });

    it('should render SVG diagram', () => {
      const { container } = render(
        <ChordDiagram chordName="C" positions={cMajor.positions} startFret={cMajor.startFret} />
      );
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should render finger positions as circles', () => {
      const { container } = render(
        <ChordDiagram chordName="C" positions={cMajor.positions} startFret={cMajor.startFret} />
      );
      const circles = container.querySelectorAll('circle');
      // Open string indicators + finger dots
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should show finger numbers when showFingers is true', () => {
      const { container } = render(
        <ChordDiagram
          chordName="C"
          positions={cMajor.positions}
          startFret={cMajor.startFret}
          showFingers={true}
        />
      );
      const fingerNumbers = container.querySelectorAll('text');
      // Should have at least one finger number
      expect(fingerNumbers.length).toBeGreaterThan(0);
    });

    it('should not show finger numbers when showFingers is false', () => {
      const { container } = render(
        <ChordDiagram
          chordName="C"
          positions={cMajor.positions}
          startFret={cMajor.startFret}
          showFingers={false}
        />
      );
      const fingerNumbers = container.querySelectorAll('text');
      expect(fingerNumbers.length).toBe(0);
    });

    it('should display fret number for non-open chords', () => {
      const barreChord = {
        string: 1,
        fret: 5,
        finger: 1,
        note: 'A',
        degree: '1',
      };
      render(
        <ChordDiagram chordName="Am" positions={[barreChord]} startFret={5} fretsToShow={4} />
      );
      expect(screen.getByText('5fr')).toBeInTheDocument();
    });

    it('should not display fret number for open chords', () => {
      render(<ChordDiagram chordName="C" positions={cMajor.positions} startFret={0} />);
      expect(screen.queryByText(/fr$/)).not.toBeInTheDocument();
    });
  });

  describe('size variants', () => {
    it('should apply small size class', () => {
      const { container } = render(
        <ChordDiagram chordName="C" positions={cMajor.positions} startFret={0} size="small" />
      );
      const diagram = container.querySelector('[class*="diagram-small"]');
      expect(diagram).toBeInTheDocument();
    });

    it('should apply medium size class by default', () => {
      const { container } = render(
        <ChordDiagram chordName="C" positions={cMajor.positions} startFret={0} />
      );
      const diagram = container.querySelector('[class*="diagram-medium"]');
      expect(diagram).toBeInTheDocument();
    });

    it('should apply large size class', () => {
      const { container } = render(
        <ChordDiagram chordName="C" positions={cMajor.positions} startFret={0} size="large" />
      );
      const diagram = container.querySelector('[class*="diagram-large"]');
      expect(diagram).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have accessible role and label', () => {
      render(
        <ChordDiagram chordName="C" positions={cMajor.positions} startFret={cMajor.startFret} />
      );
      const diagram = screen.getByRole('img');
      expect(diagram).toHaveAttribute('aria-label', 'Chord diagram for C');
    });

    it('should include chord name in aria-label', () => {
      render(
        <ChordDiagram
          chordName="Am"
          positions={OPEN_CHORD_VOICINGS['Am'][0].positions}
          startFret={0}
        />
      );
      const diagram = screen.getByRole('img');
      expect(diagram).toHaveAttribute('aria-label', 'Chord diagram for Am');
    });
  });

  describe('string labels', () => {
    it('should render string labels', () => {
      render(
        <ChordDiagram chordName="C" positions={cMajor.positions} startFret={cMajor.startFret} />
      );
      // String labels go from 6 to 1 (high to low)
      // Use getAllByText for '1' since it also appears as finger number
      expect(screen.getByText('6')).toBeInTheDocument();
      const onesFound = screen.getAllByText('1');
      expect(onesFound.length).toBeGreaterThan(0);
    });
  });

  describe('open and muted strings', () => {
    it('should indicate muted strings', () => {
      // D major chord mutes strings 6 and 5
      const dMajor = OPEN_CHORD_VOICINGS['D'][0];
      const { container } = render(
        <ChordDiagram chordName="D" positions={dMajor.positions} startFret={dMajor.startFret} />
      );
      // Muted strings are rendered as X (two lines crossing)
      const mutedLines = container.querySelectorAll('line[class*="mutedString"]');
      expect(mutedLines.length).toBeGreaterThan(0);
    });

    it('should indicate open strings', () => {
      const { container } = render(
        <ChordDiagram chordName="C" positions={cMajor.positions} startFret={cMajor.startFret} />
      );
      // Open strings are rendered as open circles above nut
      const openCircles = container.querySelectorAll('circle[class*="openString"]');
      expect(openCircles.length).toBeGreaterThan(0);
    });
  });
});
