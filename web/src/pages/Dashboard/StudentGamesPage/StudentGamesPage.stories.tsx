import type { ComponentMeta, ComponentStory } from '@storybook/react'

import StudentGamesPage from './StudentGamesPage'

export const generated: ComponentStory<typeof StudentGamesPage> = (args) => {
  return <StudentGamesPage id={42} {...args} />
}

export default {
  title: 'Pages/StudentGamesPage',
  component: StudentGamesPage,
} as ComponentMeta<typeof StudentGamesPage>
