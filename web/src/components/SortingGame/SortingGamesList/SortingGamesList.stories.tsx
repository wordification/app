// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof SortingGamesList> = (args) => {
//   return <SortingGamesList {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta, ComponentStory } from '@storybook/react'

import SortingGamesList from './SortingGamesList'

export const generated: ComponentStory<typeof SortingGamesList> = (args) => {
  return <SortingGamesList {...args} />
}

export default {
  title: 'Components/SortingGamesList',
  component: SortingGamesList,
} as ComponentMeta<typeof SortingGamesList>
