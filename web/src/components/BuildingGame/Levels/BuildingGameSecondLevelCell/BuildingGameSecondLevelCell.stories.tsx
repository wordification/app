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

import BuildingGameSecondLevelCell from './BuildingGameSecondLevelCell'

const meta: Meta<typeof BuildingGameSecondLevelCell> = {
  component: BuildingGameSecondLevelCell,
}

export default meta

type Story = StoryObj<typeof BuildingGameSecondLevelCell>

export const Primary: Story = {}
