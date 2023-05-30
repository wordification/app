import AdminModifyUserPage from './ModifyUserPage'

import type { ComponentMeta } from '@storybook/react'

export const generated = () => {
  return <AdminModifyUserPage />
}

export default {
  title: 'Pages/ModifyUserPage',
  component: AdminModifyUserPage,
} as ComponentMeta<typeof AdminModifyUserPage>
