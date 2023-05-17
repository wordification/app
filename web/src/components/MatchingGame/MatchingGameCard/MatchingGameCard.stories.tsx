import MatchingGameCard from './MatchingGameCard'

import type { ComponentMeta, StoryObj } from '@storybook/react'

type Story = StoryObj<typeof MatchingGameCard>

export const initial: Story = {
  args: {
    flipped: false,
    word: 'Test',
  },
}

export const flipped: Story = {
  args: {
    flipped: true,
    word: 'Test',
  },
}

export default {
  title: 'Components/MatchingGame/MatchingGameCard',
  component: MatchingGameCard,
  render: (args) => (
    <ul>
      <MatchingGameCard {...args} />
    </ul>
  ),
  argTypes: { onClick: { action: 'clicked' } },
} as ComponentMeta<typeof MatchingGameCard>
