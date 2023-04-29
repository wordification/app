import type { ComponentMeta, ComponentStory } from '@storybook/react'

import GlobalLayout from './GlobalLayout'

export const generated: ComponentStory<typeof GlobalLayout> = (args) => {
  return <GlobalLayout {...args} />
}

export default {
  title: 'Layouts/GlobalLayout',
  component: GlobalLayout,
} as ComponentMeta<typeof GlobalLayout>
