import ProfilePage from './ProfilePage'

import type { ComponentMeta } from '@storybook/react'

export const generated = () => {
  return <ProfilePage />
}

export default {
  title: 'Pages/ProfilePage',
  component: ProfilePage,
} as ComponentMeta<typeof ProfilePage>
