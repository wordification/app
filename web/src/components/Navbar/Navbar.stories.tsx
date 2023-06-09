// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Navbar> = (args) => {
//   return <Navbar {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import Navbar from './Navbar'

import type { ComponentMeta } from '@storybook/react'

export const generated = () => {
  return <Navbar items={[]} />
}

export default {
  title: 'Components/Navbar',
  component: Navbar,
} as ComponentMeta<typeof Navbar>
