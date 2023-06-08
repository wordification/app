// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof ClassGameSetupForm> = (args) => {
//   return <ClassGameSetupForm {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import ClassGameSetupForm from './ClassGameSetupForm'

export const generated = () => {
  return <ClassGameSetupForm />
}

export default {
  title: 'Components/ClassGameSetupForm',
  component: ClassGameSetupForm,
} as ComponentMeta<typeof ClassGameSetupForm>
