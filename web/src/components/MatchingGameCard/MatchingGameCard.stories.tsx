// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof MatchingGameCard> = (args) => {
//   return <MatchingGameCard {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

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
  title: 'Components/MatchingGameCard',
  component: MatchingGameCard,
  render: (args) => (
    <ul>
      <MatchingGameCard {...args} />
    </ul>
  ),
  argTypes: { onClick: { action: 'clicked' } },
} as ComponentMeta<typeof MatchingGameCard>
