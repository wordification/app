// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Issues> = (args) => {
//   return <Issues {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import Issues from './Issues'

export const generated = () => {
  return <Issues />
}

export default {
  title: 'Components/Issues',
  component: Issues,
} as ComponentMeta<typeof Issues>
