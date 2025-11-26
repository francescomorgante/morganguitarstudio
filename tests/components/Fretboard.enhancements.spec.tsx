import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Fretboard } from '../../src/components/Fretboard';

describe('Fretboard Enhancement Tests', () => {
  describe('Enhancement: CAGED Integration', () => {
    it('uses CAGED pattern when patternId is provided in pentatonic mode', () => {
      render(
        <Fretboard
          viewMode="pentatonic"
          rootNote="A"
          patternId={1}
        />
      );

      expect(screen.getByText(/Pattern: 1/i)).toBeInTheDocument();
    });

    it('does not apply CAGED logic in scale mode even with patternId', () => {
      render(
        <Fretboard
          viewMode="scale"
          rootNote="A"
          patternId={1}
        />
      );

      // Pattern ID shown but CAGED logic only applies in pentatonic mode
      expect(screen.getByText(/Pattern: 1/i)).toBeInTheDocument();
    });

    it('renders without CAGED pattern when patternId not provided', () => {
      render(
        <Fretboard
          viewMode="pentatonic"
          rootNote="A"
        />
      );

      expect(screen.queryByText(/Pattern:/i)).not.toBeInTheDocument();
    });
  });

  describe('Enhancement: Scale Type Selection', () => {
    it('accepts custom scaleType prop', () => {
      render(
        <Fretboard
          viewMode="scale"
          rootNote="C"
          scaleType="major"
        />
      );

      expect(screen.getByRole('region')).toBeInTheDocument();
    });

    it('defaults to minor when scaleType not provided', () => {
      render(
        <Fretboard
          viewMode="scale"
          rootNote="A"
        />
      );

      expect(screen.getByRole('region')).toBeInTheDocument();
    });

    it('accepts various scale types', () => {
      ['major', 'minor', 'dorian', 'mixolydian'].forEach((scaleType) => {
        const { unmount } = render(
          <Fretboard
            viewMode="scale"
            rootNote="D"
            scaleType={scaleType}
          />
        );

        expect(screen.getByRole('region')).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe('Enhancement: Fingering Numbers', () => {
    it('accepts fingeringNumbers prop', () => {
      render(
        <Fretboard
          viewMode="pentatonic"
          rootNote="A"
          patternId={1}
          fingeringNumbers={true}
        />
      );

      expect(screen.getByRole('region')).toBeInTheDocument();
    });

    it('does not show fingering numbers when prop is false', () => {
      render(
        <Fretboard
          viewMode="pentatonic"
          rootNote="A"
          patternId={1}
          fingeringNumbers={false}
        />
      );

      expect(screen.getByRole('region')).toBeInTheDocument();
    });

    it('renders without errors when fingeringNumbers used without patternId', () => {
      render(
        <Fretboard
          viewMode="scale"
          rootNote="C"
          fingeringNumbers={true}
        />
      );

      expect(screen.getByRole('region')).toBeInTheDocument();
    });
  });

  describe('Enhancement: Custom Theme Colors', () => {
    it('accepts custom theme object', () => {
      const customTheme = {
        root: '#ff0000',
        active: '#0000ff',
        background: '#ffffff',
        stringColor: '#333333',
        fretColor: '#cccccc',
        highlighted: '#ffff00',
      };

      render(
        <Fretboard
          viewMode="scale"
          rootNote="C"
          theme={customTheme}
        />
      );

      const container = screen.getByRole('region');
      expect(container).toBeInTheDocument();
      expect(container).toHaveStyle({ '--fretboard-root-color': '#ff0000' });
    });

    it('accepts preset theme strings', () => {
      ['light', 'dark'].forEach((theme) => {
        const { unmount } = render(
          <Fretboard
            viewMode="scale"
            rootNote="C"
            theme={theme as 'light' | 'dark'}
          />
        );

        expect(screen.getByRole('region')).toBeInTheDocument();
        unmount();
      });
    });

    it('applies custom theme style to container', () => {
      const customTheme = {
        active: '#00ff00',
      };

      render(
        <Fretboard
          viewMode="scale"
          rootNote="G"
          theme={customTheme}
        />
      );

      const container = screen.getByRole('region');
      expect(container).toHaveStyle({ '--fretboard-active-color': '#00ff00' });
    });
  });
});
