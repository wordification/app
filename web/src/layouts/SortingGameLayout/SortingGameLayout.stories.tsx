import type { ComponentMeta, ComponentStory } from '@storybook/react'

import SortingGameLayout from './SortingGameLayout'

export const generated: ComponentStory<typeof SortingGameLayout> = (args) => {
  return <SortingGameLayout {...args} />
}

export default {
  title: 'Layouts/SortingGameLayout',
  component: SortingGameLayout,
} as ComponentMeta<typeof SortingGameLayout>
