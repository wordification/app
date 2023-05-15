// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof SortingGamesList> = (args) => {
//   return <SortingGamesList {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import { Role } from '@prisma/client'
import type { ComponentMeta, ComponentStory } from '@storybook/react'

import SortingGamesList from './SortingGamesList'

export const studentView: ComponentStory<typeof SortingGamesList> = (args) => {
  return <SortingGamesList {...args} />
}
export const teacherView: ComponentStory<typeof SortingGamesList> = (args) => {
  mockCurrentUser({
    roles: Role.TEACHER,
    id: 1,
    email: 'teacher@teacher.com',
    firstName: 'teacher',
    lastName: 'teacher',
  })

  return <SortingGamesList {...args} />
}

export default {
  title: 'Components/SortingGamesList',
  component: SortingGamesList,
  args: {
    sortingGames: [
      {
        id: 1,
        user: {
          email: 'jane@example.com',
        },
        updatedAt: '2023-05-13T04:40:56.586Z',
        wordsPerPhoneme: 3,
        phonemes: [49, 53],
        level: 1,
      },
    ],
  },
} as ComponentMeta<typeof SortingGamesList>
