import type { ComponentMeta, ComponentStory } from '@storybook/react'

import UpdateUserPage from './UpdateUserPage'

export const generated: ComponentStory<typeof UpdateUserPage> = (args) => {
  return <UpdateUserPage id={'42'} {...args} />
}

export default {
  title: 'Pages/UpdateUserPage',
  component: UpdateUserPage,
} as ComponentMeta<typeof UpdateUserPage>
