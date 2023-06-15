import ContributorsPage from './ContributorsPage'

import type { ComponentMeta } from '@storybook/react'

export const generated = () => {
  return <ContributorsPage />
}

export default {
  title: 'Pages/ContributorsPage',
  component: ContributorsPage,
} as ComponentMeta<typeof ContributorsPage>
