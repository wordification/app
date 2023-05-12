import type { ComponentMeta, StoryObj } from '@storybook/react'

import ProgressBar from './ProgressBar'

export default {
  title: 'Components/ProgressBar',
  component: ProgressBar,
} as ComponentMeta<typeof ProgressBar>

type Story = StoryObj<typeof ProgressBar>

export const HalfwayComplete: Story = {
  args: {
    value: 3,
    max: 6,
  },
}

export const Complete: Story = {
  args: {
    value: 6,
    max: 6,
  },
}

export const NotStarted: Story = {
  args: {
    value: 0,
    max: 6,
  },
}

export const Indeterminate: Story = {
  args: {
    value: undefined,
    max: undefined,
  },
}
