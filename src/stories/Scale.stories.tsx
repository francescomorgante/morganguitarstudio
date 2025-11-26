import type { Meta, StoryObj } from '@storybook/react';
import { Scale } from '../pages/Scale';

const meta = {
  title: 'Pages/Scale',
  component: Scale,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Scale>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescription: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Pagina completa per esplorare le scale musicali. Include selettori per tonica e tipo di scala, sezione teoria e visualizzazione sulla tastiera tramite il componente Fretboard.',
      },
    },
  },
};
