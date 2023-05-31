// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof ProgressionCard> = (args) => {
//   return <ProgressionCard {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import ProgressionCard from './ProgressionCard'

import type { ComponentMeta, ComponentStory } from '@storybook/react'

export const generated: ComponentStory<typeof ProgressionCard> = (args) => {
  return <ProgressionCard {...args} />
}

export default {
  title: 'Components/ProgressionCard',
  component: ProgressionCard,
  args: {
    phoneme: 'Long I',
    graphemes: [
      { label: 'i', active: false },
      { label: 'igh', active: true },
      { label: 'y', active: false },
    ],
  },
} as ComponentMeta<typeof ProgressionCard>
