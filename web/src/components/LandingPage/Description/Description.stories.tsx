// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Description> = (args) => {
//   return <Description {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import Description from './Description'

export const generated = () => {
  return <Description />
}

export default {
  title: 'Components/Description',
  component: Description,
} as ComponentMeta<typeof Description>
