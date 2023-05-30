// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof UpdateUserForm> = (args) => {
//   return <UpdateUserForm {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import UpdateUserForm from './UpdateUserForm'

export const generated = () => {
  return <UpdateUserForm />
}

export default {
  title: 'Components/UpdateUserForm',
  component: UpdateUserForm,
} as ComponentMeta<typeof UpdateUserForm>
