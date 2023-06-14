// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Importance> = (args) => {
//   return <Importance {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import Importance from './Importance'

import type { ComponentMeta } from '@storybook/react'

export const generated = () => {
  return <Importance />
}

export default {
  title: 'Components/Importance',
  component: Importance,
} as ComponentMeta<typeof Importance>
