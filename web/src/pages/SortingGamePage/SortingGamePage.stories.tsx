import type { ComponentMeta } from '@storybook/react'

import SortingGamePage from './SortingGamePage'

export const generated = () => {
  return <SortingGamePage />
}

export default {
  title: 'Pages/SortingGamePage',
  component: SortingGamePage,
} as ComponentMeta<typeof SortingGamePage>
