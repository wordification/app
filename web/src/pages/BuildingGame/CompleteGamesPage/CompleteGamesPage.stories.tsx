import type { Meta, StoryObj } from '@storybook/react'

import CompleteGamesPage from './CompleteGamesPage'

const meta: Meta<typeof CompleteGamesPage> = {
  component: CompleteGamesPage,
}

export default meta

type Story = StoryObj<typeof CompleteGamesPage>

export const Primary: Story = {}
