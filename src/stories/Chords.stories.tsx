import type { Meta, StoryObj } from '@storybook/react';
import { Chords } from '../pages/Chords';

const meta: Meta<typeof Chords> = {
  title: 'Pages/Chords',
  component: Chords,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Chords>;

export const Default: Story = {};

export const WithDescription: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'La pagina Accordi permette di esplorare gli accordi sulla tastiera della chitarra. ' +
          'Seleziona una tonica e un tipo di accordo per visualizzare: ' +
          'la teoria (gradi e intervalli), un diagramma di diteggiatura (se disponibile), ' +
          "e tutte le posizioni delle note dell'accordo sulla tastiera.",
      },
    },
  },
};
