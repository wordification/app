// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof StudentGamesList> = (args) => {
//   return <StudentGamesList {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import StudentGamesList from './StudentGamesList'

export const generated = () => {
  return <StudentGamesList />
}

export default {
  title: 'Components/StudentGamesList',
  component: StudentGamesList,
} as ComponentMeta<typeof StudentGamesList>
