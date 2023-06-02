import ProgressionPage from './ProgressionPage'

import type { ComponentStory, ComponentMeta } from '@storybook/react'

export const generated: ComponentStory<typeof ProgressionPage> = (args) => {
  return <ProgressionPage {...args} />
}

export default {
  title: 'Pages/ProgressionPage',
  component: ProgressionPage,
} as ComponentMeta<typeof ProgressionPage>
