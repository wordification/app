import MatchingGamePage from './MatchingGamePage'

import type { ComponentMeta } from '@storybook/react'

export const generated = () => {
  return <MatchingGamePage />
}

export default {
  title: 'Pages/MatchingGamePage',
  component: MatchingGamePage,
} as ComponentMeta<typeof MatchingGamePage>
