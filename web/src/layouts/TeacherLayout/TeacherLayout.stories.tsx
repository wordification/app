import type { ComponentMeta, ComponentStory } from '@storybook/react'

import TeacherLayout from './TeacherLayout'

export const generated: ComponentStory<typeof TeacherLayout> = (args) => {
  return <TeacherLayout {...args} />
}

export default {
  title: 'Layouts/TeacherLayout',
  component: TeacherLayout,
} as ComponentMeta<typeof TeacherLayout>
