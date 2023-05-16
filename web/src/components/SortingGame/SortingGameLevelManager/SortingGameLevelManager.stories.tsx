// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof SortingGameLevelManager> = (args) => {
//   return <SortingGameLevelManager {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import SortingGameLevelManager from './SortingGameLevelManager'

import type { ComponentMeta, ComponentStory } from '@storybook/react'

export const generated: ComponentStory<typeof SortingGameLevelManager> = (
  args
) => {
  return <SortingGameLevelManager {...args} />
}

export default {
  title: 'Components/SortingGameLevelManager',
  component: SortingGameLevelManager,
} as ComponentMeta<typeof SortingGameLevelManager>
