import MatchingGameGrid from './MatchingGameGrid'

import type { ComponentMeta } from '@storybook/react'

export const generated = () => {
  return <MatchingGameGrid />
}

export default {
  title: 'Components/MatchingGame/MatchingGameGrid',
  component: MatchingGameGrid,
} as ComponentMeta<typeof MatchingGameGrid>
