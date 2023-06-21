// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Solution> = (args) => {
//   return <Solution {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import Solution from './Solution'

export const generated = () => {
  return <Solution />
}

export default {
  title: 'Components/Solution',
  component: Solution,
} as ComponentMeta<typeof Solution>
