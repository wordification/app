import type { ComponentMeta } from '@storybook/react'

import MenuPage from './MenuPage'

export const generated = () => {
  return <MenuPage />
}

export default {
  title: 'Pages/MenuPage',
  component: MenuPage,
} as ComponentMeta<typeof MenuPage>
