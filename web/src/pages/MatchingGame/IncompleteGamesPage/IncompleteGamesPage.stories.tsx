import type { ComponentMeta } from '@storybook/react'

import IncompleteGamesPage from './IncompleteGamesPage'

export const generated = () => {
  return <IncompleteGamesPage />
}

export default {
  title: 'Pages/IncompleteGamesPage',
  component: IncompleteGamesPage,
} as ComponentMeta<typeof IncompleteGamesPage>
