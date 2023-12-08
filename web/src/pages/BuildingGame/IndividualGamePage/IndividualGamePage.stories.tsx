import type { Meta, StoryObj } from '@storybook/react'

import IndividualGamePage from './IndividualGamePage'

const meta: Meta<typeof IndividualGamePage> = {
  component: IndividualGamePage,
}

export default meta

type Story = StoryObj<typeof IndividualGamePage>

export const Primary: Story = {}
