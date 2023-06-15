// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof LandingAccordian> = (args) => {
//   return <LandingAccordian {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import LandingAccordian from './LandingAccordian'

import type { ComponentMeta } from '@storybook/react'

export const generated = () => {
  return <LandingAccordian />
}

export default {
  title: 'Components/LandingAccordian',
  component: LandingAccordian,
} as ComponentMeta<typeof LandingAccordian>
