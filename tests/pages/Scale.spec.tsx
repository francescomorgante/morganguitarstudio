import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Scale } from '../../src/pages/Scale';

describe('Scale Page', () => {
  it('renders page title and description', () => {
    render(<Scale />);
    expect(screen.getByText('Scale Musicali')).toBeInTheDocument();
    expect(screen.getByText('Esplora le scale sulla tastiera della chitarra')).toBeInTheDocument();
  });

  it('renders root note selector with all 12 notes', () => {
    render(<Scale />);
    const rootSelect = screen.getByLabelText('Tonica:');
    expect(rootSelect).toBeInTheDocument();

    const options = screen.getAllByRole('option');
    const noteOptions = options.filter((opt) =>
      ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'].includes(
        opt.textContent || ''
      )
    );
    expect(noteOptions.length).toBeGreaterThanOrEqual(12);
  });

  it('renders scale type selector', () => {
    render(<Scale />);
    const scaleSelect = screen.getByLabelText('Tipo di scala:');
    expect(scaleSelect).toBeInTheDocument();
  });

  it('displays theory section with scale information', () => {
    render(<Scale />);
    expect(screen.getByText('Teoria della scala')).toBeInTheDocument();
    expect(screen.getByText(/Nome:/)).toBeInTheDocument();
    expect(screen.getByText(/Formula:/)).toBeInTheDocument();
    expect(screen.getByText(/Intervalli:/)).toBeInTheDocument();
  });

  it('displays Fretboard component', () => {
    render(<Scale />);
    expect(screen.getByText('Visualizzazione sulla tastiera')).toBeInTheDocument();
    // Fretboard should be rendered
    const fretboard = document.querySelector('[class*="fretboard"]');
    expect(fretboard).toBeTruthy();
  });

  it('updates scale when root note changes', async () => {
    const user = userEvent.setup();
    render(<Scale />);

    const rootSelect = screen.getByLabelText('Tonica:');
    await user.selectOptions(rootSelect, 'D');

    expect(rootSelect).toHaveValue('D');
  });

  it('updates scale when scale type changes', async () => {
    const user = userEvent.setup();
    render(<Scale />);

    const scaleSelect = screen.getByLabelText('Tipo di scala:');
    await user.selectOptions(scaleSelect, 'minor');

    expect(scaleSelect).toHaveValue('minor');
    // Check in the theory section specifically
    const theorySection = screen.getByText('Teoria della scala').closest('section');
    expect(theorySection).toHaveTextContent('Pentatonica minore');
  });

  it('displays correct scale formula for major scale', () => {
    render(<Scale />);
    // Default is majorFull
    expect(screen.getByText(/1 - 2 - 3 - 4 - 5 - 6 - 7/)).toBeInTheDocument();
  });

  it('displays correct intervals for major scale', () => {
    render(<Scale />);
    expect(screen.getByText(/0, 2, 4, 5, 7, 9, 11/)).toBeInTheDocument();
  });

  it('changes theory information when scale type changes', async () => {
    const user = userEvent.setup();
    render(<Scale />);

    const scaleSelect = screen.getByLabelText('Tipo di scala:');
    await user.selectOptions(scaleSelect, 'minorNatural');

    const theorySection = screen.getByText('Teoria della scala').closest('section');
    expect(theorySection).toHaveTextContent('Scala minore naturale');
    expect(screen.getByText(/1 - 2 - ♭3 - 4 - 5 - ♭6 - ♭7/)).toBeInTheDocument();
  });
});
