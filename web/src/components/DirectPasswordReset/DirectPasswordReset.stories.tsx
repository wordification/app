// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof DirectPasswordReset> = (args) => {
//   return <DirectPasswordReset {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import DirectPasswordReset from './DirectPasswordReset'

export const generated = () => {
  return <DirectPasswordReset />
}

export default {
  title: 'Components/DirectPasswordReset',
  component: DirectPasswordReset,
} as ComponentMeta<typeof DirectPasswordReset>
