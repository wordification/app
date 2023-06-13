import type { ComponentMeta, ComponentStory } from '@storybook/react'

import LandingPageLayout from './LandingPageLayout'

export const generated: ComponentStory<typeof LandingPageLayout> = (args) => {
  return <LandingPageLayout {...args} />
}

export default {
  title: 'Layouts/LandingPageLayout',
  component: LandingPageLayout,
} as ComponentMeta<typeof LandingPageLayout>
