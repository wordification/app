import type { ComponentMeta, ComponentStory } from '@storybook/react'

import StudentProfilePage from './StudentProfilePage'

export const generated: ComponentStory<typeof StudentProfilePage> = (args) => {
  return <StudentProfilePage id={42} {...args} />
}

export default {
  title: 'Pages/StudentProfilePage',
  component: StudentProfilePage,
} as ComponentMeta<typeof StudentProfilePage>
