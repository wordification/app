import type { Meta, StoryObj } from '@storybook/react'

import IncompleteGamesPage from './IncompleteGamesPage'

const meta: Meta<typeof IncompleteGamesPage> = {
  component: IncompleteGamesPage,
}

export default meta

type Story = StoryObj<typeof IncompleteGamesPage>

export const Primary: Story = {}
