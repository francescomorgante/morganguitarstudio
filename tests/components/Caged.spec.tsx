import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Caged } from '../../src/components/Caged';

describe('Caged component', () => {
  it('renders without crashing', () => {
    render(<Caged initialRoot={9} initialType="minor" viewMode="boxes" />);
    expect(screen.getByRole('region')).toBeDefined();
  });

  it('displays root note label', () => {
    render(<Caged initialRoot={9} initialType="minor" viewMode="boxes" />);
    expect(screen.getByText(/Root: A/)).toBeDefined();
  });

  it('renders fretboard grid', () => {
    render(<Caged initialRoot={9} initialType="minor" viewMode="boxes" />);
    expect(screen.getByRole('grid')).toBeDefined();
  });

  it('accepts string root note', () => {
    render(<Caged initialRoot="C" initialType="major" viewMode="notes" />);
    expect(screen.getByText(/Root: C/)).toBeDefined();
  });

  it('renders with custom fret count', () => {
    render(<Caged initialRoot={9} initialType="minor" viewMode="boxes" fretCount={20} />);
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(6); // 6 strings
  });
});
