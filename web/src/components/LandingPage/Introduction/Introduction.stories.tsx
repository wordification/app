// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Introduction> = (args) => {
//   return <Introduction {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import Introduction from './Introduction'

export const generated = () => {
  return <Introduction />
}

export default {
  title: 'Components/Introduction',
  component: Introduction,
} as ComponentMeta<typeof Introduction>
