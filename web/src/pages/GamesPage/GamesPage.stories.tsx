import GamesPage from './GamesPage'

import type { ComponentMeta } from '@storybook/react'

export const generated = () => {
  return <GamesPage />
}

export default {
  title: 'Pages/GamesPage',
  component: GamesPage,
} as ComponentMeta<typeof GamesPage>
