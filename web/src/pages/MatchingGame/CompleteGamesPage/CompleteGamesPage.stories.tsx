import type { ComponentMeta } from '@storybook/react'

import CompleteGamesPage from './CompleteGamesPage'

export const generated = () => {
  return <CompleteGamesPage />
}

export default {
  title: 'Pages/CompleteGamesPage',
  component: CompleteGamesPage,
} as ComponentMeta<typeof CompleteGamesPage>
