import type { Meta, StoryObj } from '@storybook/react';
import { Caged } from '../components/Caged';

const meta: Meta<typeof Caged> = {
  title: 'Components/Caged',
  component: Caged,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    initialRoot: {
      control: { type: 'select' },
      options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      description: 'Root note as numeric index (0=C, 9=A)',
    },
    initialType: {
      control: { type: 'select' },
      options: ['minor', 'major', 'majorFull', 'minorNatural'],
      description: 'Scale type',
    },
    viewMode: {
      control: { type: 'radio' },
      options: ['boxes', 'notes'],
      description: 'Display mode',
    },
    fretCount: {
      control: { type: 'number', min: 5, max: 24 },
      description: 'Number of frets to display',
    },
    notation: {
      control: { type: 'radio' },
      options: ['tab', 'note'],
      description: 'Notation style',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Caged>;

/** Default: A minor pentatonic with boxes view */
export const Default: Story = {
  args: {
    initialRoot: 9, // A
    initialType: 'minor',
    viewMode: 'boxes',
    fretCount: 15,
    notation: 'note',
  },
};

/** Notes view showing all scale notes */
export const NotesView: Story = {
  args: {
    initialRoot: 9, // A
    initialType: 'minor',
    viewMode: 'notes',
    fretCount: 15,
    notation: 'note',
  },
};

/** C major pentatonic with boxes */
export const CMajorBoxes: Story = {
  args: {
    initialRoot: 0, // C
    initialType: 'major',
    viewMode: 'boxes',
    fretCount: 15,
    notation: 'note',
  },
};

/** Tab notation style */
export const TabNotation: Story = {
  args: {
    initialRoot: 9, // A
    initialType: 'minor',
    viewMode: 'boxes',
    fretCount: 15,
    notation: 'tab',
  },
};

/** Using string for root note */
export const StringRoot: Story = {
  args: {
    initialRoot: 'E',
    initialType: 'minor',
    viewMode: 'boxes',
    fretCount: 15,
    notation: 'note',
  },
};
