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

import BuildingGameThirdLevelCell from './BuildingGameThirdLevelCell'

const meta: Meta<typeof BuildingGameThirdLevelCell> = {
  component: BuildingGameThirdLevelCell,
}

export default meta

type Story = StoryObj<typeof BuildingGameThirdLevelCell>

export const Primary: Story = {}
