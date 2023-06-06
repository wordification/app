import type { ComponentMeta, ComponentStory } from '@storybook/react'

import AdministratorLayout from './AdministratorLayout'

export const generated: ComponentStory<typeof AdministratorLayout> = (args) => {
  return <AdministratorLayout {...args} />
}

export default {
  title: 'Layouts/AdministratorLayout',
  component: AdministratorLayout,
} as ComponentMeta<typeof AdministratorLayout>
