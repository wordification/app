import AdminCreateUserPage from './CreateUserPage'

import type { ComponentMeta } from '@storybook/react'

export const generated = () => {
  return <AdminCreateUserPage />
}

export default {
  title: 'Pages/CreateUserPage',
  component: AdminCreateUserPage,
} as ComponentMeta<typeof AdminCreateUserPage>
