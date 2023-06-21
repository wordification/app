import SetupGamePage from './SetupGamePage'

import type { ComponentMeta } from '@storybook/react'

export const generated = () => {
  return <SetupGamePage />
}

export default {
  title: 'Pages/SetupGamePage',
  component: SetupGamePage,
} as ComponentMeta<typeof SetupGamePage>
