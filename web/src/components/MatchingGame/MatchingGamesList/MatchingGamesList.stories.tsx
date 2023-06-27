// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof MatchingGamesList> = (args) => {
//   return <MatchingGamesList {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import MatchingGamesList from './MatchingGamesList'

export const generated = () => {
  return <MatchingGamesList />
}

export default {
  title: 'Components/MatchingGamesList',
  component: MatchingGamesList,
} as ComponentMeta<typeof MatchingGamesList>
