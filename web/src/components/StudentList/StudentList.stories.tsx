// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof StudentList> = (args) => {
//   return <StudentList {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import StudentList from './StudentList'

export const generated = () => {
  return <StudentList />
}

export default {
  title: 'Components/StudentList',
  component: StudentList,
} as ComponentMeta<typeof StudentList>
