import type { ComponentMeta } from '@storybook/react'

import StudentsPage from './StudentsPage'

export const generated = () => {
  return <StudentsPage />
}

export default {
  title: 'Pages/StudentsPage',
  component: StudentsPage,
} as ComponentMeta<typeof StudentsPage>
