// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Transition> = (args) => {
//   return <Transition {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import Transition from './Transition'

export const generated = () => {
  return <Transition />
}

export default {
  title: 'Components/Transition',
  component: Transition,
} as ComponentMeta<typeof Transition>
