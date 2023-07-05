import ClassGameSetupMenuPage from './ClassGameSetupMenuPage'

import type { ComponentMeta, ComponentStory } from '@storybook/react'

export const generated: ComponentStory<typeof ClassGameSetupMenuPage> = (
  args
) => {
  return <ClassGameSetupMenuPage {...args} />
}

export default {
  title: 'Pages/ClassGameSetupMenuPage',
  component: ClassGameSetupMenuPage,
} as ComponentMeta<typeof ClassGameSetupMenuPage>
