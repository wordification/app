import type { ComponentMeta } from '@storybook/react'

import SuperuserDashboardPage from './SuperuserDashboardPage'

export const generated = () => {
  return <SuperuserDashboardPage />
}

export default {
  title: 'Pages/SuperuserDashboardPage',
  component: SuperuserDashboardPage,
} as ComponentMeta<typeof SuperuserDashboardPage>
