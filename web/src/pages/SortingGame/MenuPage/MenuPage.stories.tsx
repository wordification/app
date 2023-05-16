import MenuPage from './MenuPage'

import type { ComponentMeta } from '@storybook/react'

export const generated = () => {
  return <MenuPage />
}

export default {
  title: 'Pages/Sorting/MenuPage',
  component: MenuPage,
} as ComponentMeta<typeof MenuPage>
