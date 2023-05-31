// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof UserList> = (args) => {
//   return <UserList {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import UserList from './UserList'

export const generated = () => {
  return <UserList />
}

export default {
  title: 'Components/UserList',
  component: UserList,
} as ComponentMeta<typeof UserList>
