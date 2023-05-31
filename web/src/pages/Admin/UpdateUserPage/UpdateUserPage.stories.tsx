import AdminUpdateUserPage from './UpdateUserPage'

import type { ComponentMeta, ComponentStory } from '@storybook/react'

export const generated: ComponentStory<typeof AdminUpdateUserPage> = (args) => {
  return <AdminUpdateUserPage id={42} {...args} />
}

export default {
  title: 'Pages/UpdateUserPage',
  component: AdminUpdateUserPage,
} as ComponentMeta<typeof AdminUpdateUserPage>
