import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Chords } from '../../src/pages/Chords';

describe('Chords page', () => {
  describe('page structure', () => {
    it('should render page title', () => {
      render(<Chords />);
      expect(screen.getByRole('heading', { name: /accordi/i })).toBeInTheDocument();
    });

    it('should render page description', () => {
      render(<Chords />);
      expect(screen.getByText(/esplora gli accordi sulla tastiera/i)).toBeInTheDocument();
    });

    it('should render root note selector', () => {
      render(<Chords />);
      const selector = screen.getByLabelText(/tonica/i);
      expect(selector).toBeInTheDocument();
      expect(selector.tagName).toBe('SELECT');
    });

    it('should render chord type selector', () => {
      render(<Chords />);
      const selector = screen.getByLabelText(/tipo di accordo/i);
      expect(selector).toBeInTheDocument();
      expect(selector.tagName).toBe('SELECT');
    });

    it('should render theory section', () => {
      render(<Chords />);
      const theorySection = screen.getByRole('region', { name: /teoria/i });
      expect(theorySection).toBeInTheDocument();
    });

    it('should render fretboard section', () => {
      render(<Chords />);
      const fretboardSection = screen.getByRole('region', { name: /tastiera/i });
      expect(fretboardSection).toBeInTheDocument();
    });
  });

  describe('root note selector', () => {
    it('should have 12 note options', () => {
      render(<Chords />);
      const selector = screen.getByLabelText(/tonica/i);
      const options = within(selector as HTMLElement).getAllByRole('option');
      expect(options).toHaveLength(12);
    });

    it('should default to C (index 0)', () => {
      render(<Chords />);
      const selector = screen.getByLabelText(/tonica/i) as HTMLSelectElement;
      expect(selector.value).toBe('0');
    });

    it('should update chord name when root note changes', async () => {
      const user = userEvent.setup();
      render(<Chords />);

      const selector = screen.getByLabelText(/tonica/i);
      await user.selectOptions(selector, '2'); // D

      // Theory title should update
      expect(screen.getByText(/teoria: d$/i)).toBeInTheDocument();
    });
  });

  describe('chord type selector', () => {
    it('should have 9 chord type options', () => {
      render(<Chords />);
      const selector = screen.getByLabelText(/tipo di accordo/i);
      const options = within(selector as HTMLElement).getAllByRole('option');
      expect(options).toHaveLength(9);
    });

    it('should default to major', () => {
      render(<Chords />);
      const selector = screen.getByLabelText(/tipo di accordo/i) as HTMLSelectElement;
      expect(selector.value).toBe('major');
    });

    it('should update chord name when chord type changes', async () => {
      const user = userEvent.setup();
      render(<Chords />);

      const selector = screen.getByLabelText(/tipo di accordo/i);
      await user.selectOptions(selector, 'minor'); // Minor

      // Theory title should update to Cm
      expect(screen.getByText(/teoria: cm/i)).toBeInTheDocument();
    });
  });

  describe('theory section', () => {
    it('should display chord name', () => {
      render(<Chords />);
      expect(screen.getByText(/teoria: c$/i)).toBeInTheDocument();
    });

    it('should display chord type name', () => {
      render(<Chords />);
      const theorySection = screen.getByRole('region', { name: /teoria/i });
      expect(within(theorySection).getByText(/maggiore/i)).toBeInTheDocument();
    });

    it('should display degrees', () => {
      render(<Chords />);
      const theorySection = screen.getByRole('region', { name: /teoria/i });
      expect(theorySection).toHaveTextContent(/1.*3.*5/);
    });

    it('should display intervals', () => {
      render(<Chords />);
      const theorySection = screen.getByRole('region', { name: /teoria/i });
      // Intervals are shown as numbers (semitones)
      expect(theorySection).toHaveTextContent(/0.*4.*7/);
    });

    it('should display note names', () => {
      render(<Chords />);
      const theorySection = screen.getByRole('region', { name: /teoria/i });
      // C major = C, E, G
      expect(theorySection).toHaveTextContent(/c.*e.*g/i);
    });

    it('should update degrees when chord type changes', async () => {
      const user = userEvent.setup();
      render(<Chords />);

      const selector = screen.getByLabelText(/tipo di accordo/i);
      await user.selectOptions(selector, 'minor');

      const theorySection = screen.getByRole('region', { name: /teoria/i });
      // Minor chord has ♭3
      expect(theorySection).toHaveTextContent(/♭3/);
    });
  });

  describe('chord diagram section', () => {
    it('should render diagram for C major (has pre-defined voicing)', () => {
      render(<Chords />);
      expect(screen.getByRole('img', { name: /chord diagram for c$/i })).toBeInTheDocument();
    });

    it('should show position name', () => {
      render(<Chords />);
      expect(screen.getByText(/posizione c/i)).toBeInTheDocument();
    });

    it('should show difficulty level', () => {
      render(<Chords />);
      expect(screen.getByText(/difficoltà/i)).toBeInTheDocument();
      expect(screen.getByText(/easy/i)).toBeInTheDocument();
    });

    it('should show message when no voicing available', async () => {
      const user = userEvent.setup();
      render(<Chords />);

      // Switch to a chord without pre-defined voicing (e.g., C augmented)
      await user.selectOptions(screen.getByLabelText(/tonica/i), '1'); // C#
      await user.selectOptions(screen.getByLabelText(/tipo di accordo/i), 'augmented');

      expect(
        screen.getByText(/nessuna diteggiatura pre-definita disponibile/i)
      ).toBeInTheDocument();
    });
  });

  describe('fretboard integration', () => {
    it('should render fretboard component', () => {
      render(<Chords />);
      const fretboardSection = screen.getByRole('region', { name: /tastiera/i });
      // Fretboard should be present (check for common fretboard elements)
      expect(fretboardSection).toBeInTheDocument();
    });

    it('should display fretboard description', () => {
      render(<Chords />);
      expect(
        screen.getByText(/le note evidenziate mostrano tutte le posizioni/i)
      ).toBeInTheDocument();
    });
  });

  describe('user interactions', () => {
    it('should update everything when changing both selectors', async () => {
      const user = userEvent.setup();
      render(<Chords />);

      // Change to A minor
      await user.selectOptions(screen.getByLabelText(/tonica/i), '9'); // A
      await user.selectOptions(screen.getByLabelText(/tipo di accordo/i), 'minor');

      // Check theory title
      expect(screen.getByText(/teoria: am/i)).toBeInTheDocument();

      // Check theory section
      const theorySection = screen.getByRole('region', { name: /teoria/i });
      expect(theorySection).toHaveTextContent(/a.*c.*e/i);

      // Check diagram appears (A minor has pre-defined voicing)
      expect(screen.getByRole('img', { name: /chord diagram for am/i })).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have aria-labels on selectors', () => {
      render(<Chords />);
      const rootSelector = screen.getByLabelText(/tonica/i);
      expect(rootSelector.getAttribute('aria-label')).toMatch(/seleziona la nota fondamentale/i);

      const typeSelector = screen.getByLabelText(/tipo di accordo/i);
      expect(typeSelector.getAttribute('aria-label')).toMatch(/seleziona il tipo di accordo/i);
    });

    it('should have proper section labels', () => {
      render(<Chords />);
      expect(screen.getByRole('region', { name: /teoria/i })).toBeInTheDocument();
      expect(screen.getByRole('region', { name: /tastiera/i })).toBeInTheDocument();
    });
  });
});
