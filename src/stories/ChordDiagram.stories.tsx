import type { Meta, StoryObj } from '@storybook/react';
import { ChordDiagram } from '../components/ChordDiagram';
import { OPEN_CHORD_VOICINGS } from '../lib/music/chords';

const meta: Meta<typeof ChordDiagram> = {
  title: 'Components/ChordDiagram',
  component: ChordDiagram,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ChordDiagram>;

// C major open chord
const cMajor = OPEN_CHORD_VOICINGS['C'][0];

// A minor open chord
const aMinor = OPEN_CHORD_VOICINGS['Am'][0];

// G major open chord
const gMajor = OPEN_CHORD_VOICINGS['G'][0];

// D major open chord
const dMajor = OPEN_CHORD_VOICINGS['D'][0];

// E major open chord
const eMajor = OPEN_CHORD_VOICINGS['E'][0];

// E minor open chord
const eMinor = OPEN_CHORD_VOICINGS['Em'][0];

export const CMajor: Story = {
  args: {
    chordName: 'C',
    positions: cMajor.positions,
    startFret: cMajor.startFret,
    showFingers: true,
    size: 'medium',
  },
};

export const AMinor: Story = {
  args: {
    chordName: 'Am',
    positions: aMinor.positions,
    startFret: aMinor.startFret,
    showFingers: true,
    size: 'medium',
  },
};

export const GMajor: Story = {
  args: {
    chordName: 'G',
    positions: gMajor.positions,
    startFret: gMajor.startFret,
    showFingers: true,
    size: 'medium',
  },
};

export const DMajor: Story = {
  args: {
    chordName: 'D',
    positions: dMajor.positions,
    startFret: dMajor.startFret,
    showFingers: true,
    size: 'medium',
  },
};

export const EMajor: Story = {
  args: {
    chordName: 'E',
    positions: eMajor.positions,
    startFret: eMajor.startFret,
    showFingers: true,
    size: 'medium',
  },
};

export const EMinor: Story = {
  args: {
    chordName: 'Em',
    positions: eMinor.positions,
    startFret: eMinor.startFret,
    showFingers: true,
    size: 'medium',
  },
};

export const SmallSize: Story = {
  args: {
    chordName: 'C',
    positions: cMajor.positions,
    startFret: cMajor.startFret,
    showFingers: true,
    size: 'small',
  },
};

export const LargeSize: Story = {
  args: {
    chordName: 'G',
    positions: gMajor.positions,
    startFret: gMajor.startFret,
    showFingers: true,
    size: 'large',
  },
};

export const WithoutFingerNumbers: Story = {
  args: {
    chordName: 'Am',
    positions: aMinor.positions,
    startFret: aMinor.startFret,
    showFingers: false,
    size: 'medium',
  },
};
