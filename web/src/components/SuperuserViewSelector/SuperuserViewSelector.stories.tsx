// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof SuperuserViewSelector> = (args) => {
//   return <SuperuserViewSelector {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import SuperuserViewSelector from './SuperuserViewSelector'

export const generated = () => {
  return <SuperuserViewSelector />
}

export default {
  title: 'Components/SuperuserViewSelector',
  component: SuperuserViewSelector,
} as ComponentMeta<typeof SuperuserViewSelector>
