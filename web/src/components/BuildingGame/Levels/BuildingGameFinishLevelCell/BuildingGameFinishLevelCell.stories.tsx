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

import BuildingGameFinishLevelCell from './BuildingGameFinishLevelCell'

const meta: Meta<typeof BuildingGameFinishLevelCell> = {
  component: BuildingGameFinishLevelCell,
}

export default meta

type Story = StoryObj<typeof BuildingGameFinishLevelCell>

export const Primary: Story = {}
