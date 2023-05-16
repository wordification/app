import AboutPage from './AboutPage'

import type { ComponentMeta } from '@storybook/react'

export const generated = () => {
  return <AboutPage />
}

export default {
  title: 'Pages/AboutPage',
  component: AboutPage,
} as ComponentMeta<typeof AboutPage>
