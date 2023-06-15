import type { ComponentMeta } from '@storybook/react'

import SupportersPage from './SupportersPage'

export const generated = () => {
  return <SupportersPage />
}

export default {
  title: 'Pages/SupportersPage',
  component: SupportersPage,
} as ComponentMeta<typeof SupportersPage>
