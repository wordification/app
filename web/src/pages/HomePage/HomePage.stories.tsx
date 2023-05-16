import HomePage from './HomePage'

import type { ComponentMeta } from '@storybook/react'

export const generated = () => {
  return <HomePage />
}

export default {
  title: 'Pages/HomePage',
  component: HomePage,
} as ComponentMeta<typeof HomePage>
