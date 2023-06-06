import type { ComponentMeta } from '@storybook/react'

import AdminDashboardPage from './AdminDashboardPage'

export const generated = () => {
  return <AdminDashboardPage />
}

export default {
  title: 'Pages/AdminDashboardPage',
  component: AdminDashboardPage,
} as ComponentMeta<typeof AdminDashboardPage>
