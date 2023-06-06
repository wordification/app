import type { ComponentMeta, ComponentStory } from '@storybook/react'

import SuperuserLayout from './SuperuserLayout'

export const generated: ComponentStory<typeof SuperuserLayout> = (args) => {
  return <SuperuserLayout {...args} />
}

export default {
  title: 'Layouts/SuperuserLayout',
  component: SuperuserLayout,
} as ComponentMeta<typeof SuperuserLayout>
