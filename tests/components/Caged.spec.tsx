import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Caged from '../../src/components/Caged';

describe('Caged component', () => {
  it('mounts and renders correctly', () => {
    render(<Caged initialRoot={9} initialType="minor" viewMode="boxes" />);
    const container = screen.getByTestId('caged-component');
    expect(container).toBeDefined();
  });

  it('renders with string root note', () => {
    render(<Caged initialRoot="A" initialType="minor" viewMode="notes" />);
    const container = screen.getByTestId('caged-component');
    expect(container).toBeDefined();
  });
});
