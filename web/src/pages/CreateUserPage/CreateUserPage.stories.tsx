import type { ComponentMeta } from '@storybook/react'

import CreateUserPage from './CreateUserPage'

export const generated = () => {
  return <CreateUserPage />
}

export default {
  title: 'Pages/CreateUserPage',
  component: CreateUserPage,
} as ComponentMeta<typeof CreateUserPage>
