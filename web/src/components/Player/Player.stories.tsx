// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Player> = (args) => {
//   return <Player {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import Player from './Player'

import type { ComponentMeta } from '@storybook/react'

export const generated = () => {
  return <Player files={[]} />
}

export default {
  title: 'Components/Player',
  component: Player,
} as ComponentMeta<typeof Player>
