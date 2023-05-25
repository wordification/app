import type { ComponentMeta } from '@storybook/react'

import DeleteUserPage from './DeleteUserPage'

export const generated = () => {
  return <DeleteUserPage />
}

export default {
  title: 'Pages/DeleteUserPage',
  component: DeleteUserPage,
} as ComponentMeta<typeof DeleteUserPage>
