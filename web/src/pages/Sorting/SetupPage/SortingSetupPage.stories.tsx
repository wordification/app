import type { ComponentMeta } from '@storybook/react'

import SortingSetupPage from './SortingSetupPage'

export const generated = () => {
  return <SortingSetupPage />
}

export default {
  title: 'Pages/SortingSetupPage',
  component: SortingSetupPage,
} as ComponentMeta<typeof SortingSetupPage>
