import type { Meta, StoryObj } from '@storybook/react'

import MenuPage from './MenuPage'

const meta: Meta<typeof MenuPage> = {
  component: MenuPage,
}

export default meta

type Story = StoryObj<typeof MenuPage>

export const Primary: Story = {}
