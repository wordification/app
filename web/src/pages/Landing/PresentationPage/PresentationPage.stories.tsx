import type { ComponentMeta } from '@storybook/react'

import PresentationPage from './PresentationPage'

export const generated = () => {
  return <PresentationPage />
}

export default {
  title: 'Pages/PresentationPage',
  component: PresentationPage,
} as ComponentMeta<typeof PresentationPage>
