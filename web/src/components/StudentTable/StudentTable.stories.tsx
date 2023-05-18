// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof StudentTable> = (args) => {
//   return <StudentTable {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import StudentTable from './StudentTable'

export const generated = () => {
  return <StudentTable />
}

export default {
  title: 'Components/StudentTable',
  component: StudentTable,
} as ComponentMeta<typeof StudentTable>
