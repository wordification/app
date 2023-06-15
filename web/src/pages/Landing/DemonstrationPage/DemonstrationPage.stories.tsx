import DemonstrationPage from './DemonstrationPage'

import type { ComponentMeta } from '@storybook/react'

export const generated = () => {
  return <DemonstrationPage />
}

export default {
  title: 'Pages/DemonstrationPage',
  component: DemonstrationPage,
} as ComponentMeta<typeof DemonstrationPage>
