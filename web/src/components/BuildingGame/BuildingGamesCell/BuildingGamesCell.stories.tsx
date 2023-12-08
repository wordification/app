// Pass props to your component by passing an `args` object to your story
//
// ```tsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta, StoryObj } from '@storybook/react'

import BuildingGamesCell from './BuildingGamesCell'

const meta: Meta<typeof BuildingGamesCell> = {
  component: BuildingGamesCell,
}

export default meta

type Story = StoryObj<typeof BuildingGamesCell>

export const Primary: Story = {}
