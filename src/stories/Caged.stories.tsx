import type { Meta, StoryObj } from '@storybook/react';
import Caged from '../components/Caged';

const meta = {
  title: 'Components/Caged',
  component: Caged,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    initialRoot: {
      control: 'text',
      description: 'Root note (0-11 or note name like "A", "C#")',
    },
    initialType: {
      control: 'select',
      options: ['minor', 'major', 'majorFull', 'minorNatural'],
      description: 'Scale type',
    },
    viewMode: {
      control: 'radio',
      options: ['boxes', 'notes'],
      description: 'Display mode',
    },
    fretCount: {
      control: { type: 'number', min: 5, max: 24 },
      description: 'Number of frets to display',
    },
    notation: {
      control: 'radio',
      options: ['tab', 'note'],
      description: 'Notation style',
    },
  },
} satisfies Meta<typeof Caged>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Boxes view mode - shows CAGED box patterns
 */
export const Boxes: Story = {
  args: {
    initialRoot: 'A',
    initialType: 'minor',
    viewMode: 'boxes',
    fretCount: 12,
    notation: 'tab',
  },
};

/**
 * Notes view mode - shows individual notes on fretboard
 */
export const Notes: Story = {
  args: {
    initialRoot: 'A',
    initialType: 'minor',
    viewMode: 'notes',
    fretCount: 12,
    notation: 'note',
  },
};
