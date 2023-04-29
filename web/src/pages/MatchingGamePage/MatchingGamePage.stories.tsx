import type { ComponentMeta } from '@storybook/react'

import MatchingGamePage from './MatchingGamePage'

export const generated = () => {
  return <MatchingGamePage />
}

export default {
  title: 'Pages/MatchingGamePage',
  component: MatchingGamePage,
} as ComponentMeta<typeof MatchingGamePage>
