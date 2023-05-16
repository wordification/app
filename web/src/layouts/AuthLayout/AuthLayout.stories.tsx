import AuthLayout from './AuthLayout'

import type { ComponentMeta, ComponentStory } from '@storybook/react'

export const isolated: ComponentStory<typeof AuthLayout> = (args) => {
  return <AuthLayout {...args} />
}
export const withChildren: ComponentStory<typeof AuthLayout> = (args) => {
  return (
    <AuthLayout {...args}>
      <div className="card-body">Children</div>
    </AuthLayout>
  )
}

export default {
  title: 'Layouts/AuthLayout',
  component: AuthLayout,
} as ComponentMeta<typeof AuthLayout>
