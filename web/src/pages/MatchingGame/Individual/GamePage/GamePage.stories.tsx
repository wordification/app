import type { ComponentMeta, ComponentStory } from '@storybook/react'

import GamePage from './GamePage'

export const generated: ComponentStory<typeof GamePage> = (args) => {
  return <GamePage id={42} {...args} />
}

export default {
  title: 'Pages/GamePage',
  component: GamePage,
} as ComponentMeta<typeof GamePage>
