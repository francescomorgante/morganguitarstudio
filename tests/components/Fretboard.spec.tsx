import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Fretboard } from '../../src/components/Fretboard';

describe('Fretboard', () => {
  describe('Basic rendering', () => {
    it('renders with default props', () => {
      render(<Fretboard viewMode="scale" rootNote="A" />);
      
      expect(screen.getByRole('region')).toBeInTheDocument();
      expect(screen.getByRole('grid')).toBeInTheDocument();
    });

    it('renders correct number of strings', () => {
      render(<Fretboard viewMode="scale" rootNote="C" strings={6} />);
      
      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(6);
    });

    it('renders correct number of frets', () => {
      render(<Fretboard viewMode="scale" rootNote="D" strings={6} frets={12} />);
      
      const cells = screen.getAllByRole('gridcell');
      // 6 strings * 13 positions (0-12 frets) = 78 cells
      expect(cells).toHaveLength(78);
    });

    it('displays root note in controls', () => {
      render(<Fretboard viewMode="scale" rootNote="E" />);
      
      expect(screen.getByText(/Root: E/i)).toBeInTheDocument();
    });

    it('displays view mode in controls', () => {
      render(<Fretboard viewMode="pentatonic" rootNote="G" />);
      
      expect(screen.getByText(/View: pentatonic/i)).toBeInTheDocument();
    });
  });

  describe('Props - strings and frets', () => {
    it('renders 4-string bass configuration', () => {
      render(<Fretboard viewMode="scale" rootNote="E" strings={4} frets={20} />);
      
      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(4);
    });

    it('renders 7-string guitar configuration', () => {
      render(<Fretboard viewMode="scale" rootNote="B" strings={7} frets={24} />);
      
      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(7);
    });
  });

  describe('Props - rootNote', () => {
    it('accepts numeric root note', () => {
      render(<Fretboard viewMode="scale" rootNote={5} />);
      
      expect(screen.getByText(/Root: F/i)).toBeInTheDocument();
    });

    it('accepts string root note', () => {
      render(<Fretboard viewMode="scale" rootNote="C#" />);
      
      expect(screen.getByText(/Root: C#/i)).toBeInTheDocument();
    });

    it('handles invalid root note gracefully', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      render(<Fretboard viewMode="scale" rootNote="Invalid" />);
      
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Invalid note name')
      );
      
      consoleSpy.mockRestore();
    });
  });

  describe('Props - showLabels', () => {
    it('shows labels when showLabels is true', () => {
      render(<Fretboard viewMode="scale" rootNote="C" showLabels={true} />);
      
      // Should have note labels visible
      const cells = screen.getAllByRole('gridcell');
      const hasLabels = cells.some((cell) => cell.textContent !== '');
      expect(hasLabels).toBe(true);
    });

    it('hides labels when showLabels is false', () => {
      render(<Fretboard viewMode="notes" rootNote="D" showLabels={false} />);
      
      // Note: In 'notes' mode with no highlightedNotes, no notes are active anyway
      const cells = screen.getAllByRole('gridcell');
      const allEmpty = cells.every((cell) => cell.textContent === '');
      expect(allEmpty).toBe(true);
    });
  });

  describe('Props - showFretNumbers', () => {
    it('shows fret numbers by default', () => {
      render(<Fretboard viewMode="scale" rootNote="E" showFretNumbers={true} />);
      
      expect(screen.getByLabelText(/Fret numbers/i)).toBeInTheDocument();
    });

    it('hides fret numbers when disabled', () => {
      render(<Fretboard viewMode="scale" rootNote="E" showFretNumbers={false} />);
      
      expect(screen.queryByLabelText(/Fret numbers/i)).not.toBeInTheDocument();
    });
  });

  describe('Props - theme', () => {
    it('applies light theme', () => {
      const { container } = render(<Fretboard viewMode="scale" rootNote="A" theme="light" />);
      
      expect(container.querySelector('.light')).toBeInTheDocument();
    });

    it('applies dark theme', () => {
      const { container } = render(<Fretboard viewMode="scale" rootNote="A" theme="dark" />);
      
      expect(container.querySelector('.dark')).toBeInTheDocument();
    });
  });

  describe('Props - orientation', () => {
    it('applies horizontal orientation by default', () => {
      const { container } = render(<Fretboard viewMode="scale" rootNote="G" />);
      
      expect(container.querySelector('.horizontal')).toBeInTheDocument();
    });

    it('applies vertical orientation', () => {
      const { container } = render(<Fretboard viewMode="scale" rootNote="G" orientation="vertical" />);
      
      expect(container.querySelector('.vertical')).toBeInTheDocument();
    });
  });

  describe('Props - highlightedNotes', () => {
    it('highlights specified notes in notes mode', () => {
      const { container } = render(
        <Fretboard 
          viewMode="notes" 
          highlightedNotes={[0, 4, 7]} 
          showLabels={true}
        />
      );
      
      // Should have active notes for C, E, G
      const activeCells = container.querySelectorAll('.active');
      expect(activeCells.length).toBeGreaterThan(0);
    });
  });

  describe('Props - annotations', () => {
    it('renders custom annotations', () => {
      render(
        <Fretboard 
          viewMode="scale" 
          rootNote="D"
          annotations={[
            { string: 4, fret: 0, label: 'R', color: '#e74c3c' },
            { string: 4, fret: 2, label: '2' },
          ]}
        />
      );
      
      expect(screen.getByText('R')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
    });
  });

  describe('Props - selectedPosition', () => {
    it('marks selected position with selected class', () => {
      const { container } = render(
        <Fretboard 
          viewMode="scale" 
          rootNote="A"
          selectedPosition={{ string: 5, fret: 5 }}
        />
      );
      
      const selectedCells = container.querySelectorAll('.selected');
      expect(selectedCells.length).toBe(1);
    });
  });

  describe('Props - disabledPositions', () => {
    it('marks disabled positions with disabled class', () => {
      const { container } = render(
        <Fretboard 
          viewMode="scale" 
          rootNote="C"
          disabledPositions={[
            { string: 6, fret: 0 },
            { string: 5, fret: 0 },
          ]}
        />
      );
      
      const disabledCells = container.querySelectorAll('.disabled');
      expect(disabledCells.length).toBe(2);
    });
  });

  describe('Interactivity', () => {
    it('calls onNoteClick when a note is clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      render(
        <Fretboard 
          viewMode="scale" 
          rootNote="E"
          onNoteClick={handleClick}
          interactive={true}
        />
      );
      
      const cells = screen.getAllByRole('gridcell');
      await user.click(cells[0]);
      
      expect(handleClick).toHaveBeenCalledWith(
        expect.any(Number),
        expect.any(Number),
        expect.any(Number)
      );
    });

    it('does not call onNoteClick when interactive is false', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      render(
        <Fretboard 
          viewMode="scale" 
          rootNote="E"
          onNoteClick={handleClick}
          interactive={false}
        />
      );
      
      const cells = screen.getAllByRole('gridcell');
      await user.click(cells[0]);
      
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not call onNoteClick for disabled positions', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      const { container } = render(
        <Fretboard 
          viewMode="scale" 
          rootNote="C"
          onNoteClick={handleClick}
          disabledPositions={[{ string: 6, fret: 0 }]}
        />
      );
      
      const disabledCell = container.querySelector('.disabled');
      if (disabledCell) {
        await user.click(disabledCell);
      }
      
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels', () => {
      render(<Fretboard viewMode="scale" rootNote="A" strings={6} frets={12} />);
      
      expect(screen.getByRole('region')).toHaveAttribute('aria-label');
      expect(screen.getByRole('grid')).toHaveAttribute('aria-label');
    });

    it('each cell has descriptive aria-label', () => {
      render(<Fretboard viewMode="scale" rootNote="C" strings={6} frets={3} />);
      
      const cells = screen.getAllByRole('gridcell');
      cells.forEach((cell) => {
        expect(cell).toHaveAttribute('aria-label');
        expect(cell.getAttribute('aria-label')).toMatch(/String \d+, fret \d+/);
      });
    });

    it('interactive cells have tabIndex 0', () => {
      render(<Fretboard viewMode="scale" rootNote="E" interactive={true} />);
      
      const cells = screen.getAllByRole('gridcell');
      const interactiveCells = cells.filter((cell) => !cell.classList.contains('disabled'));
      
      interactiveCells.forEach((cell) => {
        expect(cell).toHaveAttribute('tabIndex', '0');
      });
    });

    it('non-interactive cells have tabIndex -1', () => {
      render(<Fretboard viewMode="scale" rootNote="E" interactive={false} />);
      
      const cells = screen.getAllByRole('gridcell');
      
      cells.forEach((cell) => {
        expect(cell).toHaveAttribute('tabIndex', '-1');
      });
    });
  });

  describe('View modes', () => {
    it('renders in scale mode', () => {
      render(<Fretboard viewMode="scale" rootNote="D" />);
      
      expect(screen.getByText(/View: scale/i)).toBeInTheDocument();
    });

    it('renders in pentatonic mode', () => {
      render(<Fretboard viewMode="pentatonic" rootNote="A" />);
      
      expect(screen.getByText(/View: pentatonic/i)).toBeInTheDocument();
    });

    it('renders in chord mode', () => {
      render(<Fretboard viewMode="chord" rootNote="C" />);
      
      expect(screen.getByText(/View: chord/i)).toBeInTheDocument();
    });

    it('renders in notes mode', () => {
      render(<Fretboard viewMode="notes" />);
      
      expect(screen.getByText(/View: notes/i)).toBeInTheDocument();
    });
  });

  describe('Custom tuning', () => {
    it('accepts custom tuning array', () => {
      const dropD = [2, 9, 2, 7, 11, 4]; // Drop D tuning
      
      render(
        <Fretboard 
          viewMode="scale" 
          rootNote="D"
          tuning={dropD}
        />
      );
      
      expect(screen.getByRole('region')).toBeInTheDocument();
    });
  });

  describe('Pattern ID', () => {
    it('displays pattern ID when provided', () => {
      render(<Fretboard viewMode="pentatonic" rootNote="E" patternId={1} />);
      
      expect(screen.getByText(/Pattern: 1/i)).toBeInTheDocument();
    });

    it('does not display pattern ID when not provided', () => {
      render(<Fretboard viewMode="scale" rootNote="E" />);
      
      expect(screen.queryByText(/Pattern:/i)).not.toBeInTheDocument();
    });
  });
});
