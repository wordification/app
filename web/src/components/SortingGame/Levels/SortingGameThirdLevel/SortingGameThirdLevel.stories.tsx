// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof SortingGameThirdLevel> = (args) => {
//   return <SortingGameThirdLevel {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta, ComponentStory } from '@storybook/react'

import SortingGameThirdLevel from './SortingGameThirdLevel'

export const generated: ComponentStory<typeof SortingGameThirdLevel> = (
  args
) => {
  return <SortingGameThirdLevel {...args} />
}

export default {
  title: 'Components/SortingGameThirdLevel',
  component: SortingGameThirdLevel,
} as ComponentMeta<typeof SortingGameThirdLevel>
