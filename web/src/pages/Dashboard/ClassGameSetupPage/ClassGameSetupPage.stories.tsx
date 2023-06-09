import type { ComponentMeta } from '@storybook/react'

import ClassGameSetupPage from './ClassGameSetupPage'

export const generated = () => {
  return <ClassGameSetupPage />
}

export default {
  title: 'Pages/ClassGameSetupPage',
  component: ClassGameSetupPage,
} as ComponentMeta<typeof ClassGameSetupPage>
