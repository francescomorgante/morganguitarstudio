import type { Meta, StoryObj } from '@storybook/react';
import { Fretboard } from '../components/Fretboard';

const meta: Meta<typeof Fretboard> = {
  title: 'Components/Fretboard',
  component: Fretboard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    viewMode: {
      control: 'select',
      options: ['scale', 'pentatonic', 'chord', 'notes'],
      description: 'View mode for the fretboard',
    },
    rootNote: {
      control: 'text',
      description: 'Root note (numeric 0-11 or name like "C", "A#")',
    },
    strings: {
      control: { type: 'number', min: 4, max: 8 },
      description: 'Number of strings',
    },
    frets: {
      control: { type: 'number', min: 12, max: 24 },
      description: 'Number of frets to display',
    },
    showLabels: {
      control: 'boolean',
      description: 'Show note labels',
    },
    showFretNumbers: {
      control: 'boolean',
      description: 'Show fret numbers',
    },
    showInlays: {
      control: 'boolean',
      description: 'Show fretboard inlays (dot markers)',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark', 'custom'],
      description: 'Color theme',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Fretboard orientation',
    },
    interactive: {
      control: 'boolean',
      description: 'Enable click interactions',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Fretboard>;

// Basic scale view
export const ScaleView: Story = {
  args: {
    viewMode: 'scale',
    rootNote: 'A',
    strings: 6,
    frets: 15,
    showLabels: true,
    showFretNumbers: true,
    showInlays: true,
    theme: 'light',
    orientation: 'horizontal',
    interactive: true,
  },
};

// Pentatonic view
export const PentatonicView: Story = {
  args: {
    viewMode: 'pentatonic',
    rootNote: 'E',
    patternId: 1,
    strings: 6,
    frets: 15,
    showLabels: true,
    showFretNumbers: true,
    showInlays: true,
    theme: 'light',
  },
};

// Chord view
export const ChordView: Story = {
  args: {
    viewMode: 'chord',
    rootNote: 'C',
    strings: 6,
    frets: 5,
    showLabels: true,
    showFretNumbers: true,
    theme: 'light',
  },
};

// Free notes view with highlighted notes
export const NotesView: Story = {
  args: {
    viewMode: 'notes',
    strings: 6,
    frets: 15,
    highlightedNotes: [0, 4, 7], // C, E, G (C major triad)
    showLabels: true,
    showFretNumbers: true,
    theme: 'light',
  },
};

// With annotations
export const WithAnnotations: Story = {
  args: {
    viewMode: 'scale',
    rootNote: 'D',
    strings: 6,
    frets: 15,
    showLabels: false,
    annotations: [
      { string: 4, fret: 0, label: 'R', color: '#e74c3c' },
      { string: 4, fret: 2, label: '2' },
      { string: 4, fret: 4, label: '3' },
      { string: 3, fret: 0, label: '4' },
      { string: 3, fret: 2, label: '5' },
    ],
    theme: 'light',
  },
};

// Dark theme
export const DarkTheme: Story = {
  args: {
    viewMode: 'scale',
    rootNote: 'G',
    strings: 6,
    frets: 15,
    showLabels: true,
    theme: 'dark',
  },
};

// Vertical orientation
export const VerticalOrientation: Story = {
  args: {
    viewMode: 'scale',
    rootNote: 'F',
    strings: 6,
    frets: 12,
    showLabels: true,
    orientation: 'vertical',
    theme: 'light',
  },
};

// Custom tuning (Drop D)
export const DropDTuning: Story = {
  args: {
    viewMode: 'scale',
    rootNote: 'D',
    tuning: [2, 9, 2, 7, 11, 4], // Drop D: D A D G B E
    strings: 6,
    frets: 15,
    showLabels: true,
    theme: 'light',
  },
};

// 7-string guitar
export const SevenString: Story = {
  args: {
    viewMode: 'scale',
    rootNote: 'B',
    tuning: [11, 4, 9, 2, 7, 11, 4], // B E A D G B E
    strings: 7,
    frets: 15,
    showLabels: true,
    theme: 'light',
  },
};

// Selected and focused positions
export const WithSelection: Story = {
  args: {
    viewMode: 'scale',
    rootNote: 'A',
    strings: 6,
    frets: 15,
    showLabels: true,
    selectedPosition: { string: 5, fret: 5 },
    focusedNote: { string: 4, fret: 7 },
    theme: 'light',
  },
};

// Disabled positions
export const WithDisabledPositions: Story = {
  args: {
    viewMode: 'scale',
    rootNote: 'C',
    strings: 6,
    frets: 15,
    showLabels: true,
    disabledPositions: [
      { string: 6, fret: 0 },
      { string: 5, fret: 0 },
      { string: 1, fret: 0 },
    ],
    theme: 'light',
  },
};

// Non-interactive (display only)
export const NonInteractive: Story = {
  args: {
    viewMode: 'scale',
    rootNote: 'E',
    strings: 6,
    frets: 15,
    showLabels: true,
    interactive: false,
    theme: 'light',
  },
};

// Compact view (fewer frets)
export const CompactView: Story = {
  args: {
    viewMode: 'chord',
    rootNote: 'G',
    strings: 6,
    frets: 5,
    showLabels: true,
    showFretNumbers: true,
    showInlays: false,
    theme: 'light',
  },
};

// Interactive example with click handler
export const Interactive: Story = {
  args: {
    viewMode: 'notes',
    strings: 6,
    frets: 15,
    showLabels: true,
    interactive: true,
    onNoteClick: (string, fret, noteIndex) => {
      console.log(`Clicked: String ${string}, Fret ${fret}, Note index ${noteIndex}`);
      alert(`String: ${string}, Fret: ${fret}, Note: ${noteIndex}`);
    },
    theme: 'light',
  },
};

// Enhancement: CAGED Pattern Integration
export const CAGEDPatternExample: Story = {
  args: {
    viewMode: 'pentatonic',
    rootNote: 'A',
    patternId: 1,
    strings: 6,
    frets: 15,
    showLabels: true,
    showFretNumbers: true,
    theme: 'light',
  },
};

// Enhancement: Custom Scale Type
export const CustomScaleType: Story = {
  args: {
    viewMode: 'scale',
    rootNote: 'C',
    scaleType: 'major',
    strings: 6,
    frets: 15,
    showLabels: true,
    showFretNumbers: true,
    theme: 'light',
  },
};

// Enhancement: With Fingering Numbers
export const WithFingeringNumbers: Story = {
  args: {
    viewMode: 'pentatonic',
    rootNote: 'E',
    patternId: 1,
    fingeringNumbers: true,
    strings: 6,
    frets: 15,
    showLabels: true,
    theme: 'dark',
  },
};

// Enhancement: Custom Theme Colors
export const CustomThemeColors: Story = {
  args: {
    viewMode: 'scale',
    rootNote: 'D',
    scaleType: 'minor',
    strings: 6,
    frets: 15,
    showLabels: true,
    theme: {
      root: '#ff6b35',
      active: '#004e89',
      background: '#f7f7f7',
      stringColor: '#1a1a1a',
      fretColor: '#cccccc',
      highlighted: '#ffcc00',
    },
  },
};
