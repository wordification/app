import GlobalLayout from './GlobalLayout'

import type { ComponentMeta, ComponentStory } from '@storybook/react'

export const generated: ComponentStory<typeof GlobalLayout> = (args) => {
  return <GlobalLayout {...args} />
}

export default {
  title: 'Layouts/GlobalLayout',
  component: GlobalLayout,
} as ComponentMeta<typeof GlobalLayout>
