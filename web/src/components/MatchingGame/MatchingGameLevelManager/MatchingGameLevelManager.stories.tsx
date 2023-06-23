// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof MatchingGameLevelManager> = (args) => {
//   return <MatchingGameLevelManager {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import MatchingGameLevelManager from './MatchingGameLevelManager'

export const generated = () => {
  return <MatchingGameLevelManager />
}

export default {
  title: 'Components/MatchingGameLevelManager',
  component: MatchingGameLevelManager,
} as ComponentMeta<typeof MatchingGameLevelManager>
