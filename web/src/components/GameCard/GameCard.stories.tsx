// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof GameCard> = (args) => {
//   return <GameCard {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import GameCard from './GameCard'

import type { ComponentMeta, ComponentStory } from '@storybook/react'

export const generated: ComponentStory<typeof GameCard> = (args) => {
  return <GameCard {...args} />
}

export default {
  title: 'Components/GameCard',
  component: GameCard,
} as ComponentMeta<typeof GameCard>
